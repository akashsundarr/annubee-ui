"use client"

import { useEffect, useState } from "react"

export default function PartyPopperEffect({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)
  const [confettiParticles, setConfettiParticles] = useState([]) // State to store particles

  useEffect(() => {
    // Generate particles only on client mount
    const generatedParticles = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`, // Random vibrant color
      size: `${Math.random() * 8 + 4}px`, // Random size between 4px and 12px
      delay: `${Math.random() * 0.5}s`, // Staggered delay
      duration: `${2 + Math.random() * 1.5}s`, // Random duration
      x: `${Math.random() * 100 - 50}vw`, // Random horizontal spread
      y: `${Math.random() * 100 - 50}vh`, // Random vertical spread
      rotation: `${Math.random() * 720}deg`, // Random initial rotation
    }))
    setConfettiParticles(generatedParticles)

    // Hide the effect after 3.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onComplete) {
        onComplete()
      }
    }, 3500) // Auto-hide after 3.5 seconds

    return () => clearTimeout(timer)
  }, [onComplete]) // Dependency array includes onComplete

  if (!isVisible || confettiParticles.length === 0) {
    // Only render if visible and particles are generated
    return null
  }

  return (
    <div className="fixed inset-0 bg-transparent pointer-events-none z-[100]">
      {confettiParticles.map((particle) => (
        <div
          key={particle.id}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-popper-splash"
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            borderRadius: "50%", // Make them circular
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            "--tw-translate-x": particle.x, // Custom properties for animation
            "--tw-translate-y": particle.y,
            "--tw-rotate": particle.rotation,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes popper-splash {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          10% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) scale(0.5);
          }
        }
        .animate-popper-splash {
          animation-name: popper-splash;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  )
}
