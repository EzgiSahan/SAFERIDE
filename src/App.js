import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from './screens/Login';
import { Signup } from './screens/Signup';

const App = () => {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route path="/login" component={Login} />
        </Switch>
    </Router>
  );
};

export default App;