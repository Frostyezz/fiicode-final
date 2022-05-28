import { createContext, useState, useEffect } from "react";

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const [map, setMap] = useState(null);
  const [currentPos, setCurrentPos] = useState([null, null]);

  //useEffect(() => setUser(JSON.parse(localStorage.getItem("user"))), []);

  const changeCurrentPos = (pos) => {
    setCurrentPos(pos);
  };

  const populateMap = (map) => {
    setMap(map);
  };

  return (
    <MapContext.Provider
      value={{
        map,
        populateMap,
        currentPos,
        changeCurrentPos,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export { MapProvider, MapContext };
