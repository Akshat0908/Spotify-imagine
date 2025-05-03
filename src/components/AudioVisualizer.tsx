
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface AudioVisualizerProps {
  isPlaying: boolean;
}

const AudioVisualizer = ({ isPlaying }: AudioVisualizerProps) => {
  const [bars, setBars] = useState<number[]>([]);
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    const generateBars = () => {
      // Generate random bar heights
      const newBars = Array.from({ length: 40 }, () => {
        return isPlaying ? Math.random() * 0.8 + 0.2 : 0.05; // Values between 0.2 and 1 when playing, very low when not
      });
      setBars(newBars);
      
      if (isPlaying) {
        animationRef.current = requestAnimationFrame(generateBars);
      }
    };
    
    if (isPlaying) {
      generateBars();
    } else {
      // Generate a flat line when not playing
      const newBars = Array.from({ length: 40 }, () => 0.05);
      setBars(newBars);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div className="flex items-end justify-center h-full">
      {bars.map((height, index) => (
        <motion.div
          key={index}
          className="w-1 md:w-2 mx-[1px] md:mx-1 bg-spotify-green rounded-t-md"
          initial={{ height: "5%" }}
          animate={{ 
            height: `${height * 100}%`,
            opacity: isPlaying ? 0.7 : 0.3
          }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 15, 
            mass: 1
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;
