/* eslint-disable array-callback-return */
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Container, Row, Col } from "reactstrap";
import "../css/dashboard.css";
import axios from "axios";
import { FaRegUser, FaTicketAlt, FaPlaneDeparture } from "react-icons/fa";
import { API_URL, Token } from "../utils/constants";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import moment from 'moment'

function App() {
  const token = localStorage.getItem("token");
  const [totalUser, settotalUser] = useState([]);
  const [listAdmin, setListAdmin] = useState([])
  const [transaction, setTransaction] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [country, setCountry] = useState([]);
  const [insTicket, setInsTicket] = useState({
      logo: "",
      airlane: "",
      from_id: "1",
      destination_id: "1",
      depTime: "",
      arrivedTime: "",
      price: "",
      class: "1",
      transit: "1",
      wifi: "0",
      meal: "0",
      luggage: "0",
      codeAirplane: "",
  });
  const [insAdmin, setInsAdmin] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [insCountry, setInsCountry] = useState({
    town: "",
    country: "",
  });
  const headers = {
    headers: {
      token: Token,
    },
  };

  // toggle button
  // add button modal
  const [modaladdadmin, setModaladdadmin] = useState(false);
  const toggleaddadmin = () => setModaladdadmin(!modaladdadmin);
  const [modaladdflight, setModaladdflight] = useState(false);
  const toggleaddflight = () => setModaladdflight(!modaladdflight);
  const [modaladdcountry, setModaladdcountry] = useState(false);
  const toggleaddcountry = () => setModaladdcountry(!modaladdcountry);
  // edit button modal
  const [modaleditadmin, setModaleditadmin] = useState(false);
  const toggleeditadmin = () => setModaleditadmin(!modaleditadmin);

  const [modaleditflight, setModaleditflight] = useState(false);
  const toggleeditflight = () => setModaleditflight(!modaleditflight);
  const [modaleditcountry, setModaleditcountry] = useState(false);
  const toggleeditcountry = () => setModaleditcountry(!modaleditcountry);
  const getUsers = () => {
    axios
      .get(`${API_URL}users`, headers)
      .then((response) => {
        let data = response.data.data.users
        
        let dataAdmin = data.filter(x => x.admin === 0)
        let dataUser = data.filter(x => x.admin === 1)
        // console.log(dataAdmin)
        settotalUser(dataUser);
        setListAdmin(dataAdmin)
      })
      .catch((err) => {
        alert(`${err.message} Internal Server Error
            Please Call WebAdmin in 021-082`);
      });
  };
  const addUser = (e) => {
    e.preventDefault();
    
    axios
      .post(
        `${API_URL}register`,
        {
          username: insAdmin.username,
          email: insAdmin.email,
          password: insAdmin.password,
          admin: 0,
        },
        headers
      )
      .then((response) => {
        alert(`${response.statusText} Successfull Add New Data`);
        toggleaddadmin();
        getUsers();
      })
      .catch((err) => {
        alert(err);
      });
  };
  const getUpdId = (idupd) => {
    localStorage.setItem("idAdmin", idupd);
    getDetailUser(idupd);
    toggleeditadmin();
  };
  const dataAdmin = localStorage.getItem("idAdmin");
  const idAdmin = parseInt(dataAdmin);
  const getDetailUser = (id) => {
    axios
      .get(`${API_URL}users/${id}`, headers)
      .then((response) => {
        const detailUser = response.data.data;
        
        // eslint-disable-next-line array-callback-return
        detailUser.map((e) => {
          setInsAdmin({
            username: e.username,
            email: e.email,
            phone: e.phone,
          });
        });
      })
      .catch((err) => {
        // console.log(err)
        alert(`${err.message} Internal Server Error
            Please Call WebAdmin in 021-082`);
      });
  };
  const updUser = (e) => {
    e.preventDefault();
    const body = {
      username: insAdmin.username,
      email: insAdmin.email,
      password: insAdmin.password,
      phone: "123",
      address: "",
      photoProfile: "https://th.bing.com/th/id/OIP.1LRUIB2OXVePxD5hQm4fqwHaHa?w=184&h=184&c=7&r=0&o=5&pid=1.7",
      creditCard: "0",
      admin: "0",
    }
    
    axios
      .put(
        `${API_URL}users/${idAdmin}`, body,
        {headers: {token: 1234}}
      )
      .then((response) => {
        
        alert(`${response.statusText} Successfull Update Data`);
        toggleeditadmin();
        getUsers();
      })
      .catch((err) => {
        alert(err);
      });
  };
  const deleteUser = (id) => {
    axios
      .delete(`${API_URL}users/${id}`, headers)
      .then((response) => {
        alert(`data berhasil dihapus`);
        getUsers();
      })
      .catch((err) => {
        alert(err);
      });
  };
  const getTransaction = () => {
    axios
      .get(`${API_URL}transaction`, headers)
      .then((response) => {
        setTransaction(response.data.data.transaction);
      })
      .catch((err) => {
        alert(`${err.message} Internal Server Error
            Please Call WebAdmin in 021-082`);
      });
  };
  const getTicket = () => {
    axios
      .get(`${API_URL}ticket`, headers)
      .then((response) => {
        setTicket(response.data.data.ticket);
      })
      .catch((err) => {
        alert(`${err.message} Internal Server Error
            Please Call WebAdmin in 021-082`);
      });
  };
  const deleteTicket = (id) => {
    axios
      .delete(`${API_URL}ticket/${id}`, headers)
      .then(getTicket())
      .catch((err) => {
        alert(err);
      });
  };
  const addTicket = (e) => {
    e.preventDefault();
    
    const body = {
      logo: insTicket.logo,
      airlane: insTicket.airlane,
      from_id: insTicket.from_id,
      destination_id: insTicket.destination_id,
      depTime: insTicket.depTime,
      arrivedTime: insTicket.arrivedTime,
      price: insTicket.price,
      class: insTicket.class,
      transit: insTicket.transit,
      wifi: insTicket.wifi,
      meal: insTicket.meal,
      luggage: insTicket.luggage,
      codeAirplane: insTicket.codeAirplane,
    };
    console.log(body)
    axios
      .post(`${API_URL}ticket`, body, headers)
      .then((response) => {
        console.log(response)
        // alert(`${response.statusText} Successfull Add New Data`);
        getTicket();
        toggleaddflight();
      })
      .catch((err) => {
        alert(err);
      });
  };
  const getIdTicket = (id) => {
    localStorage.setItem("idticket", id);
    getDetailTicket(id);
    toggleeditflight();
  };
  const dataTicket = localStorage.getItem("idticket");
  const idTicket = parseInt(dataTicket);
  const getDetailTicket = (id) => {
    axios
      .get(`${API_URL}ticket/${id}`, headers)
      .then((response) => {
        const detailTicket = response.data.data;
        
        // eslint-disable-next-line array-callback-return
        detailTicket.map((e) => {
          setInsTicket({
            logo: e.logo,
            airlane: e.airlane,
            from_id: e.from_id,
            destination_id: e.destination_id,
            depTime: e.depTime,
            arrivedTime: e.arrivedTime,
            price: e.price,
            class: e.class,
            transit: e.transit,
            wifi: e.wifi,
            meal: e.meal,
            luggage: e.luggage,
            codeAirplane: e.codeAirplane,
          });
        });
      })
      .catch((err) => {
        alert(`${err.message} Internal Server Error
            Please Call WebAdmin in 021-082`);
      });
  };
  const editTicket = (e) => {
    e.preventDefault();
    const body = {
      logo: insTicket.logo,
      airlane: insTicket.airlane,
      from_id: insTicket.from_id,
      destination_id: insTicket.destination_id,
      depTime: insTicket.depTime,
      arrivedTime: insTicket.arrivedTime,
      price: insTicket.price,
      class: insTicket.class,
      transit: insTicket.transit,
      wifi: insTicket.wifi,
      meal: insTicket.meal,
      luggage: insTicket.luggage,
      codeAirplane: insTicket.codeAirplane,
    };
    
    axios
      .put(`${API_URL}ticket/${idTicket}`, body, {headers: {token: Token}})
      .then((response) => {
        console.log(response)
        alert(`${response.statusText} Successfull Update Data`);
        getTicket()
        toggleeditflight();
      })
      .catch((err) => {
        alert(err);
      });
  };
  const getCountry = () => {
    axios
      .get(`${API_URL}country`, headers)
      .then((response) => {
        setCountry(response.data.data.country);
      })
      .catch((err) => {
        alert(`${err.message} Internal Server Error
            Please Call WebAdmin in 021-082`);
      });
  };
  const getIdCountry = (id) => {
    localStorage.setItem("idcountry", id);
    getDetailCountry(id);
    toggleeditcountry();
  };
  const dataNation = localStorage.getItem("idcountry");
  const idNation = parseInt(dataNation);
  const getDetailCountry = (id) => {
    axios
      .get(`${API_URL}country/${id}`, headers)
      .then((response) => {
        const detailCountry = response.data.data;
        
        // eslint-disable-next-line array-callback-return
        detailCountry.map((e) => {
          setInsCountry({
            town: e.town,
            country: e.country,
          });
        });
      })
      .catch((err) => {
        alert(`${err.message} Internal Server Error
            Please Call WebAdmin in 021-082`);
      });
  };
  const editCountry = (e) => {
    e.preventDefault();
    axios
      .put(
        `${API_URL}country/${idNation}`,
        {
          town: insCountry.town,
          country: insCountry.country,
        },
        headers
      )
      .then((response) => {
        alert(`${response.statusText} Successfull Update Data`);
        toggleeditcountry();
        getCountry();
      })
      .catch((err) => {
        alert(err);
      });
  };
  const addCountry = (e) => {
    e.preventDefault();
    
    axios
      .post(
        `${API_URL}country`,
        {
          town: insCountry.town,
          country: insCountry.country,
        },
        headers
      )
      .then((response) => {
        alert(`${response.statusText} Successfull Add New Data`);
        toggleaddcountry();
        getCountry();
      })
      .catch((err) => {
        alert(err);
      });
  };
  const deleteCountry = (id) => {
    axios
      .delete(`${API_URL}country/${id}`, headers)
      .then(getCountry())
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    getUsers();
    getDetailUser();
    getTransaction();
    getTicket();
    getCountry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar token={token} />
      <div>
        <Container className="mt-lg-3">
          <div className="d-flex justify-content-center">
            <div className="green shadow col-lg-4 col-4 card1 m-2">
              <Row>
                <Col sm="6" className="title w-50">
                  <h1>{totalUser.length}</h1>
                  <p>Total Users</p>
                </Col>
                <Col sm="6" className="d-flex justify-content-center">
                  <FaRegUser className="icon d-lg-block d-none" />
                </Col>
              </Row>
            </div>
            <div className="blue shadow col-4 card1 m-2">
              <Row>
                <Col sm="6" className="title w-50">
                  <h1>{transaction.length}</h1>
                  <p>Total Transaction</p>
                </Col>
                <Col sm="6" className="d-flex justify-content-center">
                  <FaTicketAlt className="icon d-lg-block d-none" id="m22" />
                </Col>
              </Row>
            </div>
            <div className="red shadow col-4 card1 m-2">
              <Row>
                <Col sm="6" className="title w-50">
                  <h1>{ticket.length}</h1>
                  <p>Number of Flight</p>
                </Col>
                <Col sm="6" className="d-flex justify-content-center">
                  <FaPlaneDeparture className="icon d-lg-block d-none" id="m22" />
                </Col>
              </Row>
            </div>
          </div>
          <div className="tbllistFlight mt-3">
            <h2 className="fw-bold m-3">List Flight</h2>
            <div className="table-responsive tblScroll ">
              <Button
                className="btn btn-success mb-3 ms-3 fs-15"
                onClick={toggleaddflight}
              >
                Add New Flight
              </Button>
              {/* form add ticket */}
              <Modal isOpen={modaladdflight} toggle={toggleaddflight}>
                <ModalHeader toggle={toggleaddflight}>
                  Add New Flight
                </ModalHeader>
                <ModalBody>
                  <form>
                    <div class="form-group">
                      <label for="InputLogo">Logo</label>
                      <input
                        name="logo"
                        type="text"
                        class="form-control"
                        placeholder="Enter Logo Src"
                        onChange={(e) =>
                          setInsTicket({ ...insTicket, logo: e.target.value })
                        }
                      />
                    </div>
                    <div class="form-group">
                      <label for="airlane">airlane</label>
                      <input
                        name="airlane"
                        type="text"
                        class="form-control"
                        placeholder="airlane"
                        onChange={(e) =>
                          setInsTicket({
                            ...insTicket,
                            airlane: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div class="form-group">
                      <label for="from_id">from_id</label>
                      <select
                        name="from_id"
                        class="form-control"
                        onChange={(e) =>
                          setInsTicket({
                            ...insTicket,
                            from_id: e.target.value,
                          })
                        }
                      >
                        {country.map((e) => {
                          return <option value={e.id_country}>{e.town}</option>;
                        })}
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="destination_id">destination_id</label>
                      <select
                        name="destination_id"
                        class="form-control"
                        onChange={(e) =>
                          setInsTicket({
                            ...insTicket,
                            destination_id: e.target.value,
                          })
                        }
                      >
                        {country.map((e) => {
                          return <option value={e.id_country}>{e.town}</option>;
                        })}
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="depTime">depTime</label>
                      <input
                        name="depTime"
                        type="datetime-local"
                        class="form-control"
                        placeholder="depTime"
                        onChange={(e) =>
                          setInsTicket({
                            ...insTicket,
                            depTime: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div class="form-group">
                      <label for="arrivedTime">arrivedTime</label>
                      <input
                        name="arrivedTime"
                        type="datetime-local"
                        class="form-control"
                        placeholder="arrivedTime"
                        onChange={(e) =>
                          setInsTicket({
                            ...insTicket,
                            arrivedTime: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div class="form-group">
                      <label for="price">price</label>
                      <input
                        name="price"
                        type="number"
                        class="form-control"
                        placeholder="price"
                        onChange={(e) =>
                          setInsTicket({ ...insTicket, price: e.target.value })
                        }
                      />
                    </div>
                    <div class="form-group">
                      <label for="class">class</label>
                      <select
                        onChange={(e) =>
                          setInsTicket({ ...insTicket, class: e.target.value })
                        }
                        name="class"
                        class="form-control"
                      >
                        <option value="Economy">Economy</option>
                        <option value="Business">Business</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="transit">transit</label>
                      <select
                        onChange={(e) =>
                          setInsTicket({
                            ...insTicket,
                            transit: e.target.value,
                          })
                        }
                        name="transit"
                        class="form-control"
                      >
                        <option value="Transit">Transit</option>
                        <option value="Direct">Direct</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="wifi">wifi</label>
                      <select
                        name="wifi"
                        class="form-control"
                        onChange={(e) =>
                          setInsTicket({ ...insTicket, wifi: e.target.value })
                        }
                      >
                        <option value="0">Yes</option>
                        <option value="1">No</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="meal">Meal</label>
                      <select
                        name="meal"
                        class="form-control"
                        onChange={(e) =>
                          setInsTicket({ ...insTicket, meal: e.target.value })
                        }
                      >
                        <option value="0">Yes</option>
                        <option value="1">No</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="luggage">Luggage</label>
                      <select
                        name="luggage"
                        class="form-control"
                        onChange={(e) =>
                          setInsTicket({
                            ...insTicket,
                            luggage: e.target.value,
                          })
                        }
                      >
                        <option value="0">Yes</option>
                        <option value="1">No</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="codeAirplane">Code Airplane</label>
                      <input
                        name="codeAirplane"
                        type="Text"
                        class="form-control"
                        placeholder="Code Airplane"
                        onChange={(e) =>
                          setInsTicket({
                            ...insTicket,
                            codeAirplane: e.target.value,
                          })
                        }
                      />
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" color="primary" onClick={addTicket}>
                    Submit
                  </Button>{" "}
                  <Button color="secondary" onClick={toggleaddflight}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
              <Table bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Logo</th>
                    <th>Airlane</th>
                    <th>Departure City</th>
                    <th>Departure Country</th>
                    <th>Destination City</th>
                    <th>Destination Country</th>
                    <th>Deptime</th>
                    <th>Arrived Time</th>
                    <th>Price</th>
                    <th>Class</th>
                    <th>Transit</th>
                    <th>Wifi</th>
                    <th>Meal</th>
                    <th>Luggage</th>
                    <th>Delete</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {ticket.map((e, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>
                          <img src={e.logo} alt="" />
                        </td>
                        <td className="width">{e.airlane}</td>
                        <td>{e.departure_city}</td>
                        <td>{e.departure_country}</td>
                        <td>{e.destination_city}</td>
                        <td>{e.destination_country}</td>
                        <td>{moment(e.deptime).format("DD-MM-YYYY HH:mm")}</td>
                        <td>{moment(e.arrivedTime).format("DD-MM-YYYY HH:mm")}</td>
                        <td>{e.price}</td>
                        <td>{e.class}</td>
                        <td>{e.transit}</td>
                        <td>{e.wifi === 0 ? "Yes" : "No"}</td>
                        <td>{e.meal === 0 ? "Yes" : "No"}</td>
                        <td>{e.luggage === 0 ? "Yes" : "No"}</td>
                        <td>
                          <button
                            onClick={() => deleteTicket(e.id_ticket)}
                            className="remove"
                          >
                            -
                          </button>
                        </td>
                        <td>
                          <Button
                            className="btn btn-success mb-3 ms-3 fs-15"
                            onClick={() => getIdTicket(e.id_ticket)}
                          >
                            Edit
                          </Button>
                          {/* form Edit flight */}
                          <Modal
                            isOpen={modaleditflight}
                            toggle={toggleeditflight}
                          >
                            <ModalHeader toggle={toggleeditflight}>
                              Edit Flight
                            </ModalHeader>
                            <ModalBody>
                              <form>
                                <div class="form-group">
                                  <label for="InputLogo">Logo</label>
                                  <input
                                    name="logo"
                                    type="text"
                                    class="form-control"
                                    value={insTicket.logo}
                                    placeholder="Enter Logo Src"
                                    onChange={(e) =>
                                      setInsTicket({
                                        ...insTicket,
                                        logo: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div class="form-group">
                                  <label for="airlane">airlane</label>
                                  <input
                                    name="airlane"
                                    type="text"
                                    class="form-control"
                                    value={insTicket.airlane}
                                    placeholder="airlane"
                                    onChange={(e) =>
                                      setInsTicket({
                                        ...insTicket,
                                        airlane: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div class="form-group">
                                  <label for="from_id">from</label>
                                  <select
                                    value={insTicket.from_id}
                                    name="from_id"
                                    class="form-control"
                                    onChange={(e) =>
                                      setInsTicket({
                                        ...insTicket,
                                        from_id: e.target.value,
                                      })
                                    }
                                  >
                                    {country.map((e) => {
                                      return (
                                        <option value={e.id_country}>
                                          {e.town}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                                <div class="form-group">
                                  <label for="destination_id">
                                    destination
                                  </label>
                                  <select
                                    value={insTicket.destination_id}
                                    name="destination_id"
                                    class="form-control"
                                    onChange={(e) =>
                                      setInsTicket({
                                        ...insTicket,
                                        destination_id: e.target.value,
                                      })
                                    }
                                  >
                                    {country.map((e) => {
                                      return (
                                        <option value={e.id_country}>
                                          {e.town}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                                <div class="form-group">
                                  <label for="depTime">depTime</label>
                                  <input
                                    name="depTime"
                                    type="datetime-local"
                                    class="form-control"
                                    value={insTicket.depTime}
                                    placeholder="depTime"
                                    onChange={(e) =>
                                      setInsTicket({
                                        ...insTicket,
                                        depTime: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div class="form-group">
                                  <label for="arrivedTime">arrivedTime</label>
                                  <input
                                    name="arrivedTime"
                                    type="datetime-local"
                                    class="form-control"
                                    value={insTicket.arrivedTime}
                                    placeholder="arrivedTime"
                                    onChange={(e) =>
                                      setInsTicket({
                                        ...insTicket,
                                        arrivedTime: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div class="form-group">
                                  <label for="price">price</label>
                                  <input
                                    name="price"
                                    type="number"
                                    class="form-control"
                                    value={insTicket.price}
                                    placeholder="price"
                                    onChange={(e) =>
                                      setInsTicket({
                                        ...insTicket,
                                        price: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div class="form-group">
                                  <label for="class">class</label>
                                  <select
                                    value={insTicket.class}
                                    onChange={(e) =>
                                      setInsTicket({
                                        ...insTicket,
                                        class: e.target.value,
                                      })
                                    }
                                    name="class"
                                    class="form-control"
                                  >
                                    <option value="Economy">Economy</option>
                                    <option value="Business">Business</option>
                                  </select>
                                </div>
                                <div class="form-group">
                                  <label for="transit">transit</label>
                                  <select
                                    value={insTicket.transit}
                                    onChange={(e) =>
                                      setInsTicket({
                                        ...insTicket,
                                        transit: e.target.value,
                                      })
                                    }
                                    name="transit"
                                    class="form-control"
                                  >
                                    <option value="Transit">Transit</option>
                                    <option value="Direct">Direct</option>
                                  </select>
                                </div>
                                <div class="form-group">
                                  <label for="wifi">wifi</label>
                                  <select
                                    value={insTicket.wifi}
                                    name="wifi"
                                    class="form-control"
                                    onChange={(e) =>
                                      setInsTicket({
                                        ...insTicket,
                                        wifi: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="0">Yes</option>
                                    <option value="1">No</option>
                                  </select>
                                </div>
                                <div class="form-group">
                                  <label for="meal">meal</label>
                                  <select
                                    value={insTicket.meal}
                                    name="meal"
                                    class="form-control"
                                    onChange={(e) =>
                                      setInsTicket({
                                        ...insTicket,
                                        meal: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="0">Yes</option>
                                    <option value="1">No</option>
                                  </select>
                                </div>
                                <div class="form-group">
                                  <label for="luggage">luggage</label>
                                  <select
                                    value={insTicket.luggage}
                                    name="luggage"
                                    class="form-control"
                                    onChange={(e) =>
                                      setInsTicket({
                                        ...insTicket,
                                        luggage: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="0">Yes</option>
                                    <option value="1">No</option>
                                  </select>
                                </div>
                                <div class="form-group">
                                  <label for="codeAirplane">Code Airplane</label>
                                  <input
                                    name="codeAirplane"
                                    type="text"
                                    class="form-control"
                                    placeholder="Code Airplane"
                                    value={insTicket.codeAirplane}
                                    onChange={(e) =>
                                      setInsTicket({
                                        ...insTicket,
                                        codeAirplane: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </form>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                type="submit"
                                color="primary"
                                onClick={editTicket}
                              >
                                Submit
                              </Button>{" "}
                              <Button
                                color="secondary"
                                onClick={toggleeditflight}
                              >
                                Cancel
                              </Button>
                            </ModalFooter>
                          </Modal>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="content mt-5">
            <Row>
              <Col sm="6" className="listcountry">
                <div className="w-100 d-flex align-items-center ">
                  <h3 className="fw-bold m-3">List Country and City</h3>
                </div>
                <Button
                  className="btn btn-danger mb-3 ms-3 fs-15"
                  onClick={toggleaddcountry}
                >
                  Add New Country
                </Button>
                <Modal isOpen={modaladdcountry} toggle={toggleaddcountry}>
                  <ModalHeader toggle={toggleaddcountry}>
                    Add New Country
                  </ModalHeader>
                  <ModalBody>
                    <form>
                      <div class="form-group">
                        <label for="town">town</label>
                        <input
                          name="town"
                          type="text"
                          class="form-control"
                          placeholder="Enter town"
                          onChange={(e) =>
                            setInsCountry({
                              ...insCountry,
                              town: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div class="form-group">
                        <label for="country">country</label>
                        <input
                          name="country"
                          type="text"
                          class="form-control"
                          placeholder="Enter country"
                          onChange={(e) =>
                            setInsCountry({
                              ...insCountry,
                              country: e.target.value,
                            })
                          }
                        />
                      </div>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button type="submit" color="primary" onClick={addCountry}>
                      Submit
                    </Button>{" "}
                    <Button color="secondary" onClick={toggleaddcountry}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
                <Table className="tablecountry" responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>City</th>
                      <th>Country</th>
                      <th>Delete</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {country.map((e, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>{e.town}</td>
                          <td>{e.country}</td>
                          <td>
                            <button
                              onClick={() => deleteCountry(e.id_country)}
                              className="remove"
                            >
                              -
                            </button>
                          </td>
                          <td>
                            <Button
                              className="btn btn-danger fs-15"
                              id="btncountry"
                              onClick={() => getIdCountry(e.id_country)}
                            >
                              Edit
                            </Button>
                            <Modal
                              isOpen={modaleditcountry}
                              toggle={toggleeditcountry}
                            >
                              <ModalHeader toggle={toggleeditcountry}>
                                Edit Country
                              </ModalHeader>
                              <ModalBody>
                                <form>
                                  <div class="form-group">
                                    <label for="town">town</label>
                                    <input
                                      name="town"
                                      type="text"
                                      class="form-control"
                                      placeholder="Enter town"
                                      value={insCountry.town}
                                      onChange={(e) =>
                                        setInsCountry({
                                          ...insCountry,
                                          town: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div class="form-group">
                                    <label for="country">country</label>
                                    <input
                                      name="country"
                                      type="text"
                                      class="form-control"
                                      value={insCountry.country}
                                      placeholder="Enter country"
                                      onChange={(e) =>
                                        setInsCountry({
                                          ...insCountry,
                                          country: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </form>
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  type="submit"
                                  color="primary"
                                  onClick={editCountry}
                                >
                                  Submit
                                </Button>{" "}
                                <Button
                                  color="secondary"
                                  onClick={toggleeditcountry}
                                >
                                  Cancel
                                </Button>
                              </ModalFooter>
                            </Modal>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Col>
              <Col sm="6" className="listadmin">
                <div className="w-100 d-flex justify-content-center">
                  <h3 className="fw-bold m-3">List Admin</h3>
                </div>
                <Button
                  className="btn btn-danger fs-15"
                  id="btnadmin"
                  onClick={toggleaddadmin}
                >
                  Add New Admin
                </Button>
                <Modal isOpen={modaladdadmin} toggle={toggleaddadmin}>
                  <ModalHeader toggle={toggleaddadmin}>
                    Add New Admin
                  </ModalHeader>
                  <ModalBody>
                    <form>
                      <div class="form-group">
                        <label for="username">name</label>
                        <input
                          name="username"
                          type="text"
                          class="form-control"
                          placeholder="Enter name"
                          onChange={(e) =>
                            setInsAdmin({
                              ...insAdmin,
                              username: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div class="form-group">
                        <label for="email">email</label>
                        <input
                          name="email"
                          type="email"
                          class="form-control"
                          placeholder="email"
                          onChange={(e) =>
                            setInsAdmin({ ...insAdmin, email: e.target.value })
                          }
                        />
                      </div>
                      <div class="form-group">
                        <label for="password">password</label>
                        <input
                          name="password"
                          type="password"
                          class="form-control"
                          placeholder="password"
                          onChange={(e) =>
                            setInsAdmin({
                              ...insAdmin,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button type="submit" color="primary" onClick={addUser}>
                      Submit
                    </Button>{" "}
                    <Button color="secondary" onClick={toggleaddadmin}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
                <div className="table-responsive" id="tbl3">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Delete</th>
                        <th>Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listAdmin.map((e, i) => {
                          return (
                            <tr key={i}>
                              <th scope="row">{i + 1}</th>
                              <td>{e.username}</td>
                              <td>{e.email}</td>
                              <td>
                                <button
                                  onClick={() => deleteUser(e.id_users)}
                                  className="remove"
                                >
                                  -
                                </button>
                              </td>
                              <td>
                                <Button
                                  className="btn btn-danger mb-3 ms-3 fs-15"
                                  onClick={() => getUpdId(e.id_users)}
                                >
                                  Edit
                                </Button>
                                <Modal
                                  isOpen={modaleditadmin}
                                  toggle={toggleeditadmin}
                                >
                                  <ModalHeader toggle={toggleeditadmin}>
                                    Edit Admin
                                  </ModalHeader>
                                  <ModalBody>
                                    <form>
                                      <div class="form-group">
                                        <label for="username">name</label>
                                        <input
                                          name="username"
                                          type="text"
                                          class="form-control"
                                          placeholder="Enter name"
                                          value={insAdmin.username}
                                          onChange={(e) =>
                                            setInsAdmin({
                                              ...insAdmin,
                                              username: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                      <div class="form-group">
                                        <label for="email">email</label>
                                        <input
                                          name="email"
                                          type="email"
                                          class="form-control"
                                          placeholder="email"
                                          value={insAdmin.email}
                                          onChange={(e) =>
                                            setInsAdmin({
                                              ...insAdmin,
                                              email: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                      <div class="form-group">
                                        <label for="password">password</label>
                                        <input
                                          name="password"
                                          type="password"
                                          class="form-control"
                                          placeholder="password"
                                          onChange={(e) =>
                                            setInsAdmin({
                                              ...insAdmin,
                                              password: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                    </form>
                                  </ModalBody>
                                  <ModalFooter>
                                    <Button
                                      type="submit"
                                      color="primary"
                                      onClick={updUser}
                                    >
                                      Submit
                                    </Button>{" "}
                                    <Button
                                      color="secondary"
                                      onClick={toggleeditadmin}
                                    >
                                      Cancel
                                    </Button>
                                  </ModalFooter>
                                </Modal>
                              </td>
                            </tr>
                          );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default App;
