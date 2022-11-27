import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import Select from "react-select";
import "./register.css";

const skills = [
  { value: "react", label: "React" },
  { value: "vuejs", label: "Vue.js" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
  { value: "javascript", label: "JavaScript" },
  { value: "nodejs", label: "Node.js" }
];

const initialState = {
  name: "",
  email: "",
  password: ""
};

const Register = () => {
  const [state, setState] = useState(initialState);
  const [subscribe, setSubscribe] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    const allFieldsEntered = Object.keys(state).every(
      (key) => state[key].trim() !== "" && selectedSkill && subscribe
    );
    if (allFieldsEntered) {
      // code for doing registration
      setSuccessMsg("You have successfully registered");
      setTimeout(() => {
        setSuccessMsg("");
        setState(initialState);
        setSelectedSkill(null);
        setSubscribe(false);
      }, 2000);
    } else {
      setErrorMsg("All the fields are required.");
    }
  };

  return (
    <div className="registration">
      <div className="container">
        <h2 className="title">Register</h2>
        <Form onSubmit={handleFormSubmit}>
          <h6 className="subtitle">
            Please enter your details below to register yourself.
          </h6>
          {successMsg && <Alert variant="success">{successMsg}</Alert>}
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={state.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={state.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={state.password}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Select your skills</Form.Label>
            <Select
              options={skills}
              isMulti
              value={selectedSkill}
              onChange={(selectedOption) => setSelectedSkill(selectedOption)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newsletter">
            <Form.Check
              type="checkbox"
              label="Subscribe to our newsletter"
              checked={subscribe}
              onChange={(event) => setSubscribe(Boolean(event.target.value))}
            />
          </Form.Group>
          <Form.Group>
            <Button variant="secondary" type="submit">
              Register
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Register;
