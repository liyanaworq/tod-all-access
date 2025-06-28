import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const customer = JSON.parse(localStorage.getItem('customer') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('customer');
    localStorage.removeItem('customerToken');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-lg font-bold text-indigo-600">
        WORQ TOD ALL ACCESSS CUSTOMER PORTAL
      </Link>

      <div className="space-x-4">
        {customer ? (
          <>
            <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">
              Dashboard
            </Link>
            <Link to="/bookings" className="text-gray-700 hover:text-indigo-600">
              My Bookings
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-indigo-600">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline ml-4"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-indigo-600">
              Login
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-indigo-600">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
