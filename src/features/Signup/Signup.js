import React, { useState } from 'react'
import { validateEmail } from '../../utils/validateEmail';
import { validatePassword } from '../../utils/validatePassword';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const [name,setName] = useState('');
    const [surname, setSurname] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/user')
    };
      
  return (
    <div className='main-container'>
        <header className='header'>
                <text>Transportation App</text>
        </header>
        <div className='login-container'>
            <form className='login-form' onSubmit={handleSubmit}>
               <div class="form-group">
                    <label for="name">Name:</label>
                    <input type={name} class="form-control" id="email" placeholder='name' required
                        onChange={(e)=>{
                        setName(e.target.value);}}/>
                </div>
                <div class="form-group">
                    <label for={surname}>Surname:</label>
                    <input type="surname" class="form-control" id="email" placeholder='surname' required
                    onChange={(e)=>{
                        setSurname(e.target.value);
                    }}/>
                </div>
                <div class="form-group">
                    <label for="email">Email address:</label>
                    <input type="email" class="form-control" id="email" placeholder='email' required
                    onChange={(e) => {
                        setEmailError(validateEmail(e));
                    }}/>{emailError && <h6 style={{color: 'red'}}>{emailError}</h6>}
                </div>
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" class="form-control" id="pwd" placeholder='password' required
                    onChange={(e) => {
                        setPasswordError(validatePassword(e));
                    }}/>{passwordError && <h6 style={{color: 'red'}}>{passwordError}</h6>}
                </div>
                    <button type="submit" class="btn btn-primary" id="button">Submit</button>
                <div class="form-group">
                    <text>Already have an account? <a href='/login'>Login</a></text>
                </div>
            </form>
        </div>
    </div>
  )
}