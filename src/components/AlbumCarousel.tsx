import { useRef, useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

const albums = [
  { id: 1, title: "Future Nostalgia", artist: "Dua Lipa", cover: "https://i.scdn.co/image/ab67616d0000b27382b243023e9695abf5f99b8c" },
  { id: 2, title: "After Hours", artist: "The Weeknd", cover: "https://i.scdn.co/image/ab67616d0000b273ef017e899c0547243d2b8336" },
  { id: 3, title: "WHEN WE ALL FALL ASLEEP", artist: "Billie Eilish", cover: "https://i.scdn.co/image/ab67616d0000b273641f6e10f583148bf317856d" },
  { id: 4, title: "Planet Her", artist: "Doja Cat", cover: "https://i.scdn.co/image/ab67616d0000b2734df3245f26298a1579ecc321" },
  { id: 5, title: "Lover", artist: "Taylor Swift", cover: "https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647" },
  { id: 6, title: "Scorpion", artist: "Drake", cover: "https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5" },
  { id: 7, title: "Cuz I Love You", artist: "Lizzo", cover: "https://i.scdn.co/image/ab67616d0000b27376cc6de06b2bcde25a93c376" },
];

const AlbumCarousel = () => {
  const controls = useAnimation();
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  
  useEffect(() => {
    // Auto-scroll effect
    const intervalId = setInterval(() => {
      if (!carouselRef.current) return;
      
      const maxScroll = -((albums.length * 280) - carouselRef.current.clientWidth + 40);
      const currentX = x.get();
      
      // Reset to start when we reach the end
      if (currentX <= maxScroll + 10) {
        controls.start({ x: 0, transition: { duration: 0.5 } });
      } else {
        // Otherwise continue scrolling
        controls.start({ 
          x: currentX - 280, 
          transition: { duration: 0.8, ease: "easeInOut" } 
        });
      }
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, [controls, x]);
  
  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
    x.set(info.offset.x);
  };

  return (
    <div 
      className="overflow-hidden" 
      ref={carouselRef}
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
        {albums.map((album, index) => (
          <motion.div 
            key={album.id}
            className="min-w-[250px] bg-spotify-dark-gray rounded-lg overflow-hidden preserve-3d cursor-pointer"
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              boxShadow: "0 20px 30px rgba(0,0,0,0.5)"
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="aspect-square relative overflow-hidden">
              <motion.img 
                src={album.cover} 
                alt={album.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                whileHover={{ scale: 1.1 }}
              />
              
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{ transformStyle: "preserve-3d", transform: "translateZ(10px)" }}
              >
                <button className="absolute right-4 bottom-4 bg-spotify-green text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"></path>
                  </svg>
                </button>
              </motion.div>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-lg line-clamp-1">{album.title}</h3>
              <p className="text-spotify-gray text-sm">{album.artist}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AlbumCarousel;
