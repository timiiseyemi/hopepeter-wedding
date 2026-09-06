'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Check, Heart } from 'lucide-react'
import { useState } from 'react'
import { SectionHeading } from './section-heading'

type FormState = {
  name: string
  phone: string
  email: string
  attending: string
  guests: string
  message: string
}

const initial: FormState = {
  name: '',
  phone: '',
  email: '',
  attending: 'yes',
  guests: '1',
  message: '',
}

const inputClass =
  'w-full border-0 border-b border-border bg-transparent px-1 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors duration-300 focus:border-gold'

const labelClass = 'mb-1 block text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground'

export function Rsvp() {
  const [form, setForm] = useState<FormState>(initial)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [invitationSent, setInvitationSent] = useState(true)

  const update = (key: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = (await response.json()) as { error?: string; invitationSent?: boolean }

      if (!response.ok) {
        throw new Error(result.error || 'We could not send your RSVP. Please try again.')
      }

      setInvitationSent(result.invitationSent !== false)
      setSubmitted(true)
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'We could not send your RSVP. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="rsvp" className="relative overflow-hidden bg-accent py-24 text-accent-foreground sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:px-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="text-[0.65rem] uppercase tracking-[0.4em] text-gold">
              Kindly respond
            </span>
            <span className="h-px w-8 bg-gold" />
          </div>
          <h2 className="mt-5 font-serif text-4xl font-light text-balance sm:text-5xl lg:text-6xl">
            Will You Join Us?
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-accent-foreground/70">
            Kindly reply by the fifteenth of October. Your presence would mean the world to us.
          </p>
        </div>

        <div className="relative mt-14">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="glass-dark rounded-sm border border-background/10 p-8 sm:p-10"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="name">
                      Full Name
                    </label>
                    <input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="phone">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder="+1 000 000 0000"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="you@email.com"
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <span className={labelClass}>Will you attend?</span>
                    <div className="mt-2 flex gap-3">
                      {[
                        { v: 'yes', l: 'Joyfully accepts' },
                        { v: 'no', l: 'Regretfully declines' },
                      ].map((opt) => (
                        <button
                          key={opt.v}
                          type="button"
                          onClick={() => update('attending', opt.v)}
                          className={`flex-1 rounded-sm border px-4 py-3 text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                            form.attending === opt.v
                              ? 'border-gold bg-gold text-accent'
                              : 'border-background/25 text-accent-foreground/80 hover:border-gold/60'
                          }`}
                        >
                          {opt.l}
                        </button>
                      ))}
                    </div>
                    <p className="mt-3 text-center text-xs leading-relaxed text-accent-foreground/60">
                      Each invitation is reserved for one guest. This is an adults-only celebration; we kindly ask that no children attend.
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="message">
                      A Message for the Couple
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      placeholder="Share your wishes..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-10 w-full rounded-full bg-gold py-4 text-xs uppercase tracking-[0.3em] text-accent transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {isSubmitting ? 'Sending…' : 'Send RSVP'}
                </button>
                {error ? <p className="mt-4 text-center text-sm text-red-200" role="alert">{error}</p> : null}
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="glass-dark flex flex-col items-center rounded-sm border border-gold/30 p-12 text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.15 }}
                  className="flex size-20 items-center justify-center rounded-full bg-gold text-accent"
                >
                  <Check className="size-9" strokeWidth={1.5} />
                </motion.span>
                <h3 className="mt-8 font-serif text-3xl font-light sm:text-4xl">
                  Thank You, {form.name.split(' ')[0] || 'Friend'}
                </h3>
                <p className="mt-4 max-w-sm leading-relaxed text-accent-foreground/75">
                  {form.attending === 'yes'
                    ? 'Your response has been received. We are overjoyed that you will be celebrating with us.'
                    : 'Your response has been received. You will be dearly missed, and held close in our hearts.'}
                </p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-accent-foreground/60">
                  {invitationSent
                    ? 'A copy of your invitation has also been sent to your email.'
                    : 'Your RSVP was received. We could not send the invitation copy right now.'}
                </p>
                <motion.span
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="mt-8 text-gold"
                >
                  <Heart className="size-6" fill="currentColor" />
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
