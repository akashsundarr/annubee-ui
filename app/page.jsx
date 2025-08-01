import LoveTimeline from "../timeline"
import BirthdaySection from "../birthday-section"
import MemoriesSection from "../memories-section"
import HeartsTouchGame from "../hearts-touch-game"

export default function Page() {
  return (
    <div>
      <BirthdaySection />
      <LoveTimeline />
      <MemoriesSection />
      <HeartsTouchGame />
    </div>
  )
}
