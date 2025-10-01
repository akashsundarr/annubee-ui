"use client";

import { useState, useEffect, useRef } from 'react';

export default function MusicPlaylist({ playlist }) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  // This effect handles the initial autoplay attempt
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Autoplay blocked. Waiting for user interaction.");
        const playOnInteraction = () => {
          audio.play().catch(e => console.error("Could not play on interaction:", e));
          document.removeEventListener('click', playOnInteraction);
        };
        document.addEventListener('click', playOnInteraction);
      });
    }
  }, []); // Runs only once on component mount

  // This function is called when a song finishes playing
  const handleSongEnd = () => {
    // Move to the next song, or loop back to the first song if at the end
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };
  
  // This effect plays the new song whenever the index changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // The `src` is updated by the key change, so we just need to play
      audio.play().catch(error => {
        // This might happen if the user navigates away and back quickly
        console.log("Playback failed for the new song:", error);
      });
    }
  }, [currentSongIndex]); // Runs every time the song index changes

  return (
    <audio
      ref={audioRef}
      onEnded={handleSongEnd}
      key={currentSongIndex} // IMPORTANT: Changing the key re-mounts the element
    >
      <source src={playlist[currentSongIndex]} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}