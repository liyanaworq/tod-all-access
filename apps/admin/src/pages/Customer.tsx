import { useEffect, useState } from 'react';
import { api } from '../libs/api';

interface Customer {
  _id: string;
  name: string;
  email: string;
  status: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [form, setForm] = useState({ name: '', email: '' });
  const [selected, setSelected] = useState<Customer | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/customers');
      setCustomers(res.data.filter((c: Customer) => c.status !== 'inactive'));
    } catch (err) {
      console.error('Failed to fetch customers', err);
      setError('Unable to load customers.');
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setForm({ name: '', email: '' });
    setSelected(null);
    setIsEditing(false);
    setShowModal(true);
    setError('');
  };

  const openEdit = (cust: Customer) => {
    setForm({ name: cust.name, email: cust.email });
    setSelected(cust);
    setIsEditing(true);
    setShowModal(true);
    setError('');
  };

  const handleSave = async () => {
    try {
      if (!form.name.trim() || !form.email.trim()) {
        setError('Name and email are required.');
        return;
      }

      if (isEditing && selected) {
        await api.put(`/customers/${selected._id}`, form);
      } else {
        await api.post('/customers', form);
      }

      setShowModal(false);
      fetchCustomers();
    } catch (err) {
      console.error('Save failed', err);
      setError('Failed to save customer. Try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      try {
        await api.delete(`/customers/${id}`);
        fetchCustomers();
      } catch (err) {
        alert('Failed to delete customer.');
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <button
          onClick={openCreate}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + Add Customer
        </button>
      </div>

      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center p-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : customers.length > 0 ? (
              customers.map((c) => (
                <tr key={c._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => openEdit(c)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center p-6 text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-xl w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold">
              {isEditing ? 'Edit Customer' : 'Add Customer'}
            </h2>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <input
              type="text"
              placeholder="Name"
              className="w-full border p-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
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
                {isEditing ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
