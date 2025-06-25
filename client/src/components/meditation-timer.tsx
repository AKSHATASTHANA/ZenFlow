import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, Square, Clock, Flame, Leaf } from "lucide-react";
import { useMeditationTimer } from "@/hooks/use-meditation-timer";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import BreathingAnimation from "./breathing-animation";

const DURATION_OPTIONS = [
  { value: 300, label: "5m" },
  { value: 600, label: "10m" },
  { value: 900, label: "15m" },
  { value: 1800, label: "30m" },
];

export default function MeditationTimer() {
  const [selectedDuration, setSelectedDuration] = useState(600); // 10 minutes default
  const [intervalBells, setIntervalBells] = useState(true);
  const [intervalDuration, setIntervalDuration] = useState(120); // 2 minutes
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const timer = useMeditationTimer({
    duration: selectedDuration,
    intervalBells,
    intervalDuration,
  });

  // Fetch user stats and recent sessions
  const { data: statsData } = useQuery({
    queryKey: ["/api/stats"],
  });

  const { data: recentSessions } = useQuery({
    queryKey: ["/api/sessions"],
  });

  // Create session mutation
  const createSessionMutation = useMutation({
    mutationFn: async (sessionData: any) => {
      const response = await apiRequest("POST", "/api/sessions", sessionData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/sessions"] });
      toast({
        title: "Session Complete!",
        description: "Your meditation session has been recorded.",
      });
    },
  });

  // Handle session completion
  useEffect(() => {
    if (timer.isCompleted && timer.timeRemaining === 0) {
      createSessionMutation.mutate({
        duration: selectedDuration,
        sessionType: "timer",
        soundsUsed: [],
        wasCompleted: true,
      });
    }
  }, [timer.isCompleted, timer.timeRemaining, selectedDuration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((selectedDuration - timer.timeRemaining) / selectedDuration) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  const stats = statsData?.stats;
  const preferences = statsData?.preferences;
  const todayMinutes = stats?.totalMinutes || 0;
  const dailyGoal = preferences?.dailyGoal || 30;
  const goalProgress = Math.min((todayMinutes / dailyGoal) * 100, 100);
  const remainingMinutes = Math.max(dailyGoal - todayMinutes, 0);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Timer Section */}
      <Card className="card-float">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-soft-charcoal mb-6">Meditation Timer</h3>
          
          {/* Timer Display */}
          <div className="text-center mb-8">
            <div className="relative w-48 h-48 mx-auto mb-6">
              <svg className="w-full h-full progress-ring" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth="6"
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="6" 
                  className="progress-ring-fill"
                  style={{ strokeDashoffset }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-soft-charcoal">
                    {formatTime(timer.timeRemaining)}
                  </div>
                  <div className="text-sm text-soft-charcoal/60">remaining</div>
                </div>
              </div>
            </div>
            
            {/* Breathing Animation */}
            <BreathingAnimation 
              isActive={timer.isRunning} 
              className="mb-6"
            />
            
            <p className="text-soft-charcoal/80 mb-4">
              {timer.isRunning ? "Breathe in... and out..." : "Ready to begin your practice"}
            </p>
            
            {/* Timer Controls */}
            <div className="flex justify-center space-x-4">
              <Button
                size="lg"
                className="w-14 h-14 rounded-full card-float p-0"
                onClick={timer.isRunning ? timer.pause : timer.start}
                disabled={timer.timeRemaining === 0}
              >
                {timer.isRunning ? <Pause size={20} /> : <Play size={20} />}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-14 h-14 rounded-full p-0"
                onClick={timer.stop}
              >
                <Square size={20} />
              </Button>
            </div>
          </div>
          
          {/* Duration Selection */}
          <div className="mb-6">
            <Label className="block text-sm font-semibold text-soft-charcoal mb-3">
              Session Duration
            </Label>
            <div className="grid grid-cols-4 gap-2">
              {DURATION_OPTIONS.map(option => (
                <Button
                  key={option.value}
                  variant={selectedDuration === option.value ? "default" : "outline"}
                  className="text-sm font-medium"
                  onClick={() => setSelectedDuration(option.value)}
                  disabled={timer.isRunning}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Interval Bell Settings */}
          <div className="border-t border-muted pt-6">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-sm font-semibold text-soft-charcoal">
                Interval Bells
              </Label>
              <Switch
                checked={intervalBells}
                onCheckedChange={setIntervalBells}
              />
            </div>
            {intervalBells && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-soft-charcoal/60">Every</span>
                <Select
                  value={intervalDuration.toString()}
                  onValueChange={(value) => setIntervalDuration(parseInt(value))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="120">2 minutes</SelectItem>
                    <SelectItem value="300">5 minutes</SelectItem>
                    <SelectItem value="600">10 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Stats Section */}
      <div className="space-y-6">
        {/* Today's Progress */}
        <Card className="card-float">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-soft-charcoal mb-4">
              Today's Progress
            </h4>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {todayMinutes}
                </div>
                <div className="text-sm text-soft-charcoal/60">
                  minutes meditated
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--gentle-green))] to-primary rounded-full flex items-center justify-center">
                <Leaf className="text-white" size={24} />
              </div>
            </div>
            <Progress value={goalProgress} className="mb-2" />
            <div className="text-xs text-soft-charcoal/60">
              {remainingMinutes > 0 
                ? `${remainingMinutes} minutes to reach daily goal`
                : "Daily goal achieved! 🎉"
              }
            </div>
          </CardContent>
        </Card>
        
        {/* Current Streak */}
        <Card className="card-float">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-soft-charcoal mb-4">
              Current Streak
            </h4>
            <div className="flex items-center space-x-3">
              <div className="text-3xl font-bold text-[hsl(var(--gentle-green))]">
                {stats?.currentStreak || 0}
              </div>
              <div>
                <div className="text-sm font-medium text-soft-charcoal">days</div>
                <div className="text-xs text-soft-charcoal/60">Keep it up!</div>
              </div>
              <div className="ml-auto">
                <Flame className="text-2xl text-orange-400" size={32} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Sessions */}
        <Card className="card-float">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-soft-charcoal mb-4">
              Recent Sessions
            </h4>
            <div className="space-y-3">
              {recentSessions?.slice(0, 3).map((session: any, index: number) => (
                <div key={session.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Clock className="text-primary" size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-soft-charcoal">
                        {Math.floor(session.duration / 60)} min
                      </div>
                      <div className="text-xs text-soft-charcoal/60">
                        {new Date(session.completedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-[hsl(var(--gentle-green))] font-medium">
                    {session.wasCompleted ? "Complete" : "Incomplete"}
                  </div>
                </div>
              )) || (
                <div className="text-center py-4 text-soft-charcoal/60">
                  No sessions yet. Start your first meditation!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
