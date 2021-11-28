import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
// import { extendMoment } from 'moment-range'
import CurrencyFormat from "react-currency-format";
import { useLocation, useHistory } from "react-router-dom";
import { API_URL, Token } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faCircle,
  faExchangeAlt,
  faHamburger,
  faPlaneDeparture,
  faSuitcaseRolling,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { Input } from "reactstrap";
import "../css/SearchPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Searchpage = () => {
  const [ticket, setTicket] = useState([]);

  // for filter
  const [transit, setTransit] = useState(false);
  const [direct, setDirect] = useState(false);
  const [lugg, setLugg] = useState(false);
  const [meal, setMeal] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [midDep, setMidDep] = useState(false);
  const [morDep, setMorDep] = useState(false);
  const [nightDep, setNightDep] = useState(false);
  const [eveningDep, setEveningDep] = useState(false);
  const [midArr, setMidArr] = useState(false);
  const [morArr, setMorArr] = useState(false);
  const [nightArr, setNightArr] = useState(false);
  const [eveningArr, setEveningArr] = useState(false);
  const [plane, setPlane] = useState(false);
  const [airasia, setAirasia] = useState(false);
  const [lion, setLion] = useState(false);
  

  const search = useLocation().search;
  const from = new URLSearchParams(search).get("from");
  const to = new URLSearchParams(search).get("to");
  const cls = new URLSearchParams(search).get("cls");
  const dt = new URLSearchParams(search).get("date");
  const dtParam = moment(dt).format("YYYY-MM-DD");
  const date = moment(dt).format("dddd, DD MMM YY");

  // eslint-disable-next-line no-unused-vars
  const [config, setConfig] = useState({
    header: { token: Token },
    params: {
      from: from,
      to: to,
      cls: cls,
      date: dtParam,
    },
  });

  const ticketFilter = (config) => {
    axios
      .get(`${API_URL}ticket`, config)
      .then((res) => {
        const data = res.data.data.ticket;
        setTicket(data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    ticketFilter(config);
  }, [config]);

  const dataTicket = () => {
    const send = {
      header: { token: Token },
      params: {
        from: from,
        to: to,
        cls: cls,
        date: dtParam,
      },
    };
    axios
      .get(`${API_URL}ticket`, send)
      // .get(`${API_URL}ticket`)
      .then((res) => {
        const data = res.data.data.ticket;
        setTicket(data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    dataTicket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //set time local
  const timeLocal = (time) => {
    const local = moment(time).local("id");
    return local
  };

  const duration = (start, end) => {
    const s = moment(start)
    const e = moment(end)
    const res = e.subtract(s);
    const hours = moment(res).format("hh");
    const mnt = moment(res).format("mm");
    const output = `${hours} hours : ${mnt} minutes`;
    return output;
    
  };

  const [active, setActive] = useState(false);
  const toggle = (index) => {
    if (active === index) {
      //if clicked question is already active, then close it
      return setActive(null);
    }

    setActive(index);
  };

  const checkTransit = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    if (value === false) {
      setTransit(false);
      setConfig({
        ...config,
        params: {
          ...config.params,
          transit: "",
        },
      });
    } else {
      setTransit(true);
      setConfig({
        ...config,
        params: {
          ...config.params,
          transit: "transit",
        },
      });
    }
  };

  const checkDirect = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    if (value === false) {
      setDirect(false);
      setConfig({
        ...config,
        params: {
          ...config.params,
          transit: "",
        },
      });
    } else {
      setDirect(true);
      setConfig({
        ...config,
        params: {
          ...config.params,
          transit: "direct",
        },
      });

      ticketFilter(config);
    }
  };

  const checkLug = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (value === false) {
      setLugg(false);
      setConfig({
        ...config,
        params: {
          ...config.params,
          luggage: "",
        },
      });
    } else {
      setLugg(true);
      setConfig({
        ...config,
        params: {
          ...config.params,
          luggage: 0,
        },
      });
    }
  };

  const checkMeal = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (value === false) {
      setMeal(false);
      setConfig({
        ...config,
        params: {
          ...config.params,
          meal: "",
        },
      });
    } else {
      setMeal(true);
      setConfig({
        ...config,
        params: {
          ...config.params,
          meal: 0,
        },
      });
    }
  };

  const checkWifi = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (value === false) {
      setWifi(false);
      setConfig({
        ...config,
        params: {
          ...config.params,
          wifi: "",
        },
      });
    } else {
      setWifi(true);
      setConfig({
        ...config,
        params: {
          ...config.params,
          wifi: 0,
        },
      });
    }
  };

  const timeMid = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (value === false) {
      setMidDep(false);
      setConfig({
        ...config,
        params: {
          ...config.params,
          mindeptime:  "",
          maxdeptime: "",
        },
      });
    } else {
      setMidDep(true);
      setConfig({
        ...config,
        params: {
          ...config.params,
          mindeptime: moment("0000", "Hmm").format("HH:mm:ss"),
          maxdeptime: moment("600", "Hmm").format("HH:mm:ss"),
        },
      });
    }
  };
  
  const checkMorDep = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (value === false) {
      setMorDep(false);
      setConfig({
        ...config,
        params: {
          ...config.params,
          mindeptime:  "",
          maxdeptime: "",
        },
      });
    } else {
      setMorDep(true);
      setConfig({
        ...config,
        params: {
          ...config.params,
          mindeptime: moment("600", "Hmm").format("HH:mm:ss"),
          maxdeptime: moment("1200", "Hmm").format("HH:mm:ss"),
        },
      });
    }
  };
  
  const checkANDep = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (value === false) {
      setEveningDep(false);
      setConfig({
        ...config,
        params: {
          ...config.params,
          mindeptime:  "",
          maxdeptime: "",
        },
      });
    } else {
      setEveningDep(true);
      setConfig({
        ...config,
        params: {
          ...config.params,
          mindeptime: moment("1210", "Hmm").format("HH:mm:ss"),
          maxdeptime: moment("1800", "Hmm").format("HH:mm:ss"),
        },
      });
    }
  };
  
  const checkNightDep = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (value === false) {
      setNightDep(false);
      setConfig({
        ...config,
        params: {
          ...config.params,
          mindeptime:  "",
          maxdeptime: "",
        },
      });
    } else {
      setNightDep(true);
      setConfig({
        ...config,
        params: {
          ...config.params,
          mindeptime: moment("1810", "Hmm").format("HH:mm:ss"),
          maxdeptime: moment("2300", "Hmm").format("HH:mm:ss"),
        },
      });
    }
  };

  const timeMidArr = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (value === false) {
      setMidArr(false);
      setConfig({
        ...config,
        params: {
          ...config.params,
          minarrivedTime:  "",
          maxarrivedTime: "",
        },
      });
    } else {
      setMidArr(true);
      setConfig({
        ...config,
        params: {
          ...config.params,
          minarrivedTime: moment("0000", "Hmm").format("HH:mm:ss"),
          maxarrivedTime: moment("600", "Hmm").format("HH:mm:ss"),
        },
      });
    }
  };
  
  const checkMorArr = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (value === false) {
      setMorArr(false);
      setConfig({
        ...config,
        params: {
          ...config.params,
          minarrivedTime:  "",
          maxarrivedTime: "",
        },
      });
    } else {
      setMorArr(true);
      setConfig({
        ...config,
        params: {
          ...config.params,
          minarrivedTime: moment("600", "Hmm").format("HH:mm:ss"),
          maxarrivedTime: moment("1200", "Hmm").format("HH:mm:ss"),
        },
      });
    }
  };
  
  const checkANArr = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (value === false) {
      setEveningArr(false);
      setConfig({
        ...config,
        params: {
          ...config.params,
          minarrivedTime:  "",
          maxarrivedTime: "",
        },
      });
    } else {
      setEveningArr(true);
      setConfig({
        ...config,
        params: {
          ...config.params,
          minarrivedTime: moment("1210", "Hmm").format("HH:mm:ss"),
          maxarrivedTime: moment("1800", "Hmm").format("HH:mm:ss"),
        },
      });
    }
  };
  
  const checkNightArr = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (value === false) {
      setNightArr(false);
      setConfig({
        ...config,
        params: {
          ...config.params,
          minarrivedTime:  "",
          maxarrivedTime: "",
        },
      });
    } else {
      setNightArr(true);
      setConfig({
        ...config,
        params: {
          ...config.params,
          minarrivedTime: moment("1810", "Hmm").format("HH:mm:ss"),
          maxarrivedTime: moment("2300", "Hmm").format("HH:mm:ss"),
        },
      });
    }
  };
  
  const planeGA = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (value === false) {
      setPlane(false);
      setConfig({
        ...config,
        params: {
          from: from,
          to: to,
          cls: cls,
          date: dtParam,
        },
      });
    } else {
      setPlane(true);
      setConfig({
        ...config,
        params: {
          ...config.params,
          airlane: "Garuda Indonesia",
        },
      });
    }
  };
  
  const planeAA = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (value === false) {
      setAirasia(false);
      setConfig({
        ...config,
        params: {
          from: from,
          to: to,
          cls: cls,
          date: dtParam,
        },
      });
    } else {
      setAirasia(true);
      setConfig({
        ...config,
        params: {
          ...config.params,
          airlane: "Air Asia",
        },
      });
    }
  };
  
  const planeLA = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (value === false) {
      setLion(false);
      setConfig({
        ...config,
        params: {
          from: from,
          to: to,
          cls: cls,
          date: dtParam,
        },
      });
    } else {
      setLion(true);
      setConfig({
        ...config,
        params: {
          ...config.params,
          airlane: "Lion Air",
        },
      });
    }
  };
  
  const reset = () => {
    setDirect(false);
    setTransit(false);
    setLugg(false);
    setMeal(false);
    setWifi(false);
    setMidDep(false)
    setMorDep(false)
    setEveningDep(false)
    setNightDep(false)
    setMidArr(false)
    setMorArr(false)
    setEveningArr(false)
    setNightArr(false)
    setPlane(false)
    setAirasia(false)
    setLion(false)
    dataTicket(config);
  };

  const token = localStorage.getItem("token");
  

  const history = useHistory()
  // id ticket handle select
  const idTicket = (id) => {
    if (token === null) {
      alert("Anda Harus Login / Register")
      history.push("/signup")
    } else {
      history.push(`/flightdetail/${id}`) 
    }
  }
  
  return (
    <div>
      <div className="mb-0">
        <Navbar token={token} navtype={2} />
      </div>
      <div>
        <div className="container-fluid body">
          <div className="row">
            <header className="head col-lg-12 px-lg-5 px-3 py-lg-5 py-3">
              <div className="row w-100 d-flex justify-content-between">
                <div className="searchbox col-lg-6">
                  <div className="ms-lg-5 resultbox">
                    <div className="img d-lg-block d-none">
                      <img
                        src="https://raw.githubusercontent.com/farizian/week15/master/img/planewhite.png"
                        alt="plane"
                      />
                    </div>
                    <div className="row textsrc">
                      <div className="col-12 txtHeader ">
                        <p className="from">From</p>
                        <p className="to">To</p>
                      </div>
                      <div className="col-12 d-flex justify-content-center align-items-center txt ">
                        <p className="route1">{from}</p>
                        <FontAwesomeIcon
                          icon={faExchangeAlt}
                          className="arrowRoute"
                        />
                        <p className="route2">{to}</p>
                      </div>
                      <div className="txtDate">
                        <p className="col-4">{date}</p>

                        <p className="col-4 ">
                          <FontAwesomeIcon
                            icon={faCircle}
                            size="sm"
                            style={{ width: "8px", marginRight: "10px" }}
                          />
                          6 Passenger
                        </p>

                        <p className="col-4 ">
                          <FontAwesomeIcon
                            icon={faCircle}
                            size="sm"
                            style={{ width: "8px", marginRight: "10px" }}
                          />
                          {cls === "FirstClass" ? "First Class" : cls}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="searchbtn col-lg-5 text-end">
                  <button className="btn btnChange">Change Search</button>
                </div>
              </div>
            </header>
            <div className="col-lg-12">
              <div className="row d-lg-flex justify-content-lg-center">
                <aside className="asideFilter col-lg-3">
                  <div className="row menuside">
                    <div className="col-6">
                      <button className={`btn filter`}>Filter</button>
                    </div>
                    <div className="col-6 text-end">
                      <button className="btn reset" onClick={reset}>
                        Reset
                      </button>
                    </div>
                  </div>
                  <div className="filtercard">
                    <div className="cardFilter">
                      <div className="menu">
                        <p className="headerSearch">Transit</p>
                        <p>Direct</p>
                        <p>Transit</p>
                      </div>
                      <div className="checkbox">
                        <div className="imgbox">
                          <FontAwesomeIcon
                            size="xl"
                            icon={faChevronUp}
                            style={{ color: "#2395FF" }}
                          />
                        </div>
                        <div className="squarebox">
                          <Input
                            type="checkbox"
                            className="check"
                            checked={direct}
                            onChange={(e) => checkDirect(e)}
                          />
                        </div>
                        <div className="squarebox">
                          <Input
                            type="checkbox"
                            className="check"
                            checked={transit}
                            onChange={(e) => checkTransit(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="cardFilter">
                      <div className="menu">
                        <p className="headerSearch">Facilities</p>
                        <p>Luggage</p>
                        <p>In-Flight Meal</p>
                        <p>Wi-fi</p>
                      </div>
                      <div className="checkbox">
                        <div className="imgbox">
                          <FontAwesomeIcon
                            size="xl"
                            icon={faChevronUp}
                            style={{ color: "#2395FF" }}
                          />
                        </div>
                        <div className="squarebox">
                          <Input
                            type="checkbox"
                            className="check"
                            name="Facilities"
                            checked={lugg}
                            onChange={(e) => checkLug(e)}
                          />
                        </div>
                        <div className="squarebox">
                          <Input
                            type="checkbox"
                            className="check"
                            name="Facilities"
                            checked={meal}
                            onChange={(e) => checkMeal(e)}
                          />
                        </div>
                        <div className="squarebox">
                          <Input
                            type="checkbox"
                            className="check"
                            name="Facilities"
                            checked={wifi}
                            onChange={(e) => checkWifi(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="cardFilter">
                      <div className="menu">
                        <p className="headerSearch">Departure Time</p>
                        <p>00:00 - 06:00</p>
                        <p>06:00 - 12:00</p>
                        <p>12:00 - 18:00</p>
                        <p>18:00 - 24:00</p>
                      </div>
                      <div className="checkbox">
                        <div className="imgbox">
                          <FontAwesomeIcon
                            size="xl"
                            icon={faChevronUp}
                            style={{ color: "#2395FF" }}
                          />
                        </div>
                        <div className="squarebox">
                          <Input
                            type="checkbox"
                            className="check"
                            name="Departure Time"
                            checked={midDep}
                            onChange={(e) => timeMid(e)}
                          />
                        </div>
                        <div className="squarebox">
                          <Input
                            type="checkbox"
                            className="check"
                            name="Departure Time"
                            checked={morDep}
                            onChange={(e)=> checkMorDep(e)}
                          />
                        </div>
                        <div className="squarebox">
                          <Input
                            type="checkbox"
                            className="check"
                            name="Departure Time"
                            checked={eveningDep}
                            onChange={(e)=> checkANDep(e)}
                          />
                        </div>
                        <div className="squarebox">
                          <Input
                            type="checkbox"
                            className="check"
                            name="Departure Time"
                            checked={nightDep}
                            onChange={(e)=> checkNightDep(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="cardFilter">
                      <div className="menu">
                        <p className="headerSearch">Time Arrived</p>
                        <p>00:00 - 06:00</p>
                        <p>06:00 - 12:00</p>
                        <p>12:00 - 18:00</p>
                        <p>18:00 - 24:00</p>
                      </div>
                      <div className="checkbox">
                        <div className="imgbox">
                          <FontAwesomeIcon
                            size="xl"
                            icon={faChevronUp}
                            style={{ color: "#2395FF" }}
                          />
                        </div>
                        <div className="squarebox">
                          <Input
                            type="checkbox"
                            className="check"
                            name="Time Arrived"
                            checked={midArr}
                            onChange={(e) => timeMidArr(e)}
                          />
                        </div>
                        <div className="squarebox">
                          <Input
                            type="checkbox"
                            className="check"
                            name="Time Arrived"
                            checked={morArr}
                            onChange={(e)=> checkMorArr(e)}
                          />
                        </div>
                        <div className="squarebox">
                          <Input
                            type="checkbox"
                            className="check"
                            name="Time Arrived"
                            checked={eveningArr}
                            onChange={(e)=> checkANArr(e)}
                          />
                        </div>
                        <div className="squarebox">
                          <Input
                            type="checkbox"
                            className="check"
                            name="Time Arrived"
                            checked={nightArr}
                            onChange={(e)=> checkNightArr(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="cardFilter">
                      <div className="menu">
                        <p className="headerSearch">Airlines</p>
                        <p>Garuda Indonesia</p>
                        <p>Air Asia</p>
                        <p>Lion Air</p>
                      </div>
                      <div className="checkbox">
                        <div className="imgbox">
                          <FontAwesomeIcon
                            size="xl"
                            icon={faChevronUp}
                            style={{ color: "#2395FF" }}
                          />
                        </div>
                        <div className="squarebox">
                          <Input
                            type="checkbox"
                            className="check"
                            name="Airlines"
                            checked={plane}
                            onChange={(e) => planeGA(e)}
                          />
                        </div>
                        <div className="squarebox">
                          <Input
                            type="checkbox"
                            className="check"
                            name="Airlines"
                            checked={airasia}
                            onChange={(e)=> planeAA(e)}
                          />
                        </div>
                        <div className="squarebox">
                          <Input
                            type="checkbox"
                            className="check"
                            name="Airlines"
                            checked={lion}
                            onChange={(e)=> planeLA(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
                <section className="section col-lg-8">
                  <div className="headers">
                    <div className="txt">
                      <h1 className="selectTicket">Select Ticket</h1>
                      <p className="totalTicket">
                        ({ticket.length} flight found)
                      </p>
                    </div>
                    <div className="sortby">
                      <p className="sort">Sort by</p>
                      <img
                        src="https://raw.githubusercontent.com/farizian/week15/master/img/asc.png"
                        alt=""
                      />
                    </div>
                  </div>
                  {ticket.map((e, i) => (
                    <div key={i} className="cardticket">
                      <div className="flightlogo">
                        <img src={e.logo} alt="Logo Airplane" />
                        <p className="nameAirplane">{e.airlane}</p>
                      </div>
                      <div className="d-lg-flex flex-lg-row flex-column justify-content-lg-between align-items-lg-center menubar">
                        <div className="country my-lg-0 my-4">
                          <div className="row">
                            <p className="country1">{e.departure_city}</p>
                            <p className="time">
                              {timeLocal(e.deptime).format("HH:mm")}
                            </p>
                          </div>
                          <div className="img">
                            <FontAwesomeIcon
                              icon={faPlaneDeparture}
                              style={{ color: "#979797" }}
                            />
                          </div>
                          <div className="row">
                            <p className="country1">{e.destination_city}</p>
                            <p className="time">
                              {timeLocal(e.arrivedTime).format("HH:mm")}
                            </p>
                          </div>
                        </div>
                        <div className=" d-lg-block d-none time">
                          <p className="detailtime">
                            {duration(e.deptime, e.arrivedTime)}
                          </p>
                          <p className="transit">{e.transit}</p>
                        </div>
                        <div className=" d-lg-block d-none facilitieslogo">
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
                        </div>
                        <div className="d-flex flex-lg-row align-items-center justify-content-lg-center justify-content-between my-lg-0 my-4 controlPrice">
                          <div className="price me-lg-5">
                            <CurrencyFormat
                              value={e.price}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$ "}
                              renderText={(value) => (
                                <p>
                                  <strong>{value},00</strong> /pax
                                </p>
                              )}
                            />
                          </div>
                          <div className="btn ">
                            <button type="submit" className="select" onClick={()=> idTicket(e.id_ticket)}>
                              Select
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item dropdown">
                        <h2 className="accordion-header h2View">
                          <button
                            className="btn"
                            type="button"
                            onClick={() => toggle(i)}
                          >
                            View Details
                            <span
                              className="iconDetails"
                              style={{ color: "#2395FF", marginLeft: "10px" }}
                            >
                              {active === i ? (
                                <FontAwesomeIcon
                                  size="sm"
                                  icon={faChevronUp}
                                  style={{ color: "#2395FF" }}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  size="sm"
                                  icon={faChevronDown}
                                  style={{ color: "#2395FF" }}
                                />
                              )}
                            </span>
                          </button>
                        </h2>
                        <div className="accordion-collapse mt-3">
                          {active === i ? (
                            <div className="row d-flex justify-content-start detailsInfo">
                              <div className="col-lg-4 col-6">
                                <p className="headInfo">Duration :</p>
                                <p className="fw-bold durationTime">
                                  {duration(e.deptime, e.arrivedTime)}
                                </p>
                              </div>

                              <div className="col-lg-4 col-6">
                                <p className="headInfo">Transit :</p>
                                <p className="fw-bold">{e.transit}</p>
                              </div>

                              <div className="col-lg-4 col-6">
                                <p className="headInfo">Departure Time :</p>
                                <p className="fw-bold">
                                  {moment(`${e.deptime}`).format("hh : mm")}
                                </p>
                              </div>
                              <div className="col-lg-4 col-6">
                                <p className="headInfo">Arrived Time :</p>
                                <p className="fw-bold">
                                  {moment(`${e.arrivedTime}`).format("hh : mm")}
                                </p>
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
                                <p className="headInfo">Facility :</p>
                                <span className="fw-bold">
                                  {e.meal === 0 ? (
                                    <FontAwesomeIcon
                                      icon={faHamburger}
                                      style={{
                                        marginRight: "10px",
                                      }}
                                    />
                                  ) : null}
                                  {e.wifi === 0 ? (
                                    <FontAwesomeIcon
                                      icon={faWifi}
                                      style={{
                                        marginRight: "10px",
                                      }}
                                    />
                                  ) : null}
                                  {e.luggage === 0 ? (
                                    <FontAwesomeIcon icon={faSuitcaseRolling} />
                                  ) : null}
                                </span>
                              </div>

                              <div className="col-lg-4 col-6">
                                <p className="headInfo">Luggage :</p>
                                <p className="fw-bold">
                                  {e.luggage === 0 ? "20 KG" : "0 KG"}
                                </p>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footerSearchPage">
        <Footer />
      </div>
    </div>
  );
};

export default Searchpage;
