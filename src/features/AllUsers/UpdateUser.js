import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function UpdateUser({id}) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("");
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdate = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pZ2dlcnNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJtZXJvNDUxIiwiaWF0IjoxNjg5NzcyMjkwLCJleHAiOjE2ODk3NzU4OTB9.W3eWhLVMLSa8d6KWF_MkL61dTvVnA6bZsratulZbMMY");
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        user_name: name,
        user_surname: surname,
        user_email: email,
        user_phone: phone,
        user_password: password,
        user_role: role,
        user_country: country,
        user_city: city,
        user_address: address,
        user_birthdate: date
    });
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch(`http://localhost:8000/api/users/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="name" autoFocus onChange = {(e) => {setName(e.target.value);}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Surname</Form.Label>
              <Form.Control type="surname" placeholder="surname" autoFocus onChange = {(e) => {setSurname(e.target.value);}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="email" autoFocus onChange = {(e) => {setEmail(e.target.value);}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="phone" placeholder="phone" autoFocus onChange = {(e) => {setPhone(e.target.value);}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="password" autoFocus onChange = {(e) => {setPassword(e.target.value);}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Role</Form.Label>
              <Form.Control type="role" placeholder="role" autoFocus onChange = {(e) => {setRole(e.target.value);}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Country</Form.Label>
              <Form.Control type="country" placeholder="country" autoFocus onChange = {(e) => {setCountry(e.target.value);}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>City</Form.Label>
              <Form.Control type="city" placeholder="city" autoFocus onChange = {(e) => {setCity(e.target.value);}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Address</Form.Label>
              <Form.Control type="address" placeholder="address" autoFocus onChange = {(e) => {setAddress(e.target.value);}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control type="birthDate" placeholder="birthDate" autoFocus onChange = {(e) => {setDate(e.target.value);}}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}