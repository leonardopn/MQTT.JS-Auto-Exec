import React from "react";
import "./divFlex.css"

const DivFlex = props => {
    return (
        <div className="divFlex" id={props.id}>
            {props.children}
        </div>
    )
}

export default DivFlex;