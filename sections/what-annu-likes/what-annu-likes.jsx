"use client";

import { useState, useEffect } from "react";
import { Flower2, Heart, Sparkles, X, Star } from "lucide-react"; // Added Star icon
import { Button } from "@/components/ui/button";

const FloatingSparkles = () => {
  // This component remains unchanged
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  const sparkles = [
    { x: 10, y: 10, delay: "0s" },
    { x: 90, y: 20, delay: "1s" },
    { x: 30, y: 80, delay: "2s" },
    { x: 70, y: 90, delay: "0.5s" },
    { x: 50, y: 50, delay: "1.5s" },
  ];
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
  );
};

export default function WhatannuGame() {
  const [clickedHearts, setClickedHearts] = useState(new Set());
  const [currentThought, setCurrentThought] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 1. Updated 'thoughts' array to be about things Annu likes
  const whatAnnuLikes = [
    "Annu Likes Chanaa Pachaaa 🟢",
    "Annu loves Chaii ☕",
    "Spiderman Spiderman!!!🦸‍♂️",
    "Shoulder Kisses 😘",
    "Goosipsss!!!",
    "Main sanm - paper vetti snm indakum ennit enik tharum",
    "padam varakkall + music = samadhaanam 🎵 🎨",
    "Annu loves to travel ✈️",
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
  ];

  const handleHeartClick = (index) => {
    if (!clickedHearts.has(index)) {
      setClickedHearts((prev) => new Set(prev).add(index));
      setCurrentThought(whatAnnuLikes[index % whatAnnuLikes.length]); // Use the new array
      setShowModal(true);
    }
  };

  // 2. Special handler for the 'Gundumani' button
  const handleGundumaniClick = () => {
    setCurrentThought("Of course, Njan Thaneeee 😂");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentThought(null);
  };

  return (
    <section className="w-full bg-gradient-to-b from-rose-50 to-pink-100 py-20 px-4 relative overflow-hidden min-h-[600px]">
      <FloatingSparkles />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          {/* 3. New 'Gundumani' emoji button and title */}

          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
            What Annu Likes Most
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-8">
            Ellam set sanm hn dhey njn thanne 1st kedakanu...😂
          </p>
        </div>

        <div className="flex flex-col items-center mb-8">
          <button
            onClick={handleGundumaniClick}
            className="w-32 h-32 rounded-full flex items-center justify-center mb-3 shadow-lg transition-transform transform hover:scale-110 overflow-hidden relative" // Added overflow-hidden and relative
          >
            <img
              src="gundumani-giff.gif" // <-- Replace with the actual path to your image
              alt="Gundumani"
              className="w-full h-full object-cover absolute inset-0" // Image fills the button, covers content
            />
            {/* You can optionally add a subtle overlay or border on hover if you like */}
            <span className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-white/50 transition-all duration-300"></span>
          </button>
          <p className="font-bold text-lg text-stone-700">Gundumani</p>
        </div>

        {/* Hearts Grid - unchanged logic */}
        <div className="relative w-full h-[400px] md:h-[500px] bg-white/50 rounded-3xl border border-rose-200 flex items-center justify-center p-8">
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
                transform: `translate(-50%, -50%) rotate(${
                  ((index % 4) - 2) * 5
                }deg)`,
              }}
              onClick={() => handleHeartClick(index)}
              disabled={clickedHearts.has(index)}
            >
              <Flower2
                className={`w-6 h-6 md:w-8 md:h-8 ${
                  clickedHearts.has(index)
                    ? "text-white fill-pink-400"
                    : "text-pink-600"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Modal - unchanged structure */}
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
              <p className="text-xl text-stone-700 font-medium leading-relaxed">
                "{currentThought}"
              </p>
              {/* <p className="text-stone-700 font-bold">- Your Gundumani</p> */}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scale-in {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
