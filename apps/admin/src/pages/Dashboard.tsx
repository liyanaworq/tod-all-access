import { useState, useEffect } from "react";
import { api } from "../libs/api"; 
import { useAuthGuard } from "../components/RequireAuth";

export default function Dashboard() {
  useAuthGuard(); // at the top

  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [outlets, setOutlets] = useState([]);

  useEffect(() => {
    api.get('/users').then(res => setUsers(res.data));
    api.get('/bookings').then(res => setBookings(res.data));
    api.get('/companies').then(res => setCompanies(res.data));
    api.get('/outlets').then(res => setOutlets(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">Total Users: {users.length}</div>
        <div className="bg-white p-4 rounded shadow">Active Bookings: {bookings.length}</div>
        <div className="bg-white p-4 rounded shadow">Companies: {companies.length}</div>
        <div className="bg-white p-4 rounded shadow">Outlets: {outlets.length}</div>
      </div>
    </div>
  );
}
