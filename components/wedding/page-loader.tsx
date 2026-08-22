'use client'

import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

type PageLoaderProps = {
  onComplete: () => void
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [opening, setOpening] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    if (!opening) return

    const timer = window.setTimeout(() => {
      setDismissed(true)
      document.body.style.overflow = ''
      onComplete()
    }, 1800)

    return () => window.clearTimeout(timer)
  }, [onComplete, opening])

  if (dismissed) return null

  return (
    <motion.div
      className="fixed inset-0 z-[9999] grid place-items-center overflow-hidden bg-[#8fa68f] px-5"
      initial={false}
      animate={opening ? { y: '105%', opacity: 0 } : { y: 0, opacity: 1 }}
      transition={opening ? { delay: 0.88, duration: 0.88, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
      style={{
        backgroundImage:
          'radial-gradient(circle at 18% 15%, rgba(255,255,255,.18) 0 1px, transparent 1.4px), radial-gradient(circle at 76% 72%, rgba(22,58,39,.12) 0 1px, transparent 1.5px), linear-gradient(135deg, #afbfaa, #75917a)',
        backgroundSize: '15px 15px, 24px 24px, auto',
      }}
    >
      <button
        type="button"
        onClick={() => setOpening(true)}
        disabled={opening}
        aria-label="Open the wedding invitation"
        className="flex w-full max-w-[35rem] cursor-pointer flex-col items-center text-center focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#f2d189] disabled:cursor-default"
      >
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: opening ? 0 : 1, y: opening ? -5 : 0 }}
          transition={{ duration: 0.45 }}
          className="text-[0.62rem] uppercase tracking-[0.38em] text-[#244735]/80"
        >
          A special invitation
        </motion.p>

        <div className="relative mt-7 h-[15.5rem] w-[min(90vw,31rem)] [perspective:1200px] sm:h-[17.5rem]">
          <motion.div
            className="absolute left-[12%] right-[12%] top-[8%] z-10 flex h-[12rem] flex-col items-center justify-center border border-[#d0b371]/60 bg-[#fbf5e7] px-5 shadow-[0_16px_30px_rgba(31,69,48,.22)] sm:h-[13.5rem]"
            animate={opening ? { y: -72, rotate: -1 } : { y: 0, rotate: 0 }}
            transition={{ delay: opening ? 0.22 : 0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[0.55rem] uppercase tracking-[0.3em] text-[#8a6035]">The wedding of</span>
            <span className="mt-2 font-serif text-2xl italic text-[#254a36] sm:text-3xl">Hope &amp; Peter</span>
            <span className="mt-3 h-px w-10 bg-[#c29a56]" />
            <span className="mt-3 text-[0.58rem] uppercase tracking-[0.24em] text-[#6c7d69]">14 November 2026</span>
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 z-20 h-[12rem] border border-[#aebfa9] bg-[#dbe5cf] shadow-[0_26px_44px_rgba(31,69,48,.28)] sm:h-[13.5rem]">
            <span className="absolute inset-y-0 left-0 z-10 w-1/2 bg-[#c5d2bb] [clip-path:polygon(0_0,100%_50%,0_100%)]" />
            <span className="absolute inset-y-0 right-0 z-10 w-1/2 bg-[#c9d6bf] [clip-path:polygon(100%_0,0_50%,100%_100%)]" />
            <span className="absolute inset-x-0 bottom-0 z-20 h-[68%] bg-[#d4dfca] [clip-path:polygon(0_100%,50%_0,100%_100%)]" />

            <motion.div
              className="absolute inset-x-0 top-0 z-30 h-[8.1rem] origin-top bg-[#c7d5bd] shadow-[0_5px_8px_rgba(36,71,53,.14)] [backface-visibility:hidden] [clip-path:polygon(0_0,100%_0,50%_100%)] sm:h-[9rem]"
              animate={opening ? { rotateX: 180 } : { rotateX: 0 }}
              transition={{ duration: 0.78, ease: [0.4, 0, 0.2, 1] }}
            />

            <motion.span
              className="absolute left-1/2 top-[38%] z-40 flex size-[4.7rem] -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-[#a15c42] bg-[#b86d50] font-serif text-2xl italic text-[#f8e8c7] shadow-[0_5px_0_#864c3b,0_12px_20px_rgba(60,36,29,.25)]"
              animate={opening ? { scale: 0.65, opacity: 0 } : { scale: [1, 1.035, 1] }}
              transition={opening ? { duration: 0.22 } : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              H <span className="mx-0.5 text-lg">&amp;</span> P
            </motion.span>
          </div>
        </div>

        <motion.div
          animate={opening ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="mt-7 flex flex-col items-center gap-2 text-[#244735]"
        >
          <span className="font-serif text-[1.65rem] italic leading-none">Omije Hope &amp; Ayogu Peter</span>
          <span className="text-[0.58rem] uppercase tracking-[0.32em]">Tap the seal to open</span>
        </motion.div>
      </button>
    </motion.div>
  )
}
