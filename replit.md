# Enhanced Project Management Dashboard

## Overview

A modern React-based project management dashboard that transforms VB.NET Gantt chart functionality into a comprehensive web application. Built with React, Express, and in-memory storage, it provides interactive Gantt charts, Kanban boards, milestone tracking, and project analytics. The app uses TypeScript, Tailwind CSS, and shadcn/ui components for a professional project management interface.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library and medical blue theme
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Storage**: In-memory storage with sample data for appointments and hospital information
- **API Design**: RESTful endpoints for appointments, departments, doctors, and admin authentication
- **Development**: Hot module replacement via Vite integration

### Database Schema
- **Users**: Admin and patient authentication with role-based access
- **Appointments**: Patient appointment bookings with status management
- **Departments**: Hospital departments (Cardiology, Neurology, etc.)
- **Doctors**: Doctor profiles with specializations and experience

## Key Components

### Hospital Website Features
- **Landing Page**: Professional hospital website with department information and doctor profiles
- **Appointment Booking**: Comprehensive form for patients to schedule appointments
- **Department Listings**: Display of medical departments with descriptions and head doctors
- **Contact Information**: Hospital contact details and emergency information

### Admin Panel Features
- **Authentication**: Secure admin login with role-based access control
- **Appointment Management**: View, filter, and update appointment statuses
- **Dashboard Statistics**: Real-time stats showing appointment counts and department information
- **Status Updates**: Change appointment status (pending, confirmed, cancelled, completed)

### UI Components
- **Appointment Form**: Multi-step form with validation for patient information and scheduling
- **Admin Dashboard**: Comprehensive management interface with search and filtering
- **Statistics Cards**: Visual display of key hospital metrics
- **Responsive Tables**: Mobile-friendly appointment management interface

## Data Flow

1. **Patient Interaction**: Patient visits hospital website and views services
2. **Appointment Booking**: Patient fills out appointment form with personal and medical information
3. **Data Validation**: Form data is validated on both client and server sides
4. **Appointment Storage**: Appointment is stored in memory with pending status
5. **Admin Management**: Admin can view, filter, and update appointment statuses
6. **Status Updates**: Real-time updates to appointment statuses and dashboard statistics

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router

### UI Dependencies
- **@radix-ui/***: Headless UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management

### Audio Dependencies
- **Web Audio API**: Native browser audio processing
- **embla-carousel-react**: Carousel components for UI

## Deployment Strategy

### Development
- **Local Development**: Vite dev server with hot module replacement
- **Database**: PostgreSQL with Drizzle migrations
- **Environment**: Node.js with TypeScript compilation

### Production
- **Build Process**: Vite builds client assets, esbuild bundles server
- **Deployment Target**: Replit autoscale deployment
- **Database Migrations**: Drizzle Kit for schema management
- **Static Assets**: Served from Express with proper caching

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **NODE_ENV**: Environment-specific configuration
- **Port Configuration**: Configurable server port (default 5000)

## Recent Changes

- July 28, 2025: Successfully completed migration from Replit Agent to Replit environment
  - Verified all packages and dependencies are properly installed
  - Confirmed server runs cleanly on port 5000 with proper Replit compatibility
  - Validated existing chairman image container in About section is working correctly
  - Ensured robust security practices with proper client/server separation
  - All hospital management features functioning properly (appointments, admin panel, departments)

- July 28, 2025: Added visual enhancements to About and Doctors pages
  - Integrated chairman's image section in About page with professional layout and styling
  - Added doctor image containers to doctors page with placeholder graphics
  - Enhanced visual hierarchy with responsive image sections and overlay badges
  - Maintained consistent medical theme throughout image containers

- July 24, 2025: Enhanced hospital website with comprehensive improvements
  - Added Healthcare Excellence section with 4 different color themes (blue, green, purple, orange)
  - Expanded backend data to include 14+ departments and 15+ expert doctors
  - Updated patient statistics to showcase 2.45L+ patients served
  - Integrated Google Maps location in footer for easy hospital access
  - Enhanced mobile responsiveness and professional medical UI design

- July 16, 2025: Successfully migrated project from Replit Agent to Replit environment
  - Fixed server port configuration from 5001 to 5000 for proper Replit compatibility
  - Enhanced About Shri Krishna Mission Hospital section with comprehensive content
  - Added detailed centers of excellence, achievements, and accreditations
  - Improved professional structure with quantifiable metrics and awards
  - Verified all components working correctly in Replit environment
  - Ensured robust security practices with proper client/server separation

- July 17, 2025: Enhanced mobile navigation and testimonials section
  - Added mobile-responsive hamburger menu with full department navigation
  - Implemented department dropdown for mobile devices with icons and color themes
  - Made "What Our Patients Say" section horizontally scrollable with 6 testimonials
  - Added smooth scrolling with hidden scrollbars for elegant user experience
  - Improved mobile menu functionality with proper close behavior

- July 16, 2025: Enhanced hospital website with comprehensive department pages
  - Created dedicated department pages for Cardiology, Neurology, Orthopedics, Pediatrics, and Gynecology
  - Added department-specific navigation with dropdown menu in header
  - Enhanced About section with improved visual design, stats cards, and interactive elements
  - Implemented department-specific service listings and doctor profiles
  - Added department-themed color schemes and professional layouts
  - Fixed server port configuration for proper Replit deployment (port 5000)
  - Completed migration from Replit Agent to Replit environment

- June 26, 2025: Transformed meditation app into comprehensive hospital management system
  - Created hospital landing page with department and doctor information
  - Implemented patient appointment booking form with validation
  - Built admin panel with login authentication and appointment management
  - Added real-time statistics dashboard for hospital metrics
  - Updated schema to support appointments, departments, and doctors
  - Configured medical blue theme for professional healthcare appearance

## User Preferences

Preferred communication style: Simple, everyday language.