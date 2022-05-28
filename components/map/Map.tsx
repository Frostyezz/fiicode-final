import React from "react";

import {
  MapContainer,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import Markers from "./Markers";
import AddMarker from "./AddMarker";

const Map = () => {
  return (
    <MapContainer
      center={[47.158455, 27.601442]}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <AddMarker />
      <Markers />
    </MapContainer>
  );
};

export default Map;
