import React from 'react'
import '../styles/Styles.css'

export const DoneSetPassword = () => {
    return (
        <div className='container'>
            <header className='header'>
                <text>Transportation App</text>
            </header>
            <div className='login-container'>
                <h2>All done!</h2>
                <h5>Your password has been reset.</h5>
                <button type="submit" class="btn btn-primary" id="button">Go back to login</button>
            </div>
        </div>
    )
}