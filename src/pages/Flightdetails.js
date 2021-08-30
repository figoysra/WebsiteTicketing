import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import { FaPlaneDeparture } from "react-icons/fa";
import { API_URL, Token } from "../utils/constants";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/FlightDetail.css";

const Flight = (props) => {
  const [ticket, setTicket] = useState([]);

  const [user, setUser] = useState([]);

  const [data, setData] = useState({
    name: user.username,
    title: "Mr",
    country: "1",
    phone: user.phone,
  });

  useEffect(() => {
    const dataUser = localStorage.getItem("idUsers");
    const dataTicket = localStorage.getItem("ticketID");
    const idUser = JSON.parse(dataUser);
    const idTicket = JSON.parse(dataTicket)
    axios
      // .get(`${API_URL}ticket`, { headers: { token: Token } })
      .get(`${API_URL}ticket`)
      .then((res) => {
        const data = res.data.data.ticket;
        // eslint-disable-next-line array-callback-return
        data.map((e) => {
          if (e.id_ticket === idTicket ) {
            setTicket(e);
          }
        });
      })
      .catch((err) => {
        alert(err);
      });

    axios
      .get(`${API_URL}users`, { headers: { token: Token } })
      .then((res) => {
        const data = res.data.data.users;
        // eslint-disable-next-line array-callback-return
        data.map((e) => {
          if (e.id_users === idUser && e.username !== "admin") {
            setUser(e);
          }
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const [same, setSame] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [checkInsur, setCheckInsur] = useState(false);

  const [insurance, setInsurance] = useState({
    value: 0,
  });

  const addInsurance = insurance.value !== 1 ? 0 : 2;

  const doParentControlFromChild = () => {
    props.parentControl(same);
  };

  // eslint-disable-next-line no-unused-vars
  const changeSame = (e) => {
    setSame(e.target.checked, () => {
      doParentControlFromChild();
    });
  };

  useEffect(() => {
    if (same === true) {
      setName(user.username);
    }
  }, [same, user.username]);

  const changeCheck = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

      if (value !== true) {
      setInsurance({
        value: 0,
      });
    } else {
      setInsurance({
        value: 1,
      });
    }
  };

  const changeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const [name, setName] = useState("");

  const timeLocal = (time) => {
    const local = moment(time).local("id");
    return local;
  };

  const history = useHistory();

  const getToday = () => {
    const today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate(),
      time = today.getHours() + ":" + today.getMinutes();
    const dateTime = date + "T" + time;
    return dateTime;
  };


  const submitPay = (e) => {
    e.preventDefault();

    const body = {
      contactPerson: user.id_users,
      gender: data.title,
      name: name,
      country_id: data.country,
      insurance: insurance.value,
      ticket_id: ticket.id_ticket,
      total: ticket.price + addInsurance,
      payment: "Eticket Issued",
      orderDate: getToday()
    };

    axios
      .post(`${API_URL}transaction`, body, { headers: { token: Token } })
      .then((res) => {
        alert(res.data.message)
        history.push(`/mybooking`)
      })
      .catch((err) => {
        alert(err);
      });
  };

  const payLater = (e) => {
    e.preventDefault();

    const body = {
      contactPerson: user.id_users,
      gender: data.title,
      name: name,
      country_id: data.country,
      insurance: insurance.value,
      ticket_id: ticket.id_ticket,
      total: ticket.price + addInsurance,
      payment: "Waiting Payment",
      orderDate: getToday()
    };

    axios
      .post(`${API_URL}transaction`, body, { headers: { token: Token } })
      .then((res) => {
        alert(res.data.message)
        history.push(`/mybooking`);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <div className="navbar1">
        <Navbar />
      </div>
      <div className="bg mt-lg-5">
        <div className="header w-100">
          <svg
            width="217"
            height="172"
            viewBox="0 0 217 172"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.3188 166.013C22.5266 169.675 25.6273 171.752 28.8722 171.746L74.7643 171.65C78.386 171.642 81.9556 170.337 85.1844 167.838L187.473 88.8008C196.874 81.5367 205.3 71.1679 211.034 57.5872C217.471 42.3417 218.171 31.3091 215.629 23.5151C213.094 15.7157 206.932 9.98796 195.151 8.821C184.657 7.78251 174.219 11.99 164.819 19.2487L130.187 46.0086L53.3018 2.08152C52.3774 1.13327 51.3034 0.578218 50.1909 0.473756C49.0784 0.369293 47.9677 0.719211 46.9738 1.48733L23.859 19.3504C20.1079 22.2464 19.2009 29.8692 22.0414 34.6227L76.9615 87.136L40.6774 115.175L15.2424 95.6527C14.3661 94.98 13.3981 94.6304 12.4168 94.6323C11.4354 94.6341 10.4681 94.9873 9.59285 95.6634L-4.51508 106.568C-8.18533 109.405 -9.1521 116.803 -6.47325 121.599L20.3188 166.013Z"
              fill="#41A4FF"
            />
          </svg>
        </div>
        <div className="form">
          <Container>
            <Row>
              <Col lg="8">
                <Form className="formData " onSubmit={payLater}>
                  <div className="cardData">
                    <h1 className="text-light fs ">Contact Person Detail</h1>
                    <FormGroup className="formcontactPerson">
                      <Label for="">Full Name</Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        className="inputForm"
                        value={user.username}
                        onChange={(e) => changeHandler(e)}
                      />
                      <hr className="hr" />
                      <Label for="">Email</Label>
                      <Input
                        type="text"
                        id="email"
                        name="email"
                        value={user.email}
                        className="inputForm"
                      />
                      <hr className="hr" />
                      <Label for="">Phone Number</Label>
                      <div className="d-flex">
                        <select
                          className="bg-white border-end-0 select"
                          type="select"
                          name="phone"
                          id="phone"
                          value={data.phone}
                          onChange={(e) => {
                            changeHandler(e);
                          }}
                        >
                          <option value="+62">+62</option>
                          <option value="+61">+61</option>
                          <option value="+81">+81</option>
                          <option value="+60">+60</option>
                          <option value="+1">+1</option>
                        </select>
                        <Input
                          className="inputForm"
                          type="number"
                          id="number"
                          name="number"
                          value={user.phone}
                        />
                      </div>
                      <hr className="hr" />
                      <div className="dangerInfo w-100 p">
                        <svg
                          width="22"
                          height="20"
                          viewBox="0 0 22 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.3998 18.0625L11.6498 1.1875C11.5045 0.936719 11.2537 0.8125 11.0006 0.8125C10.7475 0.8125 10.4943 0.936719 10.3514 1.1875L0.601375 18.0625C0.313094 18.5641 0.674031 19.1875 1.25059 19.1875H20.7506C21.3272 19.1875 21.6881 18.5641 21.3998 18.0625ZM10.2506 7.75C10.2506 7.64687 10.335 7.5625 10.4381 7.5625H11.5631C11.6662 7.5625 11.7506 7.64687 11.7506 7.75V12.0625C11.7506 12.1656 11.6662 12.25 11.5631 12.25H10.4381C10.335 12.25 10.2506 12.1656 10.2506 12.0625V7.75ZM11.0006 16C10.7062 15.994 10.4259 15.8728 10.2198 15.6625C10.0137 15.4522 9.89832 15.1695 9.89832 14.875C9.89832 14.5805 10.0137 14.2978 10.2198 14.0875C10.4259 13.8772 10.7062 13.756 11.0006 13.75C11.295 13.756 11.5753 13.8772 11.7814 14.0875C11.9874 14.2978 12.1029 14.5805 12.1029 14.875C12.1029 15.1695 11.9874 15.4522 11.7814 15.6625C11.5753 15.8728 11.295 15.994 11.0006 16Z"
                            fill="#F24545"
                          />
                        </svg>
                        Make sure the customer data is correct.
                      </div>
                    </FormGroup>
                  </div>
                  <div className="mt-5">
                    <h1 className="text-dark fs">Passenger Details</h1>
                    <FormGroup className="formcontactPerson">
                      <div className="passengerInfo w-100 ">
                        <Row>
                          <Col lg="6">Passenger : 1 Adult</Col>
                          <Col lg="6">
                            <Label check className="ms-lg-4">
                              <Input
                                type="checkbox"
                                onChange={(e) => changeSame(e)}
                              />{" "}
                              Same as Contact Person
                            </Label>
                          </Col>
                        </Row>
                      </div>
                      <br />
                      <Label for="">Title</Label>
                      <br />
                      <select
                        className="select bg-white border-end-0"
                        type="select"
                        name="title"
                        id="title"
                        value={data.title}
                        onChange={(e) => changeHandler(e)}
                      >
                        <option value="Mr">Mr. </option>
                        <option value="Mrs">Mrs. </option>
                      </select>
                      <hr className="hr2" />
                      <Label for="">Full Name</Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="inputForm"
                      />
                      <hr className="hr" />
                      <Label for="">City</Label>
                      <div className="d-flex">
                        <select
                          className="bg-white border-end-0 select"
                          type="select"
                          name="country"
                          id="country"
                          value={data.country}
                          onChange={(e) => changeHandler(e)}
                        >
                          <option value="1">Surabaya</option>
                          <option value="2">Medan</option>
                          <option value="3">Padang</option>
                          <option value="5">Bandung</option>
                          <option value="6">Yogyakarta</option>
                          <option value="4">Tokyo</option>
                          <option value="7">Amsterdam</option>
                        </select>
                      </div>
                      <hr className="hr2" />
                    </FormGroup>
                  </div>
                  <div className="mt-5">
                    <h1 className="text-dark fs">Passenger Details</h1>
                    <FormGroup check className="formcontactPerson">
                      <div className="d-flex">
                        <div className="w-50">
                          <Label check className="ms-4">
                            <Input
                              type="checkbox"
                              value={checkInsur}
                              onChange={(e) => changeCheck(e)}
                            />{" "}
                            Travel Insurance
                          </Label>
                        </div>
                        <div className="w-50 d-flex justify-content-end insurance">
                          <CurrencyFormat
                            value={2}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$ "}
                            renderText={(value) => <p>{value},00</p>}
                          />
                        </div>
                      </div>

                      <hr className="hr2" />
                      <p>Get travel compensation up to $ 10.000,00</p>
                    </FormGroup>
                  </div>
                  <div className="row d-flex w-100 mt-3 mb-lg-5 mb-0">
                    <div className="col-lg-6">
                      <Button
                        type="button"
                        className=" p-2 w-100 blue btn shadow"
                        onClick={submitPay}
                      >
                        Proceed to Payment
                      </Button>
                    </div>
                    <div className="col-lg-6">
                      <Button
                        type="submit"
                        className=" p-2 w-100 btn btnPayLater mt-lg-0 mt-3 shadow"
                      >
                        Payment Later
                      </Button>
                    </div>
                  </div>
                </Form>
              </Col>
              <Col lg="4" className=" mb-lg-0 mb-5">
                <div className="formData ">
                  <div className="cardData">
                    <h1 className="fs">Flight Details</h1>
                    <div className="cardHeader">
                      <div className="d-flex align-items-center">
                        <img
                          src={ticket.logo}
                          alt="Logo Airplane"
                          style={{ width: "100px", height: "57px" }}
                        />
                        <p>{ticket.airlane}</p>
                      </div>
                      <div className="mt-4 ">
                        <div className="d-flex align-content-center destination">
                          <p className="ms-0 me-2 mb-0">
                            {ticket.departure_city}
                          </p>
                          <FaPlaneDeparture />
                          <p className="ms-2 mb-0">{ticket.destination_city}</p>
                        </div>
                        <div className="d-flex date ">
                          <p className="ms-0">
                            {timeLocal(ticket.deptime).format(
                              "dddd, DD MMMM YYYY "
                            )}
                          </p>
                          <ul>
                            <li>
                              {timeLocal(ticket.arrivedTime).format("LT")} - {timeLocal(ticket.deptime).format("LT")}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <ul className="fitur">
                        <li>Refundable</li>
                        <li>Can reschedule</li>
                      </ul>
                      <hr />
                      <div className="d-flex pt-3 pb-3 payment">
                        <div className="w-50">Total Payment</div>
                        <div className="w-50 d-flex justify-content-center">
                          <CurrencyFormat
                            value={ticket.price}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$ "}
                            renderText={(value) => <p>{value},00</p>}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Flight;
