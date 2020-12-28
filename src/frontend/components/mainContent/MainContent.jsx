import React from "react";
import "./mainContent.css"

export default props =>{
    return (
        <div className="mainContent">
            {props.children}
        </div>
    )
}