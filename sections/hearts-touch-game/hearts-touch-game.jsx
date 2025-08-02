"use client"

import { useState, useEffect } from "react" // Import useEffect
import { Heart, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const FloatingSparkles = () => {
  const [isClient, setIsClient] = useState(false) // New state for client-side rendering

  useEffect(() => {
    setIsClient(true) // Set to true only on the client after mount
  }, [])

  if (!isClient) {
    return null // Don't render on the server
  }

  const sparkles = [
    { x: 10, y: 10, delay: "0s" },
    { x: 90, y: 20, delay: "1s" },
    { x: 30, y: 80, delay: "2s" },
    { x: 70, y: 90, delay: "0.5s" },
    { x: 50, y: 50, delay: "1.5s" },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((sparkle, index) => (
        <div
          key={index}
          className="absolute opacity-40 animate-pulse"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: sparkle.delay,
            animationDuration: "3s",
            animationIterationCount: "infinite",
          }}
        >
          <Sparkles className="w-6 h-6 text-pink-300" />
        </div>
      ))}
    </div>
  )
}

export default function HeartsTouchGame() {
  const [clickedHearts, setClickedHearts] = useState(new Set())
  const [currentThought, setCurrentThought] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const thoughts = [
    "Your infectious laugh brightens my darkest days, Annu.",
    "I love how you always find beauty in the simplest things.",
    "Your kindness and empathy inspire me every single day.",
    "I adore your adventurous spirit and how you push me to try new things.",
    "The way you care for others, especially me, melts my heart.",
    "I love your unwavering support and belief in me.",
    "Your intelligence and wit always keep me on my toes.",
    "I cherish our quiet moments, just being together.",
    "Your smile is my favorite thing in the world, Annu.",
    "I love your strength and resilience in facing challenges.",
    "You make every ordinary moment feel extraordinary.",
    "I love how you always know how to make me feel better.",
    "Your passion for life is truly captivating.",
    "I love the comfort and peace I feel when I'm with you.",
    "You're my best friend, my confidante, and my greatest love.",
    "I love your unique perspective on the world.",
    "The way you light up a room just by being yourself.",
    "I love your honesty and how you always speak your mind.",
    "You've taught me so much about love and life.",
    "I love you more than words can say, my Annu.",
  ]

  const heartPositions = [
    { x: 15, y: 20 },
    { x: 80, y: 10 },
    { x: 30, y: 40 },
    { x: 65, y: 30 },
    { x: 10, y: 60 },
    { x: 90, y: 50 },
    { x: 45, y: 70 },
    { x: 75, y: 80 },
    { x: 20, y: 90 },
    { x: 50, y: 10 },
    { x: 85, y: 70 },
    { x: 5, y: 30 },
    { x: 40, y: 5 },
    { x: 95, y: 40 },
    { x: 25, y: 75 },
    { x: 60, y: 95 },
    { x: 70, y: 5 },
    { x: 10, y: 85 },
    { x: 80, y: 95 },
    { x: 55, y: 25 },
  ]

  const handleHeartClick = (index) => {
    if (!clickedHearts.has(index)) {
      setClickedHearts((prev) => new Set(prev).add(index))
      setCurrentThought(thoughts[index % thoughts.length])
      setShowModal(true)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setCurrentThought(null)
  }

  return (
    <section className="w-full bg-gradient-to-b from-stone-100 to-stone-50 py-20 px-4 relative overflow-hidden min-h-[600px]">
      <FloatingSparkles />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-stone-200 px-4 py-2 rounded-full mb-6">
            <Heart className="w-5 h-5 text-rose-600 fill-current" />
            <span className="text-sm font-medium text-stone-700">A Heart's Touch</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">Why I Love You, Annu</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-8">
            Every beat of my heart holds a reason. Click on a heart to discover a special thought about you.
          </p>
        </div>

        {/* Hearts Grid */}
        <div className="relative w-full h-[400px] md:h-[500px] bg-stone-50/50 rounded-3xl border border-stone-200 flex items-center justify-center p-8">
          {heartPositions.map((pos, index) => (
            <button
              key={index}
              className={`absolute w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 transform ${
                clickedHearts.has(index)
                  ? "bg-rose-400 scale-90 cursor-default"
                  : "bg-rose-200 hover:bg-rose-300 hover:scale-110 cursor-pointer"
              }`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: `translate(-50%, -50%) rotate(${((index % 4) - 2) * 5}deg)`,
              }}
              onClick={() => handleHeartClick(index)}
              disabled={clickedHearts.has(index)}
            >
              <Heart
                className={`w-6 h-6 md:w-8 md:h-8 ${
                  clickedHearts.has(index) ? "text-white fill-current" : "text-rose-600"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Thought Modal */}
      {showModal && currentThought && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl transform scale-95 animate-scale-in">
            <Button
              onClick={closeModal}
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full">
                <Heart className="w-8 h-8 text-rose-500 fill-current" />
              </div>
              <h3 className="text-2xl font-bold text-stone-800">A Special Thought For You</h3>
              <p className="text-lg text-stone-600 italic leading-relaxed">"{currentThought}"</p>
              <p className="text-stone-700 font-medium">- Forever Yours</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
