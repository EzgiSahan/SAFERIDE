import React from 'react'

export const ResetPasswordSuccess = () => {
    return (
        <div className='container'>
            <header className='header'>
                <text>Transportation App</text>
            </header>
            <div className='login-container'>
                <h2>All done!</h2>
                <h5>Your password has been reset.</h5>
                <button type="submit" class="btn btn-primary" id="button"><a href='/login'>Go back to login</a></button>
            </div>
        </div>
    )
}