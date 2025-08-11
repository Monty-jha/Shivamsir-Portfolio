# replit.md

## Overview

This is a full-stack web application for Shivam Mani Tripathi, a wealth manager at MetaGrow. The application is built as a professional portfolio and contact platform using a modern React frontend with a Node.js/Express backend. The application showcases financial services, client testimonials, and provides a contact form for potential clients.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with Shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Session Management**: Express-session for admin authentication
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Email Service**: Nodemailer with local SMTP fallback
- **Development**: Hot reload with Vite integration

## Key Components

### Database Layer
- **Schema**: Contact form submissions with fields for personal info, service type, and messages
- **ORM**: Drizzle ORM configured for PostgreSQL with Neon Database integration
- **Storage**: In-memory storage fallback for development, production uses PostgreSQL
- **Migrations**: Drizzle Kit for schema management

### API Endpoints
- `POST /api/contact` - Submit contact form with validation
- `GET /api/contacts` - Admin-only endpoint to retrieve all contacts

### UI Components
- **Design System**: Shadcn/ui components built on Radix UI primitives
- **Theme**: Custom coral/orange color scheme with light/dark mode support
- **Layout**: Single-page application with smooth scrolling navigation
- **Sections**: Hero, About, Services, Testimonials, Insights, Contact, Footer

### Authentication
- Simple session-based admin authentication for viewing contacts
- No user registration system - focused on business owner access

## Data Flow

1. **Contact Form Submission**:
   - Client fills form → Frontend validation (Zod) → API request → Backend validation → Database storage → Email notification

2. **Admin Contact Management**:
   - Admin login → Session verification → Fetch contacts → Display in admin interface

3. **Static Content**:
   - All business content is statically served
   - Images served from attached_assets directory
   - Font loading from Google Fonts

## External Dependencies

### Frontend
- React ecosystem (React, React DOM, React Hook Form)
- TanStack Query for data fetching
- Radix UI primitives for accessible components
- Tailwind CSS for styling
- Wouter for routing

### Backend
- Express.js for server framework
- Drizzle ORM for database operations
- Nodemailer for email functionality
- Express-session for authentication
- Neon Database serverless driver

### Development
- Vite for bundling and development server
- TypeScript for type safety
- ESBuild for production builds
- Replit-specific plugins for development environment

## Deployment Strategy

### Development
- Vite dev server with Express API integration
- Hot module replacement for frontend changes
- Automatic server restart for backend changes
- Replit development banner integration

### Production Build
- Frontend: Vite builds optimized React bundle to `dist/public`
- Backend: ESBuild bundles Node.js server to `dist/index.js`
- Static assets served by Express in production
- Environment variables for database and email configuration

### Environment Configuration
- `DATABASE_URL` for PostgreSQL connection
- `NODE_ENV` for environment detection
- Email configuration through environment variables
- Session secret configuration

## Changelog
- June 30, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.