"use client"

import { useState } from "react"
import BirthdayGate from "@/features/birthday-gate/birthday-gate"
import BirthdaySection from "@/sections/birthday-section/birthday-section"
import LoveTimeline from "@/sections/love-timeline/love-timeline"
import MemoriesSection from "@/sections/memories-section/memories-section"
import HeartsTouchGame from "@/sections/hearts-touch-game/hearts-touch-game"
import PartyPopperEffect from "@/features/party-popper-effect/party-popper-effect"

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
