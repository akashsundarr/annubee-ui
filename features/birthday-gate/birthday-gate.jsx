"use client"

import { useState, useEffect } from "react" // Import useEffect
import { Lock, Unlock, Gift, Sparkles, X, CheckCircle } from "lucide-react"
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
      {sparkles.map((sparkle, index) => {
        const Icon = sparkle.icon || Sparkles // Default to Sparkles if not provided
        return (
          <div
            key={index}
            className={`absolute ${sparkle.position} opacity-40 animate-pulse`}
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDelay: sparkle.delay,
              animationDuration: "3s",
              animationIterationCount: "infinite",
            }}
          >
            <Icon className="w-6 h-6 text-pink-300" />
          </div>
        )
      })}
    </div>
  )
}

export default function BirthdayGate({ onUnlock }) {
  const [step, setStep] = useState("locked") // 'locked', 'surprise', 'unlocked'
  const [answer, setAnswer] = useState("")
  const [error, setError] = useState("")

 // The single correct answer, in lowercase
const correctAnswer = "6.49";

const handleAnswerSubmit = () => {
  // Convert the user's input to lowercase before comparing
  if (answer.trim().toLowerCase() === correctAnswer) {
    handleEnterCelebration();
  } else {
    setError("Oops! That's not quite right. Try again!");
  }
};

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
          <h2 className="text-3xl font-bold text-stone-800 mb-4">Lock hnee</h2>
          
          <p className="text-xl font-semibold text-stone-700 mb-6">There's a special time on the clock that's just for us. Do you know it?</p>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              
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
