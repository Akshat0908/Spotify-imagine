
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type Mood = 'happy' | 'chill' | 'focus' | 'energetic' | 'sad';

interface MoodOption {
  id: Mood;
  label: string;
  emoji: string;
  color: string;
  gradient: string;
}

const moodOptions: MoodOption[] = [
  {
    id: 'happy',
    label: 'Happy',
    emoji: '😄',
    color: '#FFD700',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    id: 'chill',
    label: 'Chill',
    emoji: '😌',
    color: '#6A8ED4',
    gradient: 'from-blue-400 to-indigo-500',
  },
  {
    id: 'focus',
    label: 'Focus',
    emoji: '🧠',
    color: '#4B917A',
    gradient: 'from-green-500 to-teal-600',
  },
  {
    id: 'energetic',
    label: 'Energetic',
    emoji: '⚡',
    color: '#FF5757',
    gradient: 'from-red-500 to-pink-500',
  },
  {
    id: 'sad',
    label: 'Sad',
    emoji: '😢',
    color: '#9370DB',
    gradient: 'from-purple-400 to-blue-500',
  },
];

const MoodBasedRecommendations = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const { toast } = useToast();

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    
    toast({
      title: `${moodOptions.find(m => m.id === mood)?.label} Mood Selected`,
      description: 'Generating personalized recommendations...',
      duration: 3000,
    });
  };

  return (
    <div className="bg-spotify-black/30 backdrop-blur-md rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">How are you feeling today?</h3>
      
      <div className="grid grid-cols-5 gap-4 mb-6">
        {moodOptions.map((mood) => (
          <motion.button
            key={mood.id}
            className={`rounded-full flex flex-col items-center justify-center p-3 transition-all ${
              selectedMood === mood.id
                ? `ring-2 ring-white bg-gradient-to-br ${mood.gradient}`
                : 'bg-white/10 hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMoodSelect(mood.id)}
          >
            <span className="text-2xl mb-1">{mood.emoji}</span>
            <span className="text-xs font-medium">{mood.label}</span>
          </motion.button>
        ))}
      </div>
      
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`bg-gradient-to-br p-4 rounded-lg ${
            moodOptions.find((m) => m.id === selectedMood)?.gradient
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold">
              Your {moodOptions.find((m) => m.id === selectedMood)?.label} Mix
            </h4>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => {
                toast({
                  title: 'Playlist Created',
                  description: `Your ${moodOptions.find((m) => m.id === selectedMood)?.label} Mix is ready to play!`,
                  duration: 3000,
                });
              }}
            >
              Create Playlist
            </Button>
          </div>
          
          <div className="flex overflow-x-auto pb-2 gap-3 no-scrollbar">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="flex-shrink-0 w-28 bg-black/20 rounded-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-28 h-28 bg-black/30">
                  {/* Placeholder for album art */}
                  <div className="w-full h-full flex items-center justify-center text-white/50">
                    <motion.div 
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center"
                    >
                      🎵
                    </motion.div>
                  </div>
                </div>
                <div className="p-2">
                  <p className="truncate text-sm font-medium">
                    {selectedMood === 'happy' && 'Upbeat Vibes'}
                    {selectedMood === 'chill' && 'Relaxing Tunes'}
                    {selectedMood === 'focus' && 'Deep Focus'}
                    {selectedMood === 'energetic' && 'Energy Boost'}
                    {selectedMood === 'sad' && 'Melancholy'}
                    {i + 1}
                  </p>
                  <p className="truncate text-xs opacity-70">Recommended for you</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MoodBasedRecommendations;
