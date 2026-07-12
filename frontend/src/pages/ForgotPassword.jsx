import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // "loading" | "success" | "error"
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "calc(100vh - 70px)", padding: "2rem 1rem" }}
    >
      <div className="w-100" style={{ maxWidth: "420px" }}>
        <div className="auth-card card p-4 p-md-5 fade-in-up">
          {/* Icon */}
          <div className="auth-header-icon">📧</div>
          <h3 className="text-center fw-bold mb-1">Forgot Password?</h3>
          <p className="text-center text-muted mb-4">
            No worries! Enter your email and we'll send you a reset link.
          </p>

          {/* Success state */}
          {status === "success" ? (
            <div className="text-center">
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  background: "rgba(34,197,94,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  margin: "0 auto 1rem",
                }}
              >
                ✅
              </div>
              <div className="alert alert-success rounded-3">
                <i className="bi bi-check-circle me-2"></i>
                {message}
              </div>
              <p className="text-muted small mt-3">
                Check your inbox (and spam folder). The link expires in 1 hour.
              </p>
              <Link to="/login" className="btn btn-primary rounded-3 mt-2 px-4 fw-semibold">
                <i className="bi bi-arrow-left me-1"></i> Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {status === "error" && (
                <div className="alert alert-danger d-flex align-items-center gap-2 rounded-3 py-2">
                  <i className="bi bi-exclamation-circle"></i> {message}
                </div>
              )}

              <div className="mb-4">
                <label className="form-label fw-semibold">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent">
                    <i className="bi bi-envelope text-muted"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control border-start-0"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 rounded-3 fw-semibold"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Sending link…
                  </>
                ) : (
                  <>
                    <i className="bi bi-send me-2"></i>Send Reset Link
                  </>
                )}
              </button>

              <div className="text-center mt-4">
                <Link
                  to="/login"
                  className="text-decoration-none text-muted small"
                  style={{ color: "var(--primary)" }}
                >
                  <i className="bi bi-arrow-left me-1"></i> Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
