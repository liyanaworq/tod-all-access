import { useNavigate } from 'react-router-dom';

export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex justify-center align-center text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
}
