import { getStore } from "@netlify/blobs"
import { NextRequest, NextResponse } from "next/server"

const VISITOR_COOKIE = "portfolio_visitor"
const VISITOR_STORE = "portfolio-visitors"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  const store = getStore({ name: VISITOR_STORE, consistency: "strong" })
  let count = Number.parseInt((await store.get("count", { type: "text" })) ?? "0", 10)
  if (!Number.isFinite(count) || count < 0) {
    count = 0
  }

  const isNewVisitor = !request.cookies.has(VISITOR_COOKIE)
  if (isNewVisitor) {
    count += 1
    await store.set("count", String(count))
  }

  const response = NextResponse.json(
    { count },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  )

  if (isNewVisitor) {
    response.cookies.set(VISITOR_COOKIE, "1", {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  }

  return response
}
