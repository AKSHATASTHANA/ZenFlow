import { useState, useEffect, useCallback, useRef } from "react";

interface BreathingPattern {
  id: string;
  inhale: number;
  hold: number;
  exhale: number;
  pause: number;
}

type BreathingPhase = "inhale" | "hold" | "exhale" | "pause";

export function useBreathingPattern(pattern: BreathingPattern, totalDuration: number) {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>("inhale");
  const [phaseTimeRemaining, setPhaseTimeRemaining] = useState(pattern.inhale);
  const [totalTimeRemaining, setTotalTimeRemaining] = useState(totalDuration);
  const [cycleCount, setCycleCount] = useState(0);
  
  const intervalRef = useRef<NodeJS.Timeout>();
  const phaseOrderRef = useRef<BreathingPhase[]>(["inhale", "hold", "exhale", "pause"]);
  const currentPhaseIndexRef = useRef(0);

  // Calculate cycle duration
  const cycleDuration = pattern.inhale + pattern.hold + pattern.exhale + pattern.pause;

  // Reset when pattern or duration changes
  useEffect(() => {
    if (!isActive) {
      setCurrentPhase("inhale");
      setPhaseTimeRemaining(pattern.inhale);
      setTotalTimeRemaining(totalDuration);
      setCycleCount(0);
      currentPhaseIndexRef.current = 0;
    }
  }, [pattern, totalDuration, isActive]);

  // Main breathing timer
  useEffect(() => {
    if (isActive && totalTimeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setPhaseTimeRemaining((prevPhaseTime) => {
          if (prevPhaseTime > 1) {
            return prevPhaseTime - 1;
          } else {
            // Move to next phase
            const currentPhases = phaseOrderRef.current;
            const nextPhaseIndex = (currentPhaseIndexRef.current + 1) % currentPhases.length;
            const nextPhase = currentPhases[nextPhaseIndex];
            
            currentPhaseIndexRef.current = nextPhaseIndex;
            setCurrentPhase(nextPhase);
            
            // If we completed a full cycle, increment cycle count
            if (nextPhaseIndex === 0) {
              setCycleCount(prev => prev + 1);
            }
            
            // Get duration for next phase
            switch (nextPhase) {
              case "inhale":
                return pattern.inhale;
              case "hold":
                return pattern.hold;
              case "exhale":
                return pattern.exhale;
              case "pause":
                return pattern.pause;
              default:
                return pattern.inhale;
            }
          }
        });

        setTotalTimeRemaining((prevTotal) => {
          const newTotal = prevTotal - 1;
          if (newTotal <= 0) {
            setIsActive(false);
            return 0;
          }
          return newTotal;
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
  }, [isActive, totalTimeRemaining, pattern]);

  const start = useCallback(() => {
    setIsActive(true);
  }, []);

  const pause = useCallback(() => {
    setIsActive(false);
  }, []);

  const stop = useCallback(() => {
    setIsActive(false);
    setCurrentPhase("inhale");
    setPhaseTimeRemaining(pattern.inhale);
    setTotalTimeRemaining(totalDuration);
    setCycleCount(0);
    currentPhaseIndexRef.current = 0;
  }, [pattern, totalDuration]);

  return {
    isActive,
    currentPhase,
    phaseTimeRemaining,
    totalTimeRemaining,
    cycleCount,
    cycleDuration,
    start,
    pause,
    stop,
  };
}
