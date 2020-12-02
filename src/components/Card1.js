import React from 'react'
import "./card.css"

const Card1 = (props) => {
    return (
        <div className="card__header">
            <h1>{props.title}</h1>
            <h3>Today's - {props.cases} </h3>
            <h3>Total - {props.total}</h3>
        </div>
    )
}

export default Card1;
