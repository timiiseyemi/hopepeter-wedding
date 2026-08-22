'use client'

import { motion } from 'motion/react'

const photos = [
  {
    src: '/couple/WhatsApp%20Image%202026-07-17%20at%2000.51.10.jpeg',
    alt: 'Hope and Peter embracing',
    className: 'col-span-7 row-span-2',
  },
  {
    src: '/couple/WhatsApp%20Image%202026-07-17%20at%2000.51.11.jpeg',
    alt: 'Hope and Peter together',
    className: 'col-span-5',
  },
  {
    src: '/couple/WhatsApp%20Image%202026-07-17%20at%2000.51.10%20(1).jpeg',
    alt: 'A portrait of Hope and Peter',
    className: 'col-span-5',
  },
]

export function Moments() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div className="nigerian-pattern pointer-events-none absolute inset-x-0 top-0 h-2 opacity-70" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-gold">Our celebration</p>
          <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-foreground sm:text-5xl">
            Ordained by God<br />Bound by love. <br />Forever begins here.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            We look forward to celebrating this new chapter with the people who have shaped our story.
          </p>
          <span className="mt-8 block h-px w-20 bg-gold" />
        </motion.div>

        <div className="grid auto-rows-[11rem] grid-cols-12 gap-3 sm:auto-rows-[14rem]">
          {photos.map((photo, index) => (
            <motion.figure
              key={photo.src}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5 }}
              className={`${photo.className} overflow-hidden bg-secondary shadow-[0_18px_40px_rgba(19,45,34,0.14)]`}
            >
              <img src={photo.src} alt={photo.alt} className="size-full object-cover transition-transform duration-700 hover:scale-105" />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
