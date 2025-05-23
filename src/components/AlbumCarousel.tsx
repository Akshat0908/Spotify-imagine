
import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { toast } from "sonner";

// Updated albums with higher quality images
const albums = [
  { 
    id: 1, 
    title: "Future Nostalgia", 
    artist: "Dua Lipa", 
    cover: "https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946",
    active: true 
  },
  { 
    id: 2, 
    title: "After Hours", 
    artist: "The Weeknd", 
    cover: "https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856",
    active: true 
  },
  { 
    id: 3, 
    title: "WHEN WE ALL FALL ASLEEP", 
    artist: "Billie Eilish", 
    cover: "https://i.scdn.co/image/ab67616d0000b2735ec41436d2815c835b9092e2",
    active: true 
  },
  { 
    id: 4, 
    title: "Planet Her", 
    artist: "Doja Cat", 
    cover: "https://i.scdn.co/image/ab67616d0000b273a4f523a21cacea1313f19c40",
    active: true 
  },
  { 
    id: 5, 
    title: "Lover", 
    artist: "Taylor Swift", 
    cover: "https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647",
    active: true 
  },
  { 
    id: 6, 
    title: "Scorpion", 
    artist: "Drake", 
    cover: "https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5",
    active: true 
  },
  { 
    id: 7, 
    title: "Cuz I Love You", 
    artist: "Lizzo", 
    cover: "https://i.scdn.co/image/ab67616d0000b273e76c82c8ffdafaa96d9ddbc0",
    active: true 
  },
  { 
    id: 8, 
    title: "Chromatica", 
    artist: "Lady Gaga", 
    cover: "https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72",
    active: true 
  },
  { 
    id: 9, 
    title: "Folklore", 
    artist: "Taylor Swift", 
    cover: "https://i.scdn.co/image/ab67616d0000b273c288028c2592f400dd0b9233",
    active: true 
  },
];

const AlbumCarousel = () => {
  const controls = useAnimation();
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [hoveredAlbumId, setHoveredAlbumId] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);
  
  // Track mouse position for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1 
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  useEffect(() => {
    // Auto-scroll effect
    if (isPaused) return;
    
    const intervalId = setInterval(() => {
      if (!carouselRef.current) return;
      
      const maxScroll = -((albums.length * 280) - carouselRef.current.clientWidth + 40);
      const currentX = x.get();
      
      // Reset to start when we reach the end
      if (currentX <= maxScroll + 10) {
        controls.start({ x: 0, transition: { duration: 0.8, ease: "easeInOut" } });
      } else {
        // Otherwise continue scrolling
        controls.start({ 
          x: currentX - 280, 
          transition: { duration: 1.2, ease: "easeInOut" } 
        });
      }
    }, 4000);
    
    return () => clearInterval(intervalId);
  }, [controls, x, isPaused]);
  
  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
    x.set(info.offset.x);
  };
  
  const handleAlbumClick = (albumId: number) => {
    const selectedAlbum = albums.find(a => a.id === albumId);
    toast.success(`Playing "${selectedAlbum?.title}"`, {
      description: `Now playing ${selectedAlbum?.artist}`,
      duration: 3000,
    });
  };
  
  const handleMouseEnter = () => {
    setIsPaused(true);
  };
  
  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div 
      className="overflow-hidden py-8" 
      ref={carouselRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="flex gap-6 py-4"
        drag="x"
        dragConstraints={{ 
          right: 0, 
          left: -((albums.length * 280) - (carouselRef.current?.clientWidth || 0) + 40) 
        }}
        onDrag={handleDrag}
        animate={controls}
        style={{ x }}
      >
        {albums.map((album, index) => {
          const isHovered = album.id === hoveredAlbumId;
          
          return (
            <motion.div 
              key={album.id}
              className="min-w-[250px] bg-spotify-dark-gray rounded-lg overflow-hidden preserve-3d cursor-pointer"
              whileHover={{ 
                scale: 1.05,
                rotateY: 15,
                rotateX: -5,
                z: 50,
                boxShadow: "0 30px 60px rgba(0,0,0,0.7)"
              }}
              animate={{ 
                rotateY: isHovered ? 15 : mousePosition.x * 5,
                rotateX: isHovered ? -5 : -mousePosition.y * 5,
                z: isHovered ? 50 : 0
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ 
                transformStyle: "preserve-3d"
              }}
              onMouseEnter={() => setHoveredAlbumId(album.id)}
              onMouseLeave={() => setHoveredAlbumId(null)}
              onClick={() => handleAlbumClick(album.id)}
            >
              <div className="aspect-square relative overflow-hidden">
                <motion.img 
                  src={album.cover} 
                  alt={album.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ 
                    transformStyle: "preserve-3d", 
                    transform: "translateZ(20px)" 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.button 
                    className="absolute right-6 bottom-6 bg-spotify-green text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
                    style={{
                      boxShadow: isHovered ? "0 0 15px 2px rgba(29, 185, 84, 0.6)" : "none"
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"></path>
                    </svg>
                  </motion.button>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm text-spotify-green font-medium">{album.artist}</p>
                  </motion.div>
                </motion.div>
              </div>
              
              <motion.div 
                className="p-4"
                style={{ 
                  transformStyle: "preserve-3d", 
                  transform: "translateZ(10px)" 
                }}
              >
                <h3 className="font-bold text-lg line-clamp-1">{album.title}</h3>
                <p className="text-spotify-gray text-sm">{album.artist}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default AlbumCarousel;
