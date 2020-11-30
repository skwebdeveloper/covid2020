import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Select,MenuItem, CardContent, Card, Zoom } from "@material-ui/core";
import Card1 from "./components/Card1";
import Map from "./components/Map";
import Table from "./components/Table";
import Graph from "./components/Graph";
import "leaflet/dist/leaflet.css";
import { startingnumber } from "./components/util"



const App = () => {
  const [ countries, setcountries ] = useState([])
  const [ country, setCountry ] = useState('worldwide')
  const [ countryInfo, setCountryInfo ] = useState({}) 
  const [ tabledata, setTableData ] = useState([]) 
  const [ mapcenter, setMapcenter ] = useState({lat:34.80746, lng:-40.4796});
  const [ mapzoom, setmapzoom ] = useState(3);
  const [ mapcountries, setmapcountries ] = useState([]);
  

  useEffect(() =>{
        const getCountry = async () =>{
          await fetch("https://disease.sh/v3/covid-19/countries")
          .then((res) => res.json())
          .then((data) =>{
               const countries = data.map((country) => (
                 {
                   name: country.country,
                   value: country.countryInfo.iso2
                 }
               ));
               setcountries(countries);
              //  FOR TABLE 
              setTableData(data);
              setmapcountries(data);
          })}
          getCountry();
  }, [])

const onCountryChange = async (e) => {
  const countryCode = e.target.value;
  setCountry(countryCode);

  const url = 
  (countryCode === 'worldwide') 
  ? 'https://disease.sh/v3/covid-19/all' 
  : `https://disease.sh/v3/covid-19/countries/${countryCode}`
  await fetch(url)
  .then((res) => res.json())
  .then((data) => {
    setCountry(countryCode);
    // All data at once 
    setCountryInfo(data);
    // Latitude and Longitude
    setMapcenter([data.countryInfo.lat, data.countryInfo.long]);
    // Zoom
    setmapzoom(4);
  })
}


  return (
    <div className="app">
{/* --------------------------------------------------- */}

{/* Left Part  */}
<div className="left__side">
    <div className="first__row">
      <h1 className="first__heading">Covid Tracker</h1>
      <div className="first__dropdown">
      <FormControl className="app__dropdown">
       <Select className="app__ul" 
       variant = "outlined" 
       onChange={onCountryChange}
       value={country}
       >
       <MenuItem value="worldwide">
       <p style=
       {{ color:'white', 
       fontWeight:800,
       letterSpacing:'1px' 
        }} 
        className="header__menuitem">
        Worldwide</p>
       </MenuItem>
       {
         countries.map((country) => (
           <MenuItem value={country.value}><p className="header__menuitem">{country.name}</p></MenuItem>
         ))
       }
       </Select>  
      </FormControl>  
      </div>
    </div>

{/* --------------------------------------------------- */}

  <div className="second__row">
    <div className="app__cards">  
      {/* 3 * Cards   */}
      <Card1 
        title = "Corona"
        cases = {countryInfo.todayCases}
        total = {countryInfo.cases}
      />
      <Card1 
        title = "Recovered"
        cases = {countryInfo.todayRecovered}
        total = {countryInfo.recovered}
      />
      <Card1 
        title = "Deaths"
        cases = {countryInfo.todayDeaths} 
        total = {countryInfo.deaths}
      />
    </div>

  </div>

{/* --------------------------------------------------- */}

<div className="third__row">
<div className="map">
<h1>MAP Graphics</h1>
<Map
countries={mapcountries}
center = {mapcenter}
zoom = {mapzoom}
 />
</div>

</div>
</div>
{/* --------------------------------------------------- */}

{/* Right Part */}
<div className="right__side">
    <Card>
    <CardContent className="table">
    <h1>Live Cases by Country Worldwide</h1>
    <Table countries={tabledata} />
    </CardContent>
    </Card>

</div>
</div>
  );
};

export default App;
