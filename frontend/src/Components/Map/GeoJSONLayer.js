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

  const {data, activeItem} = props;
  const geojson = Object.assign(data, { features: data.features.filter((feature) => {
      const [lat, lon] = feature.geometry.coordinates;
      return lat && lon;
    })});
  const showPopUp = () => {
    if (activeItem) {
      return (
        <Popup>
          <div>{
            activeItem.properties.text
          }</div>
        </Popup>
      )
    } else {
      return null;
    }
  };
  return(
    <GeoJSON data={geojson} pointToLayer={marker} onEachFeature={(feature, layer) => {
      layer.bindPopup(feature.properties.text);
    }}>
      {/*{showPopUp()}*/}
    </GeoJSON>
  )
}

export default GeoJSONLayer
