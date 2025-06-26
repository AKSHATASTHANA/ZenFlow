import type { 
  User, InsertUser, 
  Appointment, InsertAppointment,
  Department, InsertDepartment,
  Doctor, InsertDoctor
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
  updateAppointmentStatus(id: number, status: string): Promise<Appointment | undefined>;
  getAppointmentsByDateRange(startDate: Date, endDate: Date): Promise<Appointment[]>;

  // Department methods
  getDepartments(): Promise<Department[]>;
  createDepartment(department: InsertDepartment): Promise<Department>;

  // Doctor methods
  getDoctors(): Promise<Doctor[]>;
  getDoctorsByDepartment(departmentId: number): Promise<Doctor[]>;
  createDoctor(doctor: InsertDoctor): Promise<Doctor>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private appointments: Map<number, Appointment>;
  private departments: Map<number, Department>;
  private doctors: Map<number, Doctor>;
  private currentUserId: number;
  private currentAppointmentId: number;
  private currentDepartmentId: number;
  private currentDoctorId: number;

  constructor() {
    this.users = new Map();
    this.appointments = new Map();
    this.departments = new Map();
    this.doctors = new Map();
    this.currentUserId = 1;
    this.currentAppointmentId = 1;
    this.currentDepartmentId = 1;
    this.currentDoctorId = 1;

    // Initialize with sample data
    this.initializeSampleData();
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
      { name: "Cardiology", description: "Heart and cardiovascular system", headDoctor: "Dr. Smith" },
      { name: "Neurology", description: "Brain and nervous system", headDoctor: "Dr. Johnson" },
      { name: "Orthopedics", description: "Bones, joints, and muscles", headDoctor: "Dr. Williams" },
      { name: "Pediatrics", description: "Children's health", headDoctor: "Dr. Brown" },
      { name: "Emergency", description: "Emergency medical care", headDoctor: "Dr. Davis" },
    ];

    for (const dept of departments) {
      const department: Department = {
        id: this.currentDepartmentId++,
        ...dept,
      };
      this.departments.set(department.id, department);
    }

    // Create doctors
    const doctors = [
      { name: "Dr. Sarah Smith", specialization: "Cardiologist", departmentId: 1, qualifications: "MD, FACC", experience: 15 },
      { name: "Dr. Michael Johnson", specialization: "Neurologist", departmentId: 2, qualifications: "MD, PhD", experience: 12 },
      { name: "Dr. Lisa Williams", specialization: "Orthopedic Surgeon", departmentId: 3, qualifications: "MD, FAAOS", experience: 18 },
      { name: "Dr. David Brown", specialization: "Pediatrician", departmentId: 4, qualifications: "MD, FAAP", experience: 10 },
      { name: "Dr. Jennifer Davis", specialization: "Emergency Medicine", departmentId: 5, qualifications: "MD, FACEP", experience: 8 },
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
        department: "Cardiology",
        preferredDate: new Date("2025-01-15"),
        preferredTime: "10:00 AM",
        reasonForVisit: "Chest pain and shortness of breath",
        status: "pending"
      },
      {
        patientName: "Jane Smith",
        email: "jane.smith@email.com",
        phone: "555-0124",
        age: 28,
        gender: "Female",
        department: "Neurology",
        preferredDate: new Date("2025-01-16"),
        preferredTime: "2:00 PM",
        reasonForVisit: "Frequent headaches",
        status: "confirmed"
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

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const users = Array.from(this.users.values());
    return users.find(user => user.username === username);
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

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const appointment: Appointment = {
      id: this.currentAppointmentId++,
      ...insertAppointment,
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

  async updateAppointmentStatus(id: number, status: string): Promise<Appointment | undefined> {
    const appointment = this.appointments.get(id);
    if (appointment) {
      appointment.status = status;
      this.appointments.set(id, appointment);
      return appointment;
    }
    return undefined;
  }

  async getAppointmentsByDateRange(startDate: Date, endDate: Date): Promise<Appointment[]> {
    const appointments = Array.from(this.appointments.values());
    return appointments.filter(apt => 
      apt.preferredDate >= startDate && apt.preferredDate <= endDate
    );
  }

  async getDepartments(): Promise<Department[]> {
    return Array.from(this.departments.values());
  }

  async createDepartment(insertDepartment: InsertDepartment): Promise<Department> {
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

  async getDoctorsByDepartment(departmentId: number): Promise<Doctor[]> {
    const doctors = Array.from(this.doctors.values());
    return doctors.filter(doc => doc.departmentId === departmentId);
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
}

export const storage = new MemStorage();