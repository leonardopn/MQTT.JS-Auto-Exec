import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { updateStatusMQTT, updateTimerMQTT } from "../../store/actions/mqtt.action";
import { setLog } from "../../../backend/utils/LogUtils";
import DivFlex from "../divFlex/DivFlex";
import ReactLoading from 'react-loading';
import "./statusMQTT.css"

const StatusMqtt = props => {
    const [intervalTimer, setIntervalTimer] = React.useState("");
    const [loading, setLoading] = React.useState("");
    const [classButton, setClassButton] = React.useState("classButtonUncovered");

    React.useEffect(() => {
        if (props.configs.serverIp) {
            restartClientMQTT();
        }
        // eslint-disable-next-line
    }, [props.configs]);

    React.useEffect(() => {
        if (props.mqttStatus) {
            setLoading("");
            setClassButton("classButtonHidden");
        }
        else {
            setClassButton("classButtonUncovered");
            setLoading(<ReactLoading type={"spin"} color={"#4E4E4E"} height={20} width={20} />);
        }

    }, [props.mqttStatus]);

    React.useEffect(() => {
        if (props.statusTimer && !props.mqttStatus) {
            setIntervalTimer(startTimer());
        }
        // eslint-disable-next-line
    }, [props.statusTimer]);

    function restartClientMQTT() {
        resetTimer();
        setLoading(<ReactLoading type={"spin"} color={"#4E4E4E"} height={20} width={20} />);
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
        let tempo = 30;
        const interval = setInterval(() => {
            if (tempo <= 0) {
                clearInterval(interval);
                restartClientMQTT();
                setLoading(<ReactLoading type={"spin"} color={"#4E4E4E"} height={20} width={20} />);
            }
            else {
                setLoading(tempo--);
            }

        }, 1000);

        return interval;
    }

    function resetTimer() {
        clearInterval(intervalTimer);
    }

    function trataStatus(status) {
        return status ? "Green" : "Red";
    }

    return (
        <div id="statusMQTTFlex">
            <DivFlex>
                <button className={classButton} onClick={_ => restartClientMQTT()}>
                    {loading}
                </button>
            </DivFlex>
            <DivFlex id={`divFlexStatusMQTT${trataStatus(props.mqttStatus)}`}>
                <div id="divStatusMQTT">MQTT</div>
            </DivFlex>
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