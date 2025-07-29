import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertAppointmentSchema, 
  insertDepartmentSchema, 
  insertDoctorSchema,
  insertUserSchema,
  insertNewsEventSchema,
  insertGalleryImageSchema,
  insertProjectSchema,
  insertTaskSchema,
  insertMilestoneSchema
} from "@shared/schema";

export function registerRoutes(app: Express): Server {
  // Appointment routes
  app.post("/api/appointments", async (req, res) => {
    try {
      const data = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(data);
      res.json(appointment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/appointments", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const appointments = await storage.getAppointments(limit);
      res.json(appointments);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/appointments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const appointment = await storage.getAppointmentById(id);
      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }
      res.json(appointment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/appointments/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }
      
      const appointment = await storage.updateAppointmentStatus(id, status);
      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }
      res.json(appointment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Department routes
  app.get("/api/departments", async (req, res) => {
    try {
      const departments = await storage.getDepartments();
      res.json(departments);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/departments", async (req, res) => {
    try {
      const data = insertDepartmentSchema.parse(req.body);
      const department = await storage.createDepartment(data);
      res.json(department);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Doctor routes
  app.get("/api/doctors", async (req, res) => {
    try {
      const departmentId = req.query.departmentId ? parseInt(req.query.departmentId as string) : undefined;
      
      if (departmentId) {
        const doctors = await storage.getDoctorsByDepartment(departmentId);
        res.json(doctors);
      } else {
        const doctors = await storage.getDoctors();
        res.json(doctors);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/doctors/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid doctor ID" });
      }
      
      const doctor = await storage.getDoctorById(id);
      if (!doctor) {
        return res.status(404).json({ error: "Doctor not found" });
      }
      
      res.json(doctor);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/doctors", async (req, res) => {
    try {
      const data = insertDoctorSchema.parse(req.body);
      const doctor = await storage.createDoctor(data);
      res.json(doctor);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // User/Auth routes (for admin panel)
  app.post("/api/users", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      const user = await storage.createUser(data);
      res.json({ id: user.id, username: user.username, role: user.role });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      res.json({ id: user.id, username: user.username, role: user.role });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // News and Events routes
  app.get("/api/news-events", async (req, res) => {
    try {
      const type = req.query.type as "news" | "event" | undefined;
      const newsEvents = await storage.getNewsEvents(type);
      res.json(newsEvents);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/news-events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const newsEvent = await storage.getNewsEventById(id);
      if (!newsEvent) {
        return res.status(404).json({ error: "News/Event not found" });
      }
      res.json(newsEvent);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/news-events", async (req, res) => {
    try {
      const data = insertNewsEventSchema.parse(req.body);
      const newsEvent = await storage.createNewsEvent(data);
      res.status(201).json(newsEvent);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/news-events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertNewsEventSchema.partial().parse(req.body);
      const newsEvent = await storage.updateNewsEvent(id, updates);
      if (!newsEvent) {
        return res.status(404).json({ error: "News/Event not found" });
      }
      res.json(newsEvent);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/news-events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteNewsEvent(id);
      if (!deleted) {
        return res.status(404).json({ error: "News/Event not found" });
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Gallery routes
  app.get("/api/gallery", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const galleryImages = await storage.getGalleryImages(category);
      res.json(galleryImages);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/gallery/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const galleryImage = await storage.getGalleryImageById(id);
      if (!galleryImage) {
        return res.status(404).json({ error: "Gallery image not found" });
      }
      res.json(galleryImage);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/gallery", async (req, res) => {
    try {
      const data = insertGalleryImageSchema.parse(req.body);
      const galleryImage = await storage.createGalleryImage(data);
      res.status(201).json(galleryImage);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/gallery/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertGalleryImageSchema.partial().parse(req.body);
      const galleryImage = await storage.updateGalleryImage(id, updates);
      if (!galleryImage) {
        return res.status(404).json({ error: "Gallery image not found" });
      }
      res.json(galleryImage);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/gallery/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteGalleryImage(id);
      if (!deleted) {
        return res.status(404).json({ error: "Gallery image not found" });
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Stats endpoint for dashboard
  app.get("/api/stats", async (req, res) => {
    try {
      const appointments = await storage.getAppointments();
      const departments = await storage.getDepartments();
      const doctors = await storage.getDoctors();
      
      const projects = await storage.getProjects();
      const tasks = await storage.getTasks();
      
      const stats = {
        totalAppointments: appointments.length,
        pendingAppointments: appointments.filter(a => a.status === "pending").length,
        confirmedAppointments: appointments.filter(a => a.status === "confirmed").length,
        totalDepartments: departments.length,
        totalDoctors: doctors.length,
        totalProjects: projects.length,
        activeProjects: projects.filter(p => p.status === "active").length,
        totalTasks: tasks.length,
        completedTasks: tasks.filter(t => t.status === "completed").length,
        totalPatients: 245000, // 2.45 lakh patients served
        emergencyServices: 24,
        bedCapacity: 850,
        surgicalProcedures: 15000
      };
      
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Project Management Routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProjectById(parseInt(req.params.id));
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const data = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(data);
      res.status(201).json(project);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.updateProject(parseInt(req.params.id), req.body);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Task Routes
  app.get("/api/tasks", async (req, res) => {
    try {
      const projectId = req.query.projectId ? parseInt(req.query.projectId as string) : undefined;
      const tasks = await storage.getTasks(projectId);
      res.json(tasks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/tasks/:id", async (req, res) => {
    try {
      const task = await storage.getTaskById(parseInt(req.params.id));
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json(task);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/tasks", async (req, res) => {
    try {
      const data = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(data);
      res.status(201).json(task);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/tasks/:id", async (req, res) => {
    try {
      const task = await storage.updateTask(parseInt(req.params.id), req.body);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json(task);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    try {
      await storage.deleteTask(parseInt(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Milestone Routes
  app.get("/api/milestones", async (req, res) => {
    try {
      const projectId = req.query.projectId ? parseInt(req.query.projectId as string) : undefined;
      const milestones = await storage.getMilestones(projectId);
      res.json(milestones);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/milestones", async (req, res) => {
    try {
      const data = insertMilestoneSchema.parse(req.body);
      const milestone = await storage.createMilestone(data);
      res.status(201).json(milestone);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/milestones/:id", async (req, res) => {
    try {
      const milestone = await storage.updateMilestone(parseInt(req.params.id), req.body);
      if (!milestone) {
        return res.status(404).json({ error: "Milestone not found" });
      }
      res.json(milestone);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}