"use client"

import { useState, useEffect, useRef } from "react"
import { Heart, Plus, Home, Edit3, Star, Sparkles, Coffee, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const FloatingStickers = () => {
  const stickers = [
    { icon: Heart, color: "text-rose-400", size: "w-6 h-6", position: "top-20 left-10", delay: "0s" },
    { icon: Star, color: "text-amber-400", size: "w-5 h-5", position: "top-40 right-20", delay: "1s" },
    { icon: Sparkles, color: "text-purple-400", size: "w-4 h-4", position: "top-60 left-1/4", delay: "2s" },
    { icon: Coffee, color: "text-orange-400", size: "w-5 h-5", position: "bottom-40 right-10", delay: "0.5s" },
    { icon: Camera, color: "text-blue-400", size: "w-6 h-6", position: "bottom-60 left-16", delay: "1.5s" },
    { icon: Heart, color: "text-pink-400", size: "w-4 h-4", position: "top-1/3 right-1/4", delay: "2.5s" },
    { icon: Star, color: "text-yellow-400", size: "w-5 h-5", position: "bottom-1/3 left-1/3", delay: "3s" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {stickers.map((sticker, index) => {
        const Icon = sticker.icon
        return (
          <div
            key={index}
            className={`absolute ${sticker.position} opacity-20 hover:opacity-40 transition-opacity animate-bounce`}
            style={{
              animationDelay: sticker.delay,
              animationDuration: "3s",
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

export default function LoveTimeline() {
  const [timelineItems, setTimelineItems] = useState([
    {
      id: "1",
      title: "First Date",
      date: "23-1-2021",
      description:
        "The day our beautiful journey began. Coffee turned into hours of conversation, and I knew you were special.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      title: "First Kiss",
      date: "15-2-2021",
      description: "Under the starlit sky, time stood still as our hearts found their rhythm together.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "3",
      title: "Moving In Together",
      date: "10-8-2021",
      description: "Creating our first home together, where every corner holds a memory and every day brings new joy.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ])

  const [visibleItems, setVisibleItems] = useState(new Set())
  const observerRef = useRef(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.2 },
    )

    const timelineElements = document.querySelectorAll(".timeline-item")
    timelineElements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [timelineItems])

  const addNewStory = () => {
    const newItem = {
      id: Date.now().toString(),
      title: "New Memory",
      date: new Date().toLocaleDateString("en-GB"),
      description: "Another beautiful moment in our journey together...",
    }
    setTimelineItems([...timelineItems, newItem])
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 relative">
      <FloatingStickers />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in opacity-0 animate-delay-300 animate-fill-forwards">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-200 rounded-2xl mb-6 border border-stone-300 transform transition-transform hover:scale-105">
            <Heart className="w-8 h-8 text-stone-600 fill-current animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">Our Love Timeline</h1>
          <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
            Create your beautiful journey from the beginning to forever
          </p>
          <Button
            onClick={addNewStory}
            className="bg-stone-700 hover:bg-stone-800 text-white px-6 py-3 rounded-xl border border-stone-800 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Our Story
          </Button>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-stone-300 h-full"></div>

          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <div
                key={item.id}
                id={item.id}
                className={`timeline-item flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                } transition-all duration-700 ${
                  visibleItems.has(item.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                {/* Content Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 bg-white border border-stone-200 rounded-2xl transform hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Heart className="w-5 h-5 text-stone-500 fill-current" />
                          <h3 className="text-xl font-semibold text-stone-800">{item.title}</h3>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-stone-400 hover:text-stone-600"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-stone-500 font-medium mb-3 bg-stone-100 px-3 py-1 rounded-lg inline-block">
                        {item.date}
                      </p>
                      {item.image && (
                        <div className="mb-4 overflow-hidden rounded-xl border border-stone-200">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      )}
                      <p className="text-stone-600 leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline dot */}
                <div className="relative z-10">
                  <div className="w-4 h-4 bg-stone-400 rounded-full border-4 border-white shadow-sm animate-pulse"></div>
                </div>

                {/* Spacer */}
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-stone-200 rounded-2xl mb-6 border border-stone-300 transform transition-transform hover:scale-105">
            <Heart className="w-6 h-6 text-stone-600 fill-current animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-stone-800 mb-6">Here's to forever, just you and me</h2>
          <blockquote className="text-lg text-stone-600 italic max-w-3xl mx-auto mb-8 leading-relaxed bg-stone-100 p-6 rounded-2xl border border-stone-200 transform transition-transform hover:scale-105">
            "Every day with you is a new adventure, every moment a new memory to treasure. Thank you for being my
            partner, my best friend, and my greatest love. Happy Birthday, my beautiful annuBee!"
          </blockquote>
          <p className="text-stone-700 font-medium mb-8">Forever yours, akashee</p>

          <Button
            variant="outline"
            className="border-stone-300 text-stone-700 hover:bg-stone-100 px-6 py-3 rounded-xl transition-all duration-200 bg-transparent transform hover:scale-105"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Beginning
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animate-fill-forwards {
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  )
}
