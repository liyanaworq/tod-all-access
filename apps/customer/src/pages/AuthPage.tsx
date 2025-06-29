import { useState } from 'react';
import Login from './Login';
import Register from './Register';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab('login')}
          className={`flex-1 py-2 ${activeTab === 'login' ? 'bg-amber-600 text-white' : 'bg-gray-100'}`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`flex-1 py-2 ${activeTab === 'register' ? 'bg-amber-600 text-white' : 'bg-gray-100'}`}
        >
          Register
        </button>
      </div>

      {activeTab === 'login' ? <Login /> : <Register />}
    </div>
  );
}
