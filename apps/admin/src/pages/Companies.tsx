import { useEffect, useState } from 'react';
import { api } from '../libs/api';

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', industry: '' });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = () => {
    api.get('/companies').then(res => setCompanies(res.data));
  };

  const handleCreate = async () => {
    await api.post('/companies', form);
    fetchCompanies();
    setForm({ name: '', industry: '' });
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Companies</h1>
        <button
          className="bg-amber-600 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          + Add Company
        </button>
      </div>

      <ul className="space-y-2">
        {companies.map((c: any) => (
          <li key={c._id} className="p-3 bg-white shadow rounded">
            {c.name} – {c.industry}
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96 space-y-4">
            <h2 className="text-lg font-bold">Add Company</h2>
            <input
              className="w-full border p-2 rounded"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="w-full border p-2 rounded"
              placeholder="Industry"
              value={form.industry}
              onChange={(e) => setForm({ ...form, industry: e.target.value })}
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
