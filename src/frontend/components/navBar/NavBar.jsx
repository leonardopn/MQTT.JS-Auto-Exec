import React from "react";
import "./navbar.css"
import iconConsoleWhite from "../../img/console_white_100.png"
import iconEnterKeyWhite from "../../img/enter_key_white_100.png"
import iconConfigWhite from "../../img/config_white_100.png"

const NavBar = props => {

    function changeButtonDefault(event) {
        let buttonDefault = document.getElementById("buttonActive");
        buttonDefault.id = "buttonNormal";
        event.currentTarget.id = "buttonActive";
    }


    return (
        <div className="navbar">
            <table className="tableNavbar">
                <tbody>
                    <tr>
                        <td> <button id="buttonActive" onClick={e => changeButtonDefault(e)}><img src={iconConsoleWhite} className="icon" alt="Console_icon"></img></button></td>
                        <td> <button id="buttonNormal" onClick={e => changeButtonDefault(e)}><img src={iconEnterKeyWhite} className="icon" alt="Enter_key_icon"></img></button></td>
                        <td> <button id="buttonNormal" onClick={e => changeButtonDefault(e)}><img src={iconConfigWhite} className="icon" alt="Config_icon"></img></button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default NavBar;