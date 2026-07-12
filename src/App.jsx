import { useState } from "react";
import "./App.css";

import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Login from "./component/Login";
import ForgotPassword from "./component/ForgotPassword";

function App() {
  const [page, setPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Navbar
        setPage={setPage}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {page === "home" && <Home />}

      {page === "login" && (
        <Login
          setIsLoggedIn={setIsLoggedIn}
          setPage={setPage}
        />
      )}
      {page === "forgotPassword" && (
  <ForgotPassword setPage={setPage} />
)}
    </>
  );
}

export default App;