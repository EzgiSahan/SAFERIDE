import React, { useState } from 'react'


export const ForgetPassword = () => {

    const [email,setEmail] = useState('');

    
    return(
        <div className='container'>
            <header className='header'>
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
                        setEmail(e.target.value);}}/>
                </div>
                    <button type="submit" class="btn btn-primary" id="button"><a href='/setnewpassword'>Reset Password</a></button>
                </form>
            </div>
        </div>
    )
}