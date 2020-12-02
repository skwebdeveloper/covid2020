// DRAW CIRCLE
// TOOLTIP
import React from "react";
import { Circle, Popup } from "react-leaflet";
import "./util.css";

// Colors selection if you want to make it more attractive
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

// Show circle
export const ShowDataOnMap = (data, casesType = 'cases') =>(
    data.map(country =>(
        <Circle
        center = {[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color='#3c00ad'
        // Radius Fucntion is not enabled for now because of some Issue
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


// SORT TABLE 
export const sortTabled = (data) =>{
    let sortedTabled = [...data];
    sortedTabled.sort((a,b) =>{
    if(a.cases > b.cases){ 
        return -1;
    }
    else{
        return 1;
    }});
return sortedTabled;
}; 







