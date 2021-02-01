import React, { useState } from "react";
import Card from "../card/Card"
import DivFlex from "../divFlex/DivFlex"
import iconCmdDark from "../../img/cmd_dark_100.png"
import Command from "../command/Command"
import { connect } from "react-redux";

const Commands = props => {
    const [newCommand, setNewCommand] = useState("");

    function criarComando() {
        setNewCommand(<Command type={"NEW"} deleteNewCommand={setNewCommand}></Command>);
    }

    return (
        <Card class="main">
            <DivFlex>
                <img src={iconCmdDark} className="iconM" alt="cmd_icon"></img>
                <h2>Comandos</h2>
            </DivFlex>
            <DivFlex>
                <button onClick={e => criarComando()}>Criar Comando</button>
            </DivFlex>
            {newCommand}
            {props.arrayCommands}
        </Card>
    );
}

const mapStateToProps = state => {
    return {
        arrayCommands: state.commands.arrayCommands,
    }
}

export default connect(mapStateToProps)(Commands);