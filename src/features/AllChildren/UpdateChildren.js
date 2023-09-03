import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { InputLabel, MenuItem, Select, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UpdateChildren({ id }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [parentId, setParentId] = useState("");
  const [users, setUsers] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userData, setUserData] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
  
    if (accessToken) {
      fetch("http://localhost:8000/api/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const role = data.user.role;
          if (role === "Normal") {
            navigate("/user");
          }
  
          console.log(role);
          setUserData(data.user);
  
          var myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${accessToken}`);
  
          var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          };
  
          fetch("http://localhost:8000/api/users/", requestOptions)
            .then((response) => response.json())
            .then((result) => {
              setUsers(result.users);
            })
            .catch((error) => console.log("error", error));
        })
        .catch((error) => {
          console.error("Error fetching user information:", error);
        });
    }
  }, []);
  

  const handleUpdate = () => {
    const accessToken = localStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      firstName: name,
      lastName: surname,
      email: email,
      phone: phone,
      userid: parentId,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`http://localhost:8000/api/children/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Toolbar />
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="name"
                value={name}
                autoFocus
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="surname"
                placeholder="surname"
                value={surname}
                autoFocus
                onChange={(e) => {
                  setSurname(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                value={email}
                autoFocus
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="phone"
                placeholder="phone"
                value={phone}
                autoFocus
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <InputLabel id="demo-simple-select-label">Parent</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => {
                  setParentId(e.target.value);
                }}
                label="Parent"
              >
                {users.map((item) => (
                  <MenuItem value={item.user_id}>
                    {item.user_name} {item.user_surname}
                  </MenuItem>
                ))}
              </Select>
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