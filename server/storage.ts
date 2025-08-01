import type {
  User,
  InsertUser,
  Appointment,
  InsertAppointment,
  Department,
  InsertDepartment,
  Doctor,
  InsertDoctor,
  NewsEvent,
  InsertNewsEvent,
  GalleryImage,
  InsertGalleryImage,
  Project,
  InsertProject,
  Task,
  InsertTask,
  Milestone,
  InsertMilestone,
  TaskDependency,
  InsertTaskDependency,
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Appointment methods
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointments(limit?: number): Promise<Appointment[]>;
  getAppointmentById(id: number): Promise<Appointment | undefined>;
  updateAppointmentStatus(
    id: number,
    status: string,
  ): Promise<Appointment | undefined>;
  getAppointmentsByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<Appointment[]>;

  // Department methods
  getDepartments(): Promise<Department[]>;
  createDepartment(department: InsertDepartment): Promise<Department>;

  // Doctor methods
  getDoctors(): Promise<Doctor[]>;
  getDoctorById(id: number): Promise<Doctor | undefined>;
  getDoctorsByDepartment(departmentId: number): Promise<Doctor[]>;
  createDoctor(doctor: InsertDoctor): Promise<Doctor>;

  // News and Events methods
  getNewsEvents(type?: "news" | "event"): Promise<NewsEvent[]>;
  getNewsEventById(id: number): Promise<NewsEvent | undefined>;
  createNewsEvent(newsEvent: InsertNewsEvent): Promise<NewsEvent>;
  updateNewsEvent(
    id: number,
    updates: Partial<InsertNewsEvent>,
  ): Promise<NewsEvent | undefined>;
  deleteNewsEvent(id: number): Promise<boolean>;

  // Gallery methods
  getGalleryImages(category?: string): Promise<GalleryImage[]>;
  getGalleryImageById(id: number): Promise<GalleryImage | undefined>;
  createGalleryImage(galleryImage: InsertGalleryImage): Promise<GalleryImage>;
  updateGalleryImage(
    id: number,
    updates: Partial<InsertGalleryImage>,
  ): Promise<GalleryImage | undefined>;
  deleteGalleryImage(id: number): Promise<boolean>;

  // Project methods
  getProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(
    id: number,
    updates: Partial<InsertProject>,
  ): Promise<Project | undefined>;

  // Task methods
  getTasks(projectId?: number): Promise<Task[]>;
  getTaskById(id: number): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(
    id: number,
    updates: Partial<InsertTask>,
  ): Promise<Task | undefined>;
  deleteTask(id: number): Promise<boolean>;

  // Milestone methods
  getMilestones(projectId?: number): Promise<Milestone[]>;
  getMilestoneById(id: number): Promise<Milestone | undefined>;
  createMilestone(milestone: InsertMilestone): Promise<Milestone>;
  updateMilestone(
    id: number,
    updates: Partial<InsertMilestone>,
  ): Promise<Milestone | undefined>;

  // Task dependency methods
  getTaskDependencies(taskId: number): Promise<TaskDependency[]>;
  createTaskDependency(
    dependency: InsertTaskDependency,
  ): Promise<TaskDependency>;
  deleteTaskDependency(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private appointments: Map<number, Appointment>;
  private departments: Map<number, Department>;
  private doctors: Map<number, Doctor>;
  private newsEvents: Map<number, NewsEvent>;
  private galleryImages: Map<number, GalleryImage>;
  private projects: Map<number, Project>;
  private tasks: Map<number, Task>;
  private milestones: Map<number, Milestone>;
  private taskDependencies: Map<number, TaskDependency>;
  private currentUserId: number;
  private currentAppointmentId: number;
  private currentDepartmentId: number;
  private currentDoctorId: number;
  private currentNewsEventId: number;
  private currentGalleryImageId: number;
  private currentProjectId: number;
  private currentTaskId: number;
  private currentMilestoneId: number;
  private currentDependencyId: number;

  constructor() {
    this.users = new Map();
    this.appointments = new Map();
    this.departments = new Map();
    this.doctors = new Map();
    this.newsEvents = new Map();
    this.galleryImages = new Map();
    this.projects = new Map();
    this.tasks = new Map();
    this.milestones = new Map();
    this.taskDependencies = new Map();
    this.currentUserId = 1;
    this.currentAppointmentId = 1;
    this.currentDepartmentId = 1;
    this.currentDoctorId = 1;
    this.currentNewsEventId = 1;
    this.currentGalleryImageId = 1;
    this.currentProjectId = 1;
    this.currentTaskId = 1;
    this.currentMilestoneId = 1;
    this.currentDependencyId = 1;

    // Initialize with sample data
    this.initializeSampleData();
    this.initializeNewsEvents();
    this.initializeGallery();
    this.initializeProjectData();
  }

  private async initializeSampleData() {
    // Create admin user
    const adminUser: User = {
      id: this.currentUserId++,
      username: "admin",
      password: "admin123",
      role: "admin",
      createdAt: new Date(),
    };
    this.users.set(adminUser.id, adminUser);

    // Create departments
    const departments = [
      {
        name: "Gynecology",
        description: "Women's health and reproductive system",
        headDoctor: "Dr. Soma Shaw Gupta",
      },
      {
        name: "Neurology",
        description: "Brain and nervous system disorders",
        headDoctor: "Dr. Amit Patel",
      },
      {
        name: "General Medicine",
        description: "Internal medicine and general health",
        headDoctor: "Dr. P P Mishra",
      },
      {
        name: "General Surgery",
        description: "Surgical procedures and operations",
        headDoctor: "Dr. Naveen Kumar Maurya",
      },
      {
        name: "Pediatrics",
        description: "Children's health and medical care",
        headDoctor: "Dr. Saurabh Singh",
      },
      {
        name: "Emergency Medicine",
        description: "Critical care and emergency treatment",
        headDoctor: "Dr. Mayank Rajput",
      },
      {
        name: "Neurosurgery",
        description: "Brain and spine surgical procedures",
        headDoctor: "Dr. Amit Patel",
      },
      {
        name: "Pathology",
        description: "Disease diagnosis and laboratory services",
        headDoctor: "Dr. Mohd. Dawd Akhtar",
      },
      {
        name: "Anesthesiology",
        description: "Anesthesia and pain management",
        headDoctor: "Dr. Asrar Ahmad",
      },
    ];

    for (const dept of departments) {
      const department: Department = {
        id: this.currentDepartmentId++,
        ...dept,
      };
      this.departments.set(department.id, department);
    }

    // Create doctors - Corrected authentic list
    const doctors = [
      {
        name: "Dr. P P Mishra",
        specialization: "Medicine Specialist",
        departmentId: 3,
        qualifications: "MBBS, MD (Medicine)",
        experience: 12,
      },
      {
        name: "Dr. Soma Shaw Gupta",
        specialization: "Medical Consultant",
        departmentId: 2,
        qualifications: "MBBS, MC",
        experience: 14,
      },
      {
        name: "Dr. Khalid Jamed",
        specialization: "General Surgeon",
        departmentId: 4,
        qualifications: "MBBS, M.S",
        experience: 18,
      },
      {
        name: "Dr. Vishrut Bharti",
        specialization: "Gynecologist",
        departmentId: 1,
        qualifications: "MBBS, MS, MCH (Gynecology)",
        experience: 20,
      },
      {
        name: "Dr. Naveen Kumar Maurya",
        specialization: "General Surgeon",
        departmentId: 4,
        qualifications: "MBBS, MS",
        experience: 16,
      },
      {
        name: "Dr. Saurabh Singh",
        specialization: "Pediatrician",
        departmentId: 5,
        qualifications: "MBBS, MD (Pediatrics)",
        experience: 10,
      },
      {
        name: "Dr. Mayank Rajput",
        specialization: "Medical Officer",
        departmentId: 6,
        qualifications: "MBBS, MD",
        experience: 8,
      },
      {
        name: "Dr. Amit Patel",
        specialization: "Neurosurgeon",
        departmentId: 7,
        qualifications: "MBBS, MS, MCH (Neurosurgery)",
        experience: 22,
      },
      {
        name: "Dr. Mohd. Dawd Akhtar",
        specialization: "Pathologist",
        departmentId: 8,
        qualifications: "MBBS, MD (Pathology)",
        experience: 15,
      },
      {
        name: "Dr. Asrar Ahmad",
        specialization: "Anesthesiologist",
        departmentId: 9,
        qualifications: "MD (Anesthesia)",
        experience: 13,
      },
    ];

    for (const doc of doctors) {
      const doctor: Doctor = {
        id: this.currentDoctorId++,
        ...doc,
        image: null,
      };
      this.doctors.set(doctor.id, doctor);
    }

    // Create sample appointments
    const sampleAppointments = [
      {
        patientName: "John Doe",
        email: "john.doe@email.com",
        phone: "555-0123",
        age: 35,
        gender: "Male",
        department: "Gynecology",
        doctorId: 4 as number, // Dr. Vishrut Bharti
        preferredDate: new Date("2025-01-15"),
        preferredTime: "10:00 AM",
        reasonForVisit: "Chest pain and shortness of breath",
        status: "pending",
      },
      {
        patientName: "Jane Smith",
        email: "jane.smith@email.com",
        phone: "555-0124",
        age: 28,
        gender: "Female",
        department: "Neurology",
        doctorId: 3 as number, // Dr. Soma Shaw Gupta
        preferredDate: new Date("2025-01-16"),
        preferredTime: "2:00 PM",
        reasonForVisit: "Frequent headaches",
        status: "confirmed",
      },
    ];

    for (const apt of sampleAppointments) {
      const appointment: Appointment = {
        id: this.currentAppointmentId++,
        ...apt,
        createdAt: new Date(),
      };
      this.appointments.set(appointment.id, appointment);
    }
  }

  private async initializeNewsEvents() {
    const sampleNewsEvents = [
      {
        title: "New Cardiology Wing Opens",
        content:
          "We are excited to announce the opening of our state-of-the-art cardiology wing with advanced diagnostic equipment and treatment facilities.",
        type: "news",
        imageUrl: null,
        eventDate: null,
        isPublished: true,
      },
      {
        title: "Free Health Checkup Camp",
        content:
          "Join us for a comprehensive free health checkup camp on January 30th, 2025. Services include blood pressure monitoring, diabetes screening, and general consultation.",
        type: "event",
        imageUrl: null,
        eventDate: new Date("2025-01-30"),
        isPublished: true,
      },
      {
        title: "Hospital Accreditation Achievement",
        content:
          "Shri Krishna Mission Hospital has successfully received NABH accreditation, marking our commitment to quality healthcare services.",
        type: "news",
        imageUrl: null,
        eventDate: null,
        isPublished: true,
      },
    ];

    for (const newsEvent of sampleNewsEvents) {
      const item: NewsEvent = {
        id: this.currentNewsEventId++,
        title: newsEvent.title,
        content: newsEvent.content,
        type: newsEvent.type as "news" | "event",
        imageUrl: newsEvent.imageUrl,
        eventDate: newsEvent.eventDate,
        isPublished: newsEvent.isPublished,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.newsEvents.set(item.id, item);
    }
  }

  private async initializeGallery() {
    const sampleGalleryImages = [
      {
        title: "Modern Operation Theater",
        description:
          "State-of-the-art surgical facilities with advanced equipment",
        imageUrl: "/images/hospital.jpeg",
        category: "facility",
        isVisible: true,
      },
      {
        title: "Emergency Department",
        description: "24/7 emergency services with rapid response capabilities",
        imageUrl: "/images/hospital.jpeg",
        category: "facility",
        isVisible: true,
      },
      {
        title: "Medical Equipment",
        description: "Latest diagnostic and treatment equipment",
        imageUrl: "/images/hospital.jpeg",
        category: "equipment",
        isVisible: true,
      },
    ];

    for (const galleryImage of sampleGalleryImages) {
      const item: GalleryImage = {
        id: this.currentGalleryImageId++,
        title: galleryImage.title,
        description: galleryImage.description,
        imageUrl: galleryImage.imageUrl,
        category: galleryImage.category,
        isVisible: galleryImage.isVisible,
        createdAt: new Date(),
      };
      this.galleryImages.set(item.id, item);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const users = Array.from(this.users.values());
    return users.find((user) => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.currentUserId++,
      username: insertUser.username,
      password: insertUser.password,
      role: insertUser.role || "patient",
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  async createAppointment(
    insertAppointment: InsertAppointment,
  ): Promise<Appointment> {
    const appointment: Appointment = {
      id: this.currentAppointmentId++,
      ...insertAppointment,
      doctorId: insertAppointment.doctorId || null,
      preferredDate: new Date(insertAppointment.preferredDate),
      status: "pending",
      createdAt: new Date(),
    };
    this.appointments.set(appointment.id, appointment);
    return appointment;
  }

  async getAppointments(limit = 50): Promise<Appointment[]> {
    const appointments = Array.from(this.appointments.values());
    return appointments
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async getAppointmentById(id: number): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }

  async updateAppointmentStatus(
    id: number,
    status: string,
  ): Promise<Appointment | undefined> {
    const appointment = this.appointments.get(id);
    if (appointment) {
      appointment.status = status;
      this.appointments.set(id, appointment);
      return appointment;
    }
    return undefined;
  }

  async getAppointmentsByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<Appointment[]> {
    const appointments = Array.from(this.appointments.values());
    return appointments.filter(
      (apt) => apt.preferredDate >= startDate && apt.preferredDate <= endDate,
    );
  }

  async getDepartments(): Promise<Department[]> {
    return Array.from(this.departments.values());
  }

  async createDepartment(
    insertDepartment: InsertDepartment,
  ): Promise<Department> {
    const department: Department = {
      id: this.currentDepartmentId++,
      name: insertDepartment.name,
      description: insertDepartment.description || null,
      headDoctor: insertDepartment.headDoctor || null,
    };
    this.departments.set(department.id, department);
    return department;
  }

  async getDoctors(): Promise<Doctor[]> {
    return Array.from(this.doctors.values());
  }

  async getDoctorById(id: number): Promise<Doctor | undefined> {
    return this.doctors.get(id);
  }

  async getDoctorsByDepartment(departmentId: number): Promise<Doctor[]> {
    const doctors = Array.from(this.doctors.values());
    return doctors.filter((doc) => doc.departmentId === departmentId);
  }

  async createDoctor(insertDoctor: InsertDoctor): Promise<Doctor> {
    const doctor: Doctor = {
      id: this.currentDoctorId++,
      name: insertDoctor.name,
      specialization: insertDoctor.specialization,
      departmentId: insertDoctor.departmentId || null,
      qualifications: insertDoctor.qualifications,
      experience: insertDoctor.experience,
      image: insertDoctor.image || null,
    };
    this.doctors.set(doctor.id, doctor);
    return doctor;
  }

  // Project methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const project: Project = {
      id: this.currentProjectId++,
      name: insertProject.name,
      description: insertProject.description || null,
      startDate: new Date(insertProject.startDate),
      endDate: new Date(insertProject.endDate),
      status: insertProject.status || "active",
      progress: insertProject.progress || 0,
      priority: insertProject.priority || "medium",
      managerId: insertProject.managerId || null,
      createdAt: new Date(),
    };
    this.projects.set(project.id, project);
    return project;
  }

  async updateProject(
    id: number,
    updates: Partial<InsertProject>,
  ): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (project) {
      const updatedProject = { ...project, ...updates };
      if (updates.startDate)
        updatedProject.startDate = new Date(updates.startDate);
      if (updates.endDate) updatedProject.endDate = new Date(updates.endDate);
      this.projects.set(id, updatedProject);
      return updatedProject;
    }
    return undefined;
  }

  // Task methods
  async getTasks(projectId?: number): Promise<Task[]> {
    const tasks = Array.from(this.tasks.values());
    return projectId
      ? tasks.filter((task) => task.projectId === projectId)
      : tasks;
  }

  async getTaskById(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const task: Task = {
      id: this.currentTaskId++,
      projectId: insertTask.projectId,
      parentId: insertTask.parentId || null,
      name: insertTask.name,
      description: insertTask.description || null,
      activity: insertTask.activity || null,
      subActivity: insertTask.subActivity || null,
      startDate: new Date(insertTask.startDate),
      endDate: new Date(insertTask.endDate),
      actualStartDate: insertTask.actualStartDate
        ? new Date(insertTask.actualStartDate)
        : null,
      actualEndDate: insertTask.actualEndDate
        ? new Date(insertTask.actualEndDate)
        : null,
      duration: insertTask.duration || 1,
      progress: insertTask.progress || 0,
      status: insertTask.status || "pending",
      priority: insertTask.priority || "medium",
      assigneeId: insertTask.assigneeId || null,
      contractor: insertTask.contractor || null,
      location: insertTask.location || null,
      hierarchy: insertTask.hierarchy || null,
      materials: insertTask.materials || null,
      photoUrl: insertTask.photoUrl || null,
      notes: insertTask.notes || null,
      updatedBy: insertTask.updatedBy || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tasks.set(task.id, task);
    return task;
  }

  async updateTask(
    id: number,
    updates: Partial<InsertTask>,
  ): Promise<Task | undefined> {
    const task = this.tasks.get(id);
    if (task) {
      const updatedTask = { ...task, ...updates, updatedAt: new Date() };
      if (updates.startDate)
        updatedTask.startDate = new Date(updates.startDate);
      if (updates.endDate) updatedTask.endDate = new Date(updates.endDate);
      if (updates.actualStartDate)
        updatedTask.actualStartDate = new Date(updates.actualStartDate);
      if (updates.actualEndDate)
        updatedTask.actualEndDate = new Date(updates.actualEndDate);
      this.tasks.set(id, updatedTask);
      return updatedTask;
    }
    return undefined;
  }

  async deleteTask(id: number): Promise<boolean> {
    return this.tasks.delete(id);
  }

  // Milestone methods
  async getMilestones(projectId?: number): Promise<Milestone[]> {
    const milestones = Array.from(this.milestones.values());
    return projectId
      ? milestones.filter((milestone) => milestone.projectId === projectId)
      : milestones;
  }

  async getMilestoneById(id: number): Promise<Milestone | undefined> {
    return this.milestones.get(id);
  }

  async createMilestone(insertMilestone: InsertMilestone): Promise<Milestone> {
    const milestone: Milestone = {
      id: this.currentMilestoneId++,
      projectId: insertMilestone.projectId,
      name: insertMilestone.name,
      description: insertMilestone.description || null,
      targetDate: new Date(insertMilestone.targetDate),
      actualDate: insertMilestone.actualDate
        ? new Date(insertMilestone.actualDate)
        : null,
      status: insertMilestone.status || "pending",
      ownerId: insertMilestone.ownerId || null,
      createdAt: new Date(),
    };
    this.milestones.set(milestone.id, milestone);
    return milestone;
  }

  async updateMilestone(
    id: number,
    updates: Partial<InsertMilestone>,
  ): Promise<Milestone | undefined> {
    const milestone = this.milestones.get(id);
    if (milestone) {
      const updatedMilestone = { ...milestone, ...updates };
      if (updates.targetDate)
        updatedMilestone.targetDate = new Date(updates.targetDate);
      if (updates.actualDate)
        updatedMilestone.actualDate = new Date(updates.actualDate);
      this.milestones.set(id, updatedMilestone);
      return updatedMilestone;
    }
    return undefined;
  }

  // Task dependency methods
  async getTaskDependencies(taskId: number): Promise<TaskDependency[]> {
    const dependencies = Array.from(this.taskDependencies.values());
    return dependencies.filter((dep) => dep.taskId === taskId);
  }

  async createTaskDependency(
    insertDependency: InsertTaskDependency,
  ): Promise<TaskDependency> {
    const dependency: TaskDependency = {
      id: this.currentDependencyId++,
      taskId: insertDependency.taskId,
      dependsOnTaskId: insertDependency.dependsOnTaskId,
      type: insertDependency.type || "finish-to-start",
    };
    this.taskDependencies.set(dependency.id, dependency);
    return dependency;
  }

  async deleteTaskDependency(id: number): Promise<boolean> {
    return this.taskDependencies.delete(id);
  }

  // News and Events methods
  async getNewsEvents(type?: "news" | "event"): Promise<NewsEvent[]> {
    const newsEvents = Array.from(this.newsEvents.values());
    const filtered = type
      ? newsEvents.filter((item) => item.type === type)
      : newsEvents;
    return filtered
      .filter((item) => item.isPublished)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getNewsEventById(id: number): Promise<NewsEvent | undefined> {
    return this.newsEvents.get(id);
  }

  async createNewsEvent(insertNewsEvent: InsertNewsEvent): Promise<NewsEvent> {
    const newsEvent: NewsEvent = {
      id: this.currentNewsEventId++,
      title: insertNewsEvent.title,
      content: insertNewsEvent.content,
      type: insertNewsEvent.type,
      imageUrl: insertNewsEvent.imageUrl || null,
      eventDate: insertNewsEvent.eventDate
        ? new Date(insertNewsEvent.eventDate)
        : null,
      isPublished: insertNewsEvent.isPublished ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.newsEvents.set(newsEvent.id, newsEvent);
    return newsEvent;
  }

  async updateNewsEvent(
    id: number,
    updates: Partial<InsertNewsEvent>,
  ): Promise<NewsEvent | undefined> {
    const newsEvent = this.newsEvents.get(id);
    if (newsEvent) {
      const updatedNewsEvent = {
        ...newsEvent,
        ...updates,
        updatedAt: new Date(),
      };
      if (updates.eventDate)
        updatedNewsEvent.eventDate = new Date(updates.eventDate);
      this.newsEvents.set(id, updatedNewsEvent);
      return updatedNewsEvent;
    }
    return undefined;
  }

  async deleteNewsEvent(id: number): Promise<boolean> {
    return this.newsEvents.delete(id);
  }

  // Gallery methods
  async getGalleryImages(category?: string): Promise<GalleryImage[]> {
    const galleryImages = Array.from(this.galleryImages.values());
    const filtered = category
      ? galleryImages.filter((item) => item.category === category)
      : galleryImages;
    return filtered
      .filter((item) => item.isVisible)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getGalleryImageById(id: number): Promise<GalleryImage | undefined> {
    return this.galleryImages.get(id);
  }

  async createGalleryImage(
    insertGalleryImage: InsertGalleryImage,
  ): Promise<GalleryImage> {
    const galleryImage: GalleryImage = {
      id: this.currentGalleryImageId++,
      title: insertGalleryImage.title,
      description: insertGalleryImage.description || null,
      imageUrl: insertGalleryImage.imageUrl,
      category: insertGalleryImage.category,
      isVisible: insertGalleryImage.isVisible ?? true,
      createdAt: new Date(),
    };
    this.galleryImages.set(galleryImage.id, galleryImage);
    return galleryImage;
  }

  async updateGalleryImage(
    id: number,
    updates: Partial<InsertGalleryImage>,
  ): Promise<GalleryImage | undefined> {
    const galleryImage = this.galleryImages.get(id);
    if (galleryImage) {
      const updatedGalleryImage = { ...galleryImage, ...updates };
      this.galleryImages.set(id, updatedGalleryImage);
      return updatedGalleryImage;
    }
    return undefined;
  }

  async deleteGalleryImage(id: number): Promise<boolean> {
    return this.galleryImages.delete(id);
  }

  private async initializeProjectData() {
    // Create sample projects
    const sampleProjects = [
      {
        name: "Hospital Construction Phase 1",
        description: "Main building structure and foundation work",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-06-30"),
        status: "active",
        progress: 65,
        priority: "high",
        managerId: 1,
      },
      {
        name: "Medical Equipment Installation",
        description: "Installation of critical medical equipment",
        startDate: new Date("2024-04-01"),
        endDate: new Date("2024-08-31"),
        status: "active",
        progress: 30,
        priority: "critical",
        managerId: 1,
      },
    ];

    for (const projectData of sampleProjects) {
      const project: Project = {
        id: this.currentProjectId++,
        name: projectData.name,
        description: projectData.description,
        startDate: projectData.startDate,
        endDate: projectData.endDate,
        status: projectData.status,
        progress: projectData.progress,
        priority: projectData.priority,
        managerId: projectData.managerId,
        createdAt: new Date(),
      };
      this.projects.set(project.id, project);
    }

    // Create sample tasks for first project
    const sampleTasks = [
      {
        projectId: 1,
        name: "Foundation Excavation",
        description:
          "Excavate foundation area according to architectural plans",
        activity: "Civil Work",
        subActivity: "Foundation",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-15"),
        duration: 15,
        progress: 100,
        status: "completed",
        priority: "high",
        contractor: "ABC Construction Co.",
        location: "Building A - Ground Level",
      },
      {
        projectId: 1,
        name: "Concrete Pouring",
        description: "Pour concrete for foundation base",
        activity: "Civil Work",
        subActivity: "Foundation",
        startDate: new Date("2024-01-16"),
        endDate: new Date("2024-01-25"),
        duration: 10,
        progress: 85,
        status: "in-progress",
        priority: "high",
        contractor: "ABC Construction Co.",
        location: "Building A - Ground Level",
      },
      {
        projectId: 1,
        name: "Steel Frame Installation",
        description: "Install main steel framework structure",
        activity: "Structural Work",
        subActivity: "Frame Installation",
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-03-15"),
        duration: 44,
        progress: 40,
        status: "in-progress",
        priority: "critical",
        contractor: "Steel Works Ltd.",
        location: "Building A - Levels 1-5",
      },
    ];

    for (const taskData of sampleTasks) {
      const task: Task = {
        id: this.currentTaskId++,
        projectId: taskData.projectId,
        parentId: null,
        name: taskData.name,
        description: taskData.description,
        activity: taskData.activity,
        subActivity: taskData.subActivity,
        startDate: taskData.startDate,
        endDate: taskData.endDate,
        actualStartDate:
          taskData.status === "completed" ? taskData.startDate : null,
        actualEndDate:
          taskData.status === "completed" ? taskData.endDate : null,
        duration: taskData.duration,
        progress: taskData.progress,
        status: taskData.status,
        priority: taskData.priority,
        assigneeId: null,
        contractor: taskData.contractor || null,
        location: taskData.location || null,
        hierarchy: null,
        materials: null,
        photoUrl: null,
        notes: null,
        updatedBy: "System",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.tasks.set(task.id, task);
    }

    // Create sample milestones
    const sampleMilestones = [
      {
        projectId: 1,
        name: "Foundation Complete",
        description: "All foundation work completed and approved",
        targetDate: new Date("2024-01-31"),
        actualDate: new Date("2024-01-28"),
        status: "completed",
        ownerId: 1,
      },
      {
        projectId: 1,
        name: "Structural Frame Complete",
        description: "Main steel framework installation finished",
        targetDate: new Date("2024-03-31"),
        status: "in-progress",
        ownerId: 1,
      },
    ];

    for (const milestoneData of sampleMilestones) {
      const milestone: Milestone = {
        id: this.currentMilestoneId++,
        projectId: milestoneData.projectId,
        name: milestoneData.name,
        description: milestoneData.description,
        targetDate: milestoneData.targetDate,
        actualDate: milestoneData.actualDate || null,
        status: milestoneData.status,
        ownerId: milestoneData.ownerId,
        createdAt: new Date(),
      };
      this.milestones.set(milestone.id, milestone);
    }
  }
}

export const storage = new MemStorage();
