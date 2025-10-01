// PuzzleGame.jsx
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { JigsawPuzzle } from 'react-jigsaw-puzzle';
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css';
import { Puzzle, PartyPopper, ArrowRight } from 'lucide-react';
import Confetti from 'react-confetti'; // Import the confetti library

 // Make sure path is correct

// A simple custom hook to get window dimensions
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}


function PuzzleGame() {
  const [isSolved, setIsSolved] = useState(false); // State to track if the puzzle is solved
  const { width, height } = useWindowSize(); // Get window size for confetti

  // When solved, just update the state
 const handleSolved = () => {
  setTimeout(() => {
    setIsSolved(true);
  }, 0); // Delay the state update until after the current render is complete
};

  const resetGame = () => {
    setIsSolved(false);
    // You might need a way to tell the puzzle to reset itself,
    // often by changing a `key` prop on the JigsawPuzzle component.
    // For now, this just closes the modal.
  }

  return (
    <section className="relative w-full bg-stone-50 py-20 px-4">
      {/* 1. Show confetti when the puzzle is solved */}
      {isSolved && <Confetti width={width} height={height} recycle={false} />}

      <div className="max-w-4xl mx-auto text-center">
        {/* ... (Header remains the same) ... */}
        <div className="inline-flex items-center space-x-2 bg-stone-200 px-4 py-2 rounded-full mb-6">
          <Puzzle className="w-5 h-5 text-stone-600" />
          <span className="text-sm font-medium text-stone-700">A Little Game</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
          Solve the Puzzle!
        </h2>

        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-stone-200 max-w-xl mx-auto touch-none">
          <JigsawPuzzle
            imageSrc="/puzzle.jpg"
            rows={3}
            columns={3}
            onSolved={handleSolved}
            className="rounded-lg"
          />
        </div>
      </div>

      {/* 2. Conditionally render the celebration modal */}
      {isSolved && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-6">
              <PartyPopper className="w-8 h-8 text-rose-500" />
            </div>
            <h3 className="text-3xl font-bold text-stone-800 mb-3">You solved it!</h3>
            <p className="text-xl text-stone-600 mb-8">Adipoli! ❤️</p>
            <button
              onClick={resetGame}
              className="inline-flex items-center justify-center w-full px-6 py-3 font-medium text-white bg-stone-700 rounded-lg hover:bg-stone-800 transition-colors"
            >
              Continue Our Journey
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default PuzzleGame;