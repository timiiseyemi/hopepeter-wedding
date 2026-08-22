'use client'

// Elegant wedding footer
import { motion } from 'motion/react'
import { Send, Phone, Mail } from 'lucide-react'
import { wedding } from '@/lib/wedding-data'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-background py-20 text-center">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto h-px w-24 origin-center bg-gold"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-10 text-[0.65rem] uppercase tracking-[0.4em] text-gold"
        >
          With love and gratitude
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-6 font-serif text-3xl font-light leading-tight text-foreground text-balance sm:text-4xl"
        >
          Thank you for being part of our story
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.35 }}
          className="mx-auto mt-6 max-w-lg font-serif text-xl font-light italic leading-relaxed text-muted-foreground"
        >
          &ldquo;And in the end, the love you take is equal to the love you make.&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex items-center justify-center gap-6 font-serif text-4xl font-light text-foreground"
        >
          <span>{wedding.bride}</span>
          <span className="text-gold">&amp;</span>
          <span>{wedding.groom}</span>
        </motion.div>

        <div className="mt-10 flex items-center justify-center gap-5">
          {[
            { Icon: Send, label: 'Share' },
            { Icon: Phone, label: 'Call' },
            { Icon: Mail, label: 'Email' },
          ].map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:text-gold"
            >
              <Icon className="size-4" strokeWidth={1.5} />
            </a>
          ))}
        </div>

        <p className="mt-12 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground/70">
          {wedding.dateLabel} &middot; {wedding.location}
        </p>
      </div>
    </footer>
  )
}
