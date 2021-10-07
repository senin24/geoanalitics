import { GeoJSON } from 'react-leaflet';
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
  const {data} = props;
  const geojson = Object.assign(data, { features: data.features.filter((feature) => {
      const [lat, lon] = feature.geometry.coordinates;
      return lat && lon;
    })});
  return(
    <GeoJSON data={geojson} pointToLayer={marker}>

    </GeoJSON>
  )
}

export default GeoJSONLayer
