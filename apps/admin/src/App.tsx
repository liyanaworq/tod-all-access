import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Bookings from './pages/Bookings';
import Companies from './pages/Companies';
import Outlets from './pages/Outlets';
import ForgotPassword from './pages/ForgetPassword';
import Register from './pages/Register';
import Login from './pages/Login';
import Customers from './pages/Customer'; 
import ResourcesPage from './pages/Resource';

function Layout() {
  const location = useLocation();
  const hideSidebar = ['/login', '/register', '/forgot-password'].includes(location.pathname);

  return (
    <div className="flex h-screen overflow-hidden">
      {!hideSidebar && <Sidebar />}
      <main className="flex-1 overflow-auto p-4 bg-gray-50">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/users" element={<Users />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/outlets" element={<Outlets />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
