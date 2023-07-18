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
          <Route path="/login231" component={Login} />
          {/* To route to any path that you want we use the * sign in the paths along with the component */}
          <Route path="*" component={Login} />
        </Switch>
    </Router>
  );
};

export default App;