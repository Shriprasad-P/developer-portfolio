import Link from "next/link"

export default function NotFound() {
  return (
    <main className="shell" style={{ minHeight: "100dvh", display: "grid", placeItems: "center" }}>
      <section aria-labelledby="not-found-title" style={{ maxWidth: "32rem" }}>
        <p className="eyebrow"><span className="eyebrow-index">404</span>Page not found</p>
        <h1 id="not-found-title" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", letterSpacing: "-.08em", lineHeight: ".9", margin: 0 }}>Nothing here yet.</h1>
        <p style={{ color: "var(--muted-bright)", lineHeight: 1.6, marginTop: "1.5rem" }}>The page you requested does not exist. Return to the portfolio and explore the work.</p>
        <Link className="button button-primary" href="/" style={{ marginTop: "1.5rem" }}>Back to portfolio <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  )
}
