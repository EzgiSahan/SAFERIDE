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
          <Route path="/login231" component={Login} />
          {/* To route to any path that you want we use the * sign in the paths along with the component */}
          <Route path="*" component={Login} />
        </Switch>
    </Router>
  );
};

export default App;