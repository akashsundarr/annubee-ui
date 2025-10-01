"use client"

import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"

type ImageItem = {
  id: string
  src: string
  alt?: string
}

type GalleryStackProps = {
  images: ImageItem[]
  className?: string
  maxVisible?: number
  aspectRatio?: string // e.g. "3/4", "4/3", "1/1"
}

export function GalleryStack({ images, className, maxVisible = 5, aspectRatio = "3/4" }: GalleryStackProps) {
  const [items, setItems] = useState<ImageItem[]>(images)
  const [flyingId, setFlyingId] = useState<string | null>(null)

  useEffect(() => {
    setItems(images)
  }, [images])

  const visible = useMemo(() => items.slice(0, Math.min(items.length, maxVisible)), [items, maxVisible])

  const canCycle = items.length > 1 && !flyingId
  const top = items[0]

  function handleCycle() {
    if (!canCycle || !top) return
    setFlyingId(top.id)
    const durationMs = 350
    window.setTimeout(() => {
      setItems((prev) => {
        if (prev.length <= 1) return prev
        const [first, ...rest] = prev
        return [...rest, first]
      })
      setFlyingId(null)
    }, durationMs)
  }

  return (
    <div className={cn("w-full", className)}>
      <div
        className="relative mx-auto w-full max-w-sm"
        style={{ aspectRatio: aspectRatio }}
        role="region"
        aria-label="Stacked photo gallery"
      >
        {visible.map((item, index) => {
          const isTop = index === 0
          const z = visible.length - index
          const isFlying = flyingId === item.id
          const isNewTop = index === 0 && flyingId !== null;

          const scale = 1 - index * 0.05
          const translateY = index * 8
          const rotation = isTop ? 0 : (index % 2 === 0 ? -1 : 1) * (index * 3)
          const translateX = isTop ? 0 : (index % 2 === 0 ? -1 : 1) * (index * 6)

          return (
            <button
              key={item.id}
              type="button"
              onClick={isTop ? handleCycle : undefined}
              aria-label={isTop ? "Show next photo" : undefined}
              className={cn(
                "absolute inset-0 origin-center rounded-xl overflow-hidden shadow-lg",
                "will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                isFlying
                  ? "animate-fly-out"
                  : "transition-transform duration-300 ease-out",
                isNewTop && "animate-new-top",
              )}
              style={{
                zIndex: z,
                transform: isFlying || isNewTop ? undefined : `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotate(${rotation}deg)`,
                pointerEvents: isTop ? "auto" : "none",
              }}
            >
              <img
                src={item.src || "/placeholder.svg"}
                alt={item.alt ?? "Gallery image"}
                className="h-full w-full object-cover"
                // ✅ FIX: Removed TypeScript syntax for pure JavaScript
                onError={(e) => {
                  e.currentTarget.src = "/stacked-gallery-placeholder.jpg"
                }}
              />
            </button>
          )
        })}

        {items.length === 0 && (
          <div className="absolute inset-0 grid place-items-center rounded-xl border border-border text-muted-foreground">
            No images
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        {/* You can add back the text if you want */}
      </div>

      <style jsx>{`
        @keyframes fly-out {
          0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
          50% { transform: translateY(-80px) scale(1.05) rotate(6deg); opacity: 0.8; }
          100% { transform: translateY(-150px) scale(1) rotate(8deg); opacity: 0; }
        }
        
        @keyframes new-top {
          from {
            transform: translateX(6px) translateY(8px) scale(0.95) rotate(3deg);
          }
          to {
            transform: translateX(0px) translateY(0px) scale(1) rotate(0deg);
          }
        }

        .animate-fly-out { animation: fly-out 0.35s ease-out forwards; }
        .animate-new-top { animation: new-top 0.35s ease-out forwards; }
      `}</style>
    </div>
  )
}