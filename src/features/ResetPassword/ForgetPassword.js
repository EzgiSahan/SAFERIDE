import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export const ForgetPassword = () => {

    const [email,setEmail] = useState('');
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/reset-password')
    };
    
    return(
        <div className='main-container'>
            <header className='header'>
                <text>Transportation App</text>
            </header>
            <div className='login-container'>
                <div>
                    <h1>Forget Password?</h1>
                    <h4>We'll send you reset instructions.</h4>
                </div>
                <form className='login-form' onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="email">Email address:</label>
                    <input type={email} class="form-control" id="email" placeholder='email' required 
                    onChange={(e)=>{
                        setEmail(e.target.value);}}/>
                </div>
                    <button type="submit" class="btn btn-primary" id="button">Reset Password</button>
                </form>
            </div>
        </div>
    )
}