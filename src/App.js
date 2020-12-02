import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Select,MenuItem, CardContent, Card } from "@material-ui/core";
import Card1 from "./components/Card1";
import Map from "./components/Map";
import Table from "./components/Table";
import "leaflet/dist/leaflet.css";
import { sortTabled } from "./components/util"
import AOS from 'aos';
import 'aos/dist/aos.css'; 

AOS.init();


const App = () => {
  const [ countries, setcountries ] = useState([])
  const [ country, setCountry ] = useState('worldwide')
  const [ countryInfo, setCountryInfo ] = useState({}) 
  const [ tabledata, setTableData ] = useState([]) 
  const [ mapcenter, setMapcenter ] = useState({lat:27.2046, lng:77.4977});
  const [ mapzoom, setmapzoom ] = useState(3);
  const [ mapcountries, setmapcountries ] = useState([]);

 useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

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
              const sortedTabled = sortTabled(data);
              setTableData(sortedTabled);
              setmapcountries(data);
          })}
          getCountry();
  }, [])





  const onCountryChange = async(e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    const url = (countryCode === 'worldwide')
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
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
      });
  }



  return (
    <div className="app">

{/* --------------------------------------------------- */}

{/* Left Part  */}
<div className="left__side">
    <div className="first__row">
      <h1 className="first__heading">Covid Tracker</h1>
      <h1 className="continent__name__decor">{countryInfo.continent}</h1>  
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
        className="header__menuitem"
        value={country.value}
        >
        Worldwide</p>
       </MenuItem>
       {
         countries.map((country) => (
           <MenuItem style={{ color:'white', 
           backgroundColor: '#00162c',
           fontWeight:800,
           letterSpacing:'1px' 
        }} value={country.value}>
        <p className="header__menuitem">{country.name}</p></MenuItem>
         ))
       }
       </Select>  
      </FormControl>  
      </div>
    </div>

{/* --------------------------------------------------- */}
  <div className="second__row"> 
    <div data-aos="zoom-out-down" className="app__cards">  
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
<h1 className="first__heading">Map Graphics</h1>
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
    <Card data-aos="zoom-out-down">
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
