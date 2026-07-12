import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm sticky-top" style={{
      background: darkMode
        ? "linear-gradient(135deg, #0f1a17, #0d2621)"
        : "linear-gradient(135deg, #10b981, #0d9488)",
    }}>
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold text-white d-flex align-items-center gap-2" to="/">
          <span style={{
            background: "rgba(255,255,255,0.2)",
            borderRadius: "10px",
            padding: "4px 10px",
            fontSize: "1.1rem",
          }}>📝</span>
          <span className="fs-5">TaskFlow</span>
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          style={{ color: "white" }}
        >
          <i className="bi bi-list fs-4" style={{ color: "white" }}></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-1">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white opacity-85 fw-medium" to="/">
                    <i className="bi bi-house me-1"></i> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white opacity-85 fw-medium" to="/profile">
                    <i className="bi bi-person-circle me-1"></i>
                    {user?.username || "Profile"}
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-sm text-white opacity-85 fw-medium nav-link border-0"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white opacity-85 fw-medium" to="/login">
                    <i className="bi bi-box-arrow-in-right me-1"></i> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="btn btn-sm btn-light fw-semibold ms-2"
                    to="/register"
                    style={{ borderRadius: "50px", padding: "6px 16px" }}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}

            {/* Dark mode toggle */}
            <li className="nav-item ms-2">
              <button
                className="btn btn-sm border-0 p-1"
                onClick={toggleDarkMode}
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "8px",
                  color: "white",
                  width: "36px",
                  height: "36px",
                }}
              >
                <i className={`bi ${darkMode ? "bi-sun-fill" : "bi-moon-fill"} fs-6`}></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
