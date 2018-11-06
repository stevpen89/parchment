import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import {HashRouter} from 'react-router-dom'
import {StripeProvider} from 'react-stripe-elements';
import store from './ducks/store'
// import registerServiceWorker from './registerServiceWorker';
// import unregister from './registerServiceWorker';

ReactDOM.render(
<Provider store={store}>
	<HashRouter>
		<StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}>
			<App />
		</StripeProvider>
	</HashRouter>
</Provider>

, document.getElementById('root'));
// unregister();
