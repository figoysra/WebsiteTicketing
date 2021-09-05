import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/navbar.css";
import { useEffect, useState } from "react";
import { Collapse, NavbarToggler } from "reactstrap";
import axios from "axios";
import { API_URL, Token } from "../utils/constants";

const Navbarmenu = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  const [search, setSearch] = useState("");
  const [dataUser, setdataUser] = useState([]);
  const changeSearch = (event) => {
    setSearch(event.target.value);
  };
  const searchResult = (event) => {
    event.preventDefault();
    sendData();
  };
  const sendData = () => {
    props.search(search);
  };

  const idUsers = localStorage.getItem("idUsers");
  // const token = localStorage.getItem("token");

  const getdataUsers = () => {
    axios
      .get(`${API_URL}users/${idUsers}`, { headers: { token: Token } })
      .then((response) => {
        const user = response.data.data[0]
        
        setdataUser(user);
        
      })
      .catch((err) => {
        alert(`${err.message} Cannot Access Data from Server
      Please Call Admin in 021-082`);
      });
  };
  useEffect(() => {
    getdataUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          <Link className="navbar-brand planelogo" to="/">
            <img
              src="https://raw.githubusercontent.com/farizian/week15/master/img/plane.png"
              alt=""
            ></img>
            <h1>Ankasa</h1>
          </Link>
          <NavbarToggler onClick={toggleNavbar} className="bar">
            <img
              src="https://raw.githubusercontent.com/farizian/week15/master/img/align-right.png"
              alt=""
              className="baricon"
            ></img>
          </NavbarToggler>
          <Collapse
            className="navmenu"
            id="navbarNav"
            isOpen={!collapsed}
            navbar
          >
            <ul className="navbar-nav primary-menu">
              <div className="searchbox">
                <form onSubmit={searchResult} className="nav-item search">
                  <img
                    onClick={searchResult}
                    className="srch"
                    src="https://raw.githubusercontent.com/farizian/week15/master/img/search.png"
                    alt="srch"
                  ></img>
                  <input
                    type="text"
                    onChange={changeSearch}
                    placeholder="Where you want to go?"
                    name=""
                    value={search}
                  ></input>
                </form>
              </div>
              <div className="menu">
                <div className="box"></div>
                <Link className="menu1 nav-item" to="/">
                  Find Ticket
                </Link>
                <Link className="menu1 nav-item" id="m1" to="/mybooking">
                  My Booking
                </Link>
              </div>
            </ul>
            {props.token !== Token ? (
              <ul className="navbar-nav secondary-menu">
                <Link className="type1 nav-item" to="/signup">
                  Sign up
                </Link>
              </ul>
            ) : (
              <ul className="navbar-nav secondary-menu">
                <Link
                  className={dataUser.admin !== 1 ? "type2 nav-item d-blok" : "d-none"}
                  // className= "type2 nav-item d-blok"
                  
                  to="/dashboard"
                >
                  <img
                    className="dashboard"
                    src="https://raw.githubusercontent.com/farizian/week15/master/img/dashboard.png"
                    alt=""
                  ></img>
                </Link>

                <Link className="type2 nav-item" to="">
                  <div className="round" id="r1"></div>
                  <img
                    className="mail"
                    src="https://raw.githubusercontent.com/farizian/week15/master/img/mail.png"
                    alt=""
                  ></img>
                </Link>
                <Link className="type2 nav-item" to="">
                  <div className="round"></div>
                  <img
                    className="bell"
                    src="https://raw.githubusercontent.com/farizian/week15/master/img/bell.png"
                    alt=""
                  ></img>
                </Link>
                <Link className="type2 nav-item" id="tp2" to="/mybooking">
                  <img
                    className="profile"
                    src={dataUser.photoProfile}
                    // src=""
                    alt="imge"
                  />
                </Link>
              </ul>
            )}
          </Collapse>
        </div>
      </nav>
    </div>
  );
};

export default Navbarmenu;
