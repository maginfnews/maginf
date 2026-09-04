import { useRef, useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CircleCheckBig,
  Gauge,
  Mail,
  MessageCircleMore,
  RotateCcw,
  Send,
} from 'lucide-react';
import type {
  AssessmentQuestion,
  AssessmentRange,
  CTAContent,
  ContactContent,
  Language,
} from '../types';
import { trackMarketingEvent } from '../lib/marketingEvents';

interface CTASectionProps {
  content: CTAContent;
  contact: ContactContent;
  language: Language;
}

type Stage = 'intro' | 'questions' | 'lead' | 'result';
type SubmitState = 'idle' | 'submitting' | 'success' | 'fallback' | 'error';

interface LeadState {
  name: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
}

interface SubmitErrorResponse {
  error?: string;
}

interface AiDiagnosis {
  level: string;
  score: string;
  summary: string;
  risks: string[];
  priorities: string[];
  nextStep: string;
}

interface AiDiagnosisResponse {
  diagnosis?: AiDiagnosis;
}

const DEFAULT_CONTACT_ENDPOINT = '/api/contact';
const AI_DIAGNOSIS_ENDPOINT = '/api/diagnostico';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUEST_TIMEOUT_MS = 15_000;

async function fetchWithTimeout(input: RequestInfo | URL, init?: RequestInit) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    window.clearTimeout(timeout);
  }
}

function getMaxScore(questions: AssessmentQuestion[]) {
  return questions.reduce(
    (total, question) =>
      total + question.options.reduce((highest, option) => Math.max(highest, option.score), 0),
    0,
  );
}

function getTotalScore(questions: AssessmentQuestion[], answers: Record<string, number>) {
  return questions.reduce((total, question) => total + (answers[question.id] ?? 0), 0);
}

function getRange(ranges: AssessmentRange[], score: number) {
  return ranges.find((range) => score >= range.minScore && score <= range.maxScore) ?? ranges.at(-1)!;
}

function getAnswerLabel(question: AssessmentQuestion, score?: number) {
  return question.options.find((option) => option.score === score)?.label ?? '-';
}

function getContactHref(contact: ContactContent, icon: 'whatsapp' | 'email') {
  const cardHref = contact.cards.find((card) => card.icon === icon)?.href;
  if (cardHref) return cardHref;
  return icon === 'whatsapp'
    ? contact.actions.find((action) => action.href.includes('wa.me'))?.href ?? 'https://wa.me/5511351429330'
    : contact.actions.find((action) => action.href.startsWith('mailto:'))?.href ?? 'mailto:contato@maginf.com.br';
}

function buildWhatsappUrl(baseHref: string, message: string) {
  try {
    const url = new URL(baseHref);
    url.searchParams.set('text', message);
    return url.toString();
  } catch {
    return baseHref;
  }
}

function buildMailtoUrl(baseHref: string, body: string) {
  const [address, query = ''] = baseHref.split('?');
  const params = new URLSearchParams(query);
  if (!params.has('subject')) params.set('subject', 'MAGINF diagnostic');
  params.set('body', body);
  return `${address}?${params.toString()}`;
}

function formatAssessmentMessage(
  content: CTAContent,
  lead: LeadState,
  range: AssessmentRange,
  totalScore: number,
  maxScore: number,
  recommendations: string[],
  intro: string,
) {
  return [
    intro,
    `${content.result.levelLabel}: ${range.title}`,
    `${content.result.scoreLabel}: ${totalScore}/${maxScore}`,
    `${content.leadForm.fields.name}: ${lead.name || '-'}`,
    `${content.leadForm.fields.company}: ${lead.company || '-'}`,
    `${content.leadForm.fields.email}: ${lead.email || '-'}`,
    `${content.leadForm.fields.phone}: ${lead.phone || '-'}`,
    ...recommendations,
    lead.notes.trim() ? `${content.leadForm.fields.notes}: ${lead.notes.trim()}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}

export default function CTASection({ content, contact, language }: CTASectionProps) {
  const [stage, setStage] = useState<Stage>('intro');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [lead, setLead] = useState<LeadState>({
    name: '',
    company: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [questionError, setQuestionError] = useState<string | null>(null);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [submitErrorDetails, setSubmitErrorDetails] = useState<string | null>(null);
  const [aiDiagnosis, setAiDiagnosis] = useState<AiDiagnosis | null>(null);
  const assessmentCompletedTracked = useRef(false);

  const currentQuestion = content.questions[questionIndex];
  const maxScore = getMaxScore(content.questions);
  const totalScore = getTotalScore(content.questions, answers);
  const resultRange = getRange(content.ranges, totalScore);
  const answeredCount =
    stage === 'lead' || stage === 'result' ? content.questions.length : Object.keys(answers).length;
  const stageLabels = [content.stages.intro, content.stages.questions, content.stages.lead, content.stages.result];
  const stageIndex = stage === 'intro' ? 0 : stage === 'questions' ? 1 : stage === 'lead' ? 2 : 3;
  const recommendationLines = resultRange.recommendations.map(
    (item, index) => `${index + 1}. ${item}`,
  );
  const whatsappText = formatAssessmentMessage(
    content,
    lead,
    resultRange,
    totalScore,
    maxScore,
    recommendationLines,
    language === 'pt-BR'
      ? 'Olá MAGINF, concluí o diagnóstico online.'
      : 'Hello MAGINF, I completed the online assessment.',
  );
  const leadMessage = formatAssessmentMessage(
    content,
    lead,
    resultRange,
    totalScore,
    maxScore,
    recommendationLines,
    language === 'pt-BR'
      ? 'Diagnóstico online enviado pelo site MAGINF.'
      : 'Online assessment sent from the MAGINF website.',
  );
  const answerSnapshot = content.questions.map((question) => ({
    id: question.id,
    prompt: question.prompt,
    answer: getAnswerLabel(question, answers[question.id]),
    score: answers[question.id],
  }));

  const whatsappHref = buildWhatsappUrl(getContactHref(contact, 'whatsapp'), whatsappText);
  const emailHref = buildMailtoUrl(
    getContactHref(contact, 'email'),
    `${language === 'pt-BR' ? 'Olá equipe MAGINF,' : 'Hello MAGINF team,'}\n\n${whatsappText}`,
  );

  const resetFlow = () => {
    setStage('intro');
    setQuestionIndex(0);
    setAnswers({});
    setLead({ name: '', company: '', email: '', phone: '', notes: '' });
    setQuestionError(null);
    setLeadError(null);
    setSubmitState('idle');
    setSubmitErrorDetails(null);
    setAiDiagnosis(null);
    assessmentCompletedTracked.current = false;
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!lead.name.trim() || !lead.company.trim() || !lead.email.trim() || !lead.phone.trim()) {
      setLeadError(content.leadForm.requiredMessage);
      return;
    }

    if (!EMAIL_PATTERN.test(lead.email.trim())) {
      setLeadError(content.leadForm.invalidEmailMessage);
      return;
    }

    setLeadError(null);
    setSubmitErrorDetails(null);
    setSubmitState('submitting');

    let generatedDiagnosis: AiDiagnosis | null = null;
    try {
      const diagnosisResponse = await fetchWithTimeout(AI_DIAGNOSIS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          assessment: {
            totalScore,
            maxScore,
            range: resultRange,
            answers: answerSnapshot,
          },
        }),
      });
      if (diagnosisResponse.ok) {
        const diagnosisBody = await diagnosisResponse.json() as AiDiagnosisResponse;
        if (diagnosisBody.diagnosis) generatedDiagnosis = diagnosisBody.diagnosis;
      }
    } catch (error) {
      console.warn('AI diagnosis unavailable; using score-based result', error);
    }
    setAiDiagnosis(generatedDiagnosis);

    const payload = {
      source: 'maginf-online-diagnostic',
      submittedAt: new Date().toISOString(),
      language,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      name: lead.name.trim(),
      email: lead.email.trim(),
      company: lead.company.trim(),
      phone: lead.phone.trim(),
      message: leadMessage,
      from_name: lead.name.trim(),
      from_email: lead.email.trim(),
      lead: {
        name: lead.name.trim(),
        email: lead.email.trim(),
        company: lead.company.trim(),
        phone: lead.phone.trim(),
        notes: lead.notes.trim(),
      },
      assessment: {
        totalScore,
        maxScore,
        range: resultRange,
        answers: answerSnapshot,
        aiDiagnosis: generatedDiagnosis,
      },
    };

    try {
      const response = await fetchWithTimeout(DEFAULT_CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 404 || response.status === 405) {
          setSubmitState('fallback');
          setSubmitErrorDetails('A API de contato não está publicada neste deploy. O resultado continua disponível e pode ser enviado por WhatsApp ou e-mail.');
          return;
        }

        const contentType = response.headers.get('content-type') ?? '';
        let details = `Webhook error: ${response.status}`;

        if (contentType.includes('application/json')) {
          const body = (await response.json().catch(() => null)) as SubmitErrorResponse | null;
          if (body?.error) {
            details = `${details} - ${body.error}`;
          }
        } else {
          const text = (await response.text()).trim();
          if (text) {
            details = `${details} - ${text}`;
          }
        }

        throw new Error(details);
      }

      trackMarketingEvent('generate_lead', {
        assessment_score: totalScore,
        assessment_max_score: maxScore,
        assessment_level: resultRange.id,
        ai_diagnosis_available: Boolean(generatedDiagnosis),
        lead_source: 'online_diagnostic',
      });
      setSubmitState('success');
    } catch (error) {
      console.error('Lead submission failed', error);
      setSubmitState('error');
      setSubmitErrorDetails(error instanceof DOMException && error.name === 'AbortError'
        ? 'O envio demorou mais que o esperado. Verifique a configuração de e-mail na Vercel e tente novamente.'
        : 'O envio não foi concluído. Verifique a configuração RESEND_API_KEY e RESEND_CONTACT_TO na Vercel e tente novamente.');
    } finally {
      setStage('result');
    }
  };

  const submitMessage =
    submitState === 'success'
      ? content.result.successMessage
      : submitState === 'fallback'
        ? content.result.fallbackMessage
        : submitState === 'error'
          ? content.result.errorMessage
          : null;

  return (
    <section className="relative overflow-hidden bg-on-background py-32" id="diagnostico">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,107,0,0.16),transparent_35%)]" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-3xl">
          <span className="font-headline text-[10px] font-bold uppercase tracking-[0.3em] text-tertiary">{content.eyebrow}</span>
          <h2 className="mb-8 mt-4 font-headline text-4xl font-black leading-tight text-white md:text-5xl">
            {content.title}
            <span className="text-tertiary">{content.highlight}</span>.
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-white/60">{content.description}</p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {content.deliverables.map((item, index) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }} className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="font-headline text-sm font-black uppercase tracking-[0.24em] text-tertiary">0{index + 1}</div>
              <h3 className="mt-5 font-headline text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm md:p-8">
          <div className="flex flex-wrap gap-3">
            {stageLabels.map((label, index) => (
              <div key={label} className={`rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] ${index === stageIndex ? 'border-tertiary/60 bg-tertiary/10 text-white' : index < stageIndex ? 'border-white/20 bg-white/8 text-white/82' : 'border-white/10 bg-white/[0.03] text-white/36'}`}>
                {String(index + 1).padStart(2, '0')} {label}
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
            <aside className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-center gap-3 text-white">
                  <Gauge className="text-tertiary" size={18} />
                  <span className="font-headline text-sm font-black uppercase tracking-[0.18em]">{content.summaryTitle}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/58">{content.summaryDescription}</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/38">{content.questionLabel}</div>
                    <div className="mt-2 font-headline text-3xl font-black text-white">{answeredCount}<span className="text-lg text-white/35">/{content.questions.length}</span></div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/38">{content.result.scoreLabel}</div>
                    <div className="mt-2 font-headline text-3xl font-black text-white">{totalScore}<span className="text-lg text-white/35">/{maxScore}</span></div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="font-headline text-sm font-black uppercase tracking-[0.18em] text-white">{content.rangesTitle}</div>
                <div className="mt-4 space-y-3">
                  {content.ranges.map((range) => (
                    <div key={range.id} className={`rounded-2xl border p-4 ${stage === 'lead' || stage === 'result' ? range.id === resultRange.id ? 'border-tertiary/60 bg-tertiary/10' : 'border-white/10 bg-white/[0.03]' : 'border-white/10 bg-white/[0.03]'}`}>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/38">{range.label}</div>
                          <div className="mt-2 font-headline text-lg font-black text-white">{range.title}</div>
                        </div>
                        <div className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">{range.minScore}-{range.maxScore}</div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-white/58">{range.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div>
              {stage === 'intro' ? (
                <div className="flex min-h-[520px] flex-col justify-between gap-8">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
                      <CircleCheckBig className="text-tertiary" size={15} />
                      {content.stages.intro}
                    </div>
                    <h3 className="mt-6 font-headline text-3xl font-black text-white md:text-4xl">{content.summaryTitle}</h3>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/62">{content.summaryDescription}</p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <button type="button" onClick={() => { trackMarketingEvent('assessment_started', { question_count: content.questions.length, assessment_max_score: maxScore }); setStage('questions'); }} className="inline-flex items-center gap-2 rounded-sm bg-tertiary px-8 py-4 font-headline text-[12px] font-bold uppercase tracking-[0.22em] text-white shadow-2xl shadow-tertiary/20 transition-all hover:brightness-110">
                      {content.startLabel}
                      <ArrowRight size={16} />
                    </button>
                    <a href="#contato" className="rounded-sm border border-white/15 bg-white/5 px-8 py-4 font-headline text-[12px] font-bold uppercase tracking-[0.22em] text-white transition-all hover:bg-white/10">
                      {contact.actions[0]?.label ?? 'WhatsApp'}
                    </a>
                  </div>
                </div>
              ) : null}

              {stage === 'questions' ? (
                <div className="min-h-[520px]">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
                    <Gauge className="text-tertiary" size={15} />
                    {content.questionLabel} {questionIndex + 1}/{content.questions.length}
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/8">
                    <div className="h-full rounded-full bg-tertiary transition-all duration-300" style={{ width: `${((questionIndex + 1) / content.questions.length) * 100}%` }} />
                  </div>
                  <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-6">
                    <h3 className="font-headline text-2xl font-black leading-tight text-white md:text-3xl">{currentQuestion.prompt}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/58">{currentQuestion.helper}</p>
                    <div className="mt-6 grid gap-3">
                      {currentQuestion.options.map((option) => {
                        const active = answers[currentQuestion.id] === option.score;
                        return (
                          <button key={`${currentQuestion.id}-${option.score}`} type="button" onClick={() => { setAnswers((current) => ({ ...current, [currentQuestion.id]: option.score })); setQuestionError(null); }} aria-pressed={active} className={`rounded-3xl border p-5 text-left transition-all ${active ? 'border-tertiary/60 bg-tertiary/10' : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'}`}>
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="font-headline text-lg font-bold text-white">{option.label}</div>
                                <p className="mt-2 text-sm leading-relaxed text-white/58">{option.description}</p>
                              </div>
                              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-black ${active ? 'border-tertiary bg-tertiary text-white' : 'border-white/12 text-white/35'}`}>{option.score}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {questionError ? <p className="mt-5 text-sm text-[#ffb38a]">{questionError}</p> : null}
                  </div>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <button type="button" onClick={() => { if (questionIndex === 0) { setStage('intro'); return; } setQuestionIndex((index) => index - 1); }} className="inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/5 px-5 py-3 font-headline text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-white/10">
                      <ArrowLeft size={16} />
                      {content.previousLabel}
                    </button>
                    <button type="button" onClick={() => { if (answers[currentQuestion.id] === undefined) { setQuestionError(content.answerRequiredMessage); return; } if (questionIndex === content.questions.length - 1) { if (!assessmentCompletedTracked.current) { trackMarketingEvent('assessment_completed', { assessment_score: totalScore, assessment_max_score: maxScore, assessment_level: resultRange.id, question_count: content.questions.length }); assessmentCompletedTracked.current = true; } setStage('lead'); return; } setQuestionIndex((index) => index + 1); }} className="inline-flex items-center gap-2 rounded-sm bg-tertiary px-6 py-3 font-headline text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-tertiary/20 transition-all hover:brightness-110">
                      {questionIndex === content.questions.length - 1 ? content.lastQuestionLabel : content.nextLabel}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ) : null}

              {stage === 'lead' ? (
                <div className="min-h-[520px]">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
                    <Send className="text-tertiary" size={15} />
                    {content.stages.lead}
                  </div>
                  <h3 className="mt-6 font-headline text-3xl font-black text-white md:text-4xl">{content.leadForm.title}</h3>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/62">{content.leadForm.description}</p>
                  <div className="mt-6 rounded-3xl border border-tertiary/25 bg-tertiary/8 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/38">{content.result.levelLabel}</div>
                        <div className="mt-2 font-headline text-2xl font-black text-white">{resultRange.title}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/38">{content.result.scoreLabel}</div>
                        <div className="mt-2 font-headline text-3xl font-black text-white">{totalScore}<span className="text-lg text-white/35">/{maxScore}</span></div>
                      </div>
                    </div>
                  </div>
                  <form className="mt-6 space-y-4" onSubmit={submitLead} aria-describedby={leadError ? 'diagnostic-form-error' : undefined}>
                    <div className="grid gap-4 md:grid-cols-2">
                      <input id="diagnostic-name" name="name" type="text" autoComplete="name" required value={lead.name} onChange={(event) => { setLead((current) => ({ ...current, name: event.target.value })); setLeadError(null); }} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none placeholder:text-white/24 focus:border-tertiary/60" placeholder={content.leadForm.fields.name} aria-label={content.leadForm.fields.name} />
                      <input id="diagnostic-company" name="company" type="text" autoComplete="organization" required value={lead.company} onChange={(event) => { setLead((current) => ({ ...current, company: event.target.value })); setLeadError(null); }} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none placeholder:text-white/24 focus:border-tertiary/60" placeholder={content.leadForm.fields.company} aria-label={content.leadForm.fields.company} />
                      <input id="diagnostic-email" name="email" type="email" autoComplete="email" required value={lead.email} onChange={(event) => { setLead((current) => ({ ...current, email: event.target.value })); setLeadError(null); }} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none placeholder:text-white/24 focus:border-tertiary/60" placeholder={content.leadForm.fields.email} aria-label={content.leadForm.fields.email} />
                      <input id="diagnostic-phone" name="phone" type="tel" autoComplete="tel" required value={lead.phone} onChange={(event) => { setLead((current) => ({ ...current, phone: event.target.value })); setLeadError(null); }} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none placeholder:text-white/24 focus:border-tertiary/60" placeholder={content.leadForm.fields.phone} aria-label={content.leadForm.fields.phone} />
                    </div>
                    <textarea id="diagnostic-notes" name="notes" value={lead.notes} onChange={(event) => { setLead((current) => ({ ...current, notes: event.target.value })); setLeadError(null); }} rows={4} className="w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none placeholder:text-white/24 focus:border-tertiary/60" placeholder={content.leadForm.notesPlaceholder} aria-label={content.leadForm.notesPlaceholder} />
                    <p className="text-sm leading-relaxed text-white/48">{content.leadForm.privacyNote}</p>
                    {leadError ? <p id="diagnostic-form-error" role="alert" aria-live="assertive" className="text-sm text-[#ffb38a]">{leadError}</p> : null}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <button type="button" onClick={() => setStage('questions')} className="inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/5 px-5 py-3 font-headline text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-white/10">
                        <ArrowLeft size={16} />
                        {content.previousLabel}
                      </button>
                      <button type="submit" disabled={submitState === 'submitting'} className="inline-flex items-center gap-2 rounded-sm bg-tertiary px-6 py-3 font-headline text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-tertiary/20 transition-all hover:brightness-110 disabled:cursor-wait disabled:opacity-70">
                        <Send size={16} />
                        {submitState === 'submitting' ? content.leadForm.submittingLabel : content.leadForm.submitLabel}
                      </button>
                    </div>
                  </form>
                </div>
              ) : null}

              {stage === 'result' ? (
                <div className="min-h-[520px]">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
                    <CircleCheckBig className="text-tertiary" size={15} />
                    {content.stages.result}
                  </div>
                  {aiDiagnosis ? (
                    <div className="mt-6 rounded-3xl border border-tertiary/25 bg-tertiary/8 p-6" aria-live="polite">
                      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-tertiary">{language === 'pt-BR' ? 'Leitura personalizada por IA' : 'AI-powered assessment'}</div>
                      <h3 className="mt-3 font-headline text-2xl font-black text-white">{aiDiagnosis.level}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/70">{aiDiagnosis.summary}</p>
                      <div className="mt-5 grid gap-5 md:grid-cols-2">
                        <div><h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">{language === 'pt-BR' ? 'Riscos observados' : 'Observed risks'}</h4><ul className="mt-2 space-y-2 text-sm text-white/70">{aiDiagnosis.risks.map((item) => <li key={item}>• {item}</li>)}</ul></div>
                        <div><h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">{language === 'pt-BR' ? 'Prioridades' : 'Priorities'}</h4><ul className="mt-2 space-y-2 text-sm text-white/70">{aiDiagnosis.priorities.map((item) => <li key={item}>• {item}</li>)}</ul></div>
                      </div>
                      <p className="mt-5 text-sm font-semibold text-white">{language === 'pt-BR' ? 'Próximo passo: ' : 'Next step: '}{aiDiagnosis.nextStep}</p>
                    </div>
                  ) : null}

                  <div className="mt-6 rounded-3xl border border-tertiary/25 bg-tertiary/8 p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/38">{content.result.levelLabel}</div>
                        <div className="mt-2 font-headline text-3xl font-black text-white">{resultRange.title}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/38">{content.result.scoreLabel}</div>
                        <div className="mt-2 font-headline text-3xl font-black text-white">{totalScore}<span className="text-lg text-white/35">/{maxScore}</span></div>
                      </div>
                    </div>
                    <p className="mt-4 text-base leading-relaxed text-white/65">{resultRange.description}</p>
                  </div>
                  <div className="mt-6 grid gap-6 xl:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/38">{content.result.recommendationsLabel}</div>
                      <h4 className="mt-3 font-headline text-lg font-black text-white">{content.result.title}</h4>
                      <p className="mt-3 text-sm leading-relaxed text-white/58">{content.result.description}</p>
                      <div className="mt-5 space-y-3">
                        {resultRange.recommendations.map((item, index) => (
                          <div key={`${resultRange.id}-${index}`} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-relaxed text-white/70">
                            <span className="mr-3 font-headline text-xs font-black uppercase tracking-[0.18em] text-tertiary">0{index + 1}</span>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                      <h4 className="font-headline text-lg font-black text-white">{content.result.answersLabel}</h4>
                      <div className="mt-5 space-y-3">
                        {content.questions.map((question) => (
                          <div key={question.id} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/38">{question.prompt}</div>
                            <div className="mt-2 text-sm font-semibold text-white/76">{getAnswerLabel(question, answers[question.id])}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {submitMessage ? <div role={submitState === 'error' ? 'alert' : undefined} aria-live="polite" className={`mt-6 rounded-2xl border px-5 py-4 text-sm leading-relaxed ${submitState === 'error' ? 'border-[#ffb38a]/40 bg-[#ffb38a]/10 text-[#ffd8c2]' : 'border-white/10 bg-white/[0.04] text-white/72'}`}>{submitMessage}</div> : null}
                  {submitErrorDetails ? <div role="alert" aria-live="assertive" className="mt-3 rounded-2xl border border-[#ffb38a]/40 bg-[#ffb38a]/10 px-5 py-4 text-sm leading-relaxed text-[#ffd8c2]">{submitErrorDetails}</div> : null}
                  <div className="mt-8 flex flex-wrap gap-4">
                    <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-sm bg-tertiary px-8 py-4 font-headline text-[12px] font-bold uppercase tracking-[0.22em] text-white shadow-2xl shadow-tertiary/20 transition-all hover:brightness-110">
                      <MessageCircleMore size={16} />
                      {content.result.whatsappLabel}
                    </a>
                    <a href={emailHref} className="inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/5 px-8 py-4 font-headline text-[12px] font-bold uppercase tracking-[0.22em] text-white transition-all hover:bg-white/10">
                      <Mail size={16} />
                      {content.result.emailLabel}
                    </a>
                    <button type="button" onClick={resetFlow} className="inline-flex items-center gap-2 rounded-sm border border-white/15 bg-transparent px-8 py-4 font-headline text-[12px] font-bold uppercase tracking-[0.22em] text-white/80 transition-all hover:bg-white/8 hover:text-white">
                      <RotateCcw size={16} />
                      {content.result.restartLabel}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-headline text-[18vw] font-black tracking-tighter text-white/[0.02]">
        MAGINF
      </div>
    </section>
  );
}
