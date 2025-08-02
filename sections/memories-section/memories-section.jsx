"use client"

import { useState } from "react"
import { Plus, Heart, Camera, Leaf, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const BranchingSVG = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 800">
    {/* Main stem */}
    <path
      d="M600 50 Q580 200 620 350 Q640 500 600 650 Q580 750 600 800"
      stroke="rgb(168 162 158)"
      strokeWidth="3"
      fill="none"
      className="opacity-30"
    />

    {/* Left branches */}
    <path
      d="M600 150 Q500 180 400 200 Q350 220 300 250"
      stroke="rgb(168 162 158)"
      strokeWidth="2"
      fill="none"
      className="opacity-25"
    />
    <path
      d="M600 300 Q480 320 380 340 Q320 360 250 380"
      stroke="rgb(168 162 158)"
      strokeWidth="2"
      fill="none"
      className="opacity-25"
    />
    <path
      d="M600 450 Q520 480 450 500 Q400 520 350 550"
      stroke="rgb(168 162 158)"
      strokeWidth="2"
      fill="none"
      className="opacity-25"
    />

    {/* Right branches */}
    <path
      d="M600 200 Q700 230 800 250 Q850 270 900 300"
      stroke="rgb(168 162 158)"
      strokeWidth="2"
      fill="none"
      className="opacity-25"
    />
    <path
      d="M600 350 Q720 380 820 400 Q880 420 950 450"
      stroke="rgb(168 162 158)"
      strokeWidth="2"
      fill="none"
      className="opacity-25"
    />
    <path
      d="M600 500 Q680 530 750 550 Q800 570 850 600"
      stroke="rgb(168 162 158)"
      strokeWidth="2"
      fill="none"
      className="opacity-25"
    />

    {/* Small twigs */}
    <path d="M300 250 Q280 240 260 235" stroke="rgb(168 162 158)" strokeWidth="1" fill="none" className="opacity-20" />
    <path d="M250 380 Q230 370 210 365" stroke="rgb(168 162 158)" strokeWidth="1" fill="none" className="opacity-20" />
    <path d="M900 300 Q920 290 940 285" stroke="rgb(168 162 158)" strokeWidth="1" fill="none" className="opacity-20" />
    <path d="M950 450 Q970 440 990 435" stroke="rgb(168 162 158)" strokeWidth="1" fill="none" className="opacity-20" />
  </svg>
)

const LeafDecorations = () => {
  const leaves = [
    { x: 280, y: 240, rotation: 45, size: "small", color: "text-green-400" },
    { x: 230, y: 370, rotation: -30, size: "medium", color: "text-emerald-400" },
    { x: 920, y: 290, rotation: 120, size: "small", color: "text-green-500" },
    { x: 970, y: 440, rotation: -60, size: "medium", color: "text-emerald-500" },
    { x: 380, y: 330, rotation: 90, size: "small", color: "text-green-400" },
    { x: 820, y: 390, rotation: -45, size: "small", color: "text-emerald-400" },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none">
      {leaves.map((leaf, index) => (
        <div
          key={index}
          className="absolute animate-pulse"
          style={{
            left: `${(leaf.x / 1200) * 100}%`,
            top: `${(leaf.y / 800) * 100}%`,
            transform: `rotate(${leaf.rotation}deg)`,
            animationDelay: `${index * 0.5}s`,
            animationDuration: "3s",
          }}
        >
          <Leaf className={`${leaf.size === "small" ? "w-4 h-4" : "w-6 h-6"} ${leaf.color} opacity-60`} />
        </div>
      ))}
    </div>
  )
}

export default function MemoriesSection() {
  const [memories, setMemories] = useState([
    {
      id: "1",
      image: "/placeholder.svg?height=300&width=300&text=First+Adventure",
      title: "First Adventure",
      date: "March 2021",
      description: "Our first trip together to the mountains",
    },
    {
      id: "2",
      image: "/placeholder.svg?height=300&width=300&text=Cozy+Evening",
      title: "Cozy Evening",
      date: "June 2021",
      description: "Movie night with homemade popcorn",
    },
    {
      id: "3",
      image: "/placeholder.svg?height=300&width=300&text=Beach+Day",
      title: "Beach Day",
      date: "August 2021",
      description: "Sunset walks and sandcastles",
    },
    {
      id: "4",
      image: "/placeholder.svg?height=300&width=300&text=Birthday+Surprise",
      title: "Birthday Surprise",
      date: "December 2021",
      description: "The best surprise party ever",
    },
    {
      id: "5",
      image: "/placeholder.svg?height=300&width=300&text=New+Year",
      title: "New Year",
      date: "January 2022",
      description: "Midnight kiss under the stars",
    },
    {
      id: "6",
      image: "/placeholder.svg?height=300&width=300&text=Spring+Picnic",
      title: "Spring Picnic",
      date: "April 2022",
      description: "Cherry blossoms and laughter",
    },
  ])

  const [selectedMemory, setSelectedMemory] = useState(null)

  const addNewMemory = () => {
    const newMemory = {
      id: Date.now().toString(),
      image: "/placeholder.svg?height=300&width=300&text=New+Memory",
      title: "New Memory",
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      description: "Another beautiful moment captured...",
    }
    setMemories([...memories, newMemory])
  }

  const getPhotoPosition = (index) => {
    const positions = [
      { x: 15, y: 20, size: "large" },
      { x: 75, y: 15, size: "medium" },
      { x: 25, y: 55, size: "medium" },
      { x: 70, y: 50, size: "small" },
      { x: 10, y: 75, size: "small" },
      { x: 85, y: 75, size: "large" },
      { x: 45, y: 35, size: "medium" },
      { x: 60, y: 80, size: "small" },
      { x: 35, y: 10, size: "small" },
      { x: 80, y: 25, size: "medium" },
    ]
    return positions[index % positions.length]
  }

  const getSizeClasses = (size) => {
    switch (size) {
      case "large":
        return "w-48 h-48 md:w-56 md:h-56"
      case "medium":
        return "w-36 h-36 md:w-40 md:h-40"
      case "small":
        return "w-28 h-28 md:w-32 md:h-32"
      default:
        return "w-36 h-36 md:w-40 md:h-40"
    }
  }

  return (
    <section className="w-full bg-gradient-to-b from-stone-50 to-stone-100 py-20 px-4 relative overflow-hidden min-h-screen">
      {/* Background branching pattern */}
      <BranchingSVG />
      <LeafDecorations />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-stone-200 px-4 py-2 rounded-full mb-6">
            <Camera className="w-5 h-5 text-stone-600" />
            <span className="text-sm font-medium text-stone-700">Memory Garden</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">Our Beautiful Memories</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-8">
            Like leaves on the tree of time, each memory holds its own special place in our story. Watch our garden of
            moments grow and flourish.
          </p>

          <Button
            onClick={addNewMemory}
            className="bg-stone-700 hover:bg-stone-800 text-white px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Memory
          </Button>
        </div>

        {/* Memories Collage */}
        <div className="relative h-[600px] md:h-[800px] bg-stone-50/50 rounded-3xl border border-stone-200 overflow-hidden">
          {memories.map((memory, index) => {
            const position = getPhotoPosition(index)
            const sizeClasses = getSizeClasses(position.size)

            return (
              <div
                key={memory.id}
                className={`absolute cursor-pointer group transition-all duration-300 hover:z-20 ${sizeClasses}`}
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: `translate(-50%, -50%) rotate(${((index % 4) - 2) * 5}deg)`,
                }}
                onClick={() => setSelectedMemory(memory)}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 bg-white p-2">
                  <img
                    src={memory.image || "/placeholder.svg"}
                    alt={memory.title}
                    className="w-full h-full object-cover rounded-xl"
                  />

                  {/* Polaroid-style bottom */}
                  <div className="absolute bottom-2 left-2 right-2 bg-white p-2 rounded-lg shadow-sm">
                    <p className="text-xs font-medium text-stone-800 truncate">{memory.title}</p>
                    <p className="text-xs text-stone-500">{memory.date}</p>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Memory Detail Modal */}
      {selectedMemory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <Button
              onClick={() => setSelectedMemory(null)}
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="space-y-6">
              <img
                src={selectedMemory.image || "/placeholder.svg"}
                alt={selectedMemory.title}
                className="w-full h-64 object-cover rounded-2xl"
              />

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-rose-400 fill-current" />
                  <h3 className="text-2xl font-bold text-stone-800">{selectedMemory.title}</h3>
                </div>

                <p className="text-stone-500 font-medium">{selectedMemory.date}</p>
                <p className="text-stone-600 leading-relaxed">{selectedMemory.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
