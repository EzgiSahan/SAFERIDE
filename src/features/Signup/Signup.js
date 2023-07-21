import React, { useState } from 'react'
import validator from 'validator'
import { validateEmail } from '../../utils/validateEmail';

export const Signup = () => {
    const [name,setName] = useState('');
    const [surname, setSurname] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState('');


    // const validateEmail = (e) => {
    //     var email = e.target.value;
    //     if (validator.isEmail(email)) {
    //         setEmailError('');
    //     } else {
    //       setEmailError('Invalid email. Please enter a valid email address.');
    //     }
    // };

    const validatePassword = (e) => {
        var password = e.target.value;
        if (validator.isStrongPassword(password)) {
            setPasswordError('');
        } else {
          setPasswordError(
            'Invalid password. It must include one uppercase letter, one lowercase letter, one number and one special symbol'
          );
        }
    };
      
  return (
    <div className='container'>
        <header className='header'>
                <text>Transportation App</text>
        </header>
        <div className='login-container'>
            <form className='login-form'>
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
                        validatePassword(e)
                    }}/>{passwordError && <h6 style={{color: 'red'}}>{passwordError}</h6>}
                </div>
                    <button type="submit" class="btn btn-primary" id="button"><a href='/profile'>Submit</a></button>
                <div class="form-group">
                    <text>Already have an account? <a href='/login'>Login</a></text>
                </div>
            </form>
        </div>
    </div>
  )
}