import {GeoJSON, Popup} from 'react-leaflet';
import { circleMarker } from 'leaflet';

const MARKER_STYLE = {
  radius: 8,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};
const marker = (feature, latlng) => {
  return circleMarker(latlng, MARKER_STYLE)
};
function GeoJSONLayer(props) {

  const {data, activeItem, setActiveItem} = props;
  const geojson = Object.assign(data, { features: data.features.filter((feature) => {
      const [lat, lon] = feature.geometry.coordinates;
      return lat && lon;
    })});
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
