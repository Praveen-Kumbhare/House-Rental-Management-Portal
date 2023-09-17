import companyLogo from "./img/logo.jpg";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Context } from "../../context/Context";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import avatar from "./img/avatar.png";
import "./css/dropdown.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function Header() {
  const { user, dispatch } = useContext(Context);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const Menus = [
    {
      title: "Home",
      link: "/home",
    },
    {
      title: "About Us",
      link: "/about",
    },
    {
      title: "Contact Us",
      link: "/contact",
    },
    {
      title: "Add House",
      link: "/adf",
    },
  ];
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
  };
  const Dropdown = () => (
    <div className="outerdiv">
      <span className="fw-bold text-uppercase">Welcome {user?.firstName}</span>
      <img
        onClick={() => setOpen(!open)}
        src={avatar}
        alt="avatar"
        className="img"
        style={{
          height: "3rem",
          width: "3rem",
          objectFit: "cover",
          border: "0.25rem solid #cbd5e0",
          borderRadius: "50%",
          cursor: "pointer",
          marginLeft: "5px",
        }}
      />
      {open && (
        <div className="innerdiv">
          <Link
            className="nav-link menulinks"
            to="/UpdateProfile"
            onClick={() => setOpen(false)}
          >
            Update Profile
          </Link>
          {showLogout()}
        </div>
      )}
    </div>
  );
  const showLogout = () => {
    if (user) {
      return (
        <button
          href="/"
          className="btn btn-link"
          onClick={handleLogout}
          style={{
            color: "red",
            textDecoration: "none",
            fontSize: "1.125rem",
            cursor: "pointer",
            padding: "0.5rem",
            borderRadius: " 0.25rem",
          }}
        >
          Logout
        </button>
      );
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary rounded"
      aria-label="Eleventh navbar example"
    >
      <div class="container-fluid">
        <Link className="nav-link" to={"/"}>
          <img
            className="logo"
            style={{ height: "4rem", width: "4rem" }}
            src={companyLogo}
            alt="House Rent Service"
          />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample09"
          aria-controls="navbarsExample09"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExample09">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            {Menus.map((menu, key) => (
              <li className="nav-item" key={key}>
                <Link className="nav-link" to={menu.link}>
                  {menu.title}
                </Link>
              </li>
            ))}
            <li className="nav-item">
              {!user ? (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              ) : (
                ""
              )}
            </li>
            <li className="nav-item">
              {user?.role === "LANDLORD" ? (
                <Link className="nav-link" to="/Landlord">
                  show listed houses
                </Link>
              ) : (
                ""
              )}
            </li>
          </ul>
          {user ? (
            <Dropdown />
          ) : (
            <p style={{ marginLeft: "auto" }}>Welcome Guest</p>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
