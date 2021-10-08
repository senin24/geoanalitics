import React, {useEffect, useState} from "react";
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

  const {data, popup, setActiveItem} = props;
  const [layer, setLayer] = useState(null);
  let geojson = Object.assign(data, { features: data.features.filter((feature) => {
      const [lat, lon] = feature.geometry.coordinates;
      return lat && lon;
    })});
  useEffect(() => {
    geojson = Object.assign(data, { features: data.features.filter((feature) => {
        const [lat, lon] = feature.geometry.coordinates;
        return lat && lon;
      })});
    if (layer) {
      layer.clearLayers();
      layer.addData(geojson);
    }
  }, [data]);
  return(
    <GeoJSON data={geojson} pointToLayer={marker} onEachFeature={(feature, layer) => {
      layer.bindPopup(popup(feature.properties));
    }} eventHandlers={{
      add: (evt) => {
        setLayer(evt.sourceTarget);
      },
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
