// src/App.tsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Booking from './pages/Bookings';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { AuthProvider, useAuth } from './context/authContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar'; // ✅ Import your Navbar

// Wrapper that conditionally renders the navbar
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { token } = useAuth();

  const hideNavbarOnRoutes = ['/login', '/register'];

  const shouldHideNavbar = hideNavbarOnRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && token && <Navbar />} {/* ✅ Conditionally render Navbar */}
      <div>{children}</div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/booking" element={<PrivateRoute><Booking /></PrivateRoute>} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
