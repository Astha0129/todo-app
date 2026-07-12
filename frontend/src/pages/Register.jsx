import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      return setError("Passwords do not match.");
    }
    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    const result = await register(form.username, form.email, form.password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  const passwordStrength = (pwd) => {
    if (!pwd) return { label: "", color: "", width: "0%" };
    if (pwd.length < 6) return { label: "Too short", color: "#ef4444", width: "20%" };
    if (pwd.length < 8) return { label: "Weak", color: "#f59e0b", width: "40%" };
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^a-zA-Z0-9]/.test(pwd))
      return { label: "Strong", color: "#22c55e", width: "100%" };
    if (/[A-Z]/.test(pwd) || /[0-9]/.test(pwd))
      return { label: "Medium", color: "#3b82f6", width: "65%" };
    return { label: "Weak", color: "#f59e0b", width: "40%" };
  };

  const strength = passwordStrength(form.password);

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 70px)", padding: "2rem 1rem" }}>
      <div className="w-100" style={{ maxWidth: "440px" }}>
        <div className="auth-card card p-4 p-md-5 fade-in-up">
          <div className="auth-header-icon">✨</div>
          <h3 className="text-center fw-bold mb-1">Create Account</h3>
          <p className="text-center text-muted mb-4">Join TaskFlow and stay productive</p>

          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2 rounded-3 py-2">
              <i className="bi bi-exclamation-circle"></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Username</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent">
                  <i className="bi bi-person text-muted"></i>
                </span>
                <input
                  type="text"
                  name="username"
                  className="form-control border-start-0"
                  placeholder="Your display name"
                  value={form.username}
                  onChange={handleChange}
                  required
                  minLength={2}
                />
              </div>
            </div>

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
            <div className="mb-2">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent">
                  <i className="bi bi-lock text-muted"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control border-start-0 border-end-0"
                  placeholder="Min. 6 characters"
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
              {/* Password strength */}
              {form.password && (
                <div className="mt-2">
                  <div className="progress" style={{ height: "4px", borderRadius: "10px" }}>
                    <div
                      className="progress-bar"
                      style={{ width: strength.width, background: strength.color, transition: "all 0.3s", borderRadius: "10px" }}
                    ></div>
                  </div>
                  <small style={{ color: strength.color, fontSize: "0.75rem" }}>{strength.label}</small>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Confirm Password</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent">
                  <i className="bi bi-shield-lock text-muted"></i>
                </span>
                <input
                  type="password"
                  name="confirm"
                  className={`form-control border-start-0 ${form.confirm && form.confirm !== form.password ? "is-invalid" : ""}`}
                  placeholder="Repeat your password"
                  value={form.confirm}
                  onChange={handleChange}
                  required
                />
                {form.confirm && form.confirm === form.password && (
                  <span className="input-group-text bg-transparent border-start-0 text-success">
                    <i className="bi bi-check-circle-fill"></i>
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 rounded-3 fw-semibold"
              disabled={loading}
            >
              {loading ? (
                <><span className="spinner-border spinner-border-sm me-2"></span>Creating account…</>
              ) : (
                <><i className="bi bi-person-plus me-2"></i>Create Account</>
              )}
            </button>
          </form>

          <hr className="my-4" />
          <p className="text-center mb-0 text-muted">
            Already have an account?{" "}
            <Link to="/login" className="fw-semibold text-decoration-none" style={{ color: "var(--primary)" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
