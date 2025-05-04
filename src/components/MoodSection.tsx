import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const moods = [
  {
    id: 1,
    name: "Happy",
    emoji: "😄",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Happy_people_listening_to_music.jpg",
    description: "Upbeat and cheerful tunes"
  },
  {
    id: 2,
    name: "Chill",
    emoji: "😌",
    image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg",
    description: "Relaxing and mellow vibes"
  },
  {
    id: 3,
    name: "Focus",
    emoji: "🧠",
    image: "https://images.pexels.com/photos/164936/pexels-photo-164936.jpeg",
    description: "Concentration and productivity"
  },
  {
    id: 4,
    name: "Energetic",
    emoji: "⚡",
    image: "https://images.pexels.com/photos/1679825/pexels-photo-1679825.jpeg",
    description: "High-energy beats"
  },
  {
    id: 5,
    name: "Sad",
    emoji: "😢",
    image: "https://images.pexels.com/photos/374777/pexels-photo-374777.jpeg",
    description: "Emotional and reflective"
  }
];

const recommendedPlaylists = [
  {
    id: 1,
    name: "Your Happy Mix",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Happy_people_listening_to_music.jpg",
    description: "Recommended for you"
  },
  {
    id: 2,
    name: "Upbeat Vibes",
    image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg",
    description: "Recommended for you"
  },
  {
    id: 3,
    name: "Chill Mix",
    image: "https://images.pexels.com/photos/164936/pexels-photo-164936.jpeg",
    description: "Recommended for you"
  },
  {
    id: 4,
    name: "Focus Flow",
    image: "https://images.pexels.com/photos/1679825/pexels-photo-1679825.jpeg",
    description: "Recommended for you"
  },
  {
    id: 5,
    name: "Energetic Beats",
    image: "https://images.pexels.com/photos/374777/pexels-photo-374777.jpeg",
    description: "Recommended for you"
  }
];

const MoodSection = () => {
  return (
    <div className="py-16 px-4 md:px-8 bg-gradient-to-b from-spotify-black to-spotify-dark-gray">
      <div className="container mx-auto">
        {/* Mood Selection */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">How are you feeling today?</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {moods.map((mood) => (
              <motion.div
                key={mood.id}
                className="relative h-48 rounded-lg overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={mood.image} 
                  alt={mood.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center justify-end p-4">
                  <span className="text-4xl mb-2">{mood.emoji}</span>
                  <h3 className="text-xl font-bold">{mood.name}</h3>
                  <p className="text-sm text-spotify-gray">{mood.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recommended Playlists */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Recommended for you</h2>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Playlist
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {recommendedPlaylists.map((playlist) => (
              <motion.div
                key={playlist.id}
                className="bg-spotify-dark-gray hover:bg-spotify-light-gray transition-colors duration-300 rounded-lg p-4 card-hover"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative aspect-square mb-4">
                  <img 
                    src={playlist.image} 
                    alt={playlist.name} 
                    className="w-full h-full object-cover rounded-md shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md flex items-center justify-center">
                    <Button className="rounded-full w-12 h-12">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </Button>
                  </div>
                </div>
                <h3 className="font-semibold text-lg">{playlist.name}</h3>
                <p className="text-spotify-gray text-sm mt-2">{playlist.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodSection; 