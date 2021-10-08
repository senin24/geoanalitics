import React, {useEffect} from "react";
import {GeoJSON, Popup} from 'react-leaflet';
import { circleMarker } from 'leaflet';

const MARKER_STYLE = {
  radius: 5,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};
const MARKER_SPECIAL_STYLE = {
  radius: 5,
  fillColor: "#3f51b5",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};
const marker = (feature, latlng) => {
  if (feature.properties.special) {
    return circleMarker(latlng, MARKER_SPECIAL_STYLE);
  } else {
    return circleMarker(latlng, MARKER_STYLE);
  }
};
function GeoJSONLayer(props) {

  const {data, activeItem, setActiveItem} = props;
  let geojson = Object.assign(data, { features: data.features.filter((feature) => {
      const [lat, lon] = feature.geometry.coordinates;
      return lat && lon;
    })});
  useEffect(() => {
    geojson = Object.assign(data, { features: data.features.filter((feature) => {
        const [lat, lon] = feature.geometry.coordinates;
        return lat && lon;
      })})
  }, [data]);
  return(
    <GeoJSON data={geojson} pointToLayer={marker} onEachFeature={(feature, layer) => {
      layer.bindPopup(feature.properties.title);
    }} eventHandlers={{
      popupopen: (event) => {
        const foundFeature = data.features.find((feature) => {
          return feature.properties.id === event.sourceTarget.feature.properties.id;
        });
        if (foundFeature) {
          setActiveItem(foundFeature);
        }
      }
    }}>
    </GeoJSON>
  )
}

export default GeoJSONLayer
