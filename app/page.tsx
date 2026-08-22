'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import { PageLoader } from '@/components/wedding/page-loader'
import { Nav } from '@/components/wedding/nav'
import { Hero } from '@/components/wedding/hero'
import { EventDetails } from '@/components/wedding/event-details'
import { Moments } from '@/components/wedding/moments'
import { Schedule } from '@/components/wedding/schedule'
import { Rsvp } from '@/components/wedding/rsvp'
import { Footer } from '@/components/wedding/footer'

export default function Page() {
  const [invitationOpened, setInvitationOpened] = useState(false)

  return (
    <>
      <PageLoader onComplete={() => setInvitationOpened(true)} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: invitationOpened ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Nav />
        <main className="relative">
          <Hero />
          <EventDetails />
          <Moments />
          <Schedule />
          <Rsvp />
          <Footer />
        </main>
      </motion.div>
    </>
  )
}
