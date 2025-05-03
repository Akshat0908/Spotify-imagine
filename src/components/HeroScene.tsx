
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const HeroScene = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({
        x: (clientX / window.innerWidth - 0.5) * 2, // -1 to 1
        y: (clientY / window.innerHeight - 0.5) * 2, // -1 to 1
      });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background gradient layers */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-spotify-black via-purple-900/30 to-spotify-green/20"
        style={{
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
        }}
      />
      
      {/* Floating Music Notes */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute text-spotify-green opacity-20 transform -translate-x-1/2 -translate-y-1/2"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
              rotate: Math.random() * 360,
            }}
            animate={{
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              rotate: [0, 360],
              scale: [Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{ 
              fontSize: `${Math.random() * 40 + 20}px`,
              filter: `blur(${Math.random() * 2}px)`,
            }}
          >
            {["♪", "♫", "♬", "🎵", "🎶"][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>
      
      {/* 3D Album Covers Grid */}
      <motion.div
        className="absolute w-full h-full grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 px-4 py-8"
        style={{
          perspective: "800px",
          transform: `translateY(${scrollY * 0.5}px)`,
          opacity: 1 - (scrollY / 500),
          pointerEvents: "none",
        }}
      >
        {Array.from({ length: 35 }).map((_, index) => {
          // Random album cover images
          const albumCovers = [
            "https://i.scdn.co/image/ab67616d0000b273ef017e899c0547243d2b8336",
            "https://i.scdn.co/image/ab67616d0000b273641f6e10f583148bf317856d",
            "https://i.scdn.co/image/ab67616d0000b27382b243023e9695abf5f99b8c",
            "https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647",
            "https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5",
            "https://i.scdn.co/image/ab67616d0000b27376cc6de06b2bcde25a93c376",
          ];
          
          const randomCover = albumCovers[Math.floor(Math.random() * albumCovers.length)];
          const row = Math.floor(index / 7);
          const col = index % 7;
          
          const xFactor = (col / 6 - 0.5) * 2; // -1 to 1
          const yFactor = (row / 4 - 0.5) * 2; // -1 to 1
          const distance = Math.sqrt(xFactor * xFactor + yFactor * yFactor);
          
          return (
            <motion.div
              key={index}
              className="w-full aspect-square relative rounded-md overflow-hidden"
              initial={{
                rotateX: Math.random() * 20 - 10,
                rotateY: Math.random() * 20 - 10,
                rotateZ: Math.random() * 20 - 10,
                z: Math.random() * -500,
                opacity: Math.random() * 0.5 + 0.2,
              }}
              animate={{
                rotateX: 
                  Math.random() * 20 - 10 + 
                  mousePosition.y * 10,
                rotateY: 
                  Math.random() * 20 - 10 + 
                  mousePosition.x * 10,
                z: [
                  Math.random() * -500,
                  Math.random() * -400,
                  Math.random() * -500,
                ],
                opacity: [
                  Math.random() * 0.3 + 0.1,
                  Math.random() * 0.4 + 0.2,
                  Math.random() * 0.3 + 0.1,
                ],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              style={{
                transformStyle: "preserve-3d",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                filter: `blur(${distance * 2}px)`,
              }}
            >
              <img
                src={randomCover}
                alt="Album cover"
                className="w-full h-full object-cover"
              />
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Particle effect overlay */}
      <div className="absolute inset-0 bg-spotify-black opacity-30" />
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0" 
        style={{
          background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.6) 100%)"
        }} 
      />
    </div>
  );
};

export default HeroScene;
