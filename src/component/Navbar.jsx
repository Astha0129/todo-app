export default function Navbar({
  setPage,
  isLoggedIn,
  setIsLoggedIn,
}) {
  const handleLogout = () => {
    setIsLoggedIn(false);
    setPage("home");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <a
          href="#"
          className="navbar-brand fw-bold"
          onClick={(e) => {
            e.preventDefault();
            setPage("home");
          }}
        >
          📝 To-Do List
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  setPage("home");
                }}
              >
                Home
              </a>
            </li>

            {!isLoggedIn ? (
              <li className="nav-item">
                <a
                  href="#"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage("login");
                  }}
                >
                  Login
                </a>
              </li>
            ) : (
              <li className="nav-item">
                <a
                  href="#"
                  className="nav-link text-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}