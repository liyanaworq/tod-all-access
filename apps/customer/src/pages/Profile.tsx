// src/pages/Home.tsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Customer Portal</h1>
      <p className="mb-6">Manage your bookings, profile and more.</p>
      <Link to="/booking" className="text-amber-600 underline">
        Go to Booking Page →
      </Link>
    </div>
  );
}
