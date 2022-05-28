import React from "react";
import type { NextPage } from "next";
import { LiveGeolocation } from "../../components/child-panel/Geolocation";

const ChildPanel: NextPage = () => {
  return (
    <div>
      <LiveGeolocation />
    </div>
  );
};

export default ChildPanel;
