import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './frontend/App';
import { Provider } from "react-redux";
import configStore from "./frontend/store/storeConfig";

const store = configStore()
export default store;

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);


