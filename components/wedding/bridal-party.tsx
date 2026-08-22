'use client'

import { motion } from 'motion/react'
import { bridalParty } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'

export function BridalParty() {
  return (
    <section id="party" className="relative bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="By our side"
          title="The Bridal Party"
          description="The dearest friends and family who have walked with us — and who will stand beside us on the day."
        />

        <div className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {bridalParty.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
                <img
                  src={member.image || '/placeholder.svg'}
                  alt={member.name}
                  className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e221e]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 ring-1 ring-inset ring-gold/20" />
              </div>
              <h3 className="mt-5 font-serif text-2xl font-light text-foreground">{member.name}</h3>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.3em] text-gold">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
