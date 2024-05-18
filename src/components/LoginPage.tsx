import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SignupPageButton from "./SignupPageButton.tsx";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    // For demo purpose, check hardcoded credentials
    if (email === "User" && password === "Pass") {
      // Redirect to dashboard after successful login
      navigate("/dashboard"); // Use navigate function here
    } else {
      // Clear password field on failed login attempt
      setPassword("");
      // Show an alert for failed login attempt
      alert("Invalid username or password. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus // Add autofocus here
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter your password.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

        {/* Signup button */}
        <SignupPageButton onClick={() => navigate("/signup")}>
          Sign Up
        </SignupPageButton>
      </Form>
    </Container>
  );
};

export default LoginPage;
