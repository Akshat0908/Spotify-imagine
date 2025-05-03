import { useEffect, useState } from "react";

interface CursorPoint {
  x: number;
  y: number;
  id: string; // Use string for unique IDs
  opacity: number;
  scale: number;
}

const CursorTrail = () => {
  const [points, setPoints] = useState<CursorPoint[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    // Create cursor trail
    const interval = setInterval(() => {
      setPoints((prevPoints) => {
        // Add new point at current mouse position with unique ID
        const newPoint = {
          x: mousePos.x,
          y: mousePos.y,
          id: `point-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          opacity: 0.7,
          scale: 1
        };
        
        // Update existing points with reduced opacity and scale
        const updatedPoints = prevPoints.map(point => ({
          ...point,
          opacity: point.opacity * 0.92, // Fade out faster
          scale: point.scale * 0.97 // Shrink faster
        }));
        
        // Add new point and keep only points with opacity > 0.05
        return [newPoint, ...updatedPoints.filter(p => p.opacity > 0.05)]
          .slice(0, 20); // Keep maximum 20 points
      });
    }, 40); // More frequent updates for smoother trail
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [mousePos]);
  
  return (
    <>
      {points.map((point) => (
        <div
          key={point.id} // Now using a guaranteed unique ID
          className="cursor-trail"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            opacity: point.opacity,
            transform: `scale(${point.scale})`,
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        />
      ))}
    </>
  );
};

export default CursorTrail;
