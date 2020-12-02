import React from 'react';
import { MapContainer, TileLayer } from "react-leaflet";
import "./map.css"
import { ShowDataOnMap } from "./util"

const Map = ({countries, casesType, center, zoom}) => {
    return (
        <div className="map__head">
        <MapContainer center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>
          contributors'
        />
        { ShowDataOnMap(countries, casesType) } 
        </MapContainer>   
        </div>
    )
}

export default Map;
