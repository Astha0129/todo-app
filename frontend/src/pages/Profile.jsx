import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Profile() {
  const { user, updateProfile, loading } = useAuth();

  const [form, setForm] = useState({ username: "", email: "" });
  const [pwForm, setPwForm] = useState({ current: "", newPwd: "", confirm: "" });
  const [profileMsg, setProfileMsg] = useState(null); // { type, text }
  const [pwMsg, setPwMsg] = useState(null);
  const [stats, setStats] = useState(null);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({ username: user.username || "", email: user.email || "" });
    }
  }, [user]);

  // Fetch stats for the profile summary
  useEffect(() => {
    api.get("/todos/stats")
      .then(({ data }) => setStats(data.stats))
      .catch(() => {});
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMsg(null);
    const result = await updateProfile(form.username, form.email);
    if (result.success) {
      setProfileMsg({ type: "success", text: result.message });
    } else {
      setProfileMsg({ type: "danger", text: result.message });
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwMsg(null);

    if (pwForm.newPwd !== pwForm.confirm) {
      return setPwMsg({ type: "danger", text: "New passwords do not match." });
    }
    if (pwForm.newPwd.length < 6) {
      return setPwMsg({ type: "danger", text: "New password must be at least 6 characters." });
    }

    setPwLoading(true);
    try {
      await api.put("/auth/me/password", {
        current_password: pwForm.current,
        new_password: pwForm.newPwd,
      });
      setPwMsg({ type: "success", text: "Password changed successfully!" });
      setPwForm({ current: "", newPwd: "", confirm: "" });
    } catch (err) {
      setPwMsg({ type: "danger", text: err.response?.data?.message || "Failed to change password." });
    } finally {
      setPwLoading(false);
    }
  };

  const handleChange = (setter) => (e) =>
    setter((p) => ({ ...p, [e.target.name]: e.target.value }));

  // Get member since date
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "—";

  return (
    <div className="container py-4" style={{ maxWidth: "720px" }}>
      {/* Page Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          <i className="bi bi-person-circle me-2" style={{ color: "var(--primary)" }}></i>
          My Profile
        </h2>
        <p className="text-muted">Manage your account settings and preferences</p>
      </div>

      {/* Profile summary card */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4" style={{
        background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(20,184,166,0.08))"
      }}>
        <div className="d-flex align-items-center gap-3">
          <div style={{
            width: "64px", height: "64px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #10b981, #14b8a6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.6rem", color: "#fff", fontWeight: "700", flexShrink: 0,
          }}>
            {user?.username?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-grow-1">
            <h5 className="fw-bold mb-0">{user?.username}</h5>
            <p className="text-muted small mb-1">{user?.email}</p>
            <span className="badge rounded-pill px-3 py-1"
              style={{ background: "rgba(16,185,129,0.12)", color: "#10b981", fontSize: "0.75rem" }}>
              <i className="bi bi-calendar3 me-1"></i>Member since {memberSince}
            </span>
          </div>
          {/* Mini stats */}
          {stats && (
            <div className="d-none d-md-flex gap-3 text-center">
              {[
                { label: "Total", value: stats.total },
                { label: "Done", value: stats.completed },
                { label: "Pending", value: stats.pending },
              ].map((s) => (
                <div key={s.label}>
                  <div className="fw-bold fs-5" style={{ color: "var(--primary)" }}>{s.value}</div>
                  <div className="text-muted small">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="row g-4">
        {/* ── Edit Profile ─────────────────────────────────── */}
        <div className="col-12">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h6 className="fw-bold mb-3">
              <i className="bi bi-pencil-square me-2 text-primary"></i>Edit Profile
            </h6>

            {profileMsg && (
              <div className={`alert alert-${profileMsg.type} d-flex align-items-center gap-2 rounded-3 py-2`}>
                <i className={`bi ${profileMsg.type === "success" ? "bi-check-circle" : "bi-exclamation-circle"}`}></i>
                {profileMsg.text}
              </div>
            )}

            <form onSubmit={handleProfileSubmit}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label className="form-label fw-semibold small">Username</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent">
                      <i className="bi bi-person text-muted"></i>
                    </span>
                    <input
                      type="text"
                      name="username"
                      className="form-control border-start-0"
                      value={form.username}
                      onChange={handleChange(setForm)}
                      required
                      minLength={2}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <label className="form-label fw-semibold small">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent">
                      <i className="bi bi-envelope text-muted"></i>
                    </span>
                    <input
                      type="email"
                      name="email"
                      className="form-control border-start-0"
                      value={form.email}
                      onChange={handleChange(setForm)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <button
                  type="submit"
                  className="btn btn-primary rounded-3 fw-semibold px-4"
                  disabled={loading}
                >
                  {loading ? (
                    <><span className="spinner-border spinner-border-sm me-2"></span>Saving…</>
                  ) : (
                    <><i className="bi bi-save me-2"></i>Save Changes</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ── Change Password ───────────────────────────────── */}
        <div className="col-12">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h6 className="fw-bold mb-3">
              <i className="bi bi-shield-lock me-2 text-warning"></i>Change Password
            </h6>

            {pwMsg && (
              <div className={`alert alert-${pwMsg.type} d-flex align-items-center gap-2 rounded-3 py-2`}>
                <i className={`bi ${pwMsg.type === "success" ? "bi-check-circle" : "bi-exclamation-circle"}`}></i>
                {pwMsg.text}
              </div>
            )}

            <form onSubmit={handlePasswordChange}>
              <div className="mb-3">
                <label className="form-label fw-semibold small">Current Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent">
                    <i className="bi bi-lock text-muted"></i>
                  </span>
                  <input
                    type={showCurrentPw ? "text" : "password"}
                    name="current"
                    className="form-control border-start-0 border-end-0"
                    placeholder="Enter current password"
                    value={pwForm.current}
                    onChange={handleChange(setPwForm)}
                    required
                  />
                  <button
                    type="button"
                    className="input-group-text bg-transparent border-start-0"
                    onClick={() => setShowCurrentPw((p) => !p)}
                  >
                    <i className={`bi ${showCurrentPw ? "bi-eye-slash" : "bi-eye"} text-muted`}></i>
                  </button>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-sm-6">
                  <label className="form-label fw-semibold small">New Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent">
                      <i className="bi bi-lock-fill text-muted"></i>
                    </span>
                    <input
                      type={showNewPw ? "text" : "password"}
                      name="newPwd"
                      className="form-control border-start-0 border-end-0"
                      placeholder="Min. 6 characters"
                      value={pwForm.newPwd}
                      onChange={handleChange(setPwForm)}
                      required
                    />
                    <button
                      type="button"
                      className="input-group-text bg-transparent border-start-0"
                      onClick={() => setShowNewPw((p) => !p)}
                    >
                      <i className={`bi ${showNewPw ? "bi-eye-slash" : "bi-eye"} text-muted`}></i>
                    </button>
                  </div>
                </div>
                <div className="col-sm-6">
                  <label className="form-label fw-semibold small">Confirm New Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent">
                      <i className="bi bi-shield-check text-muted"></i>
                    </span>
                    <input
                      type="password"
                      name="confirm"
                      className={`form-control border-start-0 ${
                        pwForm.confirm && pwForm.confirm !== pwForm.newPwd ? "is-invalid" : ""
                      }`}
                      placeholder="Repeat new password"
                      value={pwForm.confirm}
                      onChange={handleChange(setPwForm)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <button
                  type="submit"
                  className="btn btn-warning rounded-3 fw-semibold px-4 text-dark"
                  disabled={pwLoading}
                >
                  {pwLoading ? (
                    <><span className="spinner-border spinner-border-sm me-2"></span>Updating…</>
                  ) : (
                    <><i className="bi bi-key me-2"></i>Update Password</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
