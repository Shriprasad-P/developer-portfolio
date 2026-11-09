import Image from "next/image"
import { AnimatedLink } from "@/components/ui/skiper-ui/animated-link"
import {
  activeContributions,
  aiLab,
  certifications,
  collaborativeContribution,
  mergedContributions,
  priorContribution,
  profile,
  projects,
  technicalStack,
  type Contribution,
} from "@/lib/portfolio-data"

const navigation = [
  ["Work", "#work"],
  ["Open source", "#open-source"],
  ["Research", "#research"],
  ["About", "#about"],
  ["Contact", "/contact"],
] as const

function SectionHeading({
  index,
  eyebrow,
  title,
  summary,
}: {
  index: string
  eyebrow: string
  title: string
  summary?: string
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow"><span className="eyebrow-index">{index}</span>{eyebrow}</p>
      <h2>{title}</h2>
      {summary && <p className="section-summary">{summary}</p>}
    </div>
  )
}

function ContributionRow({ contribution }: { contribution: Contribution }) {
  return (
    <article className="contribution-row">
      <div>
        <div className="row-heading">
          <h3>{contribution.ecosystem}</h3>
          <span className="status-label">{contribution.status}</span>
        </div>
        <p className="row-meta">{contribution.pullRequest}</p>
        {contribution.title && <p className="row-description">{contribution.title}</p>}
      </div>
      <AnimatedLink className="text-link" href={contribution.url} external arrow>View contribution</AnimatedLink>
    </article>
  )
}

export function SiteHeader({ inner = false }: { inner?: boolean }) {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href={inner ? "/" : "#top"} aria-label="Shriprasad Patil home">
          <span className="brand-mark" aria-hidden="true">SP</span>
          <span>Shriprasad Patil</span>
        </a>
        <nav className="primary-nav" aria-label="Primary navigation">
          {navigation.map(([label, href], index) => (
            <AnimatedLink key={href} href={inner && href.startsWith("#") ? `/${href}` : href}>
              <span className="nav-index">0{index + 1}</span>{label}
            </AnimatedLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export function SiteFooter({ contactPage = false }: { contactPage?: boolean }) {
  return (
    <footer id="contact" className="site-footer">
      <div className="shell footer-grid">
        <div><p className="eyebrow"><span className="eyebrow-index">08</span>{contactPage ? "Explore the work" : "Next conversation"}</p><h2>{contactPage ? "See the systems behind the practice." : "Have a system worth making useful?"}</h2></div>
        <div className="footer-actions"><a className="button button-primary" href={contactPage ? "/#work" : "/contact"}>{contactPage ? "Explore selected systems" : "Open the contact form"} <span aria-hidden="true">↗</span></a><AnimatedLink className="text-link" href={`mailto:${profile.email}`}>{profile.email}</AnimatedLink></div>
      </div>
      <div className="shell footer-meta"><span>© {new Date().getFullYear()} Shriprasad Patil</span><div><AnimatedLink href={profile.linkedin} external>LinkedIn</AnimatedLink><AnimatedLink href={profile.github} external>GitHub</AnimatedLink><AnimatedLink href={profile.huggingFace} external>Hugging Face</AnimatedLink><AnimatedLink href="https://skiper-ui.com/v1/skiper40" external>Link interactions by Skiper UI</AnimatedLink></div></div>
    </footer>
  )
}

export function PortfolioHome() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <SiteHeader />

      <main id="main-content">
        <section id="top" className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-index">01</span>AI / ML · backend engineering</p>
            <h1 id="hero-title">Systems that make <span className="accent-text">AI useful.</span></h1>
            <p className="hero-lede">
              I build agentic systems, research tools, and full stack AI products with a focus on evidence, security, and practical infrastructure.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore selected systems <span aria-hidden="true">↘</span></a>
              <a className="button button-secondary" href="/contact">Start a conversation <span aria-hidden="true">↗</span></a>
            </div>
            <div className="proof-strip" aria-label="Portfolio highlights">
              <div><strong>04</strong><span>featured systems</span></div>
              <div><strong>04+</strong><span>merged upstream contributions</span></div>
              <div><strong>AI 900</strong><span>Microsoft credential</span></div>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Practice map">
            <div className="panel-header"><span>01 / practice map</span><span className="panel-status"><span aria-hidden="true" /> grounded by evidence</span></div>
            <div className="practice-list">
              <div><span className="practice-number">01</span><div><h2>Grounded AI</h2><p>RAG, agents, provenance</p></div></div>
              <div><span className="practice-number">02</span><div><h2>Backend systems</h2><p>FastAPI, data, realtime</p></div></div>
              <div><span className="practice-number">03</span><div><h2>Applied research</h2><p>Vision, evaluation, repair</p></div></div>
            </div>
            <div className="hero-art" aria-hidden="true">
              <Image src="/abstract-neural-network-visualization-dark-theme.jpg" alt="" fill priority sizes="(max-width: 900px) 100vw, 36vw" className="hero-art-image" />
              <span className="hero-art-caption">evidence → execution → useful output</span>
            </div>
          </aside>
        </section>

        <section id="work" className="section section-ink" aria-labelledby="work-title">
          <div className="shell">
            <SectionHeading
              index="02"
              eyebrow="Selected systems"
              title="Work with a point of view."
              summary="Four systems built around grounded AI, controlled execution, accessible interfaces, and explainable models."
            />
            <h2 id="work-title" className="sr-only">Selected systems</h2>
            <div className="project-list">
              {projects.map((project, index) => (
                <article className={`project-card${index === 0 ? " project-card-featured" : ""}`} key={project.slug}>
                  <div className="project-media">
                    <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 900px) 100vw, 42vw" className="project-image" />
                    <span className="project-number">PROJECT 0{index + 1}</span>
                  </div>
                  <div className="project-content">
                    <p className="project-eyebrow">{project.eyebrow}</p>
                    <h3>{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="tag-list" aria-label={`${project.title} technologies`}>
                      {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                    </div>
                    <details className="case-study" open={index === 0}>
                      <summary>Read the engineering notes</summary>
                      <div className="case-study-grid">
                        <div><h4>Problem</h4><p>{project.problem}</p></div>
                        <div><h4>Architecture and engineering</h4><ul>{project.engineering.map((item) => <li key={item}>{item}</li>)}</ul></div>
                        {project.reliability && <div><h4>Reliability and security</h4><p>{project.reliability}</p></div>}
                      </div>
                    </details>
                    <AnimatedLink className="text-link project-source" href={project.github} external arrow>View source on GitHub</AnimatedLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="ai-labs" className="section" aria-labelledby="labs-title">
          <div className="shell lab-layout">
            <SectionHeading index="03" eyebrow="Experimental work" title="A lab for feedback loops." />
            <article className="lab-panel">
              <div className="lab-panel-header"><span>AI LAB / 001</span><span className="status-label">Experimental</span></div>
              <h3 id="labs-title">{aiLab.title}</h3>
              <p>{aiLab.description}</p>
              <ol className="pipeline" aria-label="Image pipeline stages">
                {aiLab.architecture.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}
              </ol>
              <div className="tag-list">{aiLab.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
              <p className="lab-note">Verified local tooling includes model warmup, image resizing and compression, and cached HTTP sessions. The Bonsai and MLX serving adapters remain experimental rather than production claims.</p>
              <AnimatedLink className="text-link" href={aiLab.github} external arrow>View source on GitHub</AnimatedLink>
            </article>
          </div>
        </section>

        <section id="open-source" className="section section-ink" aria-labelledby="open-source-title">
          <div className="shell">
            <SectionHeading index="04" eyebrow="Production ecosystems" title="Proof in public." summary="Open source contributions across Python, AI, observability, and developer tool ecosystems." />
            <h2 id="open-source-title" className="sr-only">Open source contributions</h2>
            <div className="contribution-layout">
              <div>
                <p className="subsection-label">Merged upstream</p>
                <div className="contribution-list">{mergedContributions.map((contribution) => <ContributionRow key={contribution.url} contribution={contribution} />)}</div>
              </div>
              <aside className="evidence-aside"><p className="subsection-label">Why it matters</p><p>Small upstream changes are a useful test of engineering judgment: understand the surface area, make the narrow fix, and leave the ecosystem easier to use.</p><div className="aside-rule" /><p className="aside-meta">4 merged contributions<br />4 active proposals<br />1 collaborative contribution</p></aside>
            </div>
            <div className="secondary-contributions">
              <div><p className="subsection-label">Collaborative work</p><ContributionRow contribution={collaborativeContribution} /></div>
              <div><p className="subsection-label">Closed / prior contribution</p><ContributionRow contribution={priorContribution} /></div>
            </div>
            <div className="active-contributions"><p className="subsection-label">Active contributions</p><div className="contribution-list">{activeContributions.map((contribution) => <ContributionRow key={contribution.url} contribution={contribution} />)}</div></div>
          </div>
        </section>

        <section id="research" className="section" aria-labelledby="research-title">
          <div className="shell">
            <SectionHeading index="05" eyebrow="Inquiry" title="Research with receipts." summary="The current research record is intentionally clear about what is documented, what is experimental, and what still needs verification." />
            <div className="research-grid">
              <article className="research-feature"><p className="subsection-label">Research contribution · ICICTA 2026</p><h3 id="research-title">ReCoD: A Lightweight Framework for Hallucination Detection in Large Language Models</h3><p>Venue recorded in the available project brief: ICICTA 2026. Publication acceptance, authors, DOI, proceedings, and paper URL are not shown because they were not available for verification in the portfolio source.</p></article>
              <article className="research-card"><p className="subsection-label">Research and experiments</p><h3>LLM Memory Degradation and Self Repair in Long Running Agents</h3><p>Experimental research into diagnosing memory degradation in long running LLM agents and evaluating evidence grounded repair strategies with independent verification.</p><span className="status-label">Research in progress</span></article>
            </div>
          </div>
        </section>

        <section id="certifications" className="section section-ink" aria-labelledby="certifications-title">
          <div className="shell">
            <SectionHeading index="06" eyebrow="Credentials" title="Signals of practice." />
            <h2 id="certifications-title" className="sr-only">Certifications</h2>
            <div className="credential-grid">
              {certifications.map((credential) => (
                <article className="credential-card" key={credential.credentialId ?? credential.title}>
                  <p className="credential-issuer">{credential.issuer}</p>
                  <h3>{credential.title}</h3>
                  <dl>{credential.issuedAt && <div><dt>Issued</dt><dd>{credential.issuedAt}</dd></div>}{credential.credentialId && <div><dt>Credential ID</dt><dd>{credential.credentialId}</dd></div>}{credential.recognition && <div><dt>Recognition</dt><dd>{credential.recognition}</dd></div>}</dl>
                  <div className="tag-list">{credential.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                  {credential.verificationUrl && <AnimatedLink className="text-link" href={credential.verificationUrl} external arrow>View profile</AnimatedLink>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section" aria-labelledby="about-title">
          <div className="shell about-layout">
            <div><SectionHeading index="07" eyebrow="Biography" title="Built with care for the real world." /></div>
            <div className="about-copy"><h3 id="about-title">AI focused software engineering with an evidence habit.</h3><p>I&apos;m an MCA student and AI focused software engineer building agentic systems, research tools, and full stack products. My work spans LLM agents, retrieval systems, FastAPI and Next.js applications, computer vision, developer infrastructure, and applied AI research.</p><p>I care about systems that are verifiable, secure, and useful beyond a demo, whether that means preserving evidence, constraining an autonomous workflow, or making information easier to access.</p></div>
          </div>
          <div className="shell stack-layout"><div><p className="subsection-label">Technical stack</p><p className="stack-intro">Tools, applied with intent.</p></div><div className="stack-grid">{technicalStack.map((group) => <div key={group.label}><h3>{group.label}</h3><p>{group.items.join(" · ")}</p></div>)}</div></div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
