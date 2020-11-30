import React, {useEffect, useState} from 'react'
import { Line } from "react-chartjs-2"

const Graph = () => {
    const [ data, setData ] = useState({})
    // https://disease.sh/v3/covid-19/historical/all?lastdays=120

     useEffect(() =>{
      fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120").
      then((res) => res.json())
      .then((data) =>{
          setData(data)
      })
     }, [])

    return (
        <div className="graph__head">
            <Line 
                data = {data}
                options
            />
        </div>
    )
}

export default Graph;
