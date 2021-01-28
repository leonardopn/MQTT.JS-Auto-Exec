import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { updateStatusMQTT, updateTimerMQTT } from "../../store/actions/mqtt.action";
import { setLog } from "../../../backend/utils/LogUtils";

const StatusMqtt = props => {
    const [timer, setTimer] = React.useState(30);
    const [intervalTimer, setIntervalTimer] = React.useState("");

    React.useEffect(() => {
        restartClientMQTT();
        // eslint-disable-next-line
    }, [props.configs]);

    React.useEffect(() => {
        if (props.statusTimer && !props.mqttStatus) {
            setIntervalTimer(startTimer());
        }
        // eslint-disable-next-line
    }, [props.statusTimer]);

    function restartClientMQTT() {
        resetTimer();
        const data = { ...props.configs };
        if (!data.problem.status) {
            axios.post("http://localhost:8888/startServerMQTT", data).then(_ => {
            }).catch(error => {
                props.updateStatusMQTT(false);
                setLog(error.response.data.type + " - " + JSON.stringify(error.response.data.payload));
            });
        }
        else {
            props.updateStatusMQTT(false);
        }
    }

    function startTimer() {
        props.updateTimerMQTT(false);
        let tempo = timer;
        const interval = setInterval(() => {
            if (tempo <= 0) {
                clearInterval(interval);
                tempo = 30
                setTimer(tempo);
                restartClientMQTT();
            }

            setTimer(tempo--);
        }, 1000);

        return interval;
    }

    function resetTimer() {
        clearInterval(intervalTimer);
        setTimer(30);
    }

    function trataStatus(status) {
        return status ? "Conectado" : "Desconectado";
    }

    return (
        <div>
            <button onClick={_ => restartClientMQTT()}>Testar</button>
            <p>Server MQTT: {trataStatus(props.mqttStatus)}</p>
            <p>Timer {timer}</p>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        mqttStatus: state.mqtt.status,
        statusTimer: state.mqtt.timer,
        configs: state.configs,
    }
}

const mapDispatchToProps = dispatch => {
    return (
        {
            updateStatusMQTT(status) {
                const action = updateStatusMQTT(status);
                dispatch(action);
            },
            updateTimerMQTT(status) {
                const action = updateTimerMQTT(status);
                dispatch(action);
            },
        }
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusMqtt);