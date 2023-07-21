import React from 'react'

export const ResetPasswordFail = () => {
    return (
        <div className='container'>
            <header className='header'>
                <text>Transportation App</text>
            </header>
            <div className='login-container'>
                <h2>Reset Password failed!</h2>
                <h5>Something went wrong please contact our Support</h5>
                <button type="submit" class="btn btn-primary" id="button"><a href='/login'>Go back to login</a></button>
            </div>
        </div>
    )
}