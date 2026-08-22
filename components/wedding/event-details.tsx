'use client'

import { motion } from 'motion/react'
import { Gem, MapPin, Wine, Shirt } from 'lucide-react'
import { events, wedding } from '@/lib/wedding-data'

const icons = {
  rings: Gem,
  glass: Wine,
  suit: Shirt,
} as const

export function EventDetails() {
  return (
    <section id="details" className="relative overflow-hidden bg-accent py-24 text-accent-foreground sm:py-32">
      <div className="pointer-events-none absolute inset-5 border border-gold/15 sm:inset-8" />
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="text-[0.65rem] uppercase tracking-[0.4em] text-gold">
              The invitation
            </span>
            <span className="h-px w-8 bg-gold" />
          </div>
          <h2 className="mt-5 font-serif text-4xl font-light text-balance sm:text-5xl lg:text-6xl">
            You are warmly invited
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-accent-foreground/70">
            To witness the marriage of Omije Hope and Ayogu Peter, with joy, faith and the warmth of family.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-background/15 bg-background/15 md:grid-cols-3">
          {events.map((event, i) => {
            const Icon = icons[event.icon as keyof typeof icons]
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5 }}
                className="bg-[#1b2920]/85 group flex flex-col items-center p-10 text-center sm:p-12"
              >
                <span className="flex size-16 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-accent">
                  <Icon className="size-6" strokeWidth={1.25} />
                </span>
                <h3 className="mt-6 font-serif text-2xl font-light">{event.title}</h3>
                <span className="mt-4 h-px w-10 bg-gold/50" />
                <p className="mt-4 text-sm uppercase tracking-[0.2em] text-accent-foreground/80">
                  {event.date}
                </p>
                <p className="mt-1 text-sm tracking-[0.15em] text-gold">{event.time}</p>
                <p className="mt-3 text-sm leading-relaxed text-accent-foreground/60">
                  {event.venue}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <p className="flex items-center gap-2 text-sm text-accent-foreground/70">
            <MapPin className="size-4 text-gold" />
            {wedding.location}
          </p>
          <a
            href="https://maps.google.com/?q=Faith+Family+Bible+Church+17+Kosoko+Road+Ojodu+Berger+Lagos"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-gold px-8 py-3 text-xs uppercase tracking-[0.25em] text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-accent"
          >
            View Location
          </a>
        </motion.div>
      </div>
    </section>
  )
}
