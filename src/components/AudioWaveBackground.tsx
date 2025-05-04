
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AudioWaveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Wave properties
    const waves = [
      { color: 'rgba(29, 185, 84, 0.3)', amplitude: 50, frequency: 0.01, speed: 0.02 },
      { color: 'rgba(29, 185, 84, 0.2)', amplitude: 30, frequency: 0.02, speed: 0.03 },
      { color: 'rgba(255, 255, 255, 0.1)', amplitude: 20, frequency: 0.03, speed: 0.01 },
    ];
    
    let animationFrame: number;
    let time = 0;
    
    // Animation loop
    const animate = () => {
      time += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      waves.forEach(wave => {
        drawWave(
          ctx,
          time * wave.speed,
          wave.amplitude,
          wave.frequency,
          wave.color
        );
      });
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  // Draw a single wave
  const drawWave = (
    ctx: CanvasRenderingContext2D,
    time: number,
    amplitude: number,
    frequency: number,
    color: string
  ) => {
    ctx.beginPath();
    ctx.moveTo(0, ctx.canvas.height / 2);
    
    for (let x = 0; x < ctx.canvas.width; x++) {
      const y = Math.sin(x * frequency + time) * amplitude + ctx.canvas.height / 2;
      ctx.lineTo(x, y);
    }
    
    ctx.lineTo(ctx.canvas.width, ctx.canvas.height);
    ctx.lineTo(0, ctx.canvas.height);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  };
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};

export default AudioWaveBackground;
