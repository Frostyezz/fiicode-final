import React from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

import MapActions from "../../components/map/MapActions";

import { MapProvider } from "../../contexts/mapContext";

const Activity: NextPage = () => {
  const Map = dynamic(() => import("../../components/map/Map"), {
    ssr: false,
  });

  return (
    <MapProvider>
      <div className="w-screen flex md:flex-row flex-col">
        <div className="h-96 md:h-screen w-screen md:w-8/12">
          <Map />
        </div>
        <div className="md:w-4/12 w-screen shadow-shadow_nav">
          <MapActions />
        </div>
      </div>
    </MapProvider>
  );
};

export default Activity;
