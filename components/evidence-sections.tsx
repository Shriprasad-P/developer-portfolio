import { ArrowUpRight, Award, FileText, Github } from "lucide-react"
import { certifications } from "@/lib/portfolio-data"

export function OpenSource() {
  return (
    <section id="open-source" aria-labelledby="open-source-title" className="content-section">
      <div className="section-intro">
        <p className="section-kicker">03 — PRODUCTION ECOSYSTEMS</p>
        <h2 id="open-source-title" className="section-title">Open <em>Source</em></h2>
      </div>
      <article className="evidence-card grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-start">
        <div className="evidence-mark" aria-hidden="true"><Github size={28} /></div>
        <div>
          <div className="flex flex-wrap items-center gap-3"><h3 className="text-2xl font-light">FastAPI</h3><span className="status-chip">Closed</span></div>
          <p className="mt-3 max-w-3xl leading-7 text-white/65">
            PR #16147 fixes inconsistent Server-Sent Event serialization where route-level <code>response_model_include</code> and <code>response_model_exclude</code> options were ignored for explicit <code>ServerSentEvent</code> payloads, with regression coverage for model and dictionary payloads.
          </p>
        </div>
        <a className="project-link" href="https://github.com/fastapi/fastapi/pull/16147" target="_blank" rel="noreferrer">View PR <ArrowUpRight size={17} aria-hidden="true" /></a>
      </article>
    </section>
  )
}

export function Research() {
  return (
    <section id="research" aria-labelledby="research-title" className="content-section border-t border-white/10">
      <div className="section-intro">
        <p className="section-kicker">04 — INQUIRY</p>
        <h2 id="research-title" className="section-title">Research & <em>Publications</em></h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <article className="evidence-card">
          <div className="flex flex-wrap items-start justify-between gap-4"><FileText className="text-[#86a8ff]" aria-hidden="true" /><span className="status-chip">Research Contribution — ICICTA 2026</span></div>
          <h3 className="mt-7 max-w-3xl text-2xl font-light leading-tight md:text-3xl">ReCoD: A Lightweight Framework for Hallucination Detection in Large Language Models</h3>
          <p className="mt-5 max-w-2xl leading-7 text-white/60">Venue recorded in the available project brief: ICICTA 2026. Publication acceptance, authors, DOI, proceedings, and paper URL are not shown because they were not available for verification in the portfolio source.</p>
        </article>
        <article className="evidence-card">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#86a8ff]">Research & experiments</p>
          <h3 className="mt-5 text-2xl font-light leading-tight">LLM Memory Degradation & Self-Repair in Long-Running Agents</h3>
          <p className="mt-5 leading-7 text-white/60">Experimental research into diagnosing memory degradation in long-running LLM agents and evaluating evidence-grounded repair strategies with independent verification.</p>
          <span className="status-chip mt-7">Research in Progress</span>
        </article>
      </div>
    </section>
  )
}

export function Certifications() {
  return (
    <section id="certifications" aria-labelledby="certifications-title" className="content-section border-t border-white/10">
      <div className="section-intro">
        <p className="section-kicker">05 — CREDENTIALS</p>
        <h2 id="certifications-title" className="section-title">Certifi<em>cations</em></h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {certifications.map((credential) => (
          <article key={credential.credentialId} className="credential-card">
            <div className="evidence-mark" aria-hidden="true"><Award size={26} /></div>
            <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-[#86a8ff]">{credential.issuer}</p>
            <h3 className="mt-3 text-2xl font-light leading-tight">{credential.title}</h3>
            <dl className="mt-8 space-y-3 border-t border-white/10 pt-5 font-mono text-xs text-white/55">
              <div className="flex justify-between gap-4"><dt>Issued</dt><dd className="text-right text-white/80">{credential.issuedAt}</dd></div>
              <div className="flex justify-between gap-4"><dt>Credential ID</dt><dd className="text-right text-white/80">{credential.credentialId}</dd></div>
            </dl>
            <div className="mt-7 flex flex-wrap gap-2">{credential.skills.map((skill) => <span className="tech-chip" key={skill}>{skill}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  )
}
