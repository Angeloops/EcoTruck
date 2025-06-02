import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';
import LiveRoute from './components/LiveRoute';
import { useRoutes } from './hooks/useRoutes';
import RouteMap from './components/RouteMap';

function Home() {
  const { routes, loading, error } = useRoutes();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome to EcoTruck</h1>

      <h2 className="text-2xl mb-4">Collection Routes</h2>

      {loading && <p>Loading routes...</p>}
      {error && <p>Error loading routes: {error.message}</p>}
      {!loading && routes.length === 0 && <p>No routes available at the moment.</p>}

      <div className="space-y-8">
        {routes.map((route) => (
          <div key={route.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">{route.name}</h3>
            <RouteMap coordinates={route.coordinates} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Homepage with header */}
      <Route
        path="/"
        element={
          <>
            <Header />
            <Home />
          </>
        }
      />

      <Route path="/login" element={<LoginForm />} />
      <Route path="/adminDashboard" element={<AdminDashboard />} />
      <Route path="/live-route" element={<LiveRoute />} />
    </Routes>
  );
}
