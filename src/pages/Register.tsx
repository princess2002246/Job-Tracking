import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password) {
      alert("Please complete all fields.");
      return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Account created successfully.");

    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-brand">
          <Link to="/" className="auth-logo">
            Job<span>Track</span>
          </Link>

          <p>Start organising your job search today.</p>
        </div>

        <div className="auth-card">
          <div className="auth-heading">
            <h1>Create an account</h1>

            <p>
              Create your JobTrack account to manage your applications.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="username">Username</label>

              <input
                type="text"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Choose a username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a password"
              />
            </div>

            <button type="submit" className="auth-button">
              Create Account
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>

        <Link to="/" className="auth-back-link">
          ← Back to JobTrack
        </Link>
      </div>
    </div>
  );
}

export default Register;