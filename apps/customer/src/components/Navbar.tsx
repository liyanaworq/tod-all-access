import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const customer = JSON.parse(localStorage.getItem('customer') || 'null');
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('customer');
    localStorage.removeItem('customerToken');
    logout();
    navigate('/auth');
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? 'text-amber-600 font-semibold' : 'text-gray-700 hover:text-amber-600 transition'}`;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink
            to="/"
            className="text-xl font-semibold tracking-tight text-amber-600"
          >
            WORQ TOD ALL ACCESS
          </NavLink>

          <div className="hidden md:flex space-x-6 items-center">
            {customer ? (
              <>
                <NavLink to="/dashboard" className={linkClass}>
                  Dashboard
                </NavLink>
                <NavLink to="/bookings" className={linkClass}>
                  My Bookings
                </NavLink>
                <NavLink to="/profile" className={linkClass}>
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:underline transition duration-150"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/auth" className={linkClass}>
                Login/Register
              </NavLink>
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
              <NavLink to="/dashboard" className={linkClass} onClick={() => setIsOpen(false)}>
                Dashboard
              </NavLink>
              <NavLink to="/bookings" className={linkClass} onClick={() => setIsOpen(false)}>
                My Bookings
              </NavLink>
              <NavLink to="/profile" className={linkClass} onClick={() => setIsOpen(false)}>
                Profile
              </NavLink>
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
              <NavLink to="/login" className={linkClass} onClick={() => setIsOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/register" className={linkClass} onClick={() => setIsOpen(false)}>
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
