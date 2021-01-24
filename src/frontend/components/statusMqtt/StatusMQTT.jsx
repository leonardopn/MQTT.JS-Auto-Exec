import React from "react";
import { connect } from "react-redux"

const StatusMqtt = props => {
    function trataStatus(status) {
        return status ? "Conectado" : "Desconectado";
    }

    return (
        <div>
            <button>Testar</button>
            <p>Server MQTT: {trataStatus(props.status)}</p>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        status: state.mqtt.status
    }
}

export default connect(mapStateToProps)(StatusMqtt);