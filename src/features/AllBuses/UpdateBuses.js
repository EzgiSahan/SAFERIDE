import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { InputLabel, MenuItem, Select, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UpdateBuses({ id }) {
  const [show, setShow] = useState(false);
  const [model, setModel] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [busDriverId, setBusDriverId] = useState("");
  const [company, setCompany] = useState([]);
  const [busDriver, setBusDriver] = useState([]);
  const [userData, setUserData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            navigate('/user');
          }
          console.log(role);
          setUserData(data.user);
        })
        .catch((error) => {
          console.error("Error fetching user information:", error);
        });

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
      
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("http://localhost:8000/api/company/", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setCompany(result.company);
        })
        .catch((error) => {
          console.log("Error fetching bus information:", error);
        });

        var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
      
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("http://localhost:8000/api/busDriver/", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setBusDriver(result.busDriver);
        })
        .catch((error) => {
          console.log("Error fetching bus information:", error);
        });
    }
    else{
      navigate('/login')
    }
}, []);

  const handleUpdate = () => {
    const accessToken = localStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        model: model,
        companyId: companyId,
        busDriverId: busDriverId 
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`http://localhost:8000/api/bus/${id}`, requestOptions)
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
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="model"
                placeholder="model"
                value={model}
                autoFocus
                onChange={(e) => {
                  setModel(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <InputLabel id="demo-simple-select-label">Company</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => {
                  setCompanyId(e.target.value);
                }}
                label="Company"
              >
                {company.map((item) => (
                  <MenuItem value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <InputLabel id="demo-simple-select-label">Bus Driver</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => {
                  setBusDriverId(e.target.value);
                }}
                label="Parent"
              >
                {busDriver.map((item) => (
                  <MenuItem value={item.id}>
                    {item.firstName} {item.lastName}
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