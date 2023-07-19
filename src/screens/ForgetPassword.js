import React, { useState } from 'react'
import '../styles/Styles.css'


export const ForgetPassword = () => {

    const [email,setEmail] = useState('');

    
    return(
        <div className='container'>
            <header className='login-header'>
                <text>Transportation App</text>
            </header>
            <div className='login-container'>
                <div>
                    <h1>Forget Password?</h1>
                    <h4>We'll send you reset instructions.</h4>
                </div>
                <form className='login-form'>
                <div class="form-group">
                    <label for="email">Email address:</label>
                    <input type={email} class="form-control" id="email" placeholder='email' required 
                    onChange={(e)=>{
                        setEmail(e.target.value);}}
                    />
                </div>
                <a href='/setnewpassword'>
                    Reset Password
                </a>
                </form>
            </div>
        </div>
    )
}