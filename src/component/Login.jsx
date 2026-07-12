import { useState } from "react";

export default function Login({ setIsLoggedIn, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    console.log({
      email,
      password,
    });

    // Demo login
    setIsLoggedIn(true);

    // Go back to Home
    setPage("home");

    // Clear inputs
    setEmail("");
    setPassword("");
  }

  return (
    <div className="container mt-5">
      <div
        className="card mx-auto p-4 shadow"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">
          Login
        </h2>

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>


          {/* Password */}
          <div className="mb-3">
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>


          {/* Forgot Password */}
          <div className="text-end mb-3">
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => setPage("forgotPassword")}
            >
              Forgot Password?
            </button>
          </div>


          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}