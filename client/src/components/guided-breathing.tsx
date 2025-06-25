import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause } from "lucide-react";
import { useBreathingPattern } from "@/hooks/use-breathing-pattern";
import BreathingAnimation from "./breathing-animation";

const BREATHING_PATTERNS = [
  {
    id: "4-7-8",
    name: "4-7-8 Relaxing",
    description: "Inhale 4, Hold 7, Exhale 8",
    inhale: 4,
    hold: 7,
    exhale: 8,
    pause: 0,
  },
  {
    id: "4-4-4-4",
    name: "4-4-4-4 Box Breathing",
    description: "Equal counts for all phases",
    inhale: 4,
    hold: 4,
    exhale: 4,
    pause: 4,
  },
  {
    id: "6-2-6-2",
    name: "6-2-6-2 Calm Focus",
    description: "Longer inhales and exhales",
    inhale: 6,
    hold: 2,
    exhale: 6,
    pause: 2,
  },
];

const DURATION_OPTIONS = [
  { value: 120, label: "2m" },
  { value: 300, label: "5m" },
  { value: 600, label: "10m" },
  { value: 900, label: "15m" },
];

const BACKGROUND_SOUNDS = [
  { value: "none", label: "None" },
  { value: "ocean-waves", label: "Ocean Waves" },
  { value: "rain-forest", label: "Rain Forest" },
  { value: "white-noise", label: "White Noise" },
];

export default function GuidedBreathing() {
  const [selectedPattern, setSelectedPattern] = useState("4-7-8");
  const [duration, setDuration] = useState(300); // 5 minutes default
  const [backgroundSound, setBackgroundSound] = useState("none");
  const [voiceGuidance, setVoiceGuidance] = useState(false);

  const pattern = BREATHING_PATTERNS.find(p => p.id === selectedPattern) || BREATHING_PATTERNS[0];
  const breathing = useBreathingPattern(pattern, duration);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreathingInstruction = () => {
    switch (breathing.currentPhase) {
      case "inhale":
        return { text: "Breathe In", count: `${breathing.phaseTimeRemaining} seconds` };
      case "hold":
        return { text: "Hold", count: `${breathing.phaseTimeRemaining} seconds` };
      case "exhale":
        return { text: "Breathe Out", count: `${breathing.phaseTimeRemaining} seconds` };
      case "pause":
        return { text: "Pause", count: `${breathing.phaseTimeRemaining} seconds` };
      default:
        return { text: "Ready to begin", count: "" };
    }
  };

  const instruction = getBreathingInstruction();

  return (
    <Card className="card-float">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-soft-charcoal mb-4">
            Guided Breathing
          </h3>
          <p className="text-soft-charcoal/80 max-w-md mx-auto">
            Follow the gentle rhythm to synchronize your breath and find your center
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Breathing Animation */}
          <div className="flex-1 text-center">
            <div className="relative w-80 h-80 mx-auto mb-8">
              {/* Breathing circles with animation */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20">
                <BreathingAnimation
                  isActive={breathing.isActive}
                  pattern={selectedPattern}
                  className="w-full h-full"
                />
              </div>
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40">
                <BreathingAnimation
                  isActive={breathing.isActive}
                  pattern={selectedPattern}
                  className="w-full h-full"
                  delay={0.5}
                />
              </div>
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-primary to-secondary">
                <BreathingAnimation
                  isActive={breathing.isActive}
                  pattern={selectedPattern}
                  className="w-full h-full"
                  delay={1}
                />
              </div>
              
              {/* Breathing instruction text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">
                    {instruction.text}
                  </div>
                  <div className="text-sm text-white/80">
                    {instruction.count}
                  </div>
                  {breathing.totalTimeRemaining > 0 && (
                    <div className="text-xs text-white/60 mt-2">
                      {formatTime(breathing.totalTimeRemaining)} remaining
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Breathing Controls */}
            <div className="flex justify-center space-x-4 mb-6">
              <Button
                size="lg"
                className="w-14 h-14 rounded-full card-float p-0"
                onClick={breathing.isActive ? breathing.pause : breathing.start}
              >
                {breathing.isActive ? <Pause size={20} /> : <Play size={20} />}
              </Button>
            </div>
            
            {/* Breathing Pattern Indicator */}
            <div className="flex justify-center space-x-2">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === breathing.cycleCount % 4
                      ? "bg-primary"
                      : "bg-secondary/50"
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Breathing Settings */}
          <div className="flex-1 max-w-md">
            <div className="space-y-6">
              {/* Breathing Pattern */}
              <div>
                <Label className="block text-sm font-semibold text-soft-charcoal mb-3">
                  Breathing Pattern
                </Label>
                <div className="space-y-2">
                  {BREATHING_PATTERNS.map((pattern) => (
                    <Button
                      key={pattern.id}
                      variant={selectedPattern === pattern.id ? "default" : "outline"}
                      className="w-full p-4 text-left justify-start h-auto"
                      onClick={() => setSelectedPattern(pattern.id)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <div className="font-medium">{pattern.name}</div>
                          <div className="text-sm opacity-80 mt-1">
                            {pattern.description}
                          </div>
                        </div>
                        {selectedPattern === pattern.id && (
                          <div className="text-xs">✓</div>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Duration Setting */}
              <div>
                <Label className="block text-sm font-semibold text-soft-charcoal mb-3">
                  Session Duration
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {DURATION_OPTIONS.map((option) => (
                    <Button
                      key={option.value}
                      variant={duration === option.value ? "default" : "outline"}
                      className="text-sm font-medium"
                      onClick={() => setDuration(option.value)}
                      disabled={breathing.isActive}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Background Sound */}
              <div>
                <Label className="block text-sm font-semibold text-soft-charcoal mb-3">
                  Background Sound
                </Label>
                <Select value={backgroundSound} onValueChange={setBackgroundSound}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BACKGROUND_SOUNDS.map((sound) => (
                      <SelectItem key={sound.value} value={sound.value}>
                        {sound.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Voice Guidance */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-soft-charcoal">
                    Voice Guidance
                  </div>
                  <div className="text-xs text-soft-charcoal/60">
                    Spoken breathing cues
                  </div>
                </div>
                <Switch
                  checked={voiceGuidance}
                  onCheckedChange={setVoiceGuidance}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
