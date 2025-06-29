import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
 
export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const customer = JSON.parse(localStorage.getItem('customer') || 'null');
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('customer');
    localStorage.removeItem('customerToken');
    logout()
    navigate('/auth'); // ⬅️ consistent with redirect logic
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight text-amber-600"
          >
            WORQ TOD ALL ACCESS
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            {customer ? (
              <>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
                <Link to="/bookings" className="nav-link">
                  My Bookings
                </Link>
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:underline transition duration-150"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" className="nav-link">
                  Login/Register
                </Link> 
              </>
            )}
          </div>

          {/* Mobile toggle button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          {customer ? (
            <>
              <Link to="/dashboard" className="block nav-link" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
              <Link to="/bookings" className="block nav-link" onClick={() => setIsOpen(false)}>
                My Bookings
              </Link>
              <Link to="/profile" className="block nav-link" onClick={() => setIsOpen(false)}>
                Profile
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="block text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block nav-link" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="block nav-link" onClick={() => setIsOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
