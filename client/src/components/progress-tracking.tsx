import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Clock, Star, Flame } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const ACHIEVEMENT_TYPES = {
  first_session: {
    title: "First Session",
    description: "Completed your first meditation",
    icon: Clock,
    color: "text-primary"
  },
  "7_day_streak": {
    title: "7-Day Streak",
    description: "Meditated for 7 days in a row",
    icon: Flame,
    color: "text-[hsl(var(--gentle-green))]"
  },
  "30_day_streak": {
    title: "30-Day Challenger",
    description: "Meditated for 30 days straight",
    icon: Trophy,
    color: "text-secondary"
  },
  "100_minutes": {
    title: "100 Minutes",
    description: "Total meditation time milestone",
    icon: Star,
    color: "text-secondary"
  },
  "500_minutes": {
    title: "500 Minutes",
    description: "Reached 500 minutes of meditation",
    icon: Trophy,
    color: "text-primary"
  }
};

export default function ProgressTracking() {
  const { data: weeklyData } = useQuery({
    queryKey: ["/api/progress/weekly"],
  });

  const { data: achievements } = useQuery({
    queryKey: ["/api/achievements"],
  });

  const { data: statsData } = useQuery({
    queryKey: ["/api/stats"],
  });

  const stats = statsData?.stats;
  
  // Calculate weekly totals
  const weeklyTotal = weeklyData?.reduce((sum: number, day: any) => sum + day.minutes, 0) || 0;
  const sessionsCount = weeklyData?.reduce((sum: number, day: any) => sum + day.sessions, 0) || 0;
  const averageDaily = weeklyData ? Math.round(weeklyTotal / 7) : 0;

  // Get max value for chart scaling
  const maxMinutes = weeklyData ? Math.max(...weeklyData.map((day: any) => day.minutes), 1) : 1;

  // Calculate progress to next milestone
  const currentStreak = stats?.currentStreak || 0;
  const nextMilestone = currentStreak < 7 ? 7 : currentStreak < 30 ? 30 : 100;
  const milestoneProgress = (currentStreak / nextMilestone) * 100;

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Weekly Progress Chart */}
      <div className="lg:col-span-2">
        <Card className="card-float">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-soft-charcoal">
                Weekly Progress
              </h3>
              <div className="flex space-x-2">
                <Button size="sm" className="bg-primary text-white">
                  Week
                </Button>
                <Button size="sm" variant="outline">
                  Month
                </Button>
                <Button size="sm" variant="outline">
                  Year
                </Button>
              </div>
            </div>
            
            {/* Chart Area */}
            <div className="h-64 bg-muted rounded-lg p-6 mb-6">
              <div className="flex items-end justify-between h-full space-x-2">
                {weeklyData?.map((day: any, index: number) => {
                  const height = maxMinutes > 0 ? (day.minutes / maxMinutes) * 100 : 20;
                  const isToday = new Date(day.date).toDateString() === new Date().toDateString();
                  
                  return (
                    <div key={day.date} className="flex flex-col items-center flex-1">
                      <div
                        className={`w-full rounded-t transition-all ${
                          day.minutes > 0
                            ? isToday
                              ? "bg-gradient-to-t from-[hsl(var(--gentle-green))] to-primary"
                              : "bg-gradient-to-t from-primary to-secondary"
                            : "bg-soft-charcoal/10"
                        }`}
                        style={{ height: `${Math.max(height, 10)}%` }}
                      />
                      <div className="text-xs text-soft-charcoal/60 mt-2">
                        {day.day}
                      </div>
                      <div className="text-xs font-medium text-soft-charcoal">
                        {day.minutes}m
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Weekly Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {weeklyTotal}
                </div>
                <div className="text-sm text-soft-charcoal/60">
                  total minutes
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[hsl(var(--gentle-green))]">
                  {averageDaily}
                </div>
                <div className="text-sm text-soft-charcoal/60">
                  daily average
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">
                  {sessionsCount}
                </div>
                <div className="text-sm text-soft-charcoal/60">
                  sessions
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Achievements & Milestones */}
      <div className="space-y-6">
        {/* Achievements */}
        <Card className="card-float">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-soft-charcoal mb-4">
              Achievements
            </h4>
            <div className="space-y-4">
              {achievements?.slice(0, 3).map((achievement: any) => {
                const achievementInfo = ACHIEVEMENT_TYPES[achievement.achievementType as keyof typeof ACHIEVEMENT_TYPES];
                if (!achievementInfo) return null;
                
                const IconComponent = achievementInfo.icon;
                
                return (
                  <div
                    key={achievement.id}
                    className="flex items-center space-x-3 p-3 bg-[hsl(var(--gentle-green))]/10 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-[hsl(var(--gentle-green))] rounded-full flex items-center justify-center">
                      <IconComponent className="text-white" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-soft-charcoal">
                        {achievementInfo.title}
                      </div>
                      <div className="text-xs text-soft-charcoal/60">
                        {achievementInfo.description}
                      </div>
                    </div>
                  </div>
                );
              }) || (
                <div className="text-center py-4 text-soft-charcoal/60">
                  No achievements yet. Keep meditating!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Next Milestone */}
        <Card className="card-float">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-soft-charcoal mb-4">
              Next Milestone
            </h4>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="text-primary" size={24} />
              </div>
              <div className="font-semibold text-soft-charcoal mb-2">
                {nextMilestone === 7 ? "7-Day Streak" : 
                 nextMilestone === 30 ? "30-Day Challenger" : "100-Day Master"}
              </div>
              <div className="text-sm text-soft-charcoal/60 mb-4">
                {nextMilestone === 7 ? "Meditate for 7 days straight" :
                 nextMilestone === 30 ? "Meditate for 30 days straight" : "Meditate for 100 days straight"}
              </div>
              
              <Progress value={milestoneProgress} className="mb-2" />
              <div className="text-xs text-soft-charcoal/60">
                {currentStreak} of {nextMilestone} days complete
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <Card className="card-float">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-soft-charcoal mb-4">
              All Time Stats
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-soft-charcoal/60">Total Minutes</span>
                <span className="font-semibold">{stats?.totalMinutes || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-soft-charcoal/60">Total Sessions</span>
                <span className="font-semibold">{stats?.totalSessions || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-soft-charcoal/60">Longest Streak</span>
                <span className="font-semibold">{stats?.longestStreak || 0} days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
