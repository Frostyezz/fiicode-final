import React from "react";
import { geolocated } from "react-geolocated";

import axios from "axios";

import { UserContext } from "../../contexts/userContext";

interface Props {
  coords?: any;
  isGeolocationEnabled?: boolean;
  isGeolocationAvailable?: boolean;
  timestamp?: number;
}

const Geolocation: React.FC<Props> = ({
  coords,
  isGeolocationEnabled,
  isGeolocationAvailable,
  timestamp,
}) => {
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    if (user)
      axios.post("/api/pusher", {
        position: [coords?.latitude, coords?.longitude],
        timestamp,
        family: user?.family,
        id: user?.id,
      });
  }, [coords, timestamp, user]);

  return null;
};

export const LiveGeolocation = geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity,
  },
  userDecisionTimeout: 5000,
  watchPosition: true,
})(Geolocation);
