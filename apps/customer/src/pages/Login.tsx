import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../libs/api';   
import { useAuth } from '../context/authContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, token } = useAuth();

  useEffect(() => {
    if (token) navigate('/dashboard');
  }, [token]);

  const handleSubmit = async () => {
    try {
      const res = await api.post('/auth/customer/login', form);
      login(res.data.token, res.data.customer);
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Customer Login</h1>
      {error && <p className="text-red-600">{error}</p>}
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
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        onClick={handleSubmit}
      >
        Login
      </button>
    </div>
  );
}
