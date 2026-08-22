'use client'

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  { label: 'Invitation', href: '#details' },
  { label: 'The Day', href: '#schedule' },
  { label: 'RSVP', href: '#rsvp' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 80))

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass border-b border-border/60 py-3' : 'bg-transparent py-5'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <a
            href="#top"
            onClick={(e) => handleClick(e, '#top')}
            className={`font-serif text-xl tracking-[0.25em] transition-colors ${scrolled ? 'text-foreground' : 'text-background'}`}
          >
            H <span className="text-gold">&amp;</span> P
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => handleClick(e, l.href)}
                  className={`group relative text-[0.7rem] uppercase tracking-[0.25em] transition-colors hover:text-gold ${scrolled ? 'text-foreground/80' : 'text-background/85'}`}
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#rsvp"
            onClick={(e) => handleClick(e, '#rsvp')}
            className={`hidden rounded-full border border-gold px-6 py-2 text-[0.65rem] uppercase tracking-[0.25em] transition-all duration-300 hover:bg-gold hover:text-primary-foreground md:inline-block ${scrolled ? 'text-foreground' : 'text-background'}`}
          >
            RSVP
          </a>

          <button
            onClick={() => setOpen(true)}
            className={`md:hidden ${scrolled ? 'text-foreground' : 'text-background'}`}
            aria-label="Open menu"
          >
            <Menu className="size-6" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-background px-8 py-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-xl tracking-[0.25em]">
                O <span className="text-gold">&amp;</span> P
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="size-6" />
              </button>
            </div>
            <ul className="mt-16 flex flex-col gap-8">
              {[...links].map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <a
                    href={l.href}
                    onClick={(e) => handleClick(e, l.href)}
                    className="font-serif text-4xl font-light text-foreground"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
