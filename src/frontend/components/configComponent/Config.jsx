
import React from "react";
import "./config.css"
import Card from "../card/Card"
import DivFlex from "../divFlex/DivFlex"
import iconConfigDark from "../../img/config_dark_100.png"
import axios from "axios";
import { connect } from "react-redux";
import { updateConfig } from "../../store/actions/configs";
import ReactLoading from 'react-loading';
import iconCheck from "../../img/check_color_100.png"
import iconClose from "../../img/close_color_100.png";
import Switch from 'react-input-switch';
import { setLog } from "../../scripts/LogUtils";

const Config = props => {
    const [valueIP, setValueIP] = React.useState("");
    const [valueUser, setValueUser] = React.useState("");
    const [valuePass, setValuePass] = React.useState("");
    const [valueTopic, setValueTopic] = React.useState("");
    const [valueStartUp, setValueStartUp] = React.useState(false);
    const [valueProblem, setValueProblem] = React.useState("");
    const [valueTestMQTT, setValueTestMQTT] = React.useState("");


    React.useEffect(() => {
        setValueIP(props.configs.serverIp);
        setValueProblem(props.configs.problem.message);
        setValueUser(props.configs.user);
        setValuePass(props.configs.pass);
        setValueTopic(props.configs.topic);
        setValueStartUp(props.configs.startup);
    }, [props.configs]);

    function resetConfig() {
        setValueIP("");
        setValueProblem("");
        setValueUser("");
        setValuePass("");
        setValueTopic("");
        setValueStartUp(false);
    }

    function setConfig() {
        let data = {
            serverIp: valueIP,
            user: valueUser,
            pass: valuePass,
            topic: valueTopic,
            startup: valueStartUp
        };
        axios.put("http://localhost:8888/updateConfig", data).then(_ => {
            setLog("Configurações salvas!");
            props.updateConfig(data);
        }).catch(error => {
            setLog(error.response.data.type + " - " + error.response.data.payload);
        })
    }

    function testConnectionMQTT() {
        setValueTestMQTT(<ReactLoading type={"spin"} color={"#4E4E4E"} height={20} width={20} />);
        let data = {
            serverIp: valueIP,
            user: valueUser,
            pass: valuePass,
            topic: valueTopic,
            startup: valueStartUp
        };

        setTimeout(_ => {
            axios.post("http://localhost:8888/testServerMQTT", data).then(response => {
                setValueTestMQTT(<React.Fragment><img className="icon" src={iconCheck} alt="icon-check"></img><p> {response.data.payload}</p></React.Fragment>);
                setTimeout(_ => {
                    setValueTestMQTT("")
                }, 5000)
            }).catch(error => {
                setValueTestMQTT(<React.Fragment><img className="icon" src={iconClose} alt="icon-close"></img><p> {error.response.data.payload}</p></React.Fragment>);
                setTimeout(_ => {
                    setValueTestMQTT("")
                }, 5000)
            })
        }, 1000)
    }

    return (
        <Card class="main" id="divConfig">
            <b>{valueProblem}</b>
            <DivFlex>
                <img src={iconConfigDark} className="iconM" alt="config_icon"></img>
                <h2>Configurações</h2>
            </DivFlex>
            <Card class="intern">
                <h3>Servidor MQTT</h3>
                <br></br>
                <DivFlex type="Center">
                    <b><label htmlFor="ipServerMQTT">IP: </label></b>
                    <input type="text" name="ipServerMQTT" value={valueIP} className="inputDefault" onChange={e => setValueIP(e.target.value)}></input>
                </DivFlex>
                <DivFlex type="Center">
                    <b><label htmlFor="userServerMQTT">Usuário: </label></b>
                    <input type="text" name="userServerMQTT" value={valueUser} className="inputDefault" onChange={e => setValueUser(e.target.value)}></input>
                </DivFlex>
                <DivFlex type="Center">
                    <b><label htmlFor="passServerMQTT">Senha: </label></b>
                    <input type="password" name="passServerMQTT" value={valuePass} className="inputDefault" onChange={e => setValuePass(e.target.value)}></input>
                </DivFlex>
                <DivFlex type="Center">
                    <b><label htmlFor="topicServerMQTT">Tópico: </label></b>
                    <input type="text" name="topicServerMQTT" value={valueTopic} className="inputDefault" onChange={e => setValueTopic(e.target.value)}></input>
                </DivFlex>
                <br></br>
                <DivFlex type="Center">
                    <button className="buttonTest buttonOfConfigRound" onClick={_ => testConnectionMQTT()}>Testar conexão</button>
                </DivFlex>
                <br></br>
                <DivFlex type="Center">
                    {valueTestMQTT}
                </DivFlex>

            </Card>
            <Card class="intern">
                <h3>Cliente</h3>
                <label htmlFor="checkBoxOpenStartupSystem">Abrir com o sistema: </label>
                <Switch className="toggleButton" name="checkBoxOpenStartupSystem" on={true} off={false} value={valueStartUp} onChange={setValueStartUp} />
            </Card>
            <DivFlex type="Center">
                <button className="buttonUpdate buttonOfConfig" onClick={_ => setConfig()}>Salvar</button>
                <button className="buttonTest buttonOfConfig" onClick={_ => resetConfig()}>Configurações Padrão</button>
            </DivFlex>
        </Card>
    )
}

const mapStateToProps = state => {
    return {
        configs: state.configs,
    }
}

const mapDispatchToProps = dispatch => {
    return (
        {
            updateConfig(data) {
                const action = updateConfig(data);
                dispatch(action);
            }
        }
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);