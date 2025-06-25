import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const meditationSessions = pgTable("meditation_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  duration: integer("duration").notNull(), // in seconds
  completedAt: timestamp("completed_at").defaultNow().notNull(),
  sessionType: text("session_type").notNull().default("timer"), // timer, breathing, guided
  soundsUsed: jsonb("sounds_used").$type<string[]>().default([]),
  wasCompleted: boolean("was_completed").notNull().default(false),
});

export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  soundVolumes: jsonb("sound_volumes").$type<Record<string, number>>().default({}),
  masterVolume: integer("master_volume").default(85),
  breathingPattern: text("breathing_pattern").default("4-7-8"),
  intervalBells: boolean("interval_bells").default(true),
  intervalDuration: integer("interval_duration").default(120), // in seconds
  voiceGuidance: boolean("voice_guidance").default(false),
  dailyGoal: integer("daily_goal").default(30), // in minutes
});

export const userStats = pgTable("user_stats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  totalMinutes: integer("total_minutes").default(0),
  totalSessions: integer("total_sessions").default(0),
  currentStreak: integer("current_streak").default(0),
  longestStreak: integer("longest_streak").default(0),
  lastSessionDate: timestamp("last_session_date"),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  achievementType: text("achievement_type").notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow().notNull(),
  value: integer("value"), // milestone value (e.g., 7 for 7-day streak)
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSessionSchema = createInsertSchema(meditationSessions).pick({
  duration: true,
  sessionType: true,
  soundsUsed: true,
  wasCompleted: true,
});

export const insertPreferencesSchema = createInsertSchema(userPreferences).omit({
  id: true,
});

export const insertStatsSchema = createInsertSchema(userStats).omit({
  id: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type MeditationSession = typeof meditationSessions.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type UserPreferences = typeof userPreferences.$inferSelect;
export type InsertPreferences = z.infer<typeof insertPreferencesSchema>;
export type UserStats = typeof userStats.$inferSelect;
export type InsertStats = z.infer<typeof insertStatsSchema>;
export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
