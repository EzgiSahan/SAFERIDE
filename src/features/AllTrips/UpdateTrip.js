import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Grid, InputLabel, MenuItem, Select, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function UpdateTrip({ id }) {
  const [date, setDate] = useState("");
  const [busId, setBusId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [destination, setDestination] = useState("");
  const [seats, setSeats] = useState("");
  const [code, setCode] = useState("");

  const [show, setShow] = useState(false);
  const [bus, setBus] = useState([]);
  const [userData, setUserData] = useState([]);
  const [value, setValue] = useState('');


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
          if (role === 'Normal') {
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

      fetch("http://localhost:8000/api/bus/", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setBus(result.bus);
        })
        .catch((error) => console.log("error", error));
    }
}, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdate = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pZ2dlcnNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJtZXJvNDUxIiwiaWF0IjoxNjg5NzcyMjkwLCJleHAiOjE2ODk3NzU4OTB9.W3eWhLVMLSa8d6KWF_MkL61dTvVnA6bZsratulZbMMY"
    );
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      code: code,
      departureDate: departureDate,
      arrivalDate: arrivalDate,
      destination: destination,
      seats: seats,
      busId: busId,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`http://localhost:8000/api/trips/${id}`, requestOptions)
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
              <Form.Label>Code</Form.Label>
              <Form.Control
                placeholder="date"
                autoFocus
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
            </Form.Group>
            <Grid className="mb-3" item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker sx={{width:'100%'}} onChange={(newValue)=>{
                            setValue(newValue);
                            setDepartureDate(newValue.$d.toISOString().slice(0, 19).replace("T", " "));
                            }} label="Departure Date" />
                      </LocalizationProvider>
                    </Grid>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Arrival Date</Form.Label>

            </Form.Group>
            <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker sx={{width:'100%'}} onChange={(newValue)=>{
                            setValue(newValue);
                            setArrivalDate(newValue.$d.toISOString().slice(0, 19).replace("T", " "));
                            }} label="Arrival Date" />
                      </LocalizationProvider>
                    </Grid>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>destination</Form.Label>
              <Form.Control
                placeholder="Destination"
                autoFocus
                onChange={(e) => {
                  setDestination(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Seats</Form.Label>
              <Form.Control
                placeholder="seats"
                autoFocus
                onChange={(e) => {
                  setSeats(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <InputLabel id="demo-simple-select-label">Bus</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => {
                  setBusId(e.target.value);
                  setDriverId(e.target.value);
                }}
                label="Bus"
              >
                {bus.map((item) => (
                  <MenuItem value={item.id}>{item.model}</MenuItem>
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
