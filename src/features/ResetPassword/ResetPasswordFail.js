import React from 'react'
import { useNavigate } from 'react-router-dom';

export const ResetPasswordFail = () => {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/login')
    };
    return (
        <div className='main-container'>
            <header className='header'>
                <text>Transportation App</text>
            </header>
            <div className='login-container' onSubmit={handleSubmit}>
                <h2>Reset Password failed!</h2>
                <h5>Something went wrong please contact our Support</h5>
                <button type="submit" class="btn btn-primary" id="button">Go back to login</button>
            </div>
        </div>
    )
}