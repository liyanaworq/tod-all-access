import { useEffect, useState } from 'react';
import { api } from '../libs/api';

interface BookingForm {
  customerId: string;
  outletId: string;
  bookingType: 'TOD_PASS' | 'MEETING_ROOM';
  checkIn: string;
}

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<BookingForm>({
    customerId: '',
    outletId: '',
    bookingType: 'TOD_PASS',
    checkIn: '',
  });
  const [customers, setCustomers] = useState([]);
  const [outlets, setOutlets] = useState([]);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!token) return;

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [bookingsRes, customersRes, outletsRes] = await Promise.all([
        api.get('/bookings', { headers }),
        api.get('/customers', { headers }),
        api.get('/outlets', { headers }),
      ]);

      setBookings(bookingsRes.data);
      setCustomers(customersRes.data.filter((c: any) => c.status !== 'inactive'));
      setOutlets(outletsRes.data);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  const handleCreate = async () => {
    try {
      if (!form.customerId || !form.outletId || !form.checkIn) {
        alert('Please fill in all required fields');
        return;
      }

      const payload = {
        userId: form.customerId,
        outletId: form.outletId,
        bookingType: form.bookingType,
        checkIn: form.checkIn, 
        customerId: form.customerId,
        createdBy: user?._id,
      };

      console.log("booking payload",payload)

      await api.post('/bookings', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchData();
      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error(err);
      alert('Failed to create booking. Please try again.');
    }
  };

  const resetForm = () => {
    setForm({
      customerId: '',
      outletId: '',
      bookingType: 'TOD_PASS',
      checkIn: '',
    });
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bookings</h1>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={() => setShowModal(true)}
        >
          + Add Booking
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Customer</th>
              <th className="p-2">Outlet</th>
              <th className="p-2">Type</th>
              <th className="p-2">Check-In</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b: any) => (
              <tr key={b._id} className="border-t">
                <td className="p-2">{b.customerId?.name || b.userId?.name || 'N/A'}</td>
                <td className="p-2">{b.outletId?.name || 'N/A'}</td>
                <td className="p-2">{b.bookingType}</td>
                <td className="p-2">{new Date(b.checkIn).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-xl w-full max-w-xl">
            <h2 className="text-lg font-semibold mb-4">Create Booking</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Customer</label>
                <select
                  value={form.customerId}
                  onChange={(e) => setForm({ ...form, customerId: e.target.value })}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Customer</option>
                  {customers.map((c: any) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Outlet</label>
                <select
                  value={form.outletId}
                  onChange={(e) => setForm({ ...form, outletId: e.target.value })}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Outlet</option>
                  {outlets.map((o: any) => (
                    <option key={o._id} value={o._id}>
                      {o.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Booking Type</label>
                <select
                  value={form.bookingType}
                  onChange={(e) =>
                    setForm({ ...form, bookingType: e.target.value as 'TOD_PASS' | 'MEETING_ROOM' })
                  }
                  className="w-full border p-2 rounded"
                >
                  <option value="TOD_PASS">TOD_PASS</option>
                  <option value="MEETING_ROOM">MEETING_ROOM</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Check-In</label>
                <input
                  type="datetime-local"
                  value={form.checkIn}
                  onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 text-gray-600 border rounded"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
