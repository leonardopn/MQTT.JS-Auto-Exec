import React from "react";
import "./divFlex.css"

export default props => {
    return (
        <div className="divFlex">
            {props.children}
        </div>
    )
}