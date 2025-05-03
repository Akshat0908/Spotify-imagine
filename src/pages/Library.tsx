
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import MoodRing from "@/components/MoodRing";
import { toast } from "sonner";

const tabs = ["Playlists", "Podcasts", "Artists", "Albums"];

const playlists = [
  { id: 1, name: "Liked Songs", owner: "You", songs: 345, lastPlayed: "3 hours ago", imageUrl: "https://misc.scdn.co/liked-songs/liked-songs-640.png" },
  { id: 2, name: "Discover Weekly", owner: "Spotify", songs: 30, lastPlayed: "Yesterday", imageUrl: "https://newjams-images.scdn.co/image/ab676477000033ad/dt/v3/discover-weekly/Aat3WCmFEwd9xpnyZdUjZtCXo5uHYSoAioZDmNB5iuG6ywhCIpD3_U-sJ1QXGdBEmfmhxgJNcIWQ7ZDe5H9HUpABJ2CHZYQg_ciWsIgAv1g=/MTAyMDow" },
  { id: 3, name: "Hip-Hop Mix", owner: "You", songs: 85, lastPlayed: "2 days ago", imageUrl: "https://seed-mix-image.spotifycdn.com/v6/img/hip_hop/1Xyo4u8uXC1ZmMpatF05PJ/en/default" },
  { id: 4, name: "Workout Playlist", owner: "You", songs: 42, lastPlayed: "1 week ago", imageUrl: "https://i.scdn.co/image/ab67706f000000025f7327d3fdc71af27917adba" },
  { id: 5, name: "Chill Vibes", owner: "You", songs: 120, lastPlayed: "3 days ago", imageUrl: "https://i.scdn.co/image/ab67706f00000002c414e7daf34690c9f983f76e" },
  { id: 6, name: "Road Trip", owner: "You", songs: 67, lastPlayed: "2 weeks ago", imageUrl: "https://i.scdn.co/image/ab67706f000000028a9191d1b0fae68fec4d9da5" },
];

const artists = [
  { id: 1, name: "Drake", followers: "58.5M", imageUrl: "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9" },
  { id: 2, name: "Taylor Swift", followers: "70.3M", imageUrl: "https://i.scdn.co/image/ab6761610000e5eb5a00969a4698c3132a15fbb0" },
  { id: 3, name: "The Weeknd", followers: "52.1M", imageUrl: "https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb" },
  { id: 4, name: "Billie Eilish", followers: "48.6M", imageUrl: "https://i.scdn.co/image/ab6761610000e5eb7b9a746e9e82fa0a68ba3be0" },
];

const albums = [
  { id: 1, name: "After Hours", artist: "The Weeknd", year: "2020", imageUrl: "https://i.scdn.co/image/ab67616d0000b273ef017e899c0547243d2b8336" },
  { id: 2, name: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?", artist: "Billie Eilish", year: "2019", imageUrl: "https://i.scdn.co/image/ab67616d0000b273641f6e10f583148bf317856d" },
  { id: 3, name: "Scorpion", artist: "Drake", year: "2018", imageUrl: "https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5" },
  { id: 4, name: "Lover", artist: "Taylor Swift", year: "2019", imageUrl: "https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647" },
];

const podcasts = [
  { id: 1, name: "The Joe Rogan Experience", publisher: "Joe Rogan", episodes: 1800, imageUrl: "https://i.scdn.co/image/ab6765630000ba8a90fbab5c8c3c344005ba05ed" },
  { id: 2, name: "Crime Junkie", publisher: "audiochuck", episodes: 420, imageUrl: "https://i.scdn.co/image/ab6765630000ba8a6f4c190354b4bf76241cea1b" },
  { id: 3, name: "Call Her Daddy", publisher: "Alex Cooper", episodes: 180, imageUrl: "https://i.scdn.co/image/ab6765630000ba8ab03bf86844a41be53e181b8d" },
];

const Library = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      toast("Try voice commands!", {
        description: "Say 'Show playlists' or 'Sort by title'",
        action: {
          label: "Enable",
          onClick: () => {
            setIsVoiceSearchActive(true);
            simulateVoiceCommand();
          }
        }
      });
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const simulateVoiceCommand = () => {
    setTimeout(() => {
      toast.success("Voice command recognized", {
        description: "Showing your playlists"
      });
      setActiveTab(0);
      
      setTimeout(() => {
        setIsVoiceSearchActive(false);
      }, 2000);
    }, 2000);
  };
  
  const getFilteredContent = () => {
    let content;
    switch(tabs[activeTab]) {
      case "Playlists":
        content = playlists;
        break;
      case "Artists":
        content = artists;
        break;
      case "Albums":
        content = albums;
        break;
      case "Podcasts":
        content = podcasts;
        break;
      default:
        content = playlists;
    }
    
    if (searchTerm) {
      return content.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return content;
  };
  
  const getSortedContent = () => {
    const content = getFilteredContent();
    
    switch(sortBy) {
      case "recent":
        return [...content];
      case "alphabetical":
        return [...content].sort((a, b) => a.name.localeCompare(b.name));
      case "creator":
        return [...content].sort((a, b) => {
          const aCreator = a.owner || a.artist || a.publisher || "";
          const bCreator = b.owner || b.artist || b.publisher || "";
          return aCreator.localeCompare(bCreator);
        });
      default:
        return content;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-spotify-dark-gray to-spotify-black text-spotify-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 md:mb-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Library
          </motion.h1>
          
          <div className="flex items-center space-x-3">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search your library"
                className="bg-spotify-light-gray bg-opacity-40 text-white placeholder-gray-400 px-4 py-2 rounded-full outline-none w-full md:w-64"
              />
              <button 
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${isVoiceSearchActive ? 'text-spotify-green animate-pulse' : 'text-gray-400'}`}
                onClick={() => setIsVoiceSearchActive(!isVoiceSearchActive)}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"></path>
                </svg>
              </button>
              
              {isVoiceSearchActive && (
                <motion.div 
                  className="absolute -right-12 top-1/2 -translate-y-1/2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <MoodRing size={40} />
                </motion.div>
              )}
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-spotify-light-gray bg-opacity-40 text-white px-4 py-2 rounded-full outline-none appearance-none cursor-pointer pl-4 pr-10"
              >
                <option value="recent">Recently Played</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="creator">Creator</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-8 border-b border-spotify-light-gray/30">
          <ul className="flex space-x-6 overflow-x-auto pb-2 hide-scrollbar">
            {tabs.map((tab, index) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(index)}
                  className={`px-1 py-2 font-medium text-lg relative ${
                    activeTab === index ? "text-spotify-white" : "text-spotify-gray"
                  }`}
                >
                  {tab}
                  {activeTab === index && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-1 bg-spotify-green"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Content */}
        <div className="min-h-[60vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {getSortedContent().length > 0 ? (
                getSortedContent().map((item) => (
                  <motion.div
                    key={item.id}
                    className="bg-spotify-dark-gray rounded-lg p-4 hover:bg-spotify-light-gray/30 transition-colors cursor-pointer preserve-3d"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="preserve-3d mb-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full aspect-square object-cover rounded-md shadow-lg hover:shadow-xl transition-shadow card-hover"
                      />
                    </div>
                    
                    <h3 className="font-bold text-lg line-clamp-1">{item.name}</h3>
                    
                    {/* Display different details based on content type */}
                    {(() => {
                      if (tabs[activeTab] === "Playlists") {
                        return (
                          <div className="text-spotify-gray">
                            <p className="text-sm">{item.owner}</p>
                            <p className="text-xs mt-1">{item.songs} songs • {item.lastPlayed}</p>
                          </div>
                        );
                      } else if (tabs[activeTab] === "Artists") {
                        return (
                          <div className="text-spotify-gray">
                            <p className="text-sm">{item.followers} followers</p>
                          </div>
                        );
                      } else if (tabs[activeTab] === "Albums") {
                        return (
                          <div className="text-spotify-gray">
                            <p className="text-sm">{item.artist}</p>
                            <p className="text-xs mt-1">{item.year}</p>
                          </div>
                        );
                      } else if (tabs[activeTab] === "Podcasts") {
                        return (
                          <div className="text-spotify-gray">
                            <p className="text-sm">{item.publisher}</p>
                            <p className="text-xs mt-1">{item.episodes} episodes</p>
                          </div>
                        );
                      }
                      return null;
                    })()}
                    
                    <div className="mt-3 flex justify-end">
                      <Button
                        className="bg-spotify-green hover:bg-opacity-80 text-white rounded-full w-10 h-10 p-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </Button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full flex items-center justify-center h-64">
                  <div className="text-center">
                    <p className="text-2xl font-semibold mb-3">No results found</p>
                    <p className="text-spotify-gray">Try adjusting your search or filters</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Library;
