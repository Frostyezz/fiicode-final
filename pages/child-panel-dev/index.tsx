import React from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Activity: NextPage = () => {
  const MapDev = dynamic(() => import("../../components/map/MapDev"), {
    ssr: false,
  });

  return (
    <div className="w-screen flex md:flex-row flex-col">
      <div className="h-screen w-screen">
        <MapDev />
      </div>
    </div>
  );
};

export default Activity;
