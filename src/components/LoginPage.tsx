import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.tsx";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // Specify the type explicitly

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitting login form");
    try {
      await login(username, password);
      // If login is successful, clear any previous error message
      setError(null);
    } catch (error: any) {
      // Specify 'any' type for error
      // If login fails, set error message
      if (error.response && error.response.status === 401) {
        const errorMessage =
          "Incorrect username or password. Please try again.";
        setError(errorMessage);
        console.error(errorMessage); // Log error message
      } else {
        const errorMessage =
          "An unexpected error occurred. Please try again later.";
        setError(errorMessage);
        console.error(errorMessage); // Log error message
      }
    }
  };

  return (
    <div className="container">
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
