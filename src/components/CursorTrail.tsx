
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

interface CursorPoint {
  x: number;
  y: number;
  id: string;
}

const CursorTrail = () => {
  const [points, setPoints] = useState<CursorPoint[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const location = useLocation();
  
  useEffect(() => {
    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    // Create cursor trail - disable on browse page
    const interval = setInterval(() => {
      // Skip trail creation on /browse route
      if (location.pathname === "/browse") {
        setPoints([]);
        return;
      }
      
      setPoints((prevPoints) => {
        // Add new point at current mouse position with unique ID
        const newPoint = {
          x: mousePos.x,
          y: mousePos.y,
          id: `point-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        };
        
        // Keep only the 5 most recent points for a more subtle trail
        return [newPoint, ...prevPoints.slice(0, 4)];
      });
    }, 80); // Less frequent updates for more subtle effect
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [mousePos, location.pathname]);
  
  return (
    <>
      {points.map((point, index) => {
        // Calculate size based on position in trail
        const size = (5 - index) * 6;
        
        return (
          <motion.div
            key={point.id}
            className="fixed pointer-events-none rounded-full z-50"
            style={{
              left: point.x,
              top: point.y,
              width: `${size}px`,
              height: `${size}px`
            }}
            initial={{ scale: 0.8, opacity: 0.7 }}
            animate={{ 
              scale: 0,
              opacity: 0,
              backgroundColor: index === 0 ? "#1DB954" : "rgba(255, 255, 255, 0.5)"
            }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut" 
            }}
          />
        );
      })}
    </>
  );
};

export default CursorTrail;
