import React from 'react'
import { AdminDashboard } from '../../components/Dashboard'
import { NavBar } from '../../components/Navbar'

export const Admin = () => {
    return (
        <div style={({ display: "flex" })}>
            <AdminDashboard/>
            <main>
                <NavBar/>
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