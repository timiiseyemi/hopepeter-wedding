'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { wedding } from '@/lib/wedding-data'
import { Countdown } from './countdown'
import { Particles } from './particles'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const scrollDown = () =>
    document.querySelector('#details')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="top" ref={ref} className="relative min-h-svh w-full overflow-hidden py-28 sm:py-24">
      {/* Parallax background */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src="/couple/WhatsApp%20Image%202026-07-17%20at%2000.51.10.jpeg"
          alt="Omije Hope and Ayogu Peter"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-[#152019]/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#102019]/70 via-transparent to-[#102019]/70" />
      </motion.div>

      <Particles count={22} />

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex min-h-[calc(100svh-7rem)] max-w-2xl items-center justify-center px-5 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="w-full border border-background/40 bg-[#17231bb8] px-7 py-10 shadow-2xl backdrop-blur-md sm:px-14 sm:py-14"
        >
          <p className="text-[0.62rem] uppercase tracking-[0.38em] text-gold sm:text-[0.68rem]">
            Together with their families
          </p>

        <div className="mt-7 flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl font-light leading-[0.9] text-background text-shadow-soft sm:text-6xl"
          >
            {wedding.bride}
          </motion.h1>
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 2.9 }}
            className="my-3 font-serif text-3xl font-thin italic text-gold sm:text-5xl"
          >
            &amp;
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 3, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl font-light leading-[0.9] text-background text-shadow-soft sm:text-6xl"
          >
            {wedding.groom}
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.2 }}
          className="mt-9 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-gold/70 sm:w-16" />
          <p className="text-[0.64rem] uppercase tracking-[0.24em] text-background/90 sm:text-xs sm:tracking-[0.35em]">
            {wedding.dateLabel}
          </p>
          <span className="h-px w-10 bg-gold/70 sm:w-16" />
        </motion.div>

        <p className="mt-5 text-[0.65rem] uppercase tracking-[0.22em] text-gold/90">A celebration of love, faith &amp; heritage</p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.6 }}
          className="mt-9 border-y border-background/20 py-5"
        >
          <Countdown date={wedding.date} light />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.8 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <button
            onClick={() => document.querySelector('#details')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative overflow-hidden rounded-full bg-gold px-7 py-3.5 text-[0.65rem] uppercase tracking-[0.25em] text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
          >
            View Details
          </button>
          <button
            onClick={() => document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-full border border-background/60 px-7 py-3.5 text-[0.65rem] uppercase tracking-[0.25em] text-background backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
          >
            RSVP
          </button>
        </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute inset-x-0 bottom-8 z-10 mx-auto flex w-fit flex-col items-center gap-2 text-background/80"
        aria-label="Scroll to invitation details"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em]">Open invitation</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="size-5" />
        </motion.span>
      </motion.button>
    </section>
  )
}
