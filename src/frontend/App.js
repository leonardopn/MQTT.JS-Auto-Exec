import './App.css';
import NavBar from "./components/navBar/NavBar"
//import Terminal from "./components/terminal/Terminal"
import Config from "./components/configComponent/Config"
import MainContent from "./components/mainContent/MainContent"

function App() {
	return (
		<div className="App">
			<NavBar></NavBar>
			{/* <Card>
				<Terminal></Terminal>
			</Card> */}
			<MainContent>
				<Config></Config>
			</MainContent>
		</div>
	);
}

export default App;
