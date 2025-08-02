"use client"

import { useState } from "react"
import BirthdayGate from "../birthday-gate"
import BirthdaySection from "../birthday-section"
import LoveTimeline from "../timeline"
import MemoriesSection from "../memories-section"
import HeartsTouchGame from "../hearts-touch-game"
import PartyPopperEffect from "../party-popper-effect"

export default function Page() {
  const [unlocked, setUnlocked] = useState(false)
  const [showPopper, setShowPopper] = useState(false)

  const handleUnlock = () => {
    setUnlocked(true)
    setShowPopper(true)
  }

  const handlePopperComplete = () => {
    setShowPopper(false)
  }

  return (
    <div>
      {!unlocked ? (
        <BirthdayGate onUnlock={handleUnlock} />
      ) : (
        <>
          {showPopper && <PartyPopperEffect onComplete={handlePopperComplete} />}
          <BirthdaySection />
          <LoveTimeline />
          <MemoriesSection />
          <HeartsTouchGame />
        </>
      )}
    </div>
  )
}
