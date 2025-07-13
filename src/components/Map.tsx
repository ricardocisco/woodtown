"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png"
});

async function getCoordinatesFromAddress(address: string) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`
  );
  const data = await res.json();
  if (data.length === 0) throw new Error("Endereço não encontrado");
  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon)
  };
}

export default function Mapa() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const endereco = "Avda. Camelias, 20, 36211 Vigo, Pontevedra, Espanha";

  useEffect(() => {
    getCoordinatesFromAddress(endereco).then((coords) => {
      setPosition([coords.lat, coords.lon]);
    });
  }, []);

  if (!position) return <p>Carregando mapa...</p>;

  return (
    <MapContainer
      center={position}
      zoom={17}
      scrollWheelZoom={false}
      className="w-full h-[300px] rounded-lg border"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{endereco}</Popup>
      </Marker>
    </MapContainer>
  );
}
