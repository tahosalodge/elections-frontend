import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import RequestElection from './modules/Unit/RequestElection';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/request-election" component={RequestElection} />
        </div>
      </Router>
    );
  }
}

export default App;
