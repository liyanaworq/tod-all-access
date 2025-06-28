// src/pages/Register.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../libs/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await api.post('/auth/customer/register', form);
      alert('Registration successful');
      navigate('/login');
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Register New Account</h1>
      <input
        type="text"
        placeholder="Name"
        className="w-full border p-2 rounded mb-4"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded mb-4"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded mb-4"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        onClick={handleSubmit}
      >
        Register
      </button>
    </div>
  );
}
