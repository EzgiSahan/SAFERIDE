import React from 'react'
import { Dashboard } from '../../components/Dashboard'


export const User = () => {
    return (
        <div style={({ display: "flex" })}>
            <Dashboard/>
            <main className='profile-container'>
                <header>
                    <h1>Welcome Name!</h1>
                </header>
                <div className='profile-div'>
                    <img src="https://reactjs.org/logo-og.png" alt="profile" className='profile-img'></img>
                    <div className='user-info-container'>
                        <p>First Name</p>
                        <p>Last Name</p> 
                        <p>Email Adress</p>
                        <p>Contact Number</p>
                    </div>
                </div>
            </main>
        </div>
    )
}