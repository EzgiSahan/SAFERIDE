import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/Styles.css'

export const Login = () => {

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();    
    const handleSubmit = () => {
        navigate('/admin');
    };

    return (
        <>
        <div className='main-container'>
            <header className='header'>
                <text>Transportation App</text>
            </header>
            <div className='login-container'>
                <form className='login-form' onSubmit={handleSubmit}>
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
                        <div className='forget-pwd'>
                            <a href='/forget-password'>Forget Password?</a>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary" id="button">Submit</button>
                    <div class="form-group">
                        <text>Create new account <a href='/signup'>Signup</a></text>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}
