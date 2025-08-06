"use client";
import confetti from "canvas-confetti";

export default function ConfettiBtn() {
  const handleClick = () => {
    // Play click sound
    const audio = new Audio('/click.mp3');
    audio.play().catch(error => {
      console.log('Audio play failed:', error);
    });

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  return (
    <button
      onClick={handleClick}
      className="border border-gray-400/40 text-white hover:text-purple-900 px-4 py-2 rounded-xl text-sm font-semibold bg-purple-950 hover:bg-white transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
    >
        <picture className="w-6 h-6">
                          <source
                            srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f52e/512.webp"
                            type="image/webp"
                          />
                          <img
                            src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f52e/512.gif"
                            alt="🤙"
                            width={32}
                            height={32}
                          />
                        </picture>
      <span>Don't Click</span>
    </button>

    
  );
}