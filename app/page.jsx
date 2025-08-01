import LoveTimeline from "../timeline"
import BirthdaySection from "../birthday-section"
import MemoriesSection from "../memories-section"

export default function Page() {
  return (
    <div>
      <BirthdaySection />
      <LoveTimeline />
      <MemoriesSection />
    </div>
  )
}
