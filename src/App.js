import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ResetPasswordSuccess } from './features/ResetPassword/ResetPasswordSuccess';
import { ForgetPassword } from './features/ResetPassword/ForgetPassword';
import { Home } from './features/Home/Home';
import { Login } from './features/Login/Login';
import { SetNewPassword } from './features/ResetPassword/SetNewPassword';
import { Signup } from './features/Signup/Signup';
import { User } from './features/User/User';
import { ResetPasswordFail } from './features/ResetPassword/ResetPasswordFail';
import { Admin } from './features/Admin/Admin';
import { AllUsers } from './features/AllUsers/AllUsers';
import { CreateUser } from './features/AllUsers/CreateUser';
import { AdminProfile } from './features/Profile/AdminProfile';
import { UserProfile } from './features/Profile/UserProfile';
import { AllChildren } from './features/AllChildren/AllChildren';
import { CreateChildren } from './features/AllChildren/CreateChildren';
import { AllTrips } from './features/AllTrips/AllTrips';
import { CreateTrip } from './features/AllTrips/CreateTrip';
import { AllCompanies } from './features/AllCompanies/AllCompanies';
import { CreateCompanie } from './features/AllCompanies/CreateCompanie';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/forget-password" element={<ForgetPassword/>} />
          <Route path="/reset-password" element={<SetNewPassword/>} />
          <Route path="/reset-password-success" element={<ResetPasswordSuccess/>} />
          <Route path="/reset-password-fail" element={<ResetPasswordFail/>} />
          <Route path="/user" element={<User/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path='/admin-profile' element={<AdminProfile/>} />
          <Route path='/user-profile' element={<UserProfile/>} />
          <Route path="/all-users" element={<AllUsers/>} />
          <Route path='/create-user' element={<CreateUser/>} />
          <Route path='/all-children' element={<AllChildren/>} />
          <Route path='/create-children' element={<CreateChildren/>} />
          <Route path='/all-trips' element={<AllTrips/>} />
          <Route path='/create-trip' element={<CreateTrip/>} />
          <Route path='/all-companies' element={<AllCompanies/>} />
          <Route path='/create-companie' element={<CreateCompanie/>} />
          {/* To route to any path that you want we use the * sign in the paths along with the component */}
          <Route path="*" element={<Login/>} />
        </Routes>
    </Router>
  );
};

export default App;