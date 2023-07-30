// Filename - Create.js
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuid } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import { array } from './Array';
import { AdminDashboard } from '../../components/AdminDashboard';
import { Box } from '@mui/material';

export function CreateUser() {

	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');

	let navigate = useNavigate();

	const handelSubmit = () => {
		const ids = uuid()
		let uni = ids.slice(0, 8)

		let a = name, b = surname, c=email, d=phone
		array.push({ id: uni, Name: a, Surname: b, Email: c, Phone: d })

		navigate('/all-users')
	}

	return (
		<Box sx={{ display: "flex" }}>
			<AdminDashboard/>
			<Form className="d-grid gap-2"
				style={{ margin: '15rem' }}>
				<Form.Group className="mb-3"
					controlId="formBasicName">
					<Form.Control onChange=
						{e => setName(e.target.value)}
						type="text"
						placeholder="Name" required />
				</Form.Group>
				<Form.Group className="mb-3"
					controlId="formBasicSurname">
					<Form.Control onChange=
						{e => setSurname(e.target.value)}
						type="text"
						placeholder="Surname" required />
				</Form.Group>
				<Form.Group className="mb-3"
					controlId="formBasicEmail">
					<Form.Control onChange=
						{e => setEmail(e.target.value)}
						type="text"
						placeholder="Email" required />
				</Form.Group>
				<Form.Group className="mb-3"
					controlId="formBasicPhone">
					<Form.Control onChange=
						{e => setPhone(e.target.value)}
						type="text"
						placeholder="Contact Number" required />
				</Form.Group>
				<Button
					onClick={e => handelSubmit(e)}
					variant="primary" type="submit">
					    Submit
				</Button>
				<Link className="d-grid gap-2" to='/all-users'>
					<Button variant="info" size="lg">
						Cancel
					</Button>
				</Link>
			</Form>
		</Box>
	)
}
