import { ArrowUpRight, FlaskConical } from "lucide-react"
import { aiLab } from "@/lib/portfolio-data"

export function AILabs() {
  return (
    <section id="ai-labs" aria-labelledby="ai-labs-title" className="content-section border-t border-white/10">
      <div className="section-intro">
        <p className="section-kicker">EXPERIMENTAL WORK</p>
        <h2 id="ai-labs-title" className="section-title text-4xl">AI <em>Labs</em></h2>
      </div>
      <article className="lab-card">
        <FlaskConical className="text-[#86a8ff]" aria-hidden="true" size={28} />
        <h3 className="mt-6 text-2xl font-light">{aiLab.title}</h3>
        <p className="mt-4 max-w-3xl leading-7 text-white/60">{aiLab.description}</p>
        <ol className="mt-7 flex flex-wrap gap-2 font-mono text-xs text-white/65">{aiLab.architecture.map((step, index) => <li key={step} className="flex items-center gap-2"><span>{step}</span>{index < aiLab.architecture.length - 1 && <span className="text-[#86a8ff]">→</span>}</li>)}</ol>
        <div className="mt-7 flex flex-wrap gap-2">{aiLab.technologies.map((technology) => <span className="tech-chip" key={technology}>{technology}</span>)}</div>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-white/45">Verified local tooling includes model warmup, image resizing/compression, and cached HTTP sessions. The Bonsai and MLX serving adapters remain experimental rather than production claims.</p>
        <a className="project-link mt-7" href={aiLab.github} target="_blank" rel="noreferrer">View source <ArrowUpRight size={17} aria-hidden="true" /></a>
      </article>
    </section>
  )
}
