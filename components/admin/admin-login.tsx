'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const result = (await response.json()) as { error?: string }
      if (!response.ok) throw new Error(result.error || 'Could not sign in.')
      router.refresh()
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Could not sign in.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-svh bg-accent px-6 py-16 text-accent-foreground">
      <form onSubmit={submit} className="mx-auto mt-20 max-w-md border border-background/15 bg-background/5 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Private area</p>
        <h1 className="mt-4 font-serif text-4xl font-light">Guest management</h1>
        <label className="mt-8 block text-xs uppercase tracking-[0.2em] text-accent-foreground/70" htmlFor="password">
          Admin password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full border-0 border-b border-background/30 bg-transparent px-1 py-3 outline-none focus:border-gold"
        />
        <button disabled={submitting} className="mt-8 w-full rounded-full bg-gold py-3 text-xs uppercase tracking-[0.25em] text-accent">
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
        {error ? <p className="mt-4 text-sm text-red-200" role="alert">{error}</p> : null}
      </form>
    </main>
  )
}
