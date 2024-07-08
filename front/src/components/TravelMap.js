import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fijar el icono del marcador para que se vea correctamente
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

const TravelMap = ({ travelPoints, travelRoutes }) => {
  return (
    <MapContainer center={[-34.603722, -58.381592]} zoom={4} style={{ height: '91vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {travelPoints.map((point, index) => (
        <Marker key={index} position={[point.lat, point.lng]}>
          <Popup>
            {point.description}
          </Popup>
        </Marker>
      ))}
      {travelRoutes.map((route, index) => (
        <Polyline key={index} positions={route.coordinates} color={route.color || 'blue'} />
      ))}
    </MapContainer>
  );
};

export default TravelMap;
