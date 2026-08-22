'use client'

import { AnimatePresence, motion } from 'motion/react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { gallery } from '@/lib/wedding-data'
import { SectionHeading } from './section-heading'

export function Gallery() {
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => setActive(null), [])
  const next = useCallback(
    () => setActive((a) => (a === null ? a : (a + 1) % gallery.length)),
    [],
  )
  const prev = useCallback(
    () => setActive((a) => (a === null ? a : (a - 1 + gallery.length) % gallery.length)),
    [],
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, close, next, prev])

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Captured moments"
          title="Our Gallery"
          description="A collection of the little details and quiet glances that make our story ours."
        />

        <div className="mt-16 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {gallery.map((img, i) => (
            <motion.button
              key={img.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActive(i)}
              className={`group relative block w-full overflow-hidden rounded-sm ${
                img.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'
              }`}
            >
              <img
                src={img.src || '/placeholder.svg'}
                alt={img.alt}
                className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gold/0 transition-colors duration-500 group-hover:bg-gold/15" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="rounded-full border border-background/80 px-5 py-2 text-[0.6rem] uppercase tracking-[0.3em] text-background backdrop-blur-sm">
                  View
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#1a1d1a]/92 p-6 backdrop-blur-sm"
          >
            <button
              onClick={close}
              className="absolute right-5 top-5 text-background/80 transition-colors hover:text-gold"
              aria-label="Close gallery"
            >
              <X className="size-7" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="absolute left-4 text-background/70 transition-colors hover:text-gold sm:left-8"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-9" />
            </button>
            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              src={gallery[active].src || '/placeholder.svg'}
              alt={gallery[active].alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[90vw] rounded-sm object-contain shadow-2xl"
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="absolute right-4 text-background/70 transition-colors hover:text-gold sm:right-8"
              aria-label="Next image"
            >
              <ChevronRight className="size-9" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
