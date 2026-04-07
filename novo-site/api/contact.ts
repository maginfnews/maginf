import { Resend } from 'resend';

interface AssessmentAnswerPayload {
  id?: string;
  prompt?: string;
  answer?: string;
  score?: number;
}

interface AssessmentRangePayload {
  id?: string;
  label?: string;
  title?: string;
  description?: string;
}

interface AssessmentPayload {
  totalScore?: number;
  maxScore?: number;
  range?: AssessmentRangePayload;
  answers?: AssessmentAnswerPayload[];
}

interface LeadPayload {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  notes?: string;
}

interface ContactRequestBody {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
  from_name?: string;
  from_email?: string;
  source?: string;
  submittedAt?: string;
  language?: string;
  pageUrl?: string;
  lead?: LeadPayload;
  assessment?: AssessmentPayload;
}

interface VercelLikeRequest {
  method?: string;
  body?: string | ContactRequestBody | null;
}

interface VercelLikeResponse {
  setHeader?: (name: string, value: string) => void;
  status: (statusCode: number) => VercelLikeResponse;
  json: (body: unknown) => void;
}

const resend = new Resend(process.env.RESEND_API_KEY);
const resendFromEmail = process.env.RESEND_FROM_EMAIL || 'contato@notificacao.maginf.com.br';
const resendFromName = process.env.RESEND_FROM_NAME || 'Site MAGINF';
const resendContactTo = process.env.RESEND_CONTACT_TO || 'maicon@magpass.com.br';

function parseRequestBody(body: VercelLikeRequest['body']) {
  if (!body) {
    return {} as ContactRequestBody;
  }

  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as ContactRequestBody;
    } catch {
      return {} as ContactRequestBody;
    }
  }

  return body;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function nl2br(value: string) {
  return escapeHtml(value).replace(/\n/g, '<br/>');
}

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader?.('Allow', 'POST, OPTIONS');
    return res.status(204).json({});
  }

  if (req.method !== 'POST') {
    res.setHeader?.('Allow', 'POST, OPTIONS');
    return res.status(405).json({ ok: false, success: false, error: 'Method not allowed' });
  }

  try {
    const body = parseRequestBody(req.body);
    const lead = body.lead ?? {};
    const assessment = body.assessment;

    const name = (body.name ?? body.from_name ?? lead.name ?? '').trim();
    const email = (body.email ?? body.from_email ?? lead.email ?? '').trim();
    const company = (body.company ?? lead.company ?? 'Nao informado').trim() || 'Nao informado';
    const phone = (body.phone ?? lead.phone ?? '').trim();
    const message = (body.message ?? lead.notes ?? '').trim();
    const source = (body.source ?? 'maginf-site').trim();
    const pageUrl = (body.pageUrl ?? '').trim();
    const language = (body.language ?? '').trim();
    const submittedAt = (body.submittedAt ?? '').trim();
    const hasAssessment = Boolean(assessment?.range?.title || assessment?.answers?.length);

    if (!name || !email) {
      return res.status(400).json({
        ok: false,
        success: false,
        error: 'Nome e e-mail sao obrigatorios',
      });
    }

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({
        ok: false,
        success: false,
        error: 'RESEND_API_KEY nao configurada',
      });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company);
    const safePhone = escapeHtml(phone || 'Nao informado');
    const safeSource = escapeHtml(source);
    const safePageUrl = escapeHtml(pageUrl || 'Nao informado');
    const safeLanguage = escapeHtml(language || 'Nao informado');
    const safeSubmittedAt = escapeHtml(submittedAt || 'Nao informado');
    const safeMessage = message ? nl2br(message) : 'Nao informado';
    const assessmentTitle = escapeHtml(assessment?.range?.title ?? 'Nao informado');
    const assessmentLabel = escapeHtml(assessment?.range?.label ?? 'Nao informado');
    const assessmentDescription = assessment?.range?.description
      ? nl2br(assessment.range.description)
      : 'Nao informado';
    const assessmentScore =
      assessment?.totalScore !== undefined && assessment?.maxScore !== undefined
        ? `${assessment.totalScore}/${assessment.maxScore}`
        : 'Nao informado';

    const answersHtml = hasAssessment
      ? `
        <h2>Diagnostico online</h2>
        <p><b>Nivel:</b> ${assessmentTitle}</p>
        <p><b>Faixa:</b> ${assessmentLabel}</p>
        <p><b>Pontuacao:</b> ${assessmentScore}</p>
        <p><b>Descricao:</b><br/>${assessmentDescription}</p>
        <h3>Respostas</h3>
        <ul>
          ${(assessment?.answers ?? [])
            .map((answer) => {
              const prompt = escapeHtml(answer.prompt ?? answer.id ?? 'Pergunta');
              const selectedAnswer = escapeHtml(answer.answer ?? 'Nao informado');
              const score = answer.score ?? '-';
              return `<li><b>${prompt}</b><br/>${selectedAnswer} (score: ${score})</li>`;
            })
            .join('')}
        </ul>
      `
      : '';

    const subject = hasAssessment
      ? `Novo diagnostico online - ${name}`
      : `Novo contato do site - ${name}`;

    const html = `
      <h1>${hasAssessment ? 'Novo diagnostico online' : 'Novo contato do site'}</h1>
      <p><b>Nome:</b> ${safeName}</p>
      <p><b>E-mail:</b> ${safeEmail}</p>
      <p><b>Empresa:</b> ${safeCompany}</p>
      <p><b>Telefone:</b> ${safePhone}</p>
      <p><b>Origem:</b> ${safeSource}</p>
      <p><b>Idioma:</b> ${safeLanguage}</p>
      <p><b>Data do envio:</b> ${safeSubmittedAt}</p>
      <p><b>Pagina:</b> ${safePageUrl}</p>
      <p><b>Mensagem:</b><br/>${safeMessage}</p>
      ${answersHtml}
    `;

    const data = await resend.emails.send({
      from: `${resendFromName} <${resendFromEmail}>`,
      to: [resendContactTo],
      subject,
      reply_to: email,
      html,
    });

    if (data.error) {
      return res.status(502).json({
        ok: false,
        success: false,
        error: data.error.message || 'Falha ao enviar email pelo provedor',
        providerError: data.error,
      });
    }

    return res.status(200).json({ ok: true, success: true, data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro ao enviar email';
    return res.status(500).json({ ok: false, success: false, error: message });
  }
}
