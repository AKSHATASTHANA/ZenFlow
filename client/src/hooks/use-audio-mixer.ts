import { useState, useCallback, useRef, useEffect } from "react";
import { AudioManager } from "@/lib/audio-manager";

export function useAudioMixer() {
  const audioManagerRef = useRef<AudioManager>();
  const [playingStates, setPlayingStates] = useState<Record<string, boolean>>({});
  const [volumes, setVolumes] = useState<Record<string, number>>({});

  useEffect(() => {
    audioManagerRef.current = new AudioManager();
    
    return () => {
      audioManagerRef.current?.dispose();
    };
  }, []);

  const play = useCallback(async (soundId: string) => {
    try {
      await audioManagerRef.current?.play(soundId);
      setPlayingStates(prev => ({ ...prev, [soundId]: true }));
    } catch (error) {
      console.error("Failed to play sound:", error);
    }
  }, []);

  const stop = useCallback((soundId: string) => {
    audioManagerRef.current?.stop(soundId);
    setPlayingStates(prev => ({ ...prev, [soundId]: false }));
  }, []);

  const setVolume = useCallback((soundId: string, volume: number) => {
    audioManagerRef.current?.setVolume(soundId, volume);
    setVolumes(prev => ({ ...prev, [soundId]: volume }));
  }, []);

  const setMasterVolume = useCallback((volume: number) => {
    audioManagerRef.current?.setMasterVolume(volume);
  }, []);

  const isPlaying = useCallback((soundId: string) => {
    return playingStates[soundId] || false;
  }, [playingStates]);

  const getVolume = useCallback((soundId: string) => {
    return volumes[soundId] || 0.6; // Default volume
  }, [volumes]);

  return {
    play,
    stop,
    isPlaying,
    setVolume,
    setMasterVolume,
    getVolume,
  };
}
