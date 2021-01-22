import React from "react";
import "./terminal.css"
import { connect } from "react-redux"

const Terminal = props => {
    React.useEffect(() => {
        function autoScroll() {
            const textarea = document.getElementById('textAreaTerminal');
            textarea.scrollTop = textarea.scrollHeight;
        }
        autoScroll();
    }, []);


    return (
        <textarea id="textAreaTerminal" value={props.textTextArea} readOnly>
        </textarea>
    )
}

const mapStateToProps = state => {
    return {
        textTextArea: state.terminal.textTextArea
    }
}

export default connect(mapStateToProps)(Terminal);