import './App.css';
import React from "react";
import NavBar from "./components/navBar/NavBar"
import { connect } from "react-redux";
import "./scripts/socketClient";
import { getConfig, problemGetConfig } from "./store/actions/configs";
import { useTransition, animated } from 'react-spring'
import Terminal from "./components/terminal/Terminal";
import Config from "./components/configComponent/Config";
import Commands from "./components/commands/Commands";
import { getCommands } from "./store/actions/commandsAction"

const App = props => {
	const terminal = <Terminal></Terminal>;
	const config = <Config></Config>;
	const commands = <Commands></Commands>;

	const { getConfig, getCommands } = props;

	React.useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			getConfig();
			getCommands();
		}
		return () => { isMounted = false };
	}, [getConfig, getCommands]);


	const pages = [
		({ style }) => <animated.div style={{ ...style }}>{terminal}</animated.div>,
		({ style }) => <animated.div style={{ ...style }}>{config}</animated.div>,
		({ style }) => <animated.div style={{ ...style }}>{commands}</animated.div>,
	]

	const transitions = useTransition(props.view, p => p, {
		from: {
			opacity: 1, transform: 'translate3d(100%,0,0)',
			backgroundColor: '#F5F6FA', display: 'flex', justifyContent: "center",
			alignItems: "center"
		},
		enter: {
			opacity: 1, transform: 'translate3d(0%,0,0)',
			backgroundColor: "#F5F6FA", display: 'flex', justifyContent: "center",
			alignItems: "center", flex: 1
		},
		leave: {
			opacity: 1, transform: 'translate3d(-100%,0,0)',
			backgroundColor: '#F5F6FA', display: 'flex', justifyContent: "center",
			alignItems: "center"
		}
	})

	return (
		<div className="App">
			<NavBar></NavBar>
			<div className="simple-trans-main">
				{
					transitions.map(({ item, props, key }) => {
						const Page = pages[item]
						return <Page key={key} style={props} />
					})
				}
			</div>
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
			},
			getCommands() {
				const action = getCommands();
				action.payload.then(value => {
					action.payload = value;
					dispatch(action);
				});
			}
		}
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
