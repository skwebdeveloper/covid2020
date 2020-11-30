// DRAW CIRCLE
// TOOLTIP
import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

import "./util.css";

const ColorType = {
    cases:{
        hex: "#CC1034",   
        multiplier: 800,
    },
    recovered:{
        hex: "#7dd71d",
        multiplier: 1200,
    },
    deaths:{
        hex: "#fb4443",
        multiplier: 2000,
    },
}; 


export const ShowDataOnMap = (data, casesType = 'cases') =>(
    data.map(country =>(
        <Circle
        center = {[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={ColorType[casesType].hex}
        radius={
            Math.sqrt(country[casesType])* ColorType[casesType].multiplier
        }>
        <Popup className="util__popup">
        <div className="util__container">
            <div className="util__image" style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
            <div className="util__name">{country.country}</div>
            <div className="util__cases">Cases - {country.cases}</div>
            <div className="util__recovery">Recovered - {country.recovered}</div>
            <div className="util__deaths">Deaths - {country.deaths}</div>
        </div>
        </Popup>

        </Circle>
    ))
);


// EARLY NUMBERS 

export const startingnumber = (stat) =>
    stat ? `${numeral(stat).format("0,0a")}` : 'Loading'







