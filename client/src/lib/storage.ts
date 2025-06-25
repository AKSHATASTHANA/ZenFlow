interface MeditationSession {
  id: string;
  duration: number;
  completedAt: Date;
  sessionType: string;
  soundsUsed: string[];
  wasCompleted: boolean;
}

interface UserPreferences {
  soundVolumes: Record<string, number>;
  masterVolume: number;
  breathingPattern: string;
  intervalBells: boolean;
  intervalDuration: number;
  voiceGuidance: boolean;
  dailyGoal: number;
}

interface UserStats {
  totalMinutes: number;
  totalSessions: number;
  currentStreak: number;
  longestStreak: number;
  lastSessionDate: Date | null;
}

const STORAGE_KEYS = {
  SESSIONS: 'meditation_sessions',
  PREFERENCES: 'user_preferences',  
  STATS: 'user_stats',
};

export class LocalStorage {
  static getSessions(): MeditationSession[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      if (!data) return [];
      
      const sessions = JSON.parse(data);
      return sessions.map((session: any) => ({
        ...session,
        completedAt: new Date(session.completedAt),
      }));
    } catch (error) {
      console.error('Failed to load sessions from localStorage:', error);
      return [];
    }
  }

  static saveSessions(sessions: MeditationSession[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
    } catch (error) {
      console.error('Failed to save sessions to localStorage:', error);
    }
  }

  static addSession(session: Omit<MeditationSession, 'id'>): MeditationSession {
    const sessions = this.getSessions();
    const newSession: MeditationSession = {
      ...session,
      id: Date.now().toString(),
    };
    
    sessions.push(newSession);
    this.saveSessions(sessions);
    
    // Update stats
    if (session.wasCompleted) {
      this.updateStats(session);
    }
    
    return newSession;
  }

  static getPreferences(): UserPreferences {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      if (!data) {
        return this.getDefaultPreferences();
      }
      return { ...this.getDefaultPreferences(), ...JSON.parse(data) };
    } catch (error) {
      console.error('Failed to load preferences from localStorage:', error);
      return this.getDefaultPreferences();
    }
  }

  static savePreferences(preferences: Partial<UserPreferences>): void {
    try {
      const current = this.getPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save preferences to localStorage:', error);
    }
  }

  private static getDefaultPreferences(): UserPreferences {
    return {
      soundVolumes: {},
      masterVolume: 85,
      breathingPattern: '4-7-8',
      intervalBells: true,
      intervalDuration: 120,
      voiceGuidance: false,
      dailyGoal: 30,
    };
  }

  static getStats(): UserStats {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STATS);
      if (!data) {
        return this.getDefaultStats();
      }
      
      const stats = JSON.parse(data);
      return {
        ...stats,
        lastSessionDate: stats.lastSessionDate ? new Date(stats.lastSessionDate) : null,
      };
    } catch (error) {
      console.error('Failed to load stats from localStorage:', error);
      return this.getDefaultStats();
    }
  }

  static saveStats(stats: UserStats): void {
    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    } catch (error) {
      console.error('Failed to save stats to localStorage:', error);
    }
  }

  private static getDefaultStats(): UserStats {
    return {
      totalMinutes: 0,
      totalSessions: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastSessionDate: null,
    };
  }

  private static updateStats(session: Omit<MeditationSession, 'id'>): void {
    const stats = this.getStats();
    const sessionMinutes = Math.floor(session.duration / 60);
    
    stats.totalMinutes += sessionMinutes;
    stats.totalSessions += 1;
    
    // Update streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const lastSession = stats.lastSessionDate ? new Date(stats.lastSessionDate) : null;
    if (lastSession) {
      lastSession.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((today.getTime() - lastSession.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 0) {
        // Same day, no change to streak
      } else if (daysDiff === 1) {
        // Consecutive day, increment streak
        stats.currentStreak += 1;
      } else {
        // Streak broken, reset to 1
        stats.currentStreak = 1;
      }
    } else {
      // First session
      stats.currentStreak = 1;
    }
    
    stats.longestStreak = Math.max(stats.longestStreak, stats.currentStreak);
    stats.lastSessionDate = new Date();
    
    this.saveStats(stats);
  }

  static getWeeklyProgress(): Array<{
    day: string;
    date: string;
    minutes: number;
    sessions: number;
  }> {
    const sessions = this.getSessions();
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const weeklyData = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);
      
      const daySessions = sessions.filter(session => {
        const sessionDate = new Date(session.completedAt);
        return sessionDate.toDateString() === currentDay.toDateString() && session.wasCompleted;
      });
      
      const totalMinutes = daySessions.reduce((sum, session) => 
        sum + Math.floor(session.duration / 60), 0);

      weeklyData.push({
        day: dayNames[i],
        date: currentDay.toISOString().split('T')[0],
        minutes: totalMinutes,
        sessions: daySessions.length,
      });
    }

    return weeklyData;
  }

  static clearAll(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.SESSIONS);
      localStorage.removeItem(STORAGE_KEYS.PREFERENCES); 
      localStorage.removeItem(STORAGE_KEYS.STATS);
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
}
