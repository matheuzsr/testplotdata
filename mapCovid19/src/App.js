import React,{useState} from "react";
import { Map, CircleMarker, TileLayer,Popup } from "react-leaflet";
import { Icon } from "leaflet";
import * as parkData from "./data/skateboard-parks.json";
import "./App.css";

export const icon = new Icon({
  iconUrl: "/skateboarding.svg",
  iconSize: [25, 25]
});

export default function App() {
 
  const [activePark, setActivePark] = useState(null);

  return (
    <Map center={[45.4, -75.7]} zoom={12} >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {parkData.features.map(park => (
        <CircleMarker center={[
          park.geometry.coordinates[1],
          park.geometry.coordinates[0]
        ]} color="red" radius={30}
        onClick={() => {
          setActivePark(park);
        }}
       
        />

      ))}
        {activePark && (
        <Popup
          position={[
            activePark.geometry.coordinates[1],
            activePark.geometry.coordinates[0]
          ]}
          onClose={() => {
            setActivePark(null);
          }}
        >
          <div>
            <h2>{activePark.properties.NAME}</h2>
            <p>{activePark.properties.DESCRIPTIO}</p>
          </div>
        </Popup>
      )}

    </Map>
  );
}
