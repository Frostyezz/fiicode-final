import React from "react";

import { useMapEvent, Marker } from "react-leaflet";

import { MapContext } from "../../contexts/mapContext";

const AddMarker = () => {
  const { changeCurrentPos, currentPos } = React.useContext(MapContext);
  const map = useMapEvent("click", ({ latlng }) => {
    changeCurrentPos([latlng.lat, latlng.lng]);
  });
  if (currentPos[0])
    return (
      <Marker
        eventHandlers={{
          click: () => {
            changeCurrentPos([null, null]);
          },
        }}
        position={currentPos}
      ></Marker>
    );
  else return null;
};

export default AddMarker;
