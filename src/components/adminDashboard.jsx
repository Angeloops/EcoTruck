import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRoutes } from '../hooks/useRoutes';

import { supabase } from '../supabaseClient';

import RouteMap from './RouteMap';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { routes, loading, error } = useRoutes();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  

  const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert('Error logging out: ' + error.message);
  } else {
    navigate('/');  // Redirect to login page
  }
};


  

  return (

    
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-green-600 text-green-100 p-4 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <h2 className="text-2xl font-bold mb-6">Menu</h2>
        <nav className="flex flex-col space-y-4">
          <button className="text-left hover:bg-green-700 px-3 py-2 rounded">Personnel Management</button>
          <button className="text-left hover:bg-green-700 px-3 py-2 rounded">Resource Management</button>
          <button className="text-left hover:bg-green-700 px-3 py-2 rounded">Scheduling Management</button>
          <button
            onClick={() => navigate('/live-route')}
            className="text-left hover:bg-green-700 px-3 py-2 rounded"
          >
            Live Route
          </button>
          <button className="text-left hover:bg-green-700 px-3 py-2 rounded">Collection points</button>
          <button
              onClick={handleLogout}
              className="text-left hover:bg-green-700 px-3 py-2 rounded"
            >
              Logout
          </button>
        </nav>
      </aside>

      {/* Main content wrapper */}
      <div
  className={`flex-1 flex flex-col overflow-auto transition-margin duration-300 ease-in-out ${
    sidebarOpen ? 'ml-64' : 'ml-0'
  }`}
>
        {/* Header */}
        <header className="bg-green-500 text-green-100 p-4 text-xl font-bold flex items-center gap-4">
          <button
            className="w-10 h-10 flex items-center justify-center hover:bg-green-700 rounded"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <span>EcoTruck</span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-4">Welcome, Admin!</h1>

          <h2 className="text-2xl mb-4">Saved Routes</h2>

          {loading && <p>Loading routes...</p>}
          {error && <p>Error loading routes: {error.message}</p>}
          {!loading && routes.length === 0 && <p>No saved routes found.</p>}

          <div className="space-y-8 max-w-4xl">
            {routes.map((route) => (
              <div key={route.id} className="bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-2">{route.name}</h3>
                <RouteMap coordinates={route.coordinates} />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
  
}

