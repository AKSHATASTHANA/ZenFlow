import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX, Plus } from "lucide-react";
import { useAudioMixer } from "@/hooks/use-audio-mixer";

const AMBIENT_SOUNDS = [
  {
    id: "rain-forest",
    name: "Rain Forest",
    image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    category: "nature"
  },
  {
    id: "ocean-waves",
    name: "Ocean Waves",
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    category: "nature"
  },
  {
    id: "forest-birds",
    name: "Forest Birds",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    category: "nature"
  },
  {
    id: "white-noise",
    name: "White Noise",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    category: "ambient"
  },
  {
    id: "fireplace",
    name: "Fireplace",
    image: "https://images.unsplash.com/photo-1574388674441-69b048c4b676?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    category: "ambient"
  },
  {
    id: "thunder-storm",
    name: "Thunder Storm",
    image: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    category: "nature"
  },
];

export default function AmbientSounds() {
  const audioMixer = useAudioMixer();
  const [masterVolume, setMasterVolume] = useState(85);

  const handleToggleSound = (soundId: string) => {
    if (audioMixer.isPlaying(soundId)) {
      audioMixer.stop(soundId);
    } else {
      audioMixer.play(soundId);
    }
  };

  const handleVolumeChange = (soundId: string, volume: number) => {
    audioMixer.setVolume(soundId, volume / 100);
  };

  const handleMasterVolumeChange = (volume: number) => {
    setMasterVolume(volume);
    audioMixer.setMasterVolume(volume / 100);
  };

  const SoundVisualization = ({ soundId, isActive }: { soundId: string; isActive: boolean }) => (
    <div className="flex items-end justify-center space-x-1 h-8">
      {[0, 0.1, 0.2, 0.3, 0.4].map((delay, index) => (
        <div
          key={index}
          className={`w-1 ${isActive ? 'bg-primary sound-wave' : 'bg-soft-charcoal/20'}`}
          style={{ 
            height: isActive ? undefined : '8px',
            animationDelay: isActive ? `${delay}s` : undefined 
          }}
        />
      ))}
    </div>
  );

  return (
    <Card className="card-float">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-soft-charcoal">
            Ambient Sound Library
          </h3>
          <Button variant="outline" className="text-primary border-primary/20">
            <Plus className="mr-2" size={16} />
            Add Custom Sound
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {AMBIENT_SOUNDS.map((sound) => {
            const isPlaying = audioMixer.isPlaying(sound.id);
            const volume = audioMixer.getVolume(sound.id) * 100;
            
            return (
              <div
                key={sound.id}
                className="bg-muted rounded-lg p-6 hover:shadow-lg transition-all"
              >
                <img
                  src={sound.image}
                  alt={sound.name}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-soft-charcoal">
                    {sound.name}
                  </h4>
                  <Button
                    size="sm"
                    className={`w-8 h-8 rounded-full p-0 ${
                      isPlaying 
                        ? "bg-primary text-white" 
                        : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                    }`}
                    onClick={() => handleToggleSound(sound.id)}
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  </Button>
                </div>
                
                {/* Volume Control */}
                <div className="flex items-center space-x-3 mb-4">
                  <VolumeX className="text-soft-charcoal/60" size={16} />
                  <div className="flex-1">
                    <Slider
                      value={[volume]}
                      onValueChange={([value]) => handleVolumeChange(sound.id, value)}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                  </div>
                  <Volume2 className="text-soft-charcoal/60" size={16} />
                </div>
                
                {/* Sound Visualization */}
                <SoundVisualization soundId={sound.id} isActive={isPlaying} />
              </div>
            );
          })}
        </div>
        
        {/* Master Volume Control */}
        <div className="pt-8 border-t border-muted">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-soft-charcoal">
              Master Volume
            </h4>
            <div className="text-sm text-soft-charcoal/60">
              {masterVolume}%
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <VolumeX className="text-soft-charcoal/60" />
            <div className="flex-1">
              <Slider
                value={[masterVolume]}
                onValueChange={([value]) => handleMasterVolumeChange(value)}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>
            <Volume2 className="text-soft-charcoal/60" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
