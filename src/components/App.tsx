import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../components/NotFound';
import SurveyPage from '../pages/SurveyPage';
import ResultsPage from '../pages/ResultsPage';

class App extends Component {
  state = {
    authenticated: false,
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/survey' component={SurveyPage} />
          <Route path='/results' component={ResultsPage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
