import React, { useState } from "react";
import { Form, Container } from "react-bootstrap";
import axios from "axios";
import SignupPageButton from "./SignupPageButton.tsx";

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignup = async () => {
    try {
      // Make a POST request to the JSON Server to create a new user
      const response = await axios.post("http://localhost:3001/users", {
        username,
        password,
      });
      console.log("User created:", response.data);

      // Clear form fields
      setUsername("");
      setPassword("");
      setError("");
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error signing up:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Sign Up</h2>
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
        </Form.Group>

        {error && <p className="text-danger">{error}</p>}
        <SignupPageButton onClick={handleSignup}>Sign Up</SignupPageButton>
      </Form>
    </Container>
  );
};

export default SignupPage;
