import React from "react";
import Card from "../card/Card"
import DivFlex from "../divFlex/DivFlex"

import iconCmdDark from "../../img/cmd_dark_100.png"

const Commands = props => {
    return (
        <Card class="main">
            <DivFlex>
                <img src={iconCmdDark} className="iconM" alt="cmd_icon"></img>
                <h2>Comandos</h2>
            </DivFlex>
            <Card class="intern"></Card>
        </Card>

    );
}

export default Commands;