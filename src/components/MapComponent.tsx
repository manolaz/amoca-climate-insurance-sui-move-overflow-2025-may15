import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  center: [number, number];
  zoom: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const MapComponent: React.FC<MapComponentProps> = ({
  center,
  zoom,
  style,
  children,
}) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={style}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {children}
    </MapContainer>
  );
};

export default MapComponent;