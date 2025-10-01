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
  // 1
  "njnn down ayit irkumbal oke ennod smsarich enna okee akummm.. ",
  // 2
  "enna oke ahnelum njn kazhinjiteee annu nu ollee aa 1st priority ",
  // 3
  "make me better than i was yesterday.",
  // 4
  "oru vazhak indaya enta side il hn thett engilum ennod njn chytha thett inee enood vazhak idathee smooth ayit enik mansilakii therum ( illee njn pinangii pokueee)",
  // 5
  "pinne enik little things inu valya value indennu padipichuu",
  // 6
  "pinna njn onnum parayathee ellam arinjondd enik vendii chyyunnathu konduu",
  // 7
  "piinne kore kastapettt enne call akum . kandaa veedinta porath mosquito de kadi um kond porath ninnu okkee..",
  // 8
  "Sathyam paranjaal, nthoo angg istavaaaa that's it",
  // 9
  "pinna enik oral induu enna nokkan ennu ulla oru ithu kitti..",
  // 10
  "youre tooo crazyy annu, like too childishh and mature at the same time..",
  // 11
  "pinne nmml oro vazhak undavumbol njn pinangi poyalum nee vannu solve akum if avde nee oru thett chythit illel polum."
];



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
            {/* <span className="text-sm font-medium text-stone-700">A Heart's Touch</span> */}
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">Why I Love You, Annu</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-8">
            ellam nekkikooo.. cringe cringeeeeeee!!!!
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
              {/* <h3 className="text-2xl font-bold text-stone-800">A Special Thought For You</h3> */}
              <p className="text-lg text-stone-600 italic leading-relaxed">"{currentThought}"</p>
              {/* <p className="text-stone-700 font-medium">- Forever Nandu</p> */}
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
