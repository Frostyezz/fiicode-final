import React from "react";

import { useMapEvent, Marker } from "react-leaflet";

import axios from "axios";

import { UserContext } from "../../contexts/userContext";

const SendPosDev = () => {
  const [pos, setPos] = React.useState([0, 0]);
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    axios.post("/api/pusher", {
      position: pos,
      timestamp: 0,
      family: user?.family,
      id: user?.id,
    });
  }, [pos]);
  const map = useMapEvent("click", ({ latlng }) => {
    setPos([latlng.lat, latlng.lng]);
  });
  //@ts-ignore
  return <Marker position={pos} />;
};

export default SendPosDev;
