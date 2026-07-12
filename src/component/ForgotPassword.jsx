import { useState } from "react";

export default function ForgotPassword({ setPage }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleReset(e) {
    e.preventDefault();

    console.log("Reset request for:", email);

    setMessage(
      "Password reset link has been sent to your email."
    );

    setEmail("");
  }

  return (
    <div className="container mt-5">
      <div
        className="card mx-auto p-4 shadow"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">
          Forgot Password
        </h2>

        <form onSubmit={handleReset}>

          <div className="mb-3">
            <label className="form-label">
              Enter Email
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>


          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Send Reset Link
          </button>

        </form>


        {message && (
          <div className="alert alert-success mt-3">
            {message}
          </div>
        )}


        <button
          className="btn btn-link mt-2"
          onClick={() => setPage("login")}
        >
          Back to Login
        </button>

      </div>
    </div>
  );
}