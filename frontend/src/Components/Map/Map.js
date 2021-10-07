import React, {useEffect} from "react";
import {MapContainer, TileLayer, GeoJSON, Marker, Popup, LayersControl, ZoomControl } from 'react-leaflet';
import useStyles from "./style";
import { circleMarker } from 'leaflet';


/**
 * @return {null}
 */
const MARKER_STYLE = {
  radius: 8,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};

let map;

function Map(props) {

  const classes = useStyles();
  const {data, activeItem} = props;
  const createMapContext = (mapContext) => {
    map = mapContext;
  };
  const marker = (feature, latlng) => {
    return circleMarker(latlng, MARKER_STYLE)
  };
  useEffect(() => {
    if (!activeItem) return;
    map.flyTo(activeItem.geometry.coordinates);
  }, [activeItem]);
  return (
    <div className={classes.container}>
      <MapContainer
        whenCreated={createMapContext}
        center={[55.705, 37.59]}
        zoom={10}
        zoomControl={false}
        scrollWheelZoom={true}
        className={classes.containerMap}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="2GIS">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tile2.maps.2gis.com/tiles?z={z}&x={x}&y={y}&v=1"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap">
            <TileLayer
              attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        <GeoJSON data={data} pointToLayer={marker}>

        </GeoJSON>
        <ZoomControl position='topright'/>
      </MapContainer>
    </div>
  );
}

export default Map;
