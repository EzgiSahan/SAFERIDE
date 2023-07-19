import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ForgetPassword } from './screens/ForgetPassword';
import { Login } from './screens/Login';
import { SetNewPassword } from './screens/SetNewPassword';
import { Signup } from './screens/Signup';

const App = () => {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgetpassword" component={ForgetPassword} />
          <Route path="/setnewpassword" component={SetNewPassword} />
        </Switch>
    </Router>
  );
};

export default App;