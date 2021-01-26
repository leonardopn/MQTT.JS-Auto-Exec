import './App.css';
import React from "react";
import NavBar from "./components/navBar/NavBar"
import { connect } from "react-redux";
import MainContent from "./components/mainContent/MainContent"
import "./scripts/socketClient";
import { getConfig, problemGetConfig } from "./store/actions/configs"

const App = props => {
	const { getConfig } = props;
	React.useEffect(() => {
		getConfig();
	}, [getConfig]);

	return (
		<div className="App">
			<NavBar></NavBar>
			<MainContent>
				{props.view}
			</MainContent>
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
