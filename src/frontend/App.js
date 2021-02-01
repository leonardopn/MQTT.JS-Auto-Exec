import './App.css';
import React from "react";
import NavBar from "./components/navBar/NavBar"
import { connect } from "react-redux";
import MainContent from "./components/mainContent/MainContent"
import "./scripts/socketClient";
import { getConfig, problemGetConfig } from "./store/actions/configs";
import { useTransition, animated } from 'react-spring'
import Terminal from "./components/terminal/Terminal";
import Config from "./components/configComponent/Config";
import Commands from "./components/commands/Commands";

const App = props => {
	const terminal = <Terminal></Terminal>;
	const config = <Config></Config>;
	const commands = <Commands></Commands>;

	const { getConfig } = props;
	React.useEffect(() => {
		getConfig();
	}, [getConfig]);

	const pages = [
		({ style }) => <animated.div style={{ ...style }}> {terminal}</animated.div>,
		({ style }) => <animated.div style={{ ...style }}>{config}</animated.div>,
		({ style }) => <animated.div style={{ ...style }}>{commands}</animated.div>,
	]

	const transitions = useTransition(props.view, p => p, {
		from: {
			opacity: 0, transform: 'translate3d(100%,0,0)', flex: 1,
			backgroundColor: '#F5F6FA', display: 'flex', justifyContent: "center",
			alignItems: "center"
		},
		enter: {
			opacity: 1, transform: 'translate3d(0%,0,0)', flex: 1,
			backgroundColor: "#F5F6FA", display: 'flex', justifyContent: "center",
			alignItems: "center"
		},
		leave: {
			opacity: 0, transform: 'translate3d(-1000%,0,0)', flex: 1,
			backgroundColor: '#F5F6FA', display: 'flex', justifyContent: "center",
			alignItems: "center"
		}
	})

	return (
		<div className="App">
			<NavBar></NavBar>
			{/* <MainContent> */}
			{
				transitions.map(({ item, props, key }) => {
					const Page = pages[item]
					return <Page key={key} style={props} />
				})
			}
			{/* </MainContent> */}
		</div>
	);
}

const mapStateToProps = state => {
	return {
		view: state.view.selectedView
	}
}

const mapDispatchToProps = dispatch => {
	return (
		{
			getConfig() {
				const action = getConfig();
				action.payload.then(value => {
					action.payload = value;
					dispatch(action);
				}).catch(error => {
					const actionProblem = problemGetConfig(<p className="problem">{"ERRO - " + error.payload}<br></br><br></br>{"Dados padrões serão carregados!"}</p>);
					dispatch(actionProblem);
				})
			}
		}
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
