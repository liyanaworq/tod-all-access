import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoutButton } from './Logout';
import { MdDashboard, MdPeople, MdBusiness, MdMeetingRoom, MdLogout, MdMenu } from 'react-icons/md';

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: <MdDashboard size={24} /> },
    { to: '/customers', label: 'Customer', icon: <MdBusiness size={24} /> },
    { to: '/resources', label: 'Resources', icon: <MdBusiness size={24} /> },
    { to: '/users', label: 'Users', icon: <MdPeople size={24} /> },
    { to: '/bookings', label: 'Bookings', icon: <MdMeetingRoom size={24} /> },
    { to: '/companies', label: 'Companies', icon: <MdBusiness size={24} /> },
    { to: '/outlets', label: 'Outlets', icon: <MdBusiness size={24} /> },
  ];

  return (
    <div className={`flex flex-col ${collapsed ? 'w-20' : 'w-64'} bg-gray-800 text-white min-h-screen p-4 transition-all duration-300`}>
      <div className="flex items-center justify-center mb-6">
        {!collapsed && <h1 className="text-xl font-bold">Admin</h1>}
        <button onClick={() => setCollapsed(!collapsed)} className="text-white">
          <MdMenu size={24} />
        </button>
      </div>

      <nav className="flex flex-col gap-4 flex-grow">
        {navItems.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
          >
            {icon}
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      <div className="mt-auto">
        <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-700 rounded text-left">
          <MdLogout size={24} />
          {!collapsed && <LogoutButton />}
        </button>
      </div>
    </div>
  );
};
