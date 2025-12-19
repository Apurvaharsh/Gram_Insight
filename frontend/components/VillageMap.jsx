import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { redIcon, orangeIcon, greenIcon } from "../utils/markerIcons";
import { getMissingAmenities, getSeverityIcon } from "../utils/villageUtils";

const INDIA_CENTER = [22.9734, 78.6569];

const INDIA_BOUNDS = [
  [5.5, 67.0], // SW (a bit further south & west)
  [36.5, 99.0], // NE (a bit further north & east)
];

export default function VillageMap({ villages }) {
  console.log("VILLAGES RECEIVED IN MAP:", villages);
  return (
    <MapContainer
      center={INDIA_CENTER}
      zoom={6} // 🔥 better resolution
      minZoom={5}
      maxZoom={14}
      maxBounds={INDIA_BOUNDS} // 🔒 lock to India
      maxBoundsViscosity={1.0}
      style={{ height: "100vh", width: "100%" }}
    >
      {/* High quality tiles */}
      <TileLayer
        attribution="© OpenStreetMap © CARTO"
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {villages.map((v) => {
        if (!v.location || !v.location.coordinates) return null;

        const missing = getMissingAmenities(v.amenities);
        const icon = getSeverityIcon(v.priorityScore, {
          red: redIcon,
          orange: orangeIcon,
          green: greenIcon,
        });

        return (
          <Marker
            key={v._id}
            icon={icon}
            position={[v.location.coordinates[1], v.location.coordinates[0]]}
          >
            <Popup>
              <strong>{v.villageName}</strong>
              <br />
              District: {v.district}
              <br />
              Priority Score: {v.priorityScore}
              <br />
              Missing Amenities:
              <ul>
                {missing.length > 0 ? missing.map((m) => (
                  <li key={m}>{m}</li>
                )) : <li>None</li>}
              </ul>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
