interface AssessmentAnswer {
  id?: string;
  prompt?: string;
  answer?: string;
  score?: number;
}

interface AssessmentInput {
  totalScore?: number;
  maxScore?: number;
  range?: { title?: string; description?: string };
  answers?: AssessmentAnswer[];
}

interface DiagnosisRequest {
  language?: 'pt-BR' | 'en';
  assessment?: AssessmentInput;
}

interface DiagnosisResult {
  level: string;
  score: string;
  summary: string;
  risks: string[];
  priorities: string[];
  nextStep: string;
}

interface VercelRequest {
  method?: string;
  body?: string | DiagnosisRequest | null;
  headers?: Record<string, string | string[] | undefined>;
}

interface VercelResponse {
  setHeader?: (name: string, value: string) => void;
  status: (statusCode: number) => VercelResponse;
  json: (body: unknown) => void;
}

const MAX_ANSWERS = 20;
const MAX_TEXT_LENGTH = 300;
const MAX_REQUEST_BYTES = 20_000;
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 8;
const requestWindows = new Map<string, { startedAt: number; count: number }>();

function parseBody(body: VercelRequest['body']): DiagnosisRequest {
  if (!body) return {};
  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as DiagnosisRequest;
    } catch {
      return {};
    }
  }
  return body;
}

function text(value: unknown, max = MAX_TEXT_LENGTH) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function getClientKey(req: VercelRequest) {
  const forwarded = req.headers?.['x-forwarded-for'];
  return Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0]?.trim() || 'anonymous';
}

function allowedRequest(req: VercelRequest) {
  const now = Date.now();
  const key = getClientKey(req);
  const current = requestWindows.get(key);
  if (!current || now - current.startedAt >= WINDOW_MS) {
    requestWindows.set(key, { startedAt: now, count: 1 });
    return true;
  }
  if (current.count >= MAX_REQUESTS_PER_WINDOW) return false;
  current.count += 1;
  return true;
}

function fallbackDiagnosis(assessment: AssessmentInput): DiagnosisResult {
  const total = Number(assessment.totalScore ?? 0);
  const max = Number(assessment.maxScore ?? 0);
  return {
    level: text(assessment.range?.title) || 'Diagnóstico inicial',
    score: `${total}/${max}`,
    summary: text(assessment.range?.description) || 'O resultado indica oportunidades para organizar a operação de TI.',
    risks: ['Aprofundar a análise do ambiente e das prioridades operacionais.'],
    priorities: ['Validar infraestrutura, segurança, backup e rotina de suporte.'],
    nextStep: 'Solicitar uma avaliação técnica inicial com a equipe MAGINF.',
  };
}

function isValidDiagnosis(value: unknown): value is DiagnosisResult {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return [item.level, item.score, item.summary, item.nextStep].every((field) => typeof field === 'string')
    && Array.isArray(item.risks) && item.risks.length > 0 && item.risks.every((field) => typeof field === 'string')
    && Array.isArray(item.priorities) && item.priorities.length > 0 && item.priorities.every((field) => typeof field === 'string');
}

function cleanDiagnosis(value: DiagnosisResult): DiagnosisResult {
  return {
    level: text(value.level, 80),
    score: text(value.score, 40),
    summary: text(value.summary, 600),
    risks: value.risks.slice(0, 4).map((item) => text(item, 220)).filter(Boolean),
    priorities: value.priorities.slice(0, 4).map((item) => text(item, 220)).filter(Boolean),
    nextStep: text(value.nextStep, 240),
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader?.('Cache-Control', 'no-store');
  res.setHeader?.('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'POST') {
    res.setHeader?.('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  if (!allowedRequest(req)) {
    return res.status(429).json({ ok: false, error: 'Muitas tentativas. Aguarde um minuto e tente novamente.' });
  }

  try {
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {});
    if (Buffer.byteLength(rawBody, 'utf8') > MAX_REQUEST_BYTES) {
      return res.status(413).json({ ok: false, error: 'Diagnóstico muito grande.' });
    }

    const body = parseBody(req.body);
    const assessment = body.assessment ?? {};
    const answers = Array.isArray(assessment.answers) ? assessment.answers.slice(0, MAX_ANSWERS).map((answer) => ({
      id: text(answer.id, 80),
      question: text(answer.prompt),
      answer: text(answer.answer),
      score: Number.isFinite(answer.score) ? Number(answer.score) : 0,
    })) : [];

    if (!answers.length || !Number.isFinite(assessment.totalScore) || !Number.isFinite(assessment.maxScore)) {
      return res.status(400).json({ ok: false, error: 'Respostas de diagnóstico inválidas.' });
    }

    const fallback = fallbackDiagnosis(assessment);
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({ ok: true, source: 'fallback', diagnosis: fallback });
    }

    const baseUrl = (process.env.OPENAI_API_BASE || 'https://api.openai.com/v1').replace(/\/$/, '');
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    const language = body.language === 'en' ? 'English' : 'Portuguese (Brazil)';
    const prompt = `Analyze this B2B IT operations assessment for MAGINF. Return only the requested JSON. Write in ${language}. Do not invent facts, vendors, certifications, incidents, or percentages. Use the score and answers as signals, not as a security diagnosis. Keep each risk and priority concise.\n\nScore: ${assessment.totalScore}/${assessment.maxScore}\nCurrent range: ${text(assessment.range?.title, 100)}\nRange description: ${text(assessment.range?.description, 500)}\nAnswers:\n${JSON.stringify(answers)}`;

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        max_tokens: 700,
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'maginf_diagnosis',
            strict: true,
            schema: {
              type: 'object',
              properties: {
                level: { type: 'string' },
                score: { type: 'string' },
                summary: { type: 'string' },
                risks: { type: 'array', items: { type: 'string' }, minItems: 1, maxItems: 4 },
                priorities: { type: 'array', items: { type: 'string' }, minItems: 1, maxItems: 4 },
                nextStep: { type: 'string' },
              },
              required: ['level', 'score', 'summary', 'risks', 'priorities', 'nextStep'],
              additionalProperties: false,
            },
          },
        },
        messages: [
          { role: 'system', content: 'You are a careful B2B IT advisor. Produce practical, non-alarmist recommendations. Output JSON only.' },
          { role: 'user', content: prompt },
        ],
      }),
      signal: AbortSignal.timeout(12_000),
    });

    if (!response.ok) {
      console.error('AI diagnosis provider error', response.status);
      return res.status(200).json({ ok: true, source: 'fallback', diagnosis: fallback });
    }

    const completion = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
    const content = completion.choices?.[0]?.message?.content;
    const diagnosis = content ? JSON.parse(content) as unknown : null;
    if (!isValidDiagnosis(diagnosis)) {
      return res.status(200).json({ ok: true, source: 'fallback', diagnosis: fallback });
    }

    return res.status(200).json({ ok: true, source: 'ai', diagnosis: cleanDiagnosis(diagnosis) });
  } catch (error) {
    console.error('AI diagnosis error', error);
    return res.status(200).json({ ok: true, source: 'fallback', diagnosis: fallbackDiagnosis(parseBody(req.body).assessment ?? {}) });
  }
}
