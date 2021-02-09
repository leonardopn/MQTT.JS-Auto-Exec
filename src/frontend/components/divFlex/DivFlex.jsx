import React from "react";
import "./divFlex.css"

const DivFlex = props => {
    const classe = props.type ? "divFlex" + props.type : "divFlex";
    return (
        <div className={classe} id={props.id}>
            {props.children}
        </div>
    )
}

export default DivFlex;