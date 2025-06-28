# TOD All Access - Coworking Space Management System (For reference only)

A full-stack monorepo solution for modern coworking space management, featuring quota tracking, resource booking, and administrative controls.

## Features
- Multi-role Authentication: Separate portals for customers and administrators
- Quota Management: Track and allocate coworking space usage (Basic CRUD)
- Resource Booking: Customers can reserve workspaces and amenities (Basic CRUD)
- Admin Dashboard: Comprehensive management interface
- Responsive Design: Mobile-friendly interfaces for both portals

## Tech Stack
### Backend
- Framework: NestJS
- Database: MongoDB (with Mongoose ODM)
- Authentication: JWT (JSON Web Tokens)
- API: RESTful architecture

### Frontend
- Build Tool: Vite
- UI Framework: React with TypeScript
- Styling: Tailwind CSS
- State Management: Context API

## Project Structure
- tod-all-access/
 - apps/
    - admin/          # Admin frontend portal
    - customer/       # Customer frontend portal
 - backend/           # NestJS backend API
 - package.json       # Root package configuration
 - README.md          # Project documentation

## Quick Start
### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB (local or Atlas)
- Git

### Installation
1. Clone the repository:
   git clone https://github.com/your-username/tod-all-access.git
   cd tod-all-access

2. Install root dependencies (optional):
   npm install

## Running the Project
### Backend Setup
1. Navigate to backend:
   cd backend

2. Install dependencies:
   npm install

3. Create .env file:
   MONGO_URI=mongodb://localhost:27017/tod
   <br> 
   JWT_SECRET=yourSuperSecretKey
   <br> 
   PORT=5000

5. Start development server:
   npm run start:dev
   <br> 
   API will run at: http://localhost:5000

### Customer Portal
1. Navigate to customer app:
   cd apps/customer

2. Install dependencies:
   npm install

3. Start development server:
   npm run dev
   Access at: http://localhost:5173

### Admin Portal
1. Navigate to admin app:
   cd apps/admin

2. Install dependencies:
   npm install

3. Start development server:
   npm run dev
   Access at: http://localhost:5174

## Authentication Flow
- Customer Portal: Uses /auth/customer/login endpoint
- Admin Portal: Uses /auth/admin/login endpoint
- JWT tokens are stored in localStorage and validated via NestJS guards

## API Endpoints (Examples)
Method | Endpoint                  | Description
-------|---------------------------|---------------------------------
POST   | /auth/customer/register   | Register new customer
POST   | /auth/customer/login      | Customer login
POST   | /users                    | Register new admin user
POST   | /auth/login               | Admin login
GET    | /customers                | Get customer list (protected)
POST   | /bookings                 | Create new booking (protected)
POST   | /resources                | Create new resource (protected)
POST   | /outlets                  | Create new outlet (protected) 

Pending development

System Integration Overview - TOD All Access

Entity                      | Description                  | Purpose                                                                     | Status
----------------------------|------------------------------|-----------------------------------------------------------------------------|--------
ORND                        | Coworking CRM Platform       | Real-time synchronization of members, locations, and resource bookings.     | N/A
ZKBioSecurity               | Biometric Access Control     | Seamless real-time mapping and syncing of users for secure facility access. | N/A
TTLock                      | Smart Lock System            | Real-time user mapping and access management for lock-enabled resources.    | N/A
Google Workspace Admin      | Staff Directory Integration  | Authenticated staff management for the Admin Panel via Google Directory.    | N/A
Single Sign-On (SSO)        | Unified Authentication       | Enables smooth and secure login across all modules and third-party systems. | N/A
Redis                       | In-memory Data Store & Cache | Accelerates session management, token storage, and API response caching.    | N/A
Docker                      | Containerization Platform    | Standardizes deployment for backend, admin, and customer apps.              | N/A
CI/CD Pipeline              | Automated Workflow           | Ensures smooth integration, testing, and deployment across environments.    | N/A
MongoDB Atlas               | NoSQL Cloud Database         | Stores users, bookings, quotas, and resource data in a scalable format.     | ✅
JWT Auth                    | Token-Based Auth System      | Used for stateless and secure access across frontend and backend.           | ✅
Vite + React + Tailwind     | Modern Frontend Stack        | Enables fast development and beautiful UIs for both admin and customer apps.| ✅
NestJS                      | Scalable Backend Framework   | Powers the backend REST API with modular architecture and strong typing.    | ✅
Stripe/Braintree/etc.       | Payment gateway integration  | Handles customer bookings, subscriptions, and invoicing securely            | N/A

 
## Development Scripts
Each module supports these npm scripts:
- npm run dev: Start development server
- npm run build: Create production build
- npm run start: Start production server (backend only)

## Pro Tips
1. Ensure MongoDB is running before starting the backend
2. Use [Postman](https://worq-space.postman.co/workspace/WORQ~fdaf432e-d56d-4574-b482-0bd0e5bcfb1f/collection/44895844-50e03184-18aa-423a-a631-306f086e2ac3?action=share&creator=44895844) or similar tools to test API endpoints
3. Update Axios base URLs when deploying to production
4. Implement proper error handling in both frontend and backend
 

## Initialized By
Liyana Khairul
Software Engineer • Full Stack Developer
WORQ
