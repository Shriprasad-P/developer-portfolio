"use client"

import { Eye } from "lucide-react"
import { useEffect, useState } from "react"

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch("/api/visitors", { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Unable to load visitor count")
        }

        return response.json() as Promise<{ count: number }>
      })
      .then(({ count }) => setCount(count))
      .catch(() => undefined)

    return () => controller.abort()
  }, [])

  return (
    <div
      className="flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur-sm"
      title={count === null ? "Visitor count" : `${count.toLocaleString()} visitors`}
      aria-label={count === null ? "Visitor count loading" : `${count.toLocaleString()} visitors`}
    >
      <Eye className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
      <span>{count === null ? "—" : count.toLocaleString()}</span>
    </div>
  )
}
