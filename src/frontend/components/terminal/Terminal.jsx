import React from "react";
import "./terminal.css"
import { connect } from "react-redux"

const Terminal = props => {
    return (
        <textarea id="textAreaTerminal" defaultValue={props.textTextArea} readOnly>
        </textarea>
    )
}

const mapStateToProps = state => {
    return {
        textTextArea: state.terminal.textTextArea
    }
}

export default connect(mapStateToProps)(Terminal);