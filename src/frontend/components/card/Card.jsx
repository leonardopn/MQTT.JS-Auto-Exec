import React from "react";
import "./card.css"

const Card = props => {
    return (
        <div id="card" className={props.class}>
            {props.children}
        </div>
    )
}
export default Card;