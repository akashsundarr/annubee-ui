"use client";

import { useState } from "react";
import BirthdayGate from "@/features/birthday-gate/birthday-gate";
import BirthdaySection from "@/sections/birthday-section/birthday-section";
import MemoriesSection from "@/sections/memories-section/memories-section";
import HeartsTouchGame from "@/sections/hearts-touch-game/hearts-touch-game";
import PartyPopperEffect from "@/features/party-popper-effect/party-popper-effect";
import { GalleryStack } from "@/components/gallery-stack";
import MusicPlaylist from "@/components/music-playlist";
import WhatannuGame from "@/sections/what-annu-likes/what-annu-likes";
import Footer from "@/sections/Footer";
import PuzzleGame from "@/sections/PuzzleGame";


const IMAGES = [
  { id: "1", src: "/annu_baby0.jpg", alt: "Photo 1"  },
  { id: "2", src: "/annu_baby1.jpg", alt: "Photo 2"  },
  { id: "4", src: "/annu_baby03.jpg", alt: "Photo 4" },
  { id: "7", src: "/annu_baby07.jpg", alt: "Photo 7" },
  { id: "8", src: "/annu_baby08.jpg", alt: "Photo 8" },
  { id: "9", src: "/annu_baby09.jpg", alt: "Photo 9" },
  { id: "10", src: "/annu_baby10.jpg", alt: "Photo 10" },
  { id: "11", src: "/annu_baby11.jpg", alt: "Photo 11" },
  { id: "12", src: "/annu_baby12.jpg", alt: "Photo 12" },
  { id: "13", src: "/annu_baby13.jpg", alt: "Photo 13" },
  { id: "14", src: "/annu_baby14.jpg", alt: "Photo 14" },
  { id: "15", src: "/annu_baby15.jpg", alt: "Photo 15" },
  { id: "16", src: "/annu_baby16.jpg", alt: "Photo 16" },
  { id: "17", src: "/annu_baby17.jpg", alt: "Photo 17" },
  { id: "18", src: "/annu_baby18.jpg", alt: "Photo 18" },
  { id: "19", src: "/annu_baby19.jpg", alt: "Photo 19" },
  { id: "20", src: "/annu_baby20.jpg", alt: "Photo 20" },
  { id: "21", src: "/annu_baby21.jpg", alt: "Photo 21" },
  { id: "22", src: "/annu_baby22.jpg", alt: "Photo 22" },
  { id: "23", src: "/annu_baby23.jpg", alt: "Photo 23" },
];
export default function Page() {
  const [unlocked, setUnlocked] = useState(false);
  const [showPopper, setShowPopper] = useState(false);

  const handleUnlock = () => {
    setUnlocked(true);
    setShowPopper(true);
  };

  const handlePopperComplete = () => {
    setShowPopper(false);
  };

 
  const myPlaylist = [
    // "/bday_song.m4a"
    // "/alli-i.mp3"
    "no_sound.mp3",
    "/main_song.mp3",
    // Add as many songs as you want
  ];

  return (
    <div>
      {!unlocked ? (
        <BirthdayGate onUnlock={handleUnlock} />
      ) : (
        <>
          {showPopper && (
            <PartyPopperEffect onComplete={handlePopperComplete} />
            
          )}
          <MusicPlaylist playlist={myPlaylist} />
          <BirthdaySection />
          
          <main className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-3xl">
              <header className="mb-8 text-center">
                <h1 className="text-3xl font-semibold text-balance">
                  Annu's Gallery
                </h1>
                <p className="text-muted-foreground mt-2">
                  kunj annu to valya annuu!!!
                </p>
              </header>

              <GalleryStack images={IMAGES} className="mx-auto" />
            </div>
          </main>
          <MemoriesSection />
          <HeartsTouchGame />
          <WhatannuGame />
          <PuzzleGame />
          <Footer/>
        </>
      )}
    </div>
  );
}
