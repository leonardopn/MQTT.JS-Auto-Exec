import React from "react";
import "./divFlex.css"

const DivFlex = props => {
    return (
        <div className="divFlex">
            {props.children}
        </div>
    )
}

export default DivFlex;