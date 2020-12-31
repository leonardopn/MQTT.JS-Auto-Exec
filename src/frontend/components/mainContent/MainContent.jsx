import React from "react";
import "./mainContent.css"

const MainContent = props =>{
    return (
        <div className="mainContent">
            {props.children}
        </div>
    )
}

export default MainContent;