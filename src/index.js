import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/store';

const history = createHistory();
const store = configureStore(history);

const Root = () => (
  // eslint-disable-next-line
  <Provider store={store}>
    <App history={history} />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
