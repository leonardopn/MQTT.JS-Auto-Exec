import React from "react";
import "./card.css"

export default props =>{
    return (
        <div className="cardDefault">
            {props.children}
        </div>
    )
}