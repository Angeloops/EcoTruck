import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { supabase } from '../supabaseClient';

// Fix Leaflet's icon bug
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function AddMarker({ markers, setMarkers }) {
  useMapEvents({
    click(e) {
      setMarkers([...markers, e.latlng]);
    },
  });
  return null;
}

export default function LiveRoute() {
  const navigate = useNavigate();

  const [routeName, setRouteName] = useState('');
  const [markers, setMarkers] = useState([]);
  const [savedRoutes, setSavedRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const { data, error } = await supabase.from('routes').select();
      if (error) console.error('Error fetching routes:', error);
      else setSavedRoutes(data);
    };
    fetchRoutes();
  }, []);

  const handleSaveRoute = async () => {
    if (!routeName.trim()) {
      alert('Please enter a route name.');
      return;
    }
    if (markers.length === 0) {
      alert('Please add some markers on the map.');
      return;
    }

    const { data, error } = await supabase.from('routes').insert([
      {
        name: routeName,
        coordinates: markers,
      },
    ]);

    if (error) {
      console.error('Error saving to Supabase:', error);
      alert('Failed to save route.');
    } else {
      alert('Route saved!');
      setSavedRoutes([...savedRoutes, { name: routeName, coordinates: markers }]);
      setRouteName('');
      setMarkers([]);
    }
  };

  return (
    <div className="p-6">
      <button
        className="mb-4 w-20 h-8 rounded bg-green-500 hover:bg-green-900 flex items-center justify-center text-white"
        onClick={() => navigate('/adminDashboard')}
      >
        Back
      </button>

      <h2 className="text-2xl font-bold mb-4">Set Live Collection Routes</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter route name"
          className="border rounded p-2 w-full max-w-xs"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
        />
      </div>

      <div className="mb-4" style={{ height: 400 }}>
        <MapContainer
          center={[14.5995, 120.9842]} // Manila
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {markers.map((position, idx) => (
            <Marker key={idx} position={position}>
              <Popup>
                Marker {idx + 1}: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
              </Popup>
            </Marker>
          ))}

          {markers.length > 1 && <Polyline positions={markers} color="green" weight={4} />}
          <AddMarker markers={markers} setMarkers={setMarkers} />
        </MapContainer>
      </div>

      <button
        onClick={handleSaveRoute}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded mb-6"
      >
        Save Route
      </button>

      <h3 className="text-xl font-semibold mb-2">Saved Routes</h3>
      <ul className="space-y-3 max-w-md">
        {savedRoutes.length === 0 && <p>No routes saved yet.</p>}
        {savedRoutes.map((route, i) => (
          <li key={i} className="bg-white p-3 border rounded shadow text-green-700">
            <strong>{route.name}</strong>
            <ul className="mt-1 text-sm text-gray-600">
              {route.coordinates?.map((pt, idx) => (
                <li key={idx}>
                  {idx + 1}: {pt.lat.toFixed(4)}, {pt.lng.toFixed(4)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
