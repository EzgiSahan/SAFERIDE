import React, { useState } from 'react'
import '../styles/Styles.css'

export const Login = () => {

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

  return (
    <div className='container'>
        <header className='login-header'>
                <text>Transportation App</text>
        </header>
        <div className='login-container'>
            
            <form className='login-form'>
                <div class="form-group">
                    <label for="email">Email address:</label>
                    <input type={email} class="form-control" id="email" placeholder='email' required 
                    onChange={(e)=>{
                        setEmail(e.target.value);}}/>
                </div>
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type={password} class="form-control" id="pwd" placeholder='password' required 
                    onChange={(e)=>{
                        setPassword(e.target.value);}}/>
                </div>
                <button type="submit" class="btn btn-primary" id="button">Submit</button>
                <div class="form-group">
                    <text>Create new account <a href='/'>Signup</a></text>
                </div>
            </form>
        </div>
    </div>
  )
}
