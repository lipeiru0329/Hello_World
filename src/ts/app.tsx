import 'css/style.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'whatwg-fetch';
import Admin from './containers/AdminContainer';
import store from './store/store';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<React.StrictMode>
				<Admin />
			</React.StrictMode>
		</Router>
	</Provider>,
	document.getElementById('app')
);
