import { useState, useEffect, useCallback, useRef } from "react";

interface MeditationTimerOptions {
  duration: number; // in seconds
  intervalBells: boolean;
  intervalDuration: number; // in seconds
}

export function useMeditationTimer({
  duration,
  intervalBells,
  intervalDuration,
}: MeditationTimerOptions) {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const lastBellRef = useRef<number>(0);

  // Reset timer when duration changes
  useEffect(() => {
    if (!isRunning) {
      setTimeRemaining(duration);
      setIsCompleted(false);
      lastBellRef.current = 0;
    }
  }, [duration, isRunning]);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev - 1;
          
          // Check for interval bells
          if (intervalBells && intervalDuration > 0) {
            const elapsed = duration - newTime;
            const timeSinceLastBell = elapsed - lastBellRef.current;
            
            if (timeSinceLastBell >= intervalDuration && newTime > 0) {
              // Play bell sound (would implement with Web Audio API)
              playBellSound();
              lastBellRef.current = elapsed;
            }
          }
          
          if (newTime <= 0) {
            setIsRunning(false);
            setIsCompleted(true);
            playCompletionSound();
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining, intervalBells, intervalDuration, duration]);

  const start = useCallback(() => {
    setIsRunning(true);
    setIsCompleted(false);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    setTimeRemaining(duration);
    setIsCompleted(false);
    lastBellRef.current = 0;
  }, [duration]);

  const playBellSound = () => {
    // Create a simple bell sound using Web Audio API
    try {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.warn("Could not play bell sound:", error);
    }
  };

  const playCompletionSound = () => {
    // Create a completion chime using Web Audio API
    try {
      const audioContext = new AudioContext();
      const frequencies = [523.25, 659.25, 783.99]; // C, E, G major chord
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
        
        oscillator.start(audioContext.currentTime + index * 0.1);
        oscillator.stop(audioContext.currentTime + 1.5);
      });
    } catch (error) {
      console.warn("Could not play completion sound:", error);
    }
  };

  return {
    timeRemaining,
    isRunning,
    isCompleted,
    start,
    pause,
    stop,
  };
}
