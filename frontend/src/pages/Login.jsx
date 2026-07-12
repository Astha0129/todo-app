import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(form.email, form.password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 70px)", padding: "2rem 1rem" }}>
      <div className="w-100" style={{ maxWidth: "420px" }}>
        <div className="auth-card card p-4 p-md-5 fade-in-up">
          {/* Icon */}
          <div className="auth-header-icon">🔐</div>
          <h3 className="text-center fw-bold mb-1">Welcome Back</h3>
          <p className="text-center text-muted mb-4">Sign in to your TaskFlow account</p>

          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2 rounded-3 py-2">
              <i className="bi bi-exclamation-circle"></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent">
                  <i className="bi bi-envelope text-muted"></i>
                </span>
                <input
                  type="email"
                  name="email"
                  className="form-control border-start-0"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label fw-semibold mb-0">Password</label>
                <Link to="/forgot-password" className="small text-decoration-none" style={{ color: "var(--primary)" }}>
                  Forgot password?
                </Link>
              </div>
              <div className="input-group">
                <span className="input-group-text bg-transparent">
                  <i className="bi bi-lock text-muted"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control border-start-0 border-end-0"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="input-group-text bg-transparent border-start-0"
                  onClick={() => setShowPassword((p) => !p)}
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} text-muted`}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 rounded-3 fw-semibold mt-2"
              disabled={loading}
            >
              {loading ? (
                <><span className="spinner-border spinner-border-sm me-2"></span>Signing in…</>
              ) : (
                <><i className="bi bi-box-arrow-in-right me-2"></i>Sign In</>
              )}
            </button>
          </form>

          <hr className="my-4" />
          <p className="text-center mb-0 text-muted">
            Don't have an account?{" "}
            <Link to="/register" className="fw-semibold text-decoration-none" style={{ color: "var(--primary)" }}>
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
