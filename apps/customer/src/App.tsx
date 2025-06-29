// src/App.tsx
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import Booking from './pages/Bookings';
import Home from './pages/Home'; 
import Profile from './pages/Profile'; 
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage'; // your login/register tab UI
import { AuthProvider, useAuth } from './context/authContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

// Layout wrapper
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { token } = useAuth();

  const hideNavbarOnRoutes = ['/auth'];
  const shouldHideNavbar = hideNavbarOnRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && token && <Navbar />}
      <div>{children}</div>
    </>
  );
}

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<Navigate to="/auth" />} />
        <Route path="/register" element={<Navigate to="/auth" />} />

        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/booking" element={<PrivateRoute><Booking /></PrivateRoute>} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
