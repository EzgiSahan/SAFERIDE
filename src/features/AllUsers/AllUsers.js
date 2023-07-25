import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { NavBar } from '../../components/Navbar'
import { AdminDashboard } from '../../components/Dashboard'
import { Link, useNavigate } from 'react-router-dom';
import { array } from './Array';
import UpdateModal from '../../components/UpdateModal';

export const AllUsers = () => {

    let navigate = useNavigate()
  
    function deleted(id) {
  
        var index = array.map(function (e) { 
            return e.id; }).indexOf(id);
  
        array.splice(index, 1)

        navigate('/all-users')
    }
    return (
        <div style={{ display: "flex" }}>
            <AdminDashboard/>
            <main className='profile'>
                <NavBar/>
                <Table striped bordered hover size="sm" className='table'>
                    <tbody>
                        {array.map((item) => {
                            return (
                                <tr>
                                <td>{item.Name}</td>
                                <td>{item.Surname}</td>
                                <td>{item.Email}</td>
                                <td>{item.Phone}</td>
                                <td><UpdateModal/>
                                </td>
                                <td><Button onClick={e => deleted(item.id)}
                                    variant="danger">Delete</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Link className="d-grid gap-2" to='/create-user'>
                    <Button variant="warning" size="lg">Create</Button>
                </Link>
                </main>
        </div>
    )
}