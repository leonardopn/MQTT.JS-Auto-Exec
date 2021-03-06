import React from "react";
import "./terminal.css"
import { connect } from "react-redux"

const Terminal = props => {

    React.useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            function autoScroll() {
                const textarea = document.getElementById('textAreaTerminal');
                textarea.scrollTop = textarea.scrollHeight;
            }
            autoScroll();
        }
        return () => { isMounted = false };
    }, [props.textTextArea]);


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