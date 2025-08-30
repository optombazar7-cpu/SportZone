# SportZone E-commerce Platform

## Overview

SportZone is a modern e-commerce platform built for selling sports products in Uzbekistan. The application provides a comprehensive online shopping experience with features including product catalog, shopping cart, order management, and customer support. It supports Uzbek language as the primary interface and implements responsive design for optimal viewing across desktop, tablet, and mobile devices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built with React and TypeScript using Vite as the build tool. The application implements a single-page application (SPA) architecture with client-side routing using Wouter. State management is handled through React Context API for cart functionality and TanStack Query for server state management. The UI is built with shadcn/ui components providing a consistent design system based on Radix UI primitives.

**Key frontend decisions:**
- **React with TypeScript**: Provides type safety and modern component development
- **Vite**: Fast development server and optimized builds
- **Wouter**: Lightweight client-side routing solution
- **TanStack Query**: Server state management with caching and synchronization
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **shadcn/ui**: Pre-built accessible components with customizable styling

### Backend Architecture
The server-side uses Express.js with TypeScript in an ESM configuration. The application follows a RESTful API design pattern with clear separation between routing, business logic, and data access layers. The storage layer is abstracted through an interface pattern, currently implemented with in-memory storage but designed for easy database integration.

**Key backend decisions:**
- **Express.js**: Mature and flexible Node.js web framework
- **TypeScript with ESM**: Modern JavaScript with type safety
- **Interface-based storage**: Allows switching between storage implementations
- **RESTful API design**: Standard HTTP methods and resource-based URLs

### Data Storage Solutions
The application is configured to use PostgreSQL with Drizzle ORM for database operations. The schema defines core entities including users, products, cart items, orders, and order items. The current implementation includes a fallback in-memory storage solution for development purposes.

**Database schema highlights:**
- **Products**: Comprehensive product information with categories, pricing, and inventory
- **Cart management**: Session-based cart items with size selection
- **Order system**: Complete order lifecycle with customer information and order items
- **UUID primary keys**: Better security and distributed system compatibility

### Authentication and Authorization
The application currently implements session-based cart management using browser localStorage for session identification. While user authentication schemas are defined, the current implementation focuses on guest checkout functionality.

### UI/UX Design System
The design system implements a sports-focused theme with dynamic color schemes including blue, red, white, and accent colors. Typography uses modern sans-serif fonts (Poppins, Inter, Montserrat) optimized for readability. The interface supports both light and dark themes through CSS custom properties.

**Design principles:**
- **Sports-focused aesthetics**: Dynamic colors and energetic visual elements
- **Mobile-first responsive design**: Optimized for all device sizes
- **Accessibility compliance**: ARIA labels and semantic HTML structure
- **Performance optimization**: Lazy loading and efficient asset delivery

## External Dependencies

### Database and ORM
- **PostgreSQL**: Primary database with Neon serverless deployment
- **Drizzle ORM**: Type-safe database operations with schema migrations
- **connect-pg-simple**: PostgreSQL session store integration

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Radix UI**: Unstyled, accessible UI primitives for complex components
- **Lucide React**: Comprehensive icon library
- **embla-carousel-react**: Touch-friendly carousel component

### Development Tools
- **Vite**: Modern build tool with HMR and optimized production builds
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for server-side code
- **PostCSS**: CSS processing with Autoprefixer

### Form and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### State Management
- **TanStack Query**: Server state management with caching and background updates
- **React Context**: Client-side state management for cart and UI state

The application is designed to be deployed on Replit with development tools and runtime error handling specifically configured for that environment.