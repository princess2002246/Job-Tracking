import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password) {
      alert("Please enter your username and password.");
      return;
    }

    const registeredUsername = localStorage.getItem("username");
    const registeredPassword = localStorage.getItem("password");

    if (
      username !== registeredUsername ||
      password !== registeredPassword
    ) {
      alert("Incorrect username or password.");
      return;
    }

    localStorage.setItem("isAuthenticated", "true");

    alert("Login successful!");

    navigate("/home");
  };

  const handleForgotPassword = () => {
    const registeredUsername = localStorage.getItem("username");

    if (!registeredUsername) {
      alert("No registered account was found. Please register first.");
      return;
    }

    const enteredUsername = window.prompt(
      "Enter your registered username:"
    );

    if (!enteredUsername) {
      return;
    }

    if (enteredUsername !== registeredUsername) {
      alert("Username not found.");
      return;
    }

    const newPassword = window.prompt(
      "Enter your new password:"
    );

    if (!newPassword) {
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    localStorage.setItem("password", newPassword);

    alert(
      "Your password has been reset successfully. You can now log in."
    );
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo">
          Job<span>Track</span>
        </Link>

        <div className="auth-heading">
          <h1>Welcome Back</h1>

          <p>
            Log in to manage your job applications.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              Username
            </label>

            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
            />
          </div>

          <div className="forgot-password-container">
            <button
              type="button"
              className="forgot-password-link"
              onClick={handleForgotPassword}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="primary-button auth-button"
          >
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Create an account
          </Link>
        </p>

        <Link to="/" className="auth-back-link">
          ← Back to JobTrack
        </Link>
      </div>
    </div>
  );
}

export default Login;