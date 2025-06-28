import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // ✅ make sure it's correct path
import type { JSX } from 'react';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // ✅ Show loading only once

  return token ? children : <Navigate to="/login" />;
}
