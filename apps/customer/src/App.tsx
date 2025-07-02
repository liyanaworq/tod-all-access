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
import AuthPage from './pages/AuthPage'; // login/register
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-800 transition-all">
      {!shouldHideNavbar && token && (
        <header className="sticky top-0 z-50 shadow-sm bg-white/80 backdrop-blur border-b border-gray-200">
          <Navbar />
        </header>
      )}
      <main className="flex-1 px-4 py-6 sm:px-6 md:px-10 lg:px-16 transition-all ease-in-out">
        <div className="max-w-6xl mx-auto w-full">{children}</div>
      </main>
    </div>
  );
}

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        {/* Auth */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<Navigate to="/auth" />} />
        <Route path="/register" element={<Navigate to="/auth" />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <PrivateRoute>
              <Booking />
            </PrivateRoute>
          }
        />
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
