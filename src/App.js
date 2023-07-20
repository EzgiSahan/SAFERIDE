import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DoneSetPassword } from './screens/DoneSetPassword';
import { ForgetPassword } from './screens/ForgetPassword';
import { Home } from './screens/Home';
import { Login } from './screens/Login';
import { SetNewPassword } from './screens/SetNewPassword';
import { Signup } from './screens/Signup';
import { User } from './screens/User';

const App = () => {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgetpassword" component={ForgetPassword} />
          <Route path="/setnewpassword" component={SetNewPassword} />
          <Route path="/donesetpassword" component={DoneSetPassword} />
          <Route path="/login231" component={Login} />
          <Route path="/user" component={User} />
          {/* To route to any path that you want we use the * sign in the paths along with the component */}
          <Route path="*" component={Login} />
        </Switch>
    </Router>
  );
};

export default App;