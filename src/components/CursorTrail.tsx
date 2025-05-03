
import { useEffect, useState } from "react";

interface CursorPoint {
  x: number;
  y: number;
  id: number;
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
    let pointId = 0;
    const interval = setInterval(() => {
      setPoints((prevPoints) => {
        // Add new point at current mouse position
        const newPoints = [
          { x: mousePos.x, y: mousePos.y, id: pointId++ },
          ...prevPoints.slice(0, 15), // Keep only last 15 points
        ];
        return newPoints;
      });
    }, 50);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [mousePos]);
  
  return (
    <>
      {points.map((point, index) => (
        <div
          key={point.id}
          className="cursor-trail"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            opacity: 0.7 - (index * 0.05), // Fade out as the point gets older
            transform: `scale(${1 - (index * 0.05)})`, // Shrink as the point gets older
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        />
      ))}
    </>
  );
};

export default CursorTrail;
