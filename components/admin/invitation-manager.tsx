'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Invitation = {
  id: string
  name: string
  phone: string | null
  allowed_guests: number
  invite_token: string
  rsvp_status: 'pending' | 'attending' | 'declined'
  rsvp_attendee_count: number | null
  created_at: string
}

const initialForm = { name: '', phone: '', allowedGuests: 1 }

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || window.location.origin).replace(/\/$/, '')
}

export function InvitationManager({ initialInvitations }: { initialInvitations: Invitation[] }) {
  const router = useRouter()
  const [invitations, setInvitations] = useState(initialInvitations)
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const copyLink = async (token: string) => {
    const link = `${siteUrl()}/?invite=${token}`
    try {
      await navigator.clipboard.writeText(link)
      setNotice('RSVP link copied.')
    } catch {
      setError('Could not copy the link. Please copy it from the browser address bar.')
    }
  }

  const addGuest = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    setNotice('')
    try {
      const response = await fetch('/api/admin/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = (await response.json()) as { error?: string; invitation?: Invitation }
      if (!response.ok || !result.invitation) throw new Error(result.error || 'Could not create invitation.')
      setInvitations((current) => [result.invitation!, ...current])
      setForm(initialForm)
      setNotice(`Invitation created for ${result.invitation.name}.`)
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Could not create invitation.')
    } finally {
      setSubmitting(false)
    }
  }

  const signOut = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.refresh()
  }

  return (
    <main className="min-h-svh bg-accent px-6 py-12 text-accent-foreground lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Private area</p>
            <h1 className="mt-3 font-serif text-4xl font-light sm:text-5xl">Guest invitations</h1>
          </div>
          <button onClick={signOut} className="text-xs uppercase tracking-[0.2em] text-accent-foreground/70 hover:text-gold">Sign out</button>
        </div>

        <form onSubmit={addGuest} className="mt-10 grid gap-5 border border-background/15 bg-background/5 p-6 sm:grid-cols-2 lg:grid-cols-3">
          <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Guest name" className="border-0 border-b border-background/30 bg-transparent px-1 py-3 outline-none focus:border-gold" />
          <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="Phone (optional)" className="border-0 border-b border-background/30 bg-transparent px-1 py-3 outline-none focus:border-gold" />
          <div className="flex items-end gap-3">
            <label className="flex-1 text-xs uppercase tracking-[0.15em] text-accent-foreground/70">Allowed guests
              <input required min="1" max="20" type="number" value={form.allowedGuests} onChange={(event) => setForm({ ...form, allowedGuests: Number(event.target.value) })} className="mt-1 block w-full border-0 border-b border-background/30 bg-transparent px-1 py-3 text-base outline-none focus:border-gold" />
            </label>
            <button disabled={submitting} className="rounded-full bg-gold px-5 py-3 text-xs uppercase tracking-[0.18em] text-accent">{submitting ? 'Adding…' : 'Add guest'}</button>
          </div>
        </form>

        {error ? <p className="mt-4 text-sm text-red-200" role="alert">{error}</p> : null}
        {notice ? <p className="mt-4 text-sm text-gold">{notice}</p> : null}

        <div className="mt-10 overflow-x-auto border border-background/15">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b border-background/15 text-xs uppercase tracking-[0.18em] text-accent-foreground/60">
              <tr><th className="px-5 py-4">Guest</th><th className="px-5 py-4">Allowed</th><th className="px-5 py-4">RSVP</th><th className="px-5 py-4">Link</th></tr>
            </thead>
            <tbody>
              {invitations.map((invitation) => (
                <tr key={invitation.id} className="border-b border-background/10 last:border-0">
                  <td className="px-5 py-4"><p>{invitation.name}</p></td>
                  <td className="px-5 py-4">{invitation.allowed_guests}</td>
                  <td className="px-5 py-4 capitalize">{invitation.rsvp_status}{invitation.rsvp_attendee_count !== null ? ` (${invitation.rsvp_attendee_count})` : ''}</td>
                  <td className="px-5 py-4"><button onClick={() => copyLink(invitation.invite_token)} className="rounded-full border border-gold px-4 py-2 text-xs uppercase tracking-[0.15em] text-gold hover:bg-gold hover:text-accent">Copy RSVP Link</button></td>
                </tr>
              ))}
              {invitations.length === 0 ? <tr><td colSpan={4} className="px-5 py-10 text-center text-accent-foreground/60">No guest invitations yet.</td></tr> : null}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
