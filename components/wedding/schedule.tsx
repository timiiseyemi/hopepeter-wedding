'use client'

import { motion } from 'motion/react'
import { schedule } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'

export function Schedule() {
  return (
    <section id="schedule" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="At your leisure"
          title="The Day in Brief"
          description="From the first welcome to the final sparkler — a gentle timeline of our celebration."
        />

        <div className="relative mt-20">
          <div className="absolute left-[6.5rem] top-0 h-full w-px bg-border sm:left-[7.5rem]">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
              className="h-full w-full origin-top bg-gradient-to-b from-gold to-gold/20"
            />
          </div>

          <div className="space-y-10">
            {schedule.slice(0, 3).map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-start gap-6"
              >
                <span className="w-20 shrink-0 pt-1 text-right font-serif text-lg text-gold sm:w-24 sm:text-xl">
                  {item.time}
                </span>
                <span className="relative z-10 mt-2 size-3 shrink-0 rounded-full bg-gold ring-4 ring-background" />
                <div className="flex-1 pb-2">
                  <h3 className="font-serif text-2xl font-light text-foreground">{item.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
