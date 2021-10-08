import React, {useEffect, useState} from "react";
import {MapContainer, TileLayer, LayerGroup, LayersControl, ZoomControl } from 'react-leaflet';
import useStyles from "./style";
import GeoJSONLayer from "./GeoJSONLayer";
import L from 'leaflet';
import HeatLayer from './HeatmapLayer';


/**
 * @return {null}
 */

function Map(props) {
  const classes = useStyles();
  const {data, dataHeat, activeItem, setActiveItem} = props;
  const [map, setMap] = useState(null);
  const createMapContext = (mapContext) => {
    setMap(mapContext);
  };
  const alias = {
    title: "Заголовок",
    type: "Тип",
    source: "Источник",
    date: "Дата",
    text: "Описание",
    special: "Специальное",
    address: "Адрес"
  };
  const _createPopUp = (data) => {
    let popup = "<div style='display: flex; flex-direction: column'>";
    Object.keys(alias).forEach((key) => {
      if (key === 'date') {
        const date = new Date(data[key]);
        let formatter = new Intl.DateTimeFormat("ru");
        popup += `<div><strong>${alias[key]}: </strong>${formatter.format(date) }</div>`;
      } else if (key === 'address') {
        popup += `<div><strong>${alias[key]}: </strong>${Object.keys(data[key]).filter((prop) => data[key][prop]).map((prop) => data[key][prop]).join(', ')}</div>`
      } else if (key === 'special') {
        popup += `<div><strong>${alias[key]}:</strong> ${data[key] ? 'Да' : 'Нет'}</div>`
      } else if (key === 'title') {
        popup += `<div><center><b>${data[key]}</b></center></div>`
      } else {
        popup += `<div><strong>${alias[key]}:</strong> ${data[key]}</div>`
      }
    });
    popup += '<div>';
    return popup;
  };

  useEffect(() => {
    if (!activeItem) return;
    map.flyTo([activeItem.geometry.coordinates[1], activeItem.geometry.coordinates[0]], 13);
    const popup = L.popup()
      .setLatLng([activeItem.geometry.coordinates[1], activeItem.geometry.coordinates[0]])
      .setContent(_createPopUp(activeItem.properties))
      .openOn(map);
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
          <LayersControl.Overlay checked name={'События'}>
            <GeoJSONLayer data={data} activeItem={activeItem} setActiveItem={setActiveItem}/>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name={'Тепловая карта'}>
            <LayerGroup>
              <HeatLayer data={dataHeat} map={map}/>
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
        <ZoomControl position='topright'/>
      </MapContainer>
    </div>
  );
}

export default Map;
