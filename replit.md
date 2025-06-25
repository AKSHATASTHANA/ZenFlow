# Serenity - Meditation App

## Overview

Serenity is a full-stack meditation application built with React, Express, and PostgreSQL. It provides a comprehensive meditation experience with features like guided meditation sessions, ambient sounds, breathing exercises, and progress tracking. The app uses a modern tech stack with TypeScript, Tailwind CSS, and shadcn/ui components for a polished user interface.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: In-memory storage with fallback to PostgreSQL
- **API Design**: RESTful endpoints with proper error handling
- **Development**: Hot module replacement via Vite integration

### Database Schema
- **Users**: Authentication and user management
- **Meditation Sessions**: Track completed meditation sessions with duration, type, and completion status
- **User Preferences**: Customizable settings for sounds, breathing patterns, and goals
- **User Stats**: Aggregate statistics including streaks and total time
- **Achievements**: Milestone tracking system

## Key Components

### Meditation Features
- **Timer Sessions**: Customizable meditation timers with interval bells
- **Guided Breathing**: Multiple breathing patterns (4-7-8, Box Breathing, etc.)
- **Ambient Sounds**: Nature sounds and ambient audio with individual volume controls
- **Progress Tracking**: Visual progress charts and achievement system

### UI Components
- **Meditation Timer**: Core timer component with play/pause functionality
- **Ambient Sounds**: Audio mixer with multiple sound layers
- **Breathing Animation**: Visual breathing guides with customizable patterns
- **Progress Dashboard**: Charts and statistics visualization

### Audio System
- **Web Audio API**: Custom audio manager for precise sound control
- **Multi-layered Audio**: Simultaneous playback of multiple ambient sounds
- **Volume Controls**: Individual and master volume management
- **Cross-browser Compatibility**: Fallback support for different browsers

## Data Flow

1. **User Interaction**: User selects meditation type and duration
2. **Session Creation**: Timer starts and session data is prepared
3. **Audio Management**: Ambient sounds are loaded and played as needed
4. **Progress Tracking**: Session data is continuously updated
5. **Session Completion**: Data is saved to database and stats are updated
6. **Achievement Processing**: Milestones are checked and unlocked as appropriate

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

## Changelog

- June 25, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.