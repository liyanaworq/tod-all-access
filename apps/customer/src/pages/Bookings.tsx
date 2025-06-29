// src/pages/Booking.tsx
import { useEffect, useState } from 'react';
import { api } from '../libs/api';

export default function Booking() {
  const [outlets, setOutlets] = useState([]);
  const [resources, setResources] = useState([]);
  const [form, setForm] = useState({
    outletId: '',
    resourceId: '',
    checkIn: '',
  });

  const customer = JSON.parse(localStorage.getItem('customer') || '{}');
  const token = localStorage.getItem('customerToken');

  useEffect(() => {
    const fetchData = async () => {
      const headers = { Authorization: `Bearer ${token}` };
      const [outletsRes, resourcesRes] = await Promise.all([
        api.get('/outlets', { headers }),
        api.get('/resources', { headers }),
      ]);
      setOutlets(outletsRes.data);
      setResources(resourcesRes.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      userId: customer._id,
      customerId: customer._id,
      outletId: form.outletId,
      bookingType: 'TOD_PASS',
      checkIn: form.checkIn,
    };

    try {
      await api.post('/bookings', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Booking created');
    } catch (err) {
      alert('Failed to create booking');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Book a Resource</h1>
      <select
        className="w-full border p-2 rounded mb-4"
        onChange={(e) => setForm({ ...form, outletId: e.target.value })}
      >
        <option value="">Select Outlet</option>
        {outlets.map((o: any) => (
          <option key={o._id} value={o._id}>{o.name}</option>
        ))}
      </select>
      <select
        className="w-full border p-2 rounded mb-4"
        onChange={(e) => setForm({ ...form, resourceId: e.target.value })}
      >
        <option value="">Select Resource</option>
        {resources
          .filter((r: any) => r.outletId === form.outletId)
          .map((r: any) => (
            <option key={r._id} value={r._id}>{r.name}</option>
          ))}
      </select>
      <input
        type="datetime-local"
        className="w-full border p-2 rounded mb-4"
        onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
      />
      <button
        className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
        onClick={handleSubmit}
      >
        Book Now
      </button>
    </div>
  );
}
