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
   JWT_SECRET=yourSuperSecretKey
   PORT=5000

4. Start development server:
   npm run start:dev
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
POST   | /user                     | Register new admin user
POST   | /auth/login               | Admin login
GET    | /customers                | Get customer list (protected)
POST   | /bookings                 | Create new booking (protected)
POST   | /resource                 | Create new resource (protected)
POST   | /outlets                  | Create new outlet (protected)
POST   | /outlets                  | Create new outlet (protected)

Pending development

Entity | Endpoint                  
-------|---------------------------|
ORND   | Coworking CRM             | 
ZKBIO  | Access control solution   | 
TTLOCK | Access control solution   | 
 

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

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Initialized By
Liyana Khairul
Software Engineer • Full Stack Developer
WORQ
