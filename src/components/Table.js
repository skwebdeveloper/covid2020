import React from 'react'
import "./table.css"

const Table = ({countries}) => {
    return (
        <div className="table__head">
            {countries.map(country =>(
                <tr className="table__headpart">
                <td>{country.country}</td>
                <td>{country.cases}</td>
                </tr> 
            ))}
        </div>
    )
}

export default Table
