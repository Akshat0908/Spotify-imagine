import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';

// Royalty-free demo track
const DEMO_TRACK = 'https://cdn.pixabay.com/audio/2022/10/16/audio_12b6b6b6b6.mp3';

function AudioBars({ analyser }: { analyser: AnalyserNode | null }) {
  const meshRefs = useRef<any[]>([]);
  const [dataArray, setDataArray] = useState<Uint8Array>(new Uint8Array(32));

  useFrame(() => {
    if (analyser) {
      const arr = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(arr);
      setDataArray(arr.slice(0, 32));
    }
    // Animate bars
    meshRefs.current.forEach((mesh, i) => {
      if (mesh && dataArray[i]) {
        mesh.scale.y = Math.max(0.1, dataArray[i] / 32);
      }
    });
  });

  // Debug log
  console.log('Rendering AudioBars', { analyser, dataArray: dataArray.slice(0, 5) });

  return (
    <group position={[0, -0.5, 0]}>
      {dataArray.map((v, i) => (
        <mesh
          key={i}
          ref={el => (meshRefs.current[i] = el)}
          position={[-2 + (i * 0.13), 0, 0]}
        >
          <boxGeometry args={[0.1, 1, 0.1]} />
          <meshStandardMaterial color={'#6c47ff'} />
        </mesh>
      ))}
    </group>
  );
}

function DebugBox() {
  // A static box to confirm the scene is rendering
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  );
}

const ImmersiveWorld = ({ mood, track, onClose }: { mood?: string; track?: string; onClose: () => void }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const src = ctx.createMediaElementSource(audio);
    const analyserNode = ctx.createAnalyser();
    analyserNode.fftSize = 64;
    src.connect(analyserNode);
    analyserNode.connect(ctx.destination);
    setAnalyser(analyserNode);
    audio.play();
    console.log('Audio context and analyser set up');
    return () => {
      ctx.close();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <button
        onClick={onClose}
        className="absolute top-6 right-8 z-10 bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition"
      >
        Exit
      </button>
      <audio ref={audioRef} src={DEMO_TRACK} loop />
      <Canvas camera={{ position: [0, 0, 4] }} className="w-full h-full">
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <DebugBox />
          <AudioBars analyser={analyser} />
        </Suspense>
      </Canvas>
      {/* Optionally, overlay lyrics, song info, etc. here */}
      <div className="absolute bottom-8 left-8 text-white text-xl">
        <div>{mood && `Mood: ${mood}`}</div>
        <div>{track && `Track: ${track}`}</div>
      </div>
    </div>
  );
};

export default ImmersiveWorld; 