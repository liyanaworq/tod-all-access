import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { api } from '../libs/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role] = useState('ADMIN'); // defaulting to ADMIN, or make it selectable if needed
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-semibold text-center">Register Admin</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
          Register
        </button>
        <p className="text-center text-sm text-gray-600">
          Already registered? <a href="/login" className="text-indigo-600 underline">Log in</a>
        </p>
      </form>
    </div>
  );
}
