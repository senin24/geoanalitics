import React from "react";
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import useStyles from "./style";

function Map() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} className={classes.containerMap}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
