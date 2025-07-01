import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../libs/api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials or server error.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-amber-50 px-4 py-8">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6 transition-all"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-amber-700">Admin Login</h2>
          <p className="text-sm text-gray-500">Sign in to manage your dashboard</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
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
          Login
        </button>

        <div className="flex justify-between text-sm text-gray-600">
          <a href="/forgot-password" className="hover:underline hover:text-amber-700">
            Forgot password?
          </a>
          <a href="/register" className="hover:underline hover:text-amber-700">
            Register now
          </a>
        </div>
      </form>
    </div>
  );
}
