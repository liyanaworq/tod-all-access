export const useAuth = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  return {
    user,
    token,
    isLoggedIn: !!token,
    isAdmin: user?.role === 'ADMIN',
    logout: () => {
      localStorage.clear();
      location.href = '/login';
    }
  };
};
