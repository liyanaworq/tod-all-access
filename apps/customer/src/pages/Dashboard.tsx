import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../libs/api';

interface Booking {
  _id: string;
  outletId: { name: string };
  resourceId?: { name: string };
  bookingType: string;
  checkIn: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const customer = JSON.parse(localStorage.getItem('customer') || '{}');

  useEffect(() => {
    if (!customer?._id) {
      navigate('/login');
      return;
    }

    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('customerToken');
      const res = await api.get(`/bookings/customer/${customer._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error('Failed to load bookings', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Welcome, {customer?.name}</h1>
      <p className="text-gray-600 mb-6">{customer?.email}</p>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
        onClick={() => navigate('/booking')}
      >
        + Book Resource
      </button>

      <h2 className="text-lg font-semibold mb-2">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-sm text-gray-500">No bookings yet.</p>
      ) : (
        <table className="w-full text-sm border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">Outlet</th>
              <th className="p-2">Resource</th>
              <th className="p-2">Type</th>
              <th className="p-2">Check-In</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="p-2">{b.outletId?.name || 'N/A'}</td>
                <td className="p-2">{b.resourceId?.name || '-'}</td>
                <td className="p-2">{b.bookingType}</td>
                <td className="p-2">{new Date(b.checkIn).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
