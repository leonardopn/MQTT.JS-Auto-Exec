import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { updateStatusMQTT } from "../../store/actions/mqtt.action";
import { setLog } from "../../../backend/utils/LogUtils";

const StatusMqtt = props => {
    function restartClientMQTT() {
        const data = { ...props.configs };
        if (!data.problem.status) {
            axios.post("http://localhost:8888/startServerMQTT", data).then(resp => {
            }).catch(error => {
                props.updateStatusMQTT(false);
                setLog(error.response.data.type + " - " + error.response.data.payload);
            });
        }
        else {
            props.updateStatusMQTT(false);
        }
    }

    React.useEffect(() => {
        restartClientMQTT();
        // eslint-disable-next-line
    }, [props.configs]);

    function trataStatus(status) {
        return status ? "Conectado" : "Desconectado";
    }

    return (
        <div>
            <button onClick={_ => restartClientMQTT()}>Testar</button>
            <p>Server MQTT: {trataStatus(props.status)}</p>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        status: state.mqtt.status,
        configs: state.configs,
    }
}

const mapDispatchToProps = dispatch => {
    return (
        {
            updateStatusMQTT(status) {
                const action = updateStatusMQTT(status);
                dispatch(action);
            }
        }
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusMqtt);