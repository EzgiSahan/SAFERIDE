import React, { useState } from 'react'
import { Dashboard } from '../../components/Dashboard'
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/validateEmail';
import { validatePassword } from '../../utils/validatePassword';
import UpdateChildModal from '../../components/UpdateChildModal';
import { NavBar } from '../../components/Navbar';

export const UserProfile = () => {
    const [name,setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState('');

    let navigate = useNavigate();    
    const handleSubmit = () => {
        navigate('/user');
    };

    return (
        <div style={({ display: "flex" })}>
        <Dashboard/>
        <main>
            <NavBar/>
            <div className='profile-div'>
                <img src="https://reactjs.org/logo-og.png" alt="profile" className='profile-img'></img>
                <div className='user-info-container'>
                    <form className='login-form' onSubmit={handleSubmit}>
                        <div class="form-group" id='form-group-profile'>
                            <label for="name">Name</label>
                            <input type={name} class="form-control" id="email" placeholder='name' required
                            onChange={(e)=>{
                                setName(e.target.value);}}/>
                        </div>
                        <div class="form-group" id='form-group-profile'>
                            <label for={surname}>Surname</label>
                            <input type="surname" class="form-control" id="email" placeholder='surname' required
                            onChange={(e)=>{
                                setSurname(e.target.value);}}/>
                        </div>
                        <div class="form-group" id='form-group-profile'>
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" id="email" placeholder='email' required
                            onChange={(e) => {
                                setEmailError(validateEmail(e));}}/>{emailError && <h6 style={{color: 'red'}}>{emailError}</h6>}
                        </div>
                        <div class="form-group" id='form-group-profile'>
                            <label for="pwd">Password</label>
                            <input type="password" class="form-control" id="pwd" placeholder='password' required
                                onChange={(e) => {
                                setPasswordError(validatePassword(e));}}/>{passwordError && <h6 style={{color: 'red'}}>{passwordError}</h6>}
                        </div>
                        <div class="form-group" id='form-group-profile'>
                            <label for={phoneNumber}>Contact Number</label>
                            <input type="phone" class="form-control" id="phone" placeholder='phone number' required
                            onChange={(e)=>{
                                setPhoneNumber(e.target.value);}}/>
                        </div>
                        <button type="submit" class="btn btn-primary" id="button">Save Changes</button>
                    </form>
                    <UpdateChildModal/>
                </div>
            </div>
        </main>
    </div>
    )
}