import React, {useEffect} from "react";
import Heatmap from 'leaflet-heatmap';

/**
 * @return {null}
 */
function HeatmapLayer(props) {
  const {data, map} = props;
  useEffect(() => {
    if(!map) {
      return;
    }
    const cfg = {
      // radius should be small ONLY if scaleRadius is true (or small radius is intended)
      // if scaleRadius is false it will be the constant radius used in pixels
      "radius": 0.07,
      "maxOpacity": .8,
      // scales the radius based on map zoom
      "scaleRadius": true,
      // if set to false the heatmap uses the global maximum for colorization
      // if activated: uses the data maximum within the current map boundaries
      //   (there will always be a red spot with useLocalExtremas true)
      "useLocalExtrema": true,
      // which field name in your data represents the latitude - default "lat"
      latField: 'lat',
      // which field name in your data represents the longitude - default "lng"
      lngField: 'lng',
      // which field name in your data represents the data value - default "value"
      valueField: 'importance'
    };
    const layer = new Heatmap(cfg);
    layer.setData({max: 2, data:data.features.map((feature) => {
        return {
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0],
          importance: feature.properties.importance,
        }
      })});
    map.addLayer(layer);

    return () => {
      map.removeLayer(layer)
    }
  }, [map]);

  return null;
}

export default HeatmapLayer;
