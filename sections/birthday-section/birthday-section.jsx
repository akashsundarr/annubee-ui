"use client"

import { useState, useEffect } from "react" // Import useEffect
import { Heart, Gift, Sparkles, Cake } from "lucide-react"
import { Button } from "@/components/ui/button"

const FloatingBirthdayStickers = () => {
  const [isClient, setIsClient] = useState(false) // New state for client-side rendering

  useEffect(() => {
    setIsClient(true) // Set to true only on the client after mount
  }, [])

  if (!isClient) {
    return null // Don't render on the server
  }

  const stickers = [
    { icon: Gift, color: "text-pink-400", size: "w-5 h-5", position: "top-10 left-20", delay: "0s" },
    { icon: Cake, color: "text-orange-400", size: "w-6 h-6", position: "top-20 right-32", delay: "1s" },
    { icon: Sparkles, color: "text-purple-400", size: "w-4 h-4", position: "bottom-16 left-16", delay: "2s" },
    { icon: Heart, color: "text-rose-400", size: "w-5 h-5", position: "bottom-20 right-20", delay: "1.5s" },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stickers.map((sticker, index) => {
        const Icon = sticker.icon
        return (
          <div
            key={index}
            className={`absolute ${sticker.position} opacity-30 animate-bounce`}
            style={{
              animationDelay: sticker.delay,
              animationDuration: "2.5s",
              animationIterationCount: "infinite",
            }}
          >
            <Icon className={`${sticker.size} ${sticker.color}`} />
          </div>
        )
      })}
    </div>
  )
}

export default function BirthdaySection() {
  const [isWished, setIsWished] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleWishClick = () => {
    setIsWished(true)
    setShowConfetti(true)

    // Hide confetti after animation
    setTimeout(() => {
      setShowConfetti(false)
    }, 3000)
  }

  return (
    <section className="w-full bg-stone-100 py-20 px-4 relative overflow-hidden">
      <FloatingBirthdayStickers />

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: "1.5s",
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-stone-200 px-4 py-2 rounded-full">
                <Cake className="w-5 h-5 text-stone-600" />
                <span className="text-sm font-medium text-stone-700">Special Day</span>
              </div>

              <h2 className="text-5xl lg:text-6xl font-bold text-stone-800 leading-tight">
                Happy 20th
                <br />
                <span className="text-stone-600">Birthday!</span>
              </h2>

              <p className="text-lg text-stone-600 leading-relaxed max-w-lg">
                Today marks another beautiful year of your amazing journey. Twenty years of spreading joy, creating
                memories, and being the incredible person you are. Here's to celebrating you and all the wonderful
                moments yet to come.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleWishClick}
                disabled={isWished}
                className={`px-8 py-4 text-lg font-medium rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  isWished ? "bg-green-600 hover:bg-green-700 text-white" : "bg-stone-800 hover:bg-stone-900 text-white"
                }`}
              >
                {isWished ? (
                  <>
                    <Heart className="w-5 h-5 mr-2 fill-current" />
                    Wished! 💝
                  </>
                ) : (
                  <>
                    <Gift className="w-5 h-5 mr-2" />
                    Send Birthday Wish
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                className="px-8 py-4 text-lg font-medium rounded-2xl border-stone-300 text-stone-700 hover:bg-stone-200 transition-all duration-300 bg-transparent"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                View Memories
              </Button>
            </div>

            {isWished && (
              <div className="bg-stone-200 p-6 rounded-2xl border border-stone-300 animate-fade-in">
                <p className="text-stone-700 italic">
                  "Your birthday wish has been sent with love! 🎉 May this new year bring you endless happiness, amazing
                  adventures, and all your dreams coming true. You deserve all the beautiful things life has to offer!"
                </p>
                <p className="text-stone-600 text-sm mt-2 font-medium">- With love, from your timeline ❤️</p>
              </div>
            )}
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-stone-200 to-stone-300 rounded-3xl p-12 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-6 right-6 w-16 h-16 bg-stone-400 rounded-full opacity-20"></div>
              <div className="absolute bottom-8 left-8 w-12 h-12 bg-stone-400 rounded-full opacity-30"></div>
              <div className="absolute top-1/2 left-6 w-8 h-8 bg-stone-400 rounded-full opacity-25"></div>

              {/* Main Content */}
              <div className="relative z-10 text-center space-y-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg">
                  <span className="text-4xl">🎂</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-stone-800">20 Years</h3>
                  <p className="text-stone-600">of amazing memories</p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-2 shadow-sm">
                      <Heart className="w-6 h-6 text-rose-400 fill-current" />
                    </div>
                    <p className="text-xs text-stone-600 font-medium">Love</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-2 shadow-sm">
                      <Gift className="w-6 h-6 text-purple-400" />
                    </div>
                    <p className="text-xs text-stone-600 font-medium">Joy</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-2 shadow-sm">
                      <Sparkles className="w-6 h-6 text-amber-400" />
                    </div>
                    <p className="text-xs text-stone-600 font-medium">Dreams</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
