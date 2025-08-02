"use client"

import { useState } from "react"
import { Lock, Unlock, Gift, Sparkles, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const FloatingSparkles = () => {
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

export default function BirthdayGate({ onUnlock }) {
  const [step, setStep] = useState("locked") // 'locked', 'surprise', 'unlocked'
  const [answer, setAnswer] = useState("")
  const [error, setError] = useState("")

  const correctAnswer = "23-01-2021" // Our first date from timeline.jsx

  const handleAnswerSubmit = () => {
    if (answer.trim() === correctAnswer) {
      setError("")
      setStep("surprise") // Directly go to surprise modal
    } else {
      setError("Oops! That's not quite right. Try again!")
    }
  }

  const handleEnterCelebration = () => {
    setStep("unlocked")
    onUnlock() // Call the parent's unlock function
  }

  // Render different screens based on the step
  if (step === "unlocked") {
    return null // Component will be unmounted, and parent will render main content
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 relative flex items-center justify-center overflow-hidden">
      <FloatingSparkles />

      {step === "locked" && (
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-stone-200 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-100 rounded-full mb-6 border border-rose-200 animate-pulse">
            <Lock className="w-10 h-10 text-rose-500" />
          </div>
          <h2 className="text-3xl font-bold text-stone-800 mb-4">Unlock Your Birthday Surprise!</h2>
          <p className="text-lg text-stone-600 mb-6">
            To reveal your special birthday wish, answer this memory question:
          </p>
          <p className="text-xl font-semibold text-stone-700 mb-6">When was our first date? (DD-MM-YYYY)</p>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="e.g., 23-01-2021"
              className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-400 text-center text-stone-700"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              onClick={handleAnswerSubmit}
              className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              <Unlock className="w-4 h-4 mr-2" />
              Unlock
            </Button>
          </div>
        </div>
      )}

      {step === "surprise" && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl transform scale-95 animate-scale-in">
            <Button
              onClick={handleEnterCelebration} // Close and proceed
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full animate-spin-slow">
                <Gift className="w-10 h-10 text-amber-500" />
              </div>
              <h3 className="text-3xl font-bold text-stone-800">My Dearest Annu,</h3>
              <p className="text-xl text-stone-600 italic leading-relaxed">
                "You are the most beautiful chapter in my life's story. Every day with you is a blessing, and I promise
                to cherish, love, and support you always. Happy Birthday, my everything!"
              </p>
              <p className="text-stone-700 font-medium text-lg">- Forever Yours, Akashee ❤️</p>
              <Button
                onClick={handleEnterCelebration}
                className="bg-stone-800 hover:bg-stone-900 text-white px-8 py-4 text-lg rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Enter Main Celebration
              </Button>
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
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </div>
  )
}
