import React from "react";

import Pusher from "pusher-js";

import { MapContext } from "../../contexts/mapContext";

import { Popup, Marker, Circle } from "react-leaflet";

import L from "leaflet";

const markerHtmlStyles = `
background-color: "#ffffff";
width: 3rem;
height: 3rem;
display: block;
left: -1.5rem;
top: -1.5rem;
position: relative;
border-radius: 20px;
transform: rotate(45deg);
border: 1px solid #FFFFFF`;

const safeIcon = new L.Icon({
  iconUrl: "/geo-alt-blue.svg",
  iconRetinaUrl: "/geo-alt-blue.svg",
  iconAnchor: [30, 34],
  popupAnchor: [0, -26],
  labelAnchor: [-6, 0],
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new L.Point(60, 75),
  html: `<span style="${markerHtmlStyles}" />`,
});

const dangerIcon = new L.Icon({
  iconUrl: "/geo-alt-red.svg",
  iconRetinaUrl: "/geo-alt-red.svg",
  iconAnchor: [30, 34],
  popupAnchor: [0, -26],
  labelAnchor: [-6, 0],
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new L.Point(60, 75),
  html: `<span style="${markerHtmlStyles}" />`,
});

const Markers = () => {
  const { map } = React.useContext(MapContext);

  const [children, setChildren] = React.useState<any[]>([]);
  console.log(children);

  const safe = { fillColor: "blue", color: "blue" };
  const dangerous = { fillColor: "red", color: "red" };

  React.useEffect(() => {
    if (map) {
      Pusher.logToConsole = true;
      //@ts-ignore
      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_API_KEY, {
        cluster: "eu",
      });
      const channel = pusher.subscribe(map?.family._id);

      channel.bind("position-change", function (data: any) {
        const exists = children.indexOf((child: any) => child.id === data.id);
        if (exists > -1) {
          const copy = children;
          copy[exists].position = data.position;
          setChildren(copy);
        } else {
          const child = map.family.children.filter(
            (child: any) => child.id === data.id
          )[0];
          setChildren([...children, { ...child, position: data.position }]);
        }
      });

      return () => {
        pusher.unsubscribe(map?.family._id);
      };
    }
  }, []);

  return (
    <>
      {children.map((child: any) => (
        <Marker
          icon={
            child?.avatar
              ? new L.Icon({
                  iconUrl: child?.avatar,
                  iconRetinaUrl: child?.avatar,
                  iconAnchor: [30, 34],
                  popupAnchor: [0, -26],
                  labelAnchor: [-6, 0],
                  shadowUrl: undefined,
                  shadowSize: undefined,
                  shadowAnchor: undefined,
                  iconSize: new L.Point(60, 75),
                  html: `<span style="${markerHtmlStyles}" />`,
                })
              : new L.Icon({
                  iconUrl: "/person-circle.svg",
                  iconRetinaUrl: "/person-circle.svg",
                  iconAnchor: [30, 34],
                  popupAnchor: [0, -26],
                  labelAnchor: [-6, 0],
                  shadowUrl: undefined,
                  shadowSize: undefined,
                  shadowAnchor: undefined,
                  iconSize: new L.Point(60, 75),
                  html: `<span style="${markerHtmlStyles}" />`,
                })
          }
          key={child._id}
          position={child.position}
        >
          <Popup>
            <b className="text-center">{child.name}</b>
          </Popup>
        </Marker>
      ))}
      {map?.map.markers.map((marker: any) =>
        marker.radius < 99 ? (
          <Marker
            icon={marker.status === "Safe" ? safeIcon : dangerIcon}
            key={marker._id}
            position={marker.position}
          >
            <Popup>
              <b className="text-center">{marker.title}</b>
              <br />
              <span>
                {marker.status} for{" "}
                {
                  map.family.children.filter((child: any) =>
                    child.id === marker.child ? child.name : null
                  )[0]?.name
                }
              </span>
            </Popup>
          </Marker>
        ) : (
          <Circle
            key={marker._id}
            center={marker.position}
            radius={marker.radius}
            pathOptions={marker.status === "Safe" ? safe : dangerous}
          >
            <Popup>
              <b className="text-center">{marker.title}</b>
              <br />
              <span>
                {marker.status} for{" "}
                {
                  map.family.children.filter((child: any) =>
                    child.id === marker.child ? child.name : null
                  )[0]?.name
                }
              </span>
            </Popup>
          </Circle>
        )
      )}
    </>
  );
};

export default Markers;
