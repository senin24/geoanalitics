import React from "react";
import {MapContainer, TileLayer, GeoJSON, Marker, Popup, useMapEvents} from 'react-leaflet';
import useStyles from "./style";

/**
 * @return {null}
 */

function Map(props) {
  const classes = useStyles();
  const {data, activeItem} = props;

  return (
    <div className={classes.container}>
      <MapContainer center={[55.705, 37.59]} zoom={10} scrollWheelZoom={true} className={classes.containerMap}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile2.maps.2gis.com/tiles?z={z}&x={x}&y={y}&v=1"
        />
        <GeoJSON data={data}/>
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
