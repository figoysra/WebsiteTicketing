import {Link} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/navbar.css'
import { useState } from 'react';
import { Collapse, NavbarToggler} from 'reactstrap';

const Navbarmenu=(props)=>{
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  const [search, setSearch]= useState("")
  const changeSearch=(event)=>{
    setSearch(event.target.value)
  }
  const searchResult=(event)=>{
    event.preventDefault();
    sendData()
  }
  const sendData=()=>{
    props.search(search)
  }

  return(
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
        <Link className="navbar-brand planelogo" to="/">
          <img src="https://raw.githubusercontent.com/farizian/week15/master/img/plane.png" alt=""></img>
          <h1>Ankasa</h1>
        </Link>
        <NavbarToggler onClick={toggleNavbar} className="bar">
          <img src="https://raw.githubusercontent.com/farizian/week15/master/img/align-right.png" alt="" className="baricon"></img>
        </NavbarToggler>
        <Collapse className="navmenu" id="navbarNav" isOpen={!collapsed} navbar>
          <ul className="navbar-nav primary-menu">
            <div className="searchbox">
              <form onSubmit={searchResult} className="nav-item search">
                <img onClick={searchResult} className="srch" src="https://raw.githubusercontent.com/farizian/week15/master/img/search.png" alt="srch" ></img>
                <input type="text" onChange={changeSearch} placeholder="Where you want to go?" name="" value={search}></input>
              </form>
            </div>
            <div className="menu">
              <div className="box"></div>
              <Link className="menu1 nav-item" to="/">Find Ticket</Link>
              <Link className="menu1 nav-item" id="m1" to="/">My Booking</Link>
            </div>
          </ul>
            {props.navtype===1?
            <ul className="navbar-nav secondary-menu">
              <Link className="type1 nav-item" to="/signup">Sign up</Link>
            </ul>
            :<ul className="navbar-nav secondary-menu">
              <Link className="type2 nav-item" to="">
                <div className="round" id="r1"></div>
                <img className="mail" src="https://raw.githubusercontent.com/farizian/week15/master/img/mail.png" alt=""></img>
              </Link>
              <Link className="type2 nav-item" to="">
                <div className="round"></div>
                <img className="bell" src="https://raw.githubusercontent.com/farizian/week15/master/img/bell.png" alt=""></img>
              </Link>
              <Link className="type2 nav-item" id="tp2" to="">
                <img className="profile" src="https://raw.githubusercontent.com/farizian/week15/master/img/profile.png" alt=""></img>
              </Link>
            </ul>
            }
          
        </Collapse>
      </div>
    </nav>
  </div>
  )
}

export default Navbarmenu;