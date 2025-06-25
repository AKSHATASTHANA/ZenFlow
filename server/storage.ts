import { 
  users, 
  meditationSessions, 
  userPreferences, 
  userStats, 
  achievements,
  type User, 
  type InsertUser,
  type MeditationSession,
  type InsertSession,
  type UserPreferences,
  type InsertPreferences,
  type UserStats,
  type InsertStats,
  type Achievement,
  type InsertAchievement
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Session methods
  createSession(userId: number, session: InsertSession): Promise<MeditationSession>;
  getUserSessions(userId: number, limit?: number): Promise<MeditationSession[]>;
  getSessionsByDateRange(userId: number, startDate: Date, endDate: Date): Promise<MeditationSession[]>;

  // Preferences methods
  getUserPreferences(userId: number): Promise<UserPreferences | undefined>;
  updateUserPreferences(userId: number, preferences: Partial<InsertPreferences>): Promise<UserPreferences>;

  // Stats methods
  getUserStats(userId: number): Promise<UserStats | undefined>;
  updateUserStats(userId: number, stats: Partial<InsertStats>): Promise<UserStats>;

  // Achievement methods
  getUserAchievements(userId: number): Promise<Achievement[]>;
  createAchievement(userId: number, achievement: InsertAchievement): Promise<Achievement>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private sessions: Map<number, MeditationSession>;
  private preferences: Map<number, UserPreferences>;
  private stats: Map<number, UserStats>;
  private achievements: Map<number, Achievement>;
  private currentUserId: number;
  private currentSessionId: number;
  private currentPreferencesId: number;
  private currentStatsId: number;
  private currentAchievementId: number;

  constructor() {
    this.users = new Map();
    this.sessions = new Map();
    this.preferences = new Map();
    this.stats = new Map();
    this.achievements = new Map();
    this.currentUserId = 1;
    this.currentSessionId = 1;
    this.currentPreferencesId = 1;
    this.currentStatsId = 1;
    this.currentAchievementId = 1;

    // Create a default user for demo purposes
    this.createUser({ username: "demo", password: "demo" });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);

    // Create default preferences and stats
    await this.updateUserPreferences(id, {});
    await this.updateUserStats(id, {});

    return user;
  }

  async createSession(userId: number, insertSession: InsertSession): Promise<MeditationSession> {
    const id = this.currentSessionId++;
    const session: MeditationSession = {
      ...insertSession,
      id,
      userId,
      completedAt: new Date(),
    };
    this.sessions.set(id, session);

    // Update user stats
    const stats = await this.getUserStats(userId);
    if (stats && insertSession.wasCompleted) {
      const durationMinutes = Math.floor(insertSession.duration / 60);
      await this.updateUserStats(userId, {
        totalMinutes: stats.totalMinutes + durationMinutes,
        totalSessions: stats.totalSessions + 1,
        lastSessionDate: new Date(),
      });

      // Check for streak update
      await this.updateStreak(userId);
      // Check for achievements
      await this.checkAchievements(userId);
    }

    return session;
  }

  async getUserSessions(userId: number, limit = 10): Promise<MeditationSession[]> {
    return Array.from(this.sessions.values())
      .filter(session => session.userId === userId)
      .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())
      .slice(0, limit);
  }

  async getSessionsByDateRange(userId: number, startDate: Date, endDate: Date): Promise<MeditationSession[]> {
    return Array.from(this.sessions.values())
      .filter(session => 
        session.userId === userId &&
        session.completedAt >= startDate &&
        session.completedAt <= endDate
      )
      .sort((a, b) => a.completedAt.getTime() - b.completedAt.getTime());
  }

  async getUserPreferences(userId: number): Promise<UserPreferences | undefined> {
    return Array.from(this.preferences.values()).find(pref => pref.userId === userId);
  }

  async updateUserPreferences(userId: number, updates: Partial<InsertPreferences>): Promise<UserPreferences> {
    const existing = await this.getUserPreferences(userId);
    
    if (existing) {
      const updated: UserPreferences = { ...existing, ...updates };
      this.preferences.set(existing.id, updated);
      return updated;
    } else {
      const id = this.currentPreferencesId++;
      const preferences: UserPreferences = {
        id,
        userId,
        soundVolumes: {},
        masterVolume: 85,
        breathingPattern: "4-7-8",
        intervalBells: true,
        intervalDuration: 120,
        voiceGuidance: false,
        dailyGoal: 30,
        ...updates,
      };
      this.preferences.set(id, preferences);
      return preferences;
    }
  }

  async getUserStats(userId: number): Promise<UserStats | undefined> {
    return Array.from(this.stats.values()).find(stat => stat.userId === userId);
  }

  async updateUserStats(userId: number, updates: Partial<InsertStats>): Promise<UserStats> {
    const existing = await this.getUserStats(userId);
    
    if (existing) {
      const updated: UserStats = { ...existing, ...updates };
      this.stats.set(existing.id, updated);
      return updated;
    } else {
      const id = this.currentStatsId++;
      const stats: UserStats = {
        id,
        userId,
        totalMinutes: 0,
        totalSessions: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastSessionDate: null,
        ...updates,
      };
      this.stats.set(id, stats);
      return stats;
    }
  }

  async getUserAchievements(userId: number): Promise<Achievement[]> {
    return Array.from(this.achievements.values())
      .filter(achievement => achievement.userId === userId)
      .sort((a, b) => b.unlockedAt.getTime() - a.unlockedAt.getTime());
  }

  async createAchievement(userId: number, insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = this.currentAchievementId++;
    const achievement: Achievement = {
      ...insertAchievement,
      id,
      userId,
      unlockedAt: new Date(),
    };
    this.achievements.set(id, achievement);
    return achievement;
  }

  private async updateStreak(userId: number): Promise<void> {
    const sessions = await this.getUserSessions(userId, 100);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let currentDate = new Date(today);
    
    while (true) {
      const hasSessionOnDate = sessions.some(session => {
        const sessionDate = new Date(session.completedAt);
        sessionDate.setHours(0, 0, 0, 0);
        return sessionDate.getTime() === currentDate.getTime() && session.wasCompleted;
      });
      
      if (hasSessionOnDate) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    const stats = await this.getUserStats(userId);
    if (stats) {
      await this.updateUserStats(userId, {
        currentStreak: streak,
        longestStreak: Math.max(stats.longestStreak, streak),
      });
    }
  }

  private async checkAchievements(userId: number): Promise<void> {
    const stats = await this.getUserStats(userId);
    const existingAchievements = await this.getUserAchievements(userId);
    
    if (!stats) return;

    const hasAchievement = (type: string) => 
      existingAchievements.some(a => a.achievementType === type);

    // First session achievement
    if (stats.totalSessions === 1 && !hasAchievement("first_session")) {
      await this.createAchievement(userId, {
        achievementType: "first_session",
        value: 1,
      });
    }

    // Streak achievements
    if (stats.currentStreak >= 7 && !hasAchievement("7_day_streak")) {
      await this.createAchievement(userId, {
        achievementType: "7_day_streak",
        value: 7,
      });
    }

    if (stats.currentStreak >= 30 && !hasAchievement("30_day_streak")) {
      await this.createAchievement(userId, {
        achievementType: "30_day_streak",
        value: 30,
      });
    }

    // Time milestones
    if (stats.totalMinutes >= 100 && !hasAchievement("100_minutes")) {
      await this.createAchievement(userId, {
        achievementType: "100_minutes",
        value: 100,
      });
    }

    if (stats.totalMinutes >= 500 && !hasAchievement("500_minutes")) {
      await this.createAchievement(userId, {
        achievementType: "500_minutes",
        value: 500,
      });
    }
  }
}

export const storage = new MemStorage();
