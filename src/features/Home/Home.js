import React from 'react'
import '../../assets/styles/Styles.css'

export const Home = () => {
    return (
        <div className='container'>
            <header className='header' id='home-header'>
                <a href='/signup'>
                    <button button type="submit" class="btn btn-primary" >Sign up</button>
                </a>
            </header>
            <div className='login-container'>
                <div>
                    <h1>Transportation App</h1>
                </div>
                <div>
                    <a href='/login'>
                        <button type="submit" class="btn btn-primary" id="button">Get Started</button>
                    </a>
                </div>
            </div>
        </div>
    )
}