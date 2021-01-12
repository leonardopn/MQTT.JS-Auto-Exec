import './App.css';
import NavBar from "./components/navBar/NavBar"
import Config from "./components/configComponent/Config"
import { connect } from "react-redux";
import MainContent from "./components/mainContent/MainContent"

const App = props => {
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

export default connect(mapStateToProps)(App);
