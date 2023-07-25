import React from 'react'
import { useNavigate } from 'react-router-dom';

export const ResetPasswordSuccess = () => {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/login')
    };

    return (
        <div className='main-container'>
            <header className='header'>
                <text>Transportation App</text>
            </header>
            <form className='login-container' onSubmit={handleSubmit}>
                <h2>All done!</h2>
                <h5>Your password has been reset.</h5>
                <button type="submit" class="btn btn-primary" id="button">Go back to login</button>
            </form>
        </div>
    )
}