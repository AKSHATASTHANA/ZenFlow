import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("patient"), // admin, patient
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  patientName: text("patient_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
  department: text("department").notNull(),
  preferredDate: timestamp("preferred_date").notNull(),
  preferredTime: text("preferred_time").notNull(),
  reasonForVisit: text("reason_for_visit").notNull(),
  status: text("status").notNull().default("pending"), // pending, confirmed, cancelled, completed
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  headDoctor: text("head_doctor"),
});

export const doctors = pgTable("doctors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  specialization: text("specialization").notNull(),
  departmentId: integer("department_id").references(() => departments.id),
  qualifications: text("qualifications").notNull(),
  experience: integer("experience").notNull(), // years
  image: text("image"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
});

export const insertAppointmentSchema = createInsertSchema(appointments).pick({
  patientName: true,
  email: true,
  phone: true,
  age: true,
  gender: true,
  department: true,
  preferredDate: true,
  preferredTime: true,
  reasonForVisit: true,
}).extend({
  preferredDate: z.string().min(1, "Date is required"),
});

export const insertDepartmentSchema = createInsertSchema(departments).pick({
  name: true,
  description: true,
  headDoctor: true,
});

export const insertDoctorSchema = createInsertSchema(doctors).pick({
  name: true,
  specialization: true,
  departmentId: true,
  qualifications: true,
  experience: true,
  image: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Department = typeof departments.$inferSelect;
export type InsertDepartment = z.infer<typeof insertDepartmentSchema>;
export type Doctor = typeof doctors.$inferSelect;
export type InsertDoctor = z.infer<typeof insertDoctorSchema>;

// Project Management Tables
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  status: text("status").notNull().default("active"), // active, completed, on-hold, cancelled
  progress: integer("progress").default(0), // 0-100
  priority: text("priority").notNull().default("medium"), // low, medium, high, critical
  managerId: integer("manager_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  parentId: integer("parent_id"),
  name: text("name").notNull(),
  description: text("description"),
  activity: text("activity"),
  subActivity: text("sub_activity"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  actualStartDate: timestamp("actual_start_date"),
  actualEndDate: timestamp("actual_end_date"),
  duration: integer("duration").notNull().default(1),
  progress: integer("progress").default(0), // 0-100
  status: text("status").notNull().default("pending"), // pending, in-progress, completed, cancelled
  priority: text("priority").notNull().default("medium"),
  assigneeId: integer("assignee_id"),
  contractor: text("contractor"),
  location: text("location"),
  hierarchy: text("hierarchy"), // JSON string {l1, l2, l3, l4}
  materials: text("materials"), // JSON string [{name, unit, plannedQty, actualQty}]
  photoUrl: text("photo_url"),
  notes: text("notes"),
  updatedBy: text("updated_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const milestones = pgTable("milestones", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  targetDate: timestamp("target_date").notNull(),
  actualDate: timestamp("actual_date"),
  status: text("status").notNull().default("pending"), // pending, in-progress, completed, overdue
  ownerId: integer("owner_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const taskDependencies = pgTable("task_dependencies", {
  id: serial("id").primaryKey(),
  taskId: integer("task_id").references(() => tasks.id).notNull(),
  dependsOnTaskId: integer("depends_on_task_id").references(() => tasks.id).notNull(),
  type: text("type").notNull().default("finish-to-start"), // finish-to-start, start-to-start, finish-to-finish, start-to-finish
});

// Schema validations
export const insertProjectSchema = createInsertSchema(projects).pick({
  name: true,
  description: true,
  startDate: true,
  endDate: true,
  status: true,
  progress: true,
  priority: true,
  managerId: true,
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMilestoneSchema = createInsertSchema(milestones).pick({
  projectId: true,
  name: true,
  description: true,
  targetDate: true,
  actualDate: true,
  status: true,
  ownerId: true,
});

export const insertTaskDependencySchema = createInsertSchema(taskDependencies).pick({
  taskId: true,
  dependsOnTaskId: true,
  type: true,
});

// Types
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Milestone = typeof milestones.$inferSelect;
export type InsertMilestone = z.infer<typeof insertMilestoneSchema>;
export type TaskDependency = typeof taskDependencies.$inferSelect;
export type InsertTaskDependency = z.infer<typeof insertTaskDependencySchema>;