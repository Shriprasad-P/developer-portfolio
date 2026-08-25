import Image from "next/image"
import { ArrowUpRight, Github } from "lucide-react"
import { projects } from "@/lib/portfolio-data"

export function FeaturedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative border-y border-white/10 bg-[#070707] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">02 — SELECTED SYSTEMS</p>
            <h2 id="work-title" className="section-title">Featured <em>Work</em></h2>
          </div>
          <p className="max-w-md font-mono text-xs leading-6 text-white/50">
            Four systems built around grounded AI, controlled execution, accessible interfaces, and explainable models.
          </p>
        </div>

        <div className="grid gap-7">
          {projects.map((project, index) => (
            <article key={project.slug} className="project-card group grid overflow-hidden border border-white/10 bg-white/[0.025] lg:grid-cols-[0.92fr_1.08fr]">
              <div className="relative min-h-64 overflow-hidden border-b border-white/10 lg:min-h-full lg:border-b-0 lg:border-r">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover opacity-70 saturate-50 transition duration-700 group-hover:scale-105 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-5 left-5 font-mono text-xs tracking-[0.24em] text-white/75">PROJECT 0{index + 1}</span>
              </div>

              <div className="p-6 sm:p-8 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#86a8ff]">{project.eyebrow}</p>
                <h3 className="mt-3 font-sans text-3xl font-light tracking-tight md:text-5xl">{project.title}</h3>
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/65 md:text-lg">{project.description}</p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span key={technology} className="tech-chip">{technology}</span>
                  ))}
                </div>

                <details className="case-study mt-8 border-t border-white/10 pt-5">
                  <summary className="cursor-pointer font-mono text-xs uppercase tracking-[0.16em] text-white/75 transition hover:text-white">
                    Read case study
                  </summary>
                  <div className="case-study-body mt-6 grid gap-6 text-sm leading-6 text-white/60">
                    <div>
                      <h4>Overview</h4>
                      <p>{project.description}</p>
                    </div>
                    <div>
                      <h4>Problem</h4>
                      <p>{project.problem}</p>
                    </div>
                    <div>
                      <h4>Architecture & engineering</h4>
                      <ul className="list-disc space-y-2 pl-5">
                        {project.engineering.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                    {project.reliability && <div><h4>Reliability / security</h4><p>{project.reliability}</p></div>}
                  </div>
                </details>

                <a href={project.github} target="_blank" rel="noreferrer" className="project-link mt-8" aria-label={`View ${project.title} on GitHub`}>
                  <Github aria-hidden="true" size={17} /> View source <ArrowUpRight aria-hidden="true" size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
