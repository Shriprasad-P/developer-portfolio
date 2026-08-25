import { ArrowUpRight, Award, FileText } from "lucide-react"
import { activeContributions, certifications, collaborativeContribution, mergedContributions, priorContribution, type Contribution } from "@/lib/portfolio-data"

function ContributionCard({ contribution }: { contribution: Contribution }) {
  return (
    <article className="contribution-card">
      <div className="flex items-start justify-between gap-3"><h3>{contribution.ecosystem}</h3><span className="status-chip">{contribution.status}</span></div>
      <p className="mt-3 font-mono text-[11px] tracking-[0.14em] text-[#b9caff]">{contribution.pullRequest}</p>
      {contribution.title && <p className="mt-3 text-sm leading-6 text-white/60">{contribution.title}</p>}
      <a className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-white/75 hover:text-white" href={contribution.url} target="_blank" rel="noreferrer">View contribution <ArrowUpRight size={15} aria-hidden="true" /></a>
    </article>
  )
}

export function OpenSource() {
  return (
    <section id="open-source" aria-labelledby="open-source-title" className="content-section">
      <div className="section-intro">
        <p className="section-kicker">03 — PRODUCTION ECOSYSTEMS</p>
        <h2 id="open-source-title" className="section-title">Open <em>Source</em></h2>
        <p className="mt-5 max-w-2xl leading-7 text-white/60">4+ merged upstream contributions across major Python, AI, observability, and developer-tool ecosystems.</p>
      </div>
      <div className="mb-10"><p className="section-kicker text-[#86a8ff]">MERGED UPSTREAM</p><div className="contribution-grid">{mergedContributions.map((contribution) => <ContributionCard key={contribution.url} contribution={contribution} />)}</div></div>
      <div className="grid gap-5 lg:grid-cols-2">
        <article className="evidence-card"><p className="section-kicker text-[#86a8ff]">COLLABORATIVE WORK</p><ContributionCard contribution={collaborativeContribution} /></article>
        <article className="evidence-card"><p className="section-kicker text-[#86a8ff]">CLOSED / PRIOR CONTRIBUTION</p><ContributionCard contribution={priorContribution} /></article>
      </div>
      <div className="mt-10"><p className="section-kicker text-[#86a8ff]">ACTIVE CONTRIBUTIONS</p><div className="contribution-grid">{activeContributions.map((contribution) => <ContributionCard key={contribution.url} contribution={contribution} />)}</div></div>
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
          <article key={credential.credentialId ?? credential.title} className="credential-card">
            <div className="evidence-mark" aria-hidden="true"><Award size={26} /></div>
            <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-[#86a8ff]">{credential.issuer}</p>
            <h3 className="mt-3 text-2xl font-light leading-tight">{credential.title}</h3>
            {(credential.issuedAt || credential.credentialId || credential.recognition) && <dl className="mt-8 space-y-3 border-t border-white/10 pt-5 font-mono text-xs text-white/55">
              {credential.issuedAt && <div className="flex justify-between gap-4"><dt>Issued</dt><dd className="text-right text-white/80">{credential.issuedAt}</dd></div>}
              {credential.credentialId && <div className="flex justify-between gap-4"><dt>Credential ID</dt><dd className="text-right text-white/80">{credential.credentialId}</dd></div>}
              {credential.recognition && <div className="flex justify-between gap-4"><dt>Recognition</dt><dd className="text-right text-white/80">{credential.recognition}</dd></div>}
            </dl>}
            <div className="mt-7 flex flex-wrap gap-2">{credential.skills.map((skill) => <span className="tech-chip" key={skill}>{skill}</span>)}</div>
            {credential.verificationUrl && <a className="project-link mt-7" href={credential.verificationUrl} target="_blank" rel="noreferrer">View profile <ArrowUpRight size={17} aria-hidden="true" /></a>}
          </article>
        ))}
      </div>
    </section>
  )
}
