'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import { EventDetails } from '@/components/wedding/event-details'
import { Footer } from '@/components/wedding/footer'
import { Hero } from '@/components/wedding/hero'
import { Moments } from '@/components/wedding/moments'
import { Nav } from '@/components/wedding/nav'
import { PageLoader } from '@/components/wedding/page-loader'
import { Rsvp } from '@/components/wedding/rsvp'
import { Schedule } from '@/components/wedding/schedule'

type Invitation = {
  token: string
  name: string
  phone: string
  allowedGuests: number
}

export function WeddingHome({ invitation, invitationState }: { invitation: Invitation | null; invitationState: 'none' | 'invalid' | 'valid' }) {
  const [invitationOpened, setInvitationOpened] = useState(false)

  const handleInvitationOpened = () => {
    setInvitationOpened(true)

    if (invitationState === 'valid') {
      window.requestAnimationFrame(() => {
        document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }

  return (
    <>
      <PageLoader onComplete={handleInvitationOpened} />
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
          <Rsvp invitation={invitation} invitationState={invitationState} />
          <Footer />
        </main>
      </motion.div>
    </>
  )
}
