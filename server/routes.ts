import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSessionSchema, insertPreferencesSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const DEFAULT_USER_ID = 1; // Using demo user for this implementation

  // Get user stats
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getUserStats(DEFAULT_USER_ID);
      const preferences = await storage.getUserPreferences(DEFAULT_USER_ID);
      
      if (!stats) {
        return res.status(404).json({ message: "Stats not found" });
      }

      res.json({ stats, preferences });
    } catch (error) {
      res.status(500).json({ message: "Failed to get stats" });
    }
  });

  // Get recent sessions
  app.get("/api/sessions", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const sessions = await storage.getUserSessions(DEFAULT_USER_ID, limit);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Failed to get sessions" });
    }
  });

  // Get sessions by date range for progress tracking
  app.get("/api/sessions/range", async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({ message: "Start date and end date are required" });
      }

      const sessions = await storage.getSessionsByDateRange(
        DEFAULT_USER_ID,
        new Date(startDate as string),
        new Date(endDate as string)
      );
      
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Failed to get sessions by date range" });
    }
  });

  // Create a new meditation session
  app.post("/api/sessions", async (req, res) => {
    try {
      const validatedData = insertSessionSchema.parse(req.body);
      const session = await storage.createSession(DEFAULT_USER_ID, validatedData);
      res.status(201).json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid session data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create session" });
    }
  });

  // Get user preferences
  app.get("/api/preferences", async (req, res) => {
    try {
      const preferences = await storage.getUserPreferences(DEFAULT_USER_ID);
      if (!preferences) {
        return res.status(404).json({ message: "Preferences not found" });
      }
      res.json(preferences);
    } catch (error) {
      res.status(500).json({ message: "Failed to get preferences" });
    }
  });

  // Update user preferences
  app.patch("/api/preferences", async (req, res) => {
    try {
      const updates = req.body;
      const preferences = await storage.updateUserPreferences(DEFAULT_USER_ID, updates);
      res.json(preferences);
    } catch (error) {
      res.status(500).json({ message: "Failed to update preferences" });
    }
  });

  // Get user achievements
  app.get("/api/achievements", async (req, res) => {
    try {
      const achievements = await storage.getUserAchievements(DEFAULT_USER_ID);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Failed to get achievements" });
    }
  });

  // Get weekly progress data
  app.get("/api/progress/weekly", async (req, res) => {
    try {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      const sessions = await storage.getSessionsByDateRange(DEFAULT_USER_ID, startOfWeek, endOfWeek);
      
      // Group sessions by day
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

      res.json(weeklyData);
    } catch (error) {
      res.status(500).json({ message: "Failed to get weekly progress" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
