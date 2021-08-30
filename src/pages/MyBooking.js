import { useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/Mybooking.css";
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

const Mybook = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState([
    {
      id: "1",
      name: "Mike Kowalski",
      email: "",
      password: "",
      noTelp: "",
      address: "Medan, Indonesia",
      card: "4441 1235 5512 5551",
      pict: "https://images.unsplash.com/photo-1590086782957-93c06ef21604?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      status: "user",
    },
  ]);

  // eslint-disable-next-line no-unused-vars
  const [transaction, setTransaction] = useState([
    {
      id: "1",
      nameUser: "Mike Kowalski",
      email: "flightbooking@ankasa.com",
      password: "",
      noTelp: "081234567",
      address: "Medan, Indonesia",
      gender: "Mr",
      name: "Mike Kowalski",
      country: "",
      insurance: true,
      total: "2100000",
      payment: "Waiting for Payment",
      code_airline: "AB-221",
      airlane: "Garuda Indonesia",
      from: "JKT",
      desti: "JPN",
      date: "20 July '20",
      timeDesti: "12:33",
      dateEsti: "30 March '20",
      timeEsti: "10:33",
      price: "2100000",
      class: "economy",
      transit: "direct",
      wifi: true,
      meal: true,
      luggage: false,
    },
    {
      id: "2",
      nameUser: "Mike Kowalski",
      email: "flightbooking@ankasa.com",
      password: "",
      noTelp: "081234567",
      address: "Medan, Indonesia",
      gender: "Mr",
      name: "Mike Kowalski",
      country: "Indonesian",
      insurance: true,
      total: "2100000",
      payment: "Eticket issued",
      code_airline: "AB-221",
      airlane: "Garuda Indonesia",
      from: "SBY",
      desti: "SGP",
      date: "20 July '20",
      timeDesti: "12:33",
      dateEsti: "30 March '20",
      timeEsti: "10:33",
      price: "3100000",
      class: "Frist Class",
      transit: "direct",
      wifi: true,
      meal: true,
      luggage: true,
    },
  ]);

  const [active, setActive] = useState(false);
  const toggle = (index) => {
    if (active === index) {
      //if clicked question is already active, then close it
      return setActive(null);
    }

    setActive(index);
  };
  return (
    <div className="container-fluid">
      <div className="navbar1">
        <Navbar />
      </div>
      <div className="row myBooking">
        <div className="col-lg-2 users">
          <div className=" cardUser">
            {user.map((e, i) => (
              <div key={i} className="itemCard">
                <div className="outline">
                  <div className="imgRounded">
                    <img src={e.pict} alt="imageUser" className="imgUser" />
                  </div>
                </div>

                <button type="submit" className="photo">
                  Select Photo
                </button>

                <h3 className="name">{e.name}</h3>
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
            {user.map((e, i) => (
              <div key={i} className="cardBank">
                <div className="cardBlue">
                  <h6 className="numberCard">{e.card}</h6>
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
                <ListGroupItem className="logout">
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
                  id={e.id}
                  className={active === i ? "cardHistoryActive" : "cardHistory"}
                >
                  <p className="dateBook">
                    Monday, {e.date} - {e.timeDesti}
                  </p>
                  <h5 className="travel">
                    {e.from}{" "}
                    <span>
                      <FontAwesomeIcon
                        icon={faPlaneDeparture}
                        className="iconAirlane"
                      />
                    </span>{" "}
                    {e.desti}
                  </h5>
                  <p className="nameAirlane">
                    {e.airlane}, {e.code_airline}
                  </p>
                  <div className="marginCenter"></div>
                  <div onClick={() => toggle(i)} className="details">
                    <div className="accordion-header headerDetails">
                      <p className="status">Status</p>
                      <div
                        className={
                          e.payment === "Eticket issued" ? "eticket" : "witing"
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
                            <p className="fw-bold">{e.name}</p>
                          </div>

                          <div className="col-lg-4 col-6">
                            <p className="headInfo">Class :</p>
                            <p className="fw-bold">{e.class}</p>
                          </div>

                          <div className="col-lg-4 col-6">
                            <p className="headInfo">Code :</p>
                            <p className="fw-bold">{e.code_airline}</p>
                          </div>

                          <div className="col-lg-4 col-6">
                            <p className="headInfo">Price :</p>
                            <p className="fw-bold">{e.price}</p>
                          </div>

                          <div className="col-lg-4 col-6">
                            <p className="headInfo">Facility</p>
                            <p className="fw-bold">
                              {e.meal === true ? (
                                <FontAwesomeIcon
                                  icon={faHamburger}
                                  style={{ marginRight: "10px" }}
                                />
                              ) : null}
                              {e.wifi === true ? (
                                <FontAwesomeIcon
                                  icon={faWifi}
                                  style={{ marginRight: "10px" }}
                                />
                              ) : null}
                              {e.luggage === true ? (
                                <FontAwesomeIcon icon={faSuitcaseRolling} />
                              ) : null}
                            </p>
                          </div>

                          <div className="col-lg-4 col-6">
                            <p className="headInfo">Luggage :</p>
                            <p className="fw-bold">{e.luggage === true ? "20 KG" : "0 KG"}</p>
                          </div>
                          <button
                            type="button"
                            className={
                              e.payment === "Eticket issued"
                                ? "d-none"
                                : "btn toPay"
                            }
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
