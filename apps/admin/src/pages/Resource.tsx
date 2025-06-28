import { useEffect, useState } from 'react';
import { api } from '../libs/api';

interface Resource {
  _id: string;
  name: string;
  type: 'HOT_DESK' | 'MEETING_ROOM';
  outletId: string | { _id: string; name: string };
  status: string;
}

interface ResourceForm {
  name: string;
  type: 'HOT_DESK' | 'MEETING_ROOM';
  outletId: string;
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [outlets, setOutlets] = useState([]);
  const [form, setForm] = useState<ResourceForm>({
    name: '',
    type: 'HOT_DESK',
    outletId: '',
  });
  const [selected, setSelected] = useState<Resource | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resRes, outletRes] = await Promise.all([
        api.get('/resources'),
        api.get('/outlets'),
      ]);
      setResources(resRes.data.filter((r: Resource) => r.status !== 'inactive'));
      setOutlets(outletRes.data);
    } catch (err) {
      console.error('Failed to fetch', err);
      setError('Failed to load data.');
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setForm({ name: '', type: 'HOT_DESK', outletId: '' });
    setSelected(null);
    setIsEditing(false);
    setShowModal(true);
    setError('');
  };

  const openEdit = (r: Resource) => {
    setForm({
      name: r.name,
      type: r.type,
      outletId: typeof r.outletId === 'string' ? r.outletId : r.outletId._id,
    });
    setSelected(r);
    setIsEditing(true);
    setShowModal(true);
    setError('');
  };

  const handleSave = async () => {
    if (!form.name || !form.outletId || !form.type) {
      setError('Please fill all fields.');
      return;
    }

    try {
      if (isEditing && selected) {
        await api.put(`/resources/${selected._id}`, form);
      } else {
        await api.post('/resources', form);
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error('Save failed', err);
      setError('Failed to save. Try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      try {
        await api.delete(`/resources/${id}`);
        fetchData();
      } catch (err) {
        console.error('Delete failed', err);
        alert('Failed to delete resource.');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Resources</h1>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={openCreate}
        >
          + Add Resource
        </button>
      </div>

      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Type</th>
              <th className="p-3">Outlet</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="text-center p-6">Loading...</td></tr>
            ) : resources.length > 0 ? (
              resources.map((r) => (
                <tr key={r._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{r.name}</td>
                  <td className="p-3">{r.type}</td>
                  <td className="p-3">
                    {typeof r.outletId === 'string' ? r.outletId : r.outletId?.name || 'N/A'}
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => openEdit(r)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={4} className="text-center p-6 text-gray-500">No resources found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-xl w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold">{isEditing ? 'Edit Resource' : 'Add Resource'}</h2>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <input
              type="text"
              placeholder="Name"
              className="w-full border p-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <select
              value={form.type}
              className="w-full border p-2 rounded"
              onChange={(e) => setForm({ ...form, type: e.target.value as ResourceForm['type'] })}
            >
              <option value="HOT_DESK">HOT_DESK</option>
              <option value="MEETING_ROOM">MEETING_ROOM</option>
            </select>
            <select
              value={form.outletId}
              className="w-full border p-2 rounded"
              onChange={(e) => setForm({ ...form, outletId: e.target.value })}
            >
              <option value="">Select Outlet</option>
              {outlets.map((o: any) => (
                <option key={o._id} value={o._id}>
                  {o.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2 pt-2">
              <button
                className="text-gray-600"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
