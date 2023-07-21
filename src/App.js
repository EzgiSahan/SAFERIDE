import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ResetPasswordSuccess } from './features/ResetPassword/ResetPasswordSuccess';
import { ForgetPassword } from './features/ResetPassword/ForgetPassword';
import { Home } from './features/Home/Home';
import { Login } from './features/Login/Login';
import { SetNewPassword } from './features/ResetPassword/SetNewPassword';
import { Signup } from './features/Signup/Signup';
import { User } from './features/Profile/Profile';
import { ResetPasswordFail } from './features/ResetPassword/ResetPasswordFail';

const App = () => {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forget-password" component={ForgetPassword} />
          <Route path="/reset-password" component={SetNewPassword} />
          <Route path="/reset-password-success" component={ResetPasswordSuccess} />
          <Route path="/reset-password-fail" component={ResetPasswordFail} />
          <Route path="/profile" component={User} />
          {/* To route to any path that you want we use the * sign in the paths along with the component */}
          <Route path="*" component={Login} />
        </Switch>
    </Router>
  );
};

export default App;