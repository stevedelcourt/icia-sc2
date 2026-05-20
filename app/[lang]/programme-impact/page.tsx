'use client'

import { useState, useEffect, useRef } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FadeIn } from '@/components/Animations'
import { t, type Locale } from '@/generated/content'
import { LocalizedLink } from '@/lib/i18n'

/* ── Bar Chart SVG ── */
function BarChart({
  labels,
  values,
  max,
  color,
  unit = '%',
  visible,
}: {
  labels: string[]
  values: number[]
  max: number
  color: string
  unit?: string
  visible: boolean
}) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  const barH = isMobile ? 8 : 10
  const vgap = isMobile ? 18 : 22
  const n = values.length
  const H = n * (barH + vgap) + 10
  const W = 560
  const Ml = isMobile ? 100 : 140
  const Mr = isMobile ? 35 : 60
  const pw = W - Ml - Mr

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="barGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A2B80" />
          <stop offset="38%" stopColor="#7030A0" />
          <stop offset="72%" stopColor="#B02050" />
          <stop offset="100%" stopColor="#C83040" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((p) => {
        const x = Ml + p * pw
        return (
          <g key={p}>
            <line x1={x} y1={0} x2={x} y2={H} stroke="#e5e5e5" strokeWidth={0.8} />
            <text x={x} y={H - 2} textAnchor="middle" fill="#9CA3AF" fontSize={10}>
              {Math.round(p * max)}{unit}
            </text>
          </g>
        )
      })}
      {values.map((v, i) => {
        const y = i * (barH + vgap) + vgap / 2
        const bw = (v / max) * pw
        return (
          <g key={i}>
            <rect x={Ml} y={y} width={pw} height={barH} fill="#f3f4f6" />
            <rect
              x={Ml} y={y}
              width={visible ? bw : 0}
              height={barH}
              fill="url(#barGrad)"
              style={{ transition: `width 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + i * 0.1}s` }}
            />
            <text x={Ml - 10} y={y + barH / 2 + 4} textAnchor="end" fill="#374151" fontSize={11} fontWeight={500}>
              {labels[i]}
            </text>
            <text x={Ml + bw + 6} y={y + barH / 2 + 4} fill="#4e4e4e" fontSize={11} fontWeight={500}>
              {v}{unit}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ── Schema Data ── */
const SCHEMAS_FR = [
  {
    eyebrow: 'SCHEMA 1',
    title: "L'ampleur de la transformation",
    bars: { labels: ['Tâches IA 2030', 'Tâches IA 2035', 'Reconversion 2030'], values: [27, 45, 59], max: 70, color: '#3886c1', unit: '%' },
    source: 'Source : McKinsey Global Institute / Institut de l\'Entreprise, « L\'IA et l\'évolution des compétences en France », 2025',
    link: 'https://www.rhmatin.com/sirh/gpec/travailler-avec-l-ia-en-france-27-des-taches-impactees-d-ici-2030.html',
  },
  {
    eyebrow: 'SCHEMA 2',
    title: "L'écart qui se creuse",
    bars: { labels: ['Prime salariale IA', 'Utilisation Bac+5', 'Utilisation non diplômés'], values: [56, 73, 50], max: 90, color: '#3886c1', unit: '%' },
    source: 'Source : PwC AI Jobs Barometer 2025 / France Travail, Observatoire IA & Emploi, octobre 2024',
    link: 'https://www.pwc.fr/fr/publications/series/ai-jobs-barometer.html',
  },
  {
    eyebrow: 'SCHEMA 3',
    title: 'Le marché du travail bascule',
    bars: { labels: ['Croissance offres IA', 'Offres IA 2024', 'Vitesse évolution compétences'], values: [273, 166, 66], max: 300, color: '#3886c1', unit: '%' },
    source: 'Source : PwC AI Jobs Barometer 2025',
    link: 'https://www.pwc.fr/fr/espace-presse/communiques-de-presse/2025/juin/ai-jobs-barometer.html',
  },
]

const SCHEMAS_EN = [
  {
    eyebrow: 'SCHEMA 1', title: 'The scale of the transformation',
    bars: { labels: ['AI tasks 2030', 'AI tasks 2035', 'Reskilling by 2030'], values: [27, 45, 59], max: 70, color: '#3886c1', unit: '%' },
    source: 'Source: McKinsey Global Institute / Institut de l\'Entreprise, « AI and Skills Evolution in France », 2025',
    link: 'https://www.rhmatin.com/sirh/gpec/travailler-avec-l-ia-en-france-27-des-taches-impactees-d-ici-2030.html',
  },
  {
    eyebrow: 'SCHEMA 2', title: 'The widening gap',
    bars: { labels: ['AI salary premium', 'Graduate usage', 'Non-graduate usage'], values: [56, 73, 50], max: 90, color: '#3886c1', unit: '%' },
    source: 'Source: PwC AI Jobs Barometer 2025 / France Travail, AI & Employment Observatory, October 2024',
    link: 'https://www.pwc.fr/fr/publications/series/ai-jobs-barometer.html',
  },
  {
    eyebrow: 'SCHEMA 3', title: 'The job market shifts',
    bars: { labels: ['AI job growth', 'AI jobs 2024', 'Skill change velocity'], values: [273, 166, 66], max: 300, color: '#3886c1', unit: '%' },
    source: 'Source: PwC AI Jobs Barometer 2025',
    link: 'https://www.pwc.fr/fr/espace-presse/communiques-de-presse/2025/juin/ai-jobs-barometer.html',
  },
]

const MODULES_FR = [
  { num: '01', title: 'Comprendre sans subir', desc: "Ce que l'IA fait réellement, ce qu'elle ne fait pas, et pourquoi les représentations courantes brouillent les pistes. Poser un vocabulaire commun, distinguer les réalités des fantasmes." },
  { num: '02', title: 'Prendre en main les outils du quotidien', desc: 'Rédiger, rechercher, organiser, préparer une candidature, gérer ses démarches. Des usages concrets, testés en situation, avec une posture active et critique.' },
  { num: '03', title: 'Exercer son jugement', desc: "Comment reconnaître une erreur, un biais, une information générée. Savoir évaluer ce qu'elle produit est une compétence à part entière, et une protection." },
  { num: '04', title: "Comprendre ce qu'on cède", desc: 'Données personnelles, consentement, RGPD appliqué au quotidien numérique. Ce que vous acceptez quand vous utilisez un outil IA, et comment exercer vos droits.' },
  { num: '05', title: 'Participer au débat qui nous concerne tous', desc: "IA et travail, IA et démocratie, IA et souveraineté. Ces questions ne sont pas réservées aux experts. Ce module donne les clés pour suivre les décisions qui façonnent notre rapport collectif à ces technologies." },
]

const MODULES_EN = [
  { num: '01', title: 'Understand without suffering', desc: 'What AI actually does, what it does not do, and why common representations confuse the issue. Establish a shared vocabulary, distinguish reality from fantasy.' },
  { num: '02', title: 'Master everyday tools', desc: 'Write, research, organize, prepare applications, manage procedures. Concrete uses, tested in real situations, with an active and critical posture.' },
  { num: '03', title: 'Exercise judgment', desc: 'How to recognize an error, a bias, generated information. Knowing how to evaluate what it produces is a skill in itself, and a protection.' },
  { num: '04', title: 'Understand what you give up', desc: 'Personal data, consent, GDPR applied to daily digital life. What you accept when you use an AI tool, and how to exercise your rights.' },
  { num: '05', title: 'Participate in the debate that concerns us all', desc: 'AI and work, AI and democracy, AI and sovereignty. These questions are not reserved for experts. This module provides the keys.' },
]

/* ── Page ── */
export default function ProgrammeImpactPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === 'en' ? 'en' : 'fr') as Locale
  const schemas = lang === 'en' ? SCHEMAS_EN : SCHEMAS_FR
  const modules = lang === 'en' ? MODULES_EN : MODULES_FR

  return (
    <>
      <Header />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: '64px' }}>

        {/* 1. Hero */}
        <section style={{ background: '#ffffff', padding: 'clamp(96px, 12vw, 160px) 0 clamp(64px, 8vw, 96px)' }}>
          <div className="container-mentivis" style={{ maxWidth: 1240 }}>
            <div className="impact-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
              <div>
                <FadeIn>
                  <p className="eyebrow">{t(lang, 'programme_impact.label')}</p>
                  <h1 className="t-display text-primary" style={{ marginBottom: 40 }}>
                    {t(lang, 'programme_impact.title')}
                  </h1>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <p className="t-lead" style={{ marginBottom: 20, maxWidth: 540, fontSize: 17 }}>
                    Personne n'a demandé à vivre cette transition. Elle s'est imposée, vite, à tout le monde en même temps, sans manuel d'utilisation. Ceux qui la vivent le mieux ne sont pas nécessairement les plus diplômés ni les plus technophiles. Ce sont ceux qui ont eu la chance d'être accompagnés.
                  </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p className="t-lead" style={{ marginBottom: 20, maxWidth: 540, fontSize: 17 }}>
                    L'IA ne va pas supprimer votre poste du jour au lendemain. Mais elle va transformer ce qu'on attend de vous, les compétences qui comptent, et les écarts entre ceux qui savent s'en servir et ceux qui ne le savent pas encore. Ces écarts se creusent déjà, et ils sont mesurables.
                  </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <p className="t-lead" style={{ maxWidth: 540, fontSize: 17 }}>
                    C'est précisément pour cela que l'ICIA existe, et que Mentivis en est l'opérateur pédagogique.
                  </p>
                </FadeIn>
              </div>
              <FadeIn delay={0.3}>
                <div className="impact-hero-img" style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', marginTop: 'clamp(100px, 11vw, 140px)' }}>
                  <img src="/images/asso.webp" alt="Programme Impact" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 2. Stats  -  3 schemas */}
        <section style={{ background: '#f5f5f5', padding: 'clamp(80px, 10vw, 120px) 0' }}>
          <div className="container-mentivis" style={{ maxWidth: 1240 }}>
            {schemas.map((schema, i) => (
              <SchemaBlock key={i} schema={schema} isLast={i === schemas.length - 1} />
            ))}
          </div>
        </section>

        {/* 3. Modules  -  5 cards */}
        <section style={{ background: '#ffffff', padding: 'clamp(80px, 10vw, 120px) 0' }}>
          <div className="container-mentivis" style={{ maxWidth: 1240 }}>
            <FadeIn>
              <p className="eyebrow">
                {lang === 'fr' ? 'CE QUE LE PROGRAMME IMPACT CHANGE CONCRÈTEMENT' : 'WHAT THE IMPACT PROGRAM CHANGES'}
              </p>
              <h2 className="t-display text-primary" style={{ marginBottom: 56 }}>
                {lang === 'fr' ? 'Cinq modules progressifs, sans prérequis.' : 'Five progressive modules, no prerequisites.'}
              </h2>
            </FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {modules.map((mod, i) => (
                <FadeIn key={mod.num} delay={0.1 + i * 0.08}>
                  <div style={{ background: '#f5f5f5', borderRadius: 22, padding: '32px 28px 28px', display: 'flex', flexDirection: 'column', aspectRatio: '1/1' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: '#3886c1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 500, marginBottom: 'auto' }}>
                      {mod.num}
                    </div>
                    <div style={{ marginTop: 'auto' }}>
                      <h3 className="t-heading" style={{ fontSize: 17, fontWeight: 500, marginBottom: 10, color: '#000', lineHeight: 1.3, letterSpacing: 0, textWrap: 'auto' }}>{mod.title}</h3>
                      <p className="t-caption" style={{ color: '#4e4e4e', lineHeight: 1.55 }}>{mod.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 4. CTA */}
        <section style={{ background: '#f5f5f5', padding: 'clamp(80px, 10vw, 120px) 0' }}>
          <div className="container-mentivis">
            <FadeIn>
              <p className="eyebrow">{lang === 'fr' ? 'FORMATS' : 'FORMATS'}</p>
              <h2 className="t-display text-primary" style={{ marginBottom: 20 }}>
                {lang === 'fr' ? 'Ateliers en présentiel, sessions à distance, formats hybrides.' : 'In-person workshops, remote sessions, hybrid formats.'}
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="t-lead" style={{ marginBottom: 40 }}>
                {lang === 'fr'
                  ? "Tous les modules sont disponibles pour les structures associatives, éducatives, culturelles et territoriales dans le cadre des programmes de l'ICIA."
                  : 'All modules are available for associative, educational, cultural and territorial structures within ICIA programs.'}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <LocalizedLink href="/contact" className="btn-pill btn-black">
                {t(lang, 'header.cta')}
                <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </LocalizedLink>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ marginTop: 32, color: '#9CA3AF', fontSize: 13 }}>
                {lang === 'fr' ? 'Programme opéré par Mentivis pour l\'ICIA' : 'Program operated by Mentivis for ICIA'}
              </p>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />

      <style jsx>{`
        @media (max-width: 900px) {
          .impact-hero-grid { grid-template-columns: 1fr !important; }
          .impact-hero-img { margin-top: 32px !important; }
        }
      `}</style>
    </>
  )
}

/* ── Schema Block (needs useVisible) ── */
function SchemaBlock({ schema, isLast }: { schema: typeof SCHEMAS_FR[0]; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ marginBottom: isLast ? 0 : 80 }}>
      <p className="eyebrow" style={{ marginBottom: 12 }}>{schema.eyebrow}</p>
      <h2 className="t-title text-primary" style={{ marginBottom: 40, fontSize: 'clamp(24px, 3vw, 36px)' }}>{schema.title}</h2>
      <div style={{ background: '#ffffff', borderRadius: 20, padding: '32px 28px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
        <BarChart labels={schema.bars.labels} values={schema.bars.values} max={schema.bars.max} color={schema.bars.color} unit={schema.bars.unit} visible={visible} />
      </div>
      <p style={{ marginTop: 16, fontSize: 13, color: '#9CA3AF', lineHeight: 1.5 }}>
        {schema.source}{' '}
        <a href={schema.link} target="_blank" rel="noopener noreferrer" style={{ color: '#4e4e4e', textDecoration: 'underline', textUnderlineOffset: 3 }}>
          →
        </a>
      </p>
    </div>
  )
}
