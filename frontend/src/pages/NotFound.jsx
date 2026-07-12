import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="d-flex align-items-center justify-content-center text-center"
      style={{ minHeight: "calc(100vh - 70px)", padding: "2rem 1rem" }}
    >
      <div className="fade-in-up">
        <div
          style={{
            fontSize: "6rem",
            lineHeight: "1",
            marginBottom: "1.5rem",
            filter: "drop-shadow(0 8px 20px rgba(16,185,129,0.3))",
          }}
        >
          😵
        </div>

        <h1
          className="fw-black mb-2"
          style={{
            fontSize: "6rem",
            background: "linear-gradient(135deg, #10b981, #14b8a6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: "1",
          }}
        >
          404
        </h1>
        <h4 className="fw-bold mb-2 mt-3">Page Not Found</h4>
        <p className="text-muted mb-4" style={{ maxWidth: "340px" }}>
          Looks like this page went on a vacation and forgot to come back. Let's get you home!
        </p>

        <div className="d-flex gap-2 justify-content-center">
          <Link to="/" className="btn btn-primary rounded-3 px-4 fw-semibold">
            <i className="bi bi-house me-2"></i>Go Home
          </Link>
          <button
            className="btn btn-outline-secondary rounded-3 px-4"
            onClick={() => window.history.back()}
          >
            <i className="bi bi-arrow-left me-2"></i>Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
