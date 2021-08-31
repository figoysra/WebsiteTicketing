import { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios'
import "../css/Mybooking.css";
import { API_URL, Token } from "../utils/constants";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  faChevronDown,
  faChevronUp,
  faCog,
  faHamburger,
  faPlaneDeparture,
  faSignOutAlt,
  faStar,
  faSuitcaseRolling,
  faUserCircle,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import {useHistory} from 'react-router-dom'
import CurrencyFormat from "react-currency-format";


const Mybook = () => {
  
  const [users, setUser] = useState([])

  const [ transaction, setTransaction ] = useState([])

  const [active, setActive] = useState(false);
  const toggle = (index) => {
    if (active === index) {
      //if clicked question is already active, then close it
      return setActive(null);
    }

    setActive(index);
  };

  const dataTransaction = () => {
    const data = localStorage.getItem("idUsers");
    const idUser = JSON.parse(data);
    axios.get(`${API_URL}transaction`, {headers: {token: Token}})
    .then((res)=>{
      const data = res.data.data.transaction
      // eslint-disable-next-line array-callback-return
      const newData = data.map((e)=>{
        if (e.id_users === idUser) {
          return e
        }
      })
      setTransaction(newData)
    })
    .catch((err)=>{
      alert(err)
    })
  }

  useEffect(()=>{
    const data = localStorage.getItem("idUsers");
    const idUser = JSON.parse(data);
    axios.get(`${API_URL}users`, {headers: {token: Token}})
    .then((res)=>{
      const data = res.data.data.users
      // eslint-disable-next-line array-callback-return
      data.map((e)=>{
        if (e.id_users === idUser && e.username !== "admin") {
          setUser([e])
        }
      })
    })
    .catch((err)=> {
      alert(err)
    })

    
    dataTransaction()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

    const updPay = (id) => {
    
      // eslint-disable-next-line array-callback-return
      const data = transaction.filter((e) => {
        if (e.id_transaction === id) {
          return e
        }
      })
  
      const newData = data[0]
      const body = {

        payment: "Eticket Issued",
        contactPerson: newData.id_users,
        gender: newData.gender,
        name: newData.name,
        country_id: newData.id_country,
        insurance: newData.insurance,
        ticket_id: newData.id_ticket,
        total: newData.total,
        orderDate: moment(`${newData.orderDate}`).format("YYYY-MM-DD HH:MM"),
      }

      axios.put(`${API_URL}transaction/${data[0].id_transaction}`, body, {headers:{token: Token}})
      .then((res) => {
        alert("Payment " + res.data.message)
      })
      .catch((err) => {
        alert(err)
      })
      
      dataTransaction()
    }

    const history = useHistory()

    const logOut = () => {
      localStorage.clear()
      history.push("/")
    }

  return (
    <div className="container-fluid">
      <div className=" mb-lg-5 navbar1">
        <Navbar />
      </div>
      <div className="row mt-lg-5 mb-lg-5 myBooking">
        <div className="col-lg-2 users">
          <div className=" cardUser">
            {users.map((e, i) => (
              <div key={i} className="itemCard">
                <div className="outline">
                  <div className="imgRounded">
                    <img src={e.photoProfile} alt="imageUser" className="imgUser" />
                  </div>
                </div>

                <button type="submit" className="photo">
                  Select Photo
                </button>

                <h3 className="name">{e.username}</h3>
                <p className="address">{e.address}</p>
              </div>
            ))}
            <div className="cc">
              <div className="nameCard">
                <h6>Card</h6>
              </div>
              <div className=" btnAdd">
                <button type="button" className="btn add">
                  + Add
                </button>
              </div>
            </div>
            {users.map((e, i) => (
              <div key={i} className="cardBank">
                <div className="cardBlue">
                  <h6 className="numberCard">{e.creditCard}</h6>
                  <div className="cardBody">
                    <p className="brandCard">X Card</p>
                    <span className="debit">$ 1,440.2</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="itemProfile">
              <ListGroup className=" listProfile" flush>
                <ListGroupItem className="profile">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    size="lg"
                    className="iconProfile"
                  />{" "}
                  Profile
                </ListGroupItem>
                <ListGroupItem className="review">
                  <FontAwesomeIcon
                    icon={faStar}
                    size="lg"
                    className="iconReview"
                  />{" "}
                  My Review
                </ListGroupItem>
                <ListGroupItem className="setting">
                  <FontAwesomeIcon
                    icon={faCog}
                    size="lg"
                    className="iconSetting"
                  />{" "}
                  Setting
                </ListGroupItem>
                <ListGroupItem className="logout" onClick={logOut} >
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    size="lg"
                    className="iconLogout"
                  />{" "}
                  Logout
                </ListGroupItem>
              </ListGroup>
            </div>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="contentLeft">
            <div className="cardTitle">
              <h6 className="titleHistory">MY BOOKING</h6>
              <div className="bodyTitle">
                <h3 className="title2">My Booking</h3>
                <p className="order">Order History</p>
              </div>
            </div>

            <div className="historyBooking">
              {transaction.map((e, i) => (
                <div
                  key={i}
                  id={e.id_ticket}
                  className={active === i ? "cardHistoryActive" : "cardHistory"}
                >
                  <p className="dateBook">
                    {moment(`${e.orderDate}`).format("dddd, DD MMMM 'YY ")}
                    
                  </p>
                  <h5 className="travel">
                    {e.depature}{" "}
                    <span>
                      <FontAwesomeIcon
                        icon={faPlaneDeparture}
                        className="iconAirlane"
                      />
                    </span>{" "}
                    {e.destination}
                  </h5>
                  <p className="nameAirlane">
                    {e.airlane}, {e.codeAirplane}
                  </p>
                  <div className="marginCenter"></div>
                  <div onClick={() => toggle(i)} className="details">
                    <div className="accordion-header headerDetails">
                      <p className="status">Status</p>
                      <div
                        className={
                          e.payment === "Eticket Issued" ? "eticket" : "witing"
                        }
                      >
                        <p>{e.payment}</p>
                      </div>
                      <p className=" vDetails">
                        View Details
                        <span className="iconDetails">
                          {active === i ? (
                            <FontAwesomeIcon icon={faChevronUp} />
                          ) : (
                            <FontAwesomeIcon icon={faChevronDown} />
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="accordion-collapse ">
                      {active === i ? (
                        <div className="row d-flex align-items-center justify-content-center detailsInfo">
                          <div className="col-lg-4 col-6 mt-2 namePassenger">
                            <p className="headInfo">Name :</p>
                            <p className="fw-bold">{e.gender} {e.name}</p>
                          </div>

                          <div className="col-lg-4 col-6">
                            <p className="headInfo">Class :</p>
                            <p className="fw-bold">{e.class}</p>
                          </div>

                          <div className="col-lg-4 col-6">
                            <p className="headInfo">Code :</p>
                            <p className="fw-bold">{e.codeAirplane}</p>
                          </div>

                          <div className="col-lg-4 col-6">
                            <p className="headInfo">Price :</p>
                            <CurrencyFormat
                            value={e.total}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$ "}
                            renderText={(value) => <p className="fw-bold">{value},00</p>}
                          />
                          </div>

                          <div className="col-lg-4 col-6">
                            <p className="headInfo">Facility</p>
                            <p className="fw-bold">
                              {e.meal === 0 ? (
                                <FontAwesomeIcon
                                  icon={faHamburger}
                                  style={{ marginRight: "10px" }}
                                />
                              ) : null}
                              {e.wifi === 0 ? (
                                <FontAwesomeIcon
                                  icon={faWifi}
                                  style={{ marginRight: "10px" }}
                                />
                              ) : null}
                              {e.luggage === 0 ? (
                                <FontAwesomeIcon icon={faSuitcaseRolling} />
                              ) : null}
                            </p>
                          </div>

                          <div className="col-lg-4 col-6">
                            <p className="headInfo">Luggage :</p>
                            <p className="fw-bold">{e.luggage === 1 ? "20 KG" : "0 KG"}</p>
                          </div>
                          <button
                            type="submit"
                            className={
                              e.payment === "Eticket Issued"
                                ? "d-none"
                                : "btn toPay"
                            }
                            onClick={() => updPay(e.id_transaction)}

                          >
                            Proceed to Payment
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    
      <div className="footer">
        <Footer />
      </div>

    </div>
  );
};

export default Mybook;
