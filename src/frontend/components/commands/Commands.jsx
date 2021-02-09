import React, { useState } from "react";
import Card from "../card/Card"
import DivFlex from "../divFlex/DivFlex"
import iconCmdDark from "../../img/cmd_dark_100.png"
import Command from "../command/Command"
import { connect } from "react-redux";
import "./commands.css";
import { useTransition, animated } from 'react-spring'


const Commands = props => {
    const [toggle, setToggle] = useState(0);

    const setNewCommand = React.useCallback(() => setToggle(state => (state + 1) % 2), [])

    const pages = [
        "", <Command type={"NEW"} closeNewCommand={setNewCommand}></Command>
    ]

    const transitions = useTransition(toggle, item => item, {
        from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    });

    return (
        <Card class="main">
            <DivFlex>
                <img src={iconCmdDark} className="iconM" alt="cmd_icon"></img>
                <h2>Comandos</h2>
            </DivFlex>
            <br></br>
            <DivFlex>
                <button className="buttonCreate" onClick={setNewCommand}>Criar Comando</button>
            </DivFlex>
            <br></br>
            {
                transitions.map(({ item, props, key }) => {
                    const page = pages[item]
                    return <animated.div key={key} style={props}>{page}</animated.div>
                })
            }
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