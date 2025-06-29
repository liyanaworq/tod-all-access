import { useEffect, useState } from 'react';
import { api } from '../libs/api';

export default function Outlets() {
  const [outlets, setOutlets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', location: '', dailyQuota: 0 });

  useEffect(() => {
    fetchOutlets();
  }, []);

  const fetchOutlets = () => {
    api.get('/outlets').then(res => setOutlets(res.data));
  };

  const handleCreate = async () => {
    await api.post('/outlets', form);
    fetchOutlets();
    setForm({ name: '', location: '', dailyQuota: 0 });
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Outlets</h1>
        <button
          className="bg-amber-600 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          + Add Outlet
        </button>
      </div>

      <ul className="space-y-2">
        {outlets.map((o: any) => (
          <li key={o._id} className="p-3 bg-white shadow rounded">
            {o.name} – {o.location} – Daily Quota: {o.dailyQuota}
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96 space-y-4">
            <h2 className="text-lg font-bold">Add Outlet</h2>
            <input
              className="w-full border p-2 rounded"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="w-full border p-2 rounded"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
            <input
              type="number"
              className="w-full border p-2 rounded"
              placeholder="Daily Quota"
              value={form.dailyQuota}
              onChange={(e) => setForm({ ...form, dailyQuota: +e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button className="bg-amber-600 text-white px-4 py-2 rounded" onClick={handleCreate}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
