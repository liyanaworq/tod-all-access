import { useEffect, useState } from 'react'; 
import { api } from '../libs/api';

interface BookingFormData {
  outletId: string;
  resourceId: string;
  checkIn: string; // YYYY-MM-DD
}

interface Outlet {
  _id: string;
  name: string;
}

interface Resource {
  _id: string;
  name: string;
  type: 'HOT_DESK' | 'MEETING_ROOM';
}

export default function BookingForm() {
  const [form, setForm] = useState<BookingFormData>({
    outletId: '',
    resourceId: '',
    checkIn: '',
  });

  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('customerToken');
  const customer = JSON.parse(localStorage.getItem('customer') || '{}');

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [outletRes, resourceRes] = await Promise.all([
        api.get('/outlets', { headers }),
        api.get('/resources', { headers }),
      ]);
      setOutlets(outletRes.data);
      setResources(resourceRes.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load data.');
    }
  };

  useEffect(() => {
    const matched = resources.filter((r:any) => r.outletId === form.outletId);
    setFilteredResources(matched);
  }, [form.outletId, resources]);

  const handleSubmit = async () => {
    setMessage('');
    setError('');

    if (!form.outletId || !form.resourceId || !form.checkIn) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const payload = {
        outletId: form.outletId,
        resourceId: form.resourceId,
        checkIn: new Date(form.checkIn),
        userId: customer._id,
        customerId: customer._id,
      };

      await api.post('/bookings', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage('Booking successful!');
      setForm({ outletId: '', resourceId: '', checkIn: '' });
    } catch (err: any) {
      console.error(err);
      setError('Booking failed: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded mt-6 space-y-4">
      <h2 className="text-xl font-semibold">Book a Resource</h2>
      {message && <div className="text-green-600">{message}</div>}
      {error && <div className="text-red-600">{error}</div>}

      <div>
        <label className="block mb-1">Outlet</label>
        <select
          className="w-full border p-2 rounded"
          value={form.outletId}
          onChange={(e) => setForm({ ...form, outletId: e.target.value, resourceId: '' })}
        >
          <option value="">Select Outlet</option>
          {outlets.map((o) => (
            <option key={o._id} value={o._id}>
              {o.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1">Resource</label>
        <select
          className="w-full border p-2 rounded"
          value={form.resourceId}
          onChange={(e) => setForm({ ...form, resourceId: e.target.value })}
          disabled={!form.outletId}
        >
          <option value="">Select Resource</option>
          {filteredResources.map((r) => (
            <option key={r._id} value={r._id}>
              {r.name} ({r.type})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1">Booking Date</label>
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={form.checkIn}
          onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-amber-600 text-white p-2 rounded hover:bg-amber-700"
      >
        Submit Booking
      </button>
    </div>
  );
}
