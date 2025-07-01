import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../libs/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role] = useState('ADMIN'); // Hardcoded for now, can be a dropdown later
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/users', { name, email, password, role });
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Try another email.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-amber-50 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6 transition-all"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-amber-700">Admin Registration</h2>
          <p className="text-sm text-gray-500">Create your admin account</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition duration-200"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-600">
          Already registered?{' '}
          <a href="/login" className="text-amber-600 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}
