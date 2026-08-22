'use client'

import { motion } from 'motion/react'
import { Gift as GiftIcon } from 'lucide-react'
import { gift } from '@/lib/wedding-data'
import { Reveal } from './reveal'

export function Gift() {
  return (
    <section id="gift" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <Reveal>
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4 }}
            className="glass relative overflow-hidden rounded-sm border border-gold/25 p-10 shadow-[0_20px_60px_-25px_rgba(120,100,40,0.35)] sm:p-16"
          >
            <div className="flex flex-col items-center text-center">
              <span className="flex size-16 items-center justify-center rounded-full border border-gold/40 text-gold">
                <GiftIcon className="size-6" strokeWidth={1.25} />
              </span>
              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="text-[0.65rem] uppercase tracking-[0.4em] text-gold">
                  With gratitude
                </span>
                <span className="h-px w-8 bg-gold" />
              </div>
              <h2 className="mt-5 font-serif text-4xl font-light text-foreground sm:text-5xl">
                A Note on Gifts
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-pretty font-serif text-xl font-light italic leading-relaxed text-muted-foreground sm:text-2xl">
                &ldquo;{gift.message}&rdquo;
              </p>
            </div>

            <div className="mt-12 grid gap-8 border-t border-border pt-10 md:grid-cols-2 md:items-center">
              <div className="text-center md:text-left">
                <h3 className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">
                  Bank Details
                </h3>
                <dl className="mt-5 space-y-3 text-sm">
                  {[
                    ['Account Name', gift.bank.name],
                    ['Bank', gift.bank.bankName],
                    ['Account', gift.bank.account],
                    ['Reference', gift.bank.reference],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4 md:justify-start md:gap-6"
                    >
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="font-medium tracking-wide text-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="rounded-sm border border-border bg-card p-3">
                  <img
                    src="/images/gift-qr.png"
                    alt="QR code for wedding gift contribution"
                    className="size-36 object-contain"
                  />
                </div>
                <p className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
                  Scan to contribute
                </p>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
