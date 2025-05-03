
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface MoodRingProps {
  size?: number;
}

const MoodRing = ({ size = 50 }: MoodRingProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationId: number;
    let hue = 0;
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update hue
      hue = (hue + 1) % 360;
      
      // Draw several circles with different radii
      for (let i = 0; i < 5; i++) {
        const radius = (size / 2) - (i * 5);
        
        // Create gradient
        const gradient = ctx.createRadialGradient(
          size / 2, size / 2, 0, 
          size / 2, size / 2, radius
        );
        
        // Add color stops with different hues
        gradient.addColorStop(0, `hsla(${(hue + i * 30) % 360}, 100%, 60%, 0.8)`);
        gradient.addColorStop(1, `hsla(${(hue + i * 60) % 360}, 100%, 50%, 0.4)`);
        
        // Draw circle
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [size]);

  return (
    <motion.div 
      className="rounded-full overflow-hidden"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      style={{ width: size, height: size }}
    >
      <canvas 
        ref={canvasRef}
        width={size} 
        height={size}
        className="w-full h-full"
      />
    </motion.div>
  );
};

export default MoodRing;
