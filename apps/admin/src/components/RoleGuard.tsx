import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { JSX } from 'react';

export const RoleGuard = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
  const { user } = useAuth();
  return allowedRoles.includes(user?.role) ? children : <Navigate to="/" />;
};
