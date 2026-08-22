'use client'

import { motion } from 'motion/react'
import { story } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'

export function Story() {
  return (
    <section id="story" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="How it began"
          title="Our Story"
          description="Every love story is beautiful, but ours is our favourite. Here are the moments that led us here."
        />

        <div className="relative mt-20">
          {/* center line */}
          <div className="absolute left-6 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
              className="h-full w-full origin-top bg-gradient-to-b from-gold via-gold/60 to-transparent"
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {story.map((item, i) => {
              const left = i % 2 === 0
              return (
                <div
                  key={item.title}
                  className={`relative flex flex-col gap-6 pl-16 md:grid md:grid-cols-2 md:items-center md:gap-12 md:pl-0 ${
                    left ? '' : 'md:[direction:rtl]'
                  }`}
                >
                  {/* node */}
                  <span className="absolute left-6 top-2 z-10 size-3 -translate-x-1/2 rounded-full bg-gold ring-4 ring-background md:left-1/2" />

                  <motion.div
                    initial={{ opacity: 0, x: left ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className={`[direction:ltr] ${left ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}
                  >
                    <span className="font-serif text-5xl font-light text-gold/50">{item.year}</span>
                    <h3 className="mt-2 font-serif text-3xl font-light text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative aspect-[4/3] overflow-hidden rounded-sm [direction:ltr]"
                  >
                    <img
                      src={item.image || '/placeholder.svg'}
                      alt={item.title}
                      className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-gold/20" />
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
