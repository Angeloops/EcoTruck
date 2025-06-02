// src/components/RouteMap.jsx
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's icon bug
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function RouteMap({ coordinates }) {
  if (!coordinates || coordinates.length === 0) return <p>No coordinates to display</p>;

  // Center map on the first coordinate or average
  const center = coordinates[0];

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '250px', width: '100%', borderRadius: '8px' }}
      dragging={false}
      doubleClickZoom={false}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {coordinates.map((pos, idx) => (
        <Marker key={idx} position={[pos.lat, pos.lng]}>
          <Popup>
            Point {idx + 1}: {pos.lat.toFixed(4)}, {pos.lng.toFixed(4)}
          </Popup>
        </Marker>
      ))}
      {coordinates.length > 1 && (
        <Polyline positions={coordinates.map((pos) => [pos.lat, pos.lng])} color="green" weight={4} />
      )}
    </MapContainer>
  );
}
