/* eslint-disable array-callback-return */
import { useState, useEffect } from "react";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Container, Row, Col }  from 'reactstrap'
import '../css/dashboard.css'
import axios from "axios";
import { FaRegUser, FaTicketAlt, FaPlaneDeparture } from "react-icons/fa";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

function App() {
  const [totalUser, settotalUser] = useState([])
  const [transaction,setTransaction] = useState([])
  const [ticket, setTicket] = useState([]);
  const [country,setCountry] = useState([])
  const [insTicket, setInstTicket]= useState({
    logo: "",
    airlane: "",
    from_id: "",
    destination_id: "",
    depTime: "",
    arrivedTime: "",
    price: "",
    class: "",
    transit: "",
    wifi: "",
    meal: "",
    luggage: "",
    codeAirplane: ""
  })
  const [insAdmin, setInsAdmin]= useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    photoProfile: "",
    creditCard: "",
    admin: ""
  })
  const [insCountry, setInsCountry]= useState({
    town: "",
    country: ""
  })
  const headers = {
    headers: {
      token: 1234,
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
  const getUsers = ()=>{
    axios.get("http://localhost:8000/users",headers)
      .then((response) => {
        settotalUser(response.data.data.users);
      })
      .catch((err) => {
        alert(`${err.message} Internal Server Error
            Please Call WebAdmin in 021-082`);
      });
  }
  const addUser=(e)=>{
    e.preventDefault()
    console.log(insAdmin)
    axios
      .post(`http://localhost:8000/users`, {
        username: insAdmin.username,
        email:insAdmin.email,
        password: insAdmin.password,
        phone: insAdmin.phone,
        address: insAdmin.address,
        photoProfile: insAdmin.photoProfile,
        creditCard: insAdmin.creditCard,
        admin: insAdmin.admin
      }, headers)
      .then((response)=>{
        alert(`${response.statusText} Successfull Add New Data`)
        toggleaddadmin()
        getUsers()
      })
      .catch((err)=>{
        alert(err)
      })
  }
  const getUpdId =(idupd)=>{
    localStorage.setItem('id', idupd)
    toggleeditadmin()
  }
  const data = localStorage.getItem('id')
  const id = parseInt(data)

  const updUser=(e)=>{
    e.preventDefault()
    axios.put(`http://localhost:8000/users/${id}`, {
      username: insAdmin.username,
      email:insAdmin.email,
      password: insAdmin.password,
      phone: insAdmin.phone,
      address: insAdmin.address,
      photoProfile: insAdmin.photoProfile,
      creditCard: insAdmin.creditCard,
      admin: insAdmin.admin
    }, headers)
    .then((response)=>{
      alert(`${response.statusText} Successfull Update Data`)
      toggleeditadmin()
      getUsers()
    })
    .catch((err)=>{
      alert(err)
    })
  }
  const deleteUser=(id)=>{
    axios.delete(`http://localhost:8000/users/${id}`,headers)
    .then((response)=>{
      alert(`data berhasil dihapus`)
      getUsers()
    })
    .catch((err)=>{
      alert(err)
    })
  };
  const getTransaction = () => {
    axios
      .get("http://localhost:8000/transaction", headers)
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
      .get("http://localhost:8000/ticket", headers)
      .then((response) => {
        setTicket(response.data.data.ticket);
      })
      .catch((err) => {
        alert(`${err.message} Internal Server Error
            Please Call WebAdmin in 021-082`);
      });
  };
  const deleteTicket=(id)=>{
    axios.delete(`http://localhost:8000/ticket/${id}`,headers)
    .then(getTicket())
    .catch((err)=>{
      alert(err)
    })
  };
  const addTicket=(e)=>{
    e.preventDefault()
    console.log(insTicket)
    axios
      .post(`http://localhost:8000/ticket`, {
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
        codeAirplane: insTicket.codeAirplane
      }, headers)
      .then((response)=>{
        alert(`${response.statusText} Successfull Add New Data`)
      })
      .catch((err)=>{
        alert(err)
      })
  }
  const getCountry = () => {
    axios
      .get("http://localhost:8000/country", headers)
      .then((response) => {
        setCountry(response.data.data.country);
      })
      .catch((err) => {
        alert(`${err.message} Internal Server Error
            Please Call WebAdmin in 021-082`);
      });
  };
  const getIdCountry =(id)=>{
    localStorage.setItem('idcountry', id)
    toggleeditcountry()
  }
  const dataNation = localStorage.getItem('idcountry')
  const idNation = parseInt(dataNation)
  const editCountry=(e)=>{
    e.preventDefault()
    axios.put(`http://localhost:8000/country/${idNation}`, {
      town: insCountry.town,
      country: insCountry.country
    }, headers)
    .then((response)=>{
      alert(`${response.statusText} Successfull Update Data`)
      toggleeditcountry()
      getCountry()
    })
    .catch((err)=>{
      alert(err)
    })
  }
  const addCountry=(e)=>{
    e.preventDefault()
    console.log(insCountry)
    axios
      .post(`http://localhost:8000/country`, {
        town: insCountry.town,
        country: insCountry.country
      }, headers)
      .then((response)=>{
        alert(`${response.statusText} Successfull Add New Data`)
        toggleaddcountry()
        getCountry()
      })
      .catch((err)=>{
        alert(err)
      })
  }
  const deleteCountry=(id)=>{
    axios.delete(`http://localhost:8000/country/${id}`,headers)
    .then(getCountry())
    .catch((err)=>{
      alert(err)
    })
  }
  useEffect(() => {
    getUsers();
    getTransaction();
    getTicket();
    getCountry();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      <Navbar />
      <div>
        <Container>
          <div className="d-flex justify-content-center">
            <div className="green shadow w-25 card m-2">
              <Row>
                <Col sm="6" className="title w-50">
                  <h1>{totalUser.length}</h1>
                  <p>Total Users</p>
                </Col>
                <Col sm="6" className="d-flex justify-content-center">
                  <FaRegUser className="icon" />
                </Col>
              </Row>
            </div>
            <div className="blue shadow w-25 card m-2">
              <Row>
                <Col sm="6" className="title w-50">
                  <h1>{transaction.length}</h1>
                  <p>Total Transaction</p>
                </Col>
                <Col sm="6" className="d-flex justify-content-center">
                  <FaTicketAlt className="icon" />
                </Col>
              </Row>
            </div>
            <div className="red shadow w-25 card m-2">
              <Row>
                <Col sm="6" className="title w-50">
                  <h1>{ticket.length}</h1>
                  <p>Number of Flight</p>
                </Col>
                <Col sm="6" className="d-flex justify-content-center">
                  <FaPlaneDeparture className="icon" />
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
              <Modal isOpen={modaladdflight} toggle={toggleaddflight}>
                <ModalHeader toggle={toggleaddflight}>Modal title</ModalHeader>
                <ModalBody>
                <form onSubmit={addTicket}>
                  <div class="form-group">
                    <label for="InputLogo">Logo</label>
                    <input name="Logo" type="text" class="form-control" placeholder="Enter Logo Src" onChange={(e)=>setInstTicket({...insTicket, logo: e.target.value})}/>
                  </div>
                  <div class="form-group">
                    <label for="airlane">airlane</label>
                    <input name="airlane" type="text" class="form-control" placeholder="airlane" onChange={(e)=>setInstTicket({...insTicket, airlane: e.target.value})}/>
                  </div>
                  <div class="form-group">
                    <label for="from_id">from_id</label>
                    <select name="from_id" class="form-control" onChange={(e)=>setInstTicket({...insTicket, form_id: e.target.value})}>{country.map((e)=>{return(<option value={e.id}>{e.town}</option>)})}</select>
                  </div>
                  <div class="form-group">
                    <label for="destination_id">destination_id</label>
                    <select name="destination_id" class="form-control" onChange={(e)=>setInstTicket({...insTicket, destination_id: e.target.value})}>{country.map((e)=>{return(<option value={e.id}>{e.town}</option>)})}</select>
                  </div>
                  <div class="form-group">
                    <label for="depTime">depTime</label>
                    <input name="depTime" type="datetime-local" class="form-control" placeholder="depTime" onChange={(e)=>setInstTicket({...insTicket, depTime: e.target.value})}/>
                  </div>
                  <div class="form-group">
                    <label for="arrivedTime">arrivedTime</label>
                    <input name="arrivedTime" type="datetime-local" class="form-control" placeholder="arrivedTime" onChange={(e)=>setInstTicket({...insTicket, arrivedTime: e.target.value})}/>
                  </div>
                  <div class="form-group">
                    <label for="price">price</label>
                    <input name="price" type="number" class="form-control" placeholder="price" onChange={(e)=>setInstTicket({...insTicket, price: e.target.value})}/>
                  </div>
                  <div class="form-group">
                    <label for="class">class</label>
                    <select onChange={(e)=>setInstTicket({...insTicket, class: e.target.value})} name="class" class="form-control">
                      <option value="Economy">Economy</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="transit">transit</label>
                    <select onChange={(e)=>setInstTicket({...insTicket, transit: e.target.value})} name="transit" class="form-control">
                      <option value="Transit">Transit</option>
                      <option value="Direct">Direct</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="wifi">wifi</label>
                    <select name="wifi" class="form-control" onChange={(e)=>setInstTicket({...insTicket, wifi: e.target.value})}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="meal">meal</label>
                    <select name="meal" class="form-control" onChange={(e)=>setInstTicket({...insTicket, meal: e.target.value})}>
                    <option value="0">0</option>
                    <option value="1">1</option></select>
                  </div>
                  <div class="form-group">
                    <label for="luggage">luggage</label>
                    <select name="luggage" class="form-control" onChange={(e)=>setInstTicket({...insTicket, luggage: e.target.value})}>
                    <option value="0">0</option>
                    <option value="1">1</option></select>
                  </div>
                  <div class="form-group">
                    <label for="codeAirplane">price</label>
                    <input name="codeAirplane" type="number" class="form-control" placeholder="codeAirplane" onChange={(e)=>setInstTicket({...insTicket, codeAirplane: e.target.value})}/>
                  </div>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>{" "}
                  <Button color="secondary" onClick={toggleaddflight}>
                    Cancel
                  </Button>
                </form>
                </ModalBody>
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
                        <th scope="row">{i}</th>
                        <td>
                          <img src={e.logo} alt="" />
                        </td>
                        <td className="width">{e.airlane}</td>
                        <td>{e.departure_city}</td>
                        <td>{e.departure_country}</td>
                        <td>{e.destination_city}</td>
                        <td>{e.destination_country}</td>
                        <td>{e.deptime}</td>
                        <td>{e.arrivedTime}</td>
                        <td>{e.price}</td>
                        <td>{e.class}</td>
                        <td>{e.transit}</td>
                        <td>{e.wifi}</td>
                        <td>{e.meal}</td>
                        <td>{e.luggage}</td>
                        <td><button onClick={()=>deleteTicket(e.id_ticket)} className="remove">-</button></td>
                        {/* <td><Button className="btn btn-success mb-3 ms-3 fs-15" onClick={toggle}>Edit Flight</Button></td> */}
                      </tr>
                    );
                  })}
                  {/* <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr> */}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="content mt-5">
            <Row>
              <Col sm="4">
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
                  <ModalHeader toggle={toggleaddcountry}>Modal title</ModalHeader>
                  <ModalBody>
                  <form>
                    <div class="form-group">
                      <label for="town">town</label>
                      <input name="town" type="text" class="form-control" placeholder="Enter town" onChange={(e)=>setInsCountry({...insCountry, town: e.target.value})}/>
                    </div>
                    <div class="form-group">
                      <label for="country">country</label>
                      <input name="country" type="text" class="form-control" placeholder="Enter country" onChange={(e)=>setInsCountry({...insCountry, country: e.target.value})}/>
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
                <Table bordered>
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
                          <th scope="row">{i}</th>
                          <td>{e.town}</td>
                          <td>{e.country}</td>
                          <td><button onClick={()=>deleteCountry(e.id_country)} className="remove">-</button></td>
                          <td>
                          <Button
                            className="btn btn-danger fs-15"
                            id="btncountry"
                            onClick={()=>getIdCountry(e.id_country)}
                          >
                            Edit
                          </Button>
                            <Modal isOpen={modaleditcountry} toggle={toggleeditcountry}>
                              <ModalHeader toggle={toggleeditcountry}>Edit Country</ModalHeader>
                              <ModalBody>
                              <form>
                                <div class="form-group">
                                  <label for="town">town</label>
                                  <input name="town" type="text" class="form-control" placeholder="Enter town" onChange={(e)=>setInsCountry({...insCountry, town: e.target.value})}/>
                                </div>
                                <div class="form-group">
                                  <label for="country">country</label>
                                  <input name="country" type="text" class="form-control" placeholder="Enter country" onChange={(e)=>setInsCountry({...insCountry, country: e.target.value})}/>
                                </div>
                              </form>
                              </ModalBody>
                              <ModalFooter>
                                <Button type="submit" color="primary" onClick={editCountry}>
                                  Submit
                                </Button>{" "}
                                <Button color="secondary" onClick={toggleeditcountry}>
                                  Cancel
                                </Button>
                              </ModalFooter>
                            </Modal>
                          </td>
                        </tr>
                      );
                    })}
                    {/* <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr> */}
                  </tbody>
                </Table>
              </Col>
              <Col sm="8">
                <div className="w-100 d-flex justify-content-center">
                  <h3 className="fw-bold m-3">List Admin</h3>
                </div>
                <Button
                  className="btn btn-danger fs-15" id="btnadmin"
                  onClick={toggleaddadmin}
                >
                  Add New Admin
                </Button>
                <Modal isOpen={modaladdadmin} toggle={toggleaddadmin}>
                  <ModalHeader toggle={toggleaddadmin}>Modal title</ModalHeader>
                  <ModalBody>
                  <form onSubmit={addUser}>
                    <div class="form-group">
                      <label for="username">name</label>
                      <input name="username" type="text" class="form-control" placeholder="Enter name" onChange={(e)=>setInsAdmin({...insAdmin, username: e.target.value})}/>
                    </div>
                    <div class="form-group">
                      <label for="email">email</label>
                      <input name="email" type="email" class="form-control" placeholder="email" onChange={(e)=>setInsAdmin({...insAdmin, email: e.target.value})}/>
                    </div>
                    <div class="form-group">
                      <label for="password">password</label>
                      <input name="password" type="password" class="form-control" placeholder="password" onChange={(e)=>setInsAdmin({...insAdmin, password: e.target.value})}/>
                    </div>
                    <div class="form-group">
                      <label for="phone_number">phone_number</label>
                      <input name="phone_number" type="number" class="form-control" placeholder="phone_number" onChange={(e)=>setInsAdmin({...insAdmin, phone: e.target.value})}/>
                    </div>
                    <div class="form-group">
                      <label for="address">address</label>
                      <input name="address" type="text" class="form-control" placeholder="address" onChange={(e)=>setInsAdmin({...insAdmin, address: e.target.value})}/>
                    </div>
                    <div class="form-group">
                      <label for="photoProfile">Picture Link</label>
                      <input name="photoProfile" type="text" class="form-control" placeholder="photoProfile" onChange={(e)=>setInsAdmin({...insAdmin, photoProfile: e.target.value})}/>
                    </div>
                    <div class="form-group">
                      <label for="creditCard">creditCard</label>
                      <input name="creditCard" type="number" class="form-control" placeholder="creditCard" onChange={(e)=>setInsAdmin({...insAdmin, creditCard: e.target.value})}/>
                    </div>
                    <div class="form-group">
                    <label for="admin">status</label>
                    <select onChange={(e)=>setInsAdmin({...insAdmin, admin: e.target.value})} name="admin" class="form-control">
                      <option value="1">Users</option>
                      <option value="0">Admin</option>
                    </select>
                  </div>
                    <Button type="submit" color="primary">
                      Submit
                    </Button>{" "}
                    <Button color="secondary" onClick={toggleaddadmin}>
                      Cancel
                    </Button>
                  </form>
                  </ModalBody>
                </Modal>
                <div className="table-responsive" id="tbl3">
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Delete</th>
                        <th>Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {totalUser.map((e, i) => {
                        if (e.admin === 0) {
                          return (
                            <tr key={i}>
                              <th scope="row">{i}</th>
                              <td>{e.username}</td>
                              <td>{e.email}</td>
                              <td>{e.phone}</td>
                              <td><button onClick={()=>deleteUser(e.id_users)} className="remove">-</button></td>
                              <td>
                                <Button
                                  className="btn btn-danger mb-3 ms-3 fs-15"
                                  onClick={()=>getUpdId(e.id_users)}
                                >
                                  Update Admin
                                </Button>
                                <Modal isOpen={modaleditadmin} toggle={toggleeditadmin}>
                                  <ModalHeader toggle={toggleeditadmin}>Modal title</ModalHeader>
                                  <ModalBody>
                                  <form onSubmit={updUser}>
                                    <div class="form-group">
                                      <label for="username">name</label>
                                      <input name="username" type="text" class="form-control" placeholder="Enter name" onChange={(e)=>setInsAdmin({...insAdmin, username: e.target.value})}/>
                                    </div>
                                    <div class="form-group">
                                      <label for="email">email</label>
                                      <input name="email" type="email" class="form-control" placeholder="email" onChange={(e)=>setInsAdmin({...insAdmin, email: e.target.value})}/>
                                    </div>
                                    <div class="form-group">
                                      <label for="password">password</label>
                                      <input name="password" type="password" class="form-control" placeholder="password" onChange={(e)=>setInsAdmin({...insAdmin, password: e.target.value})}/>
                                    </div>
                                    <div class="form-group">
                                      <label for="phone_number">phone_number</label>
                                      <input name="phone_number" type="number" class="form-control" placeholder="phone_number" onChange={(e)=>setInsAdmin({...insAdmin, phone: e.target.value})}/>
                                    </div>
                                    <div class="form-group">
                                      <label for="address">address</label>
                                      <input name="address" type="text" class="form-control" placeholder="address" onChange={(e)=>setInsAdmin({...insAdmin, address: e.target.value})}/>
                                    </div>
                                    <div class="form-group">
                                      <label for="photoProfile">Picture Link</label>
                                      <input name="photoProfile" type="text" class="form-control" placeholder="photoProfile" onChange={(e)=>setInsAdmin({...insAdmin, photoProfile: e.target.value})}/>
                                    </div>
                                    <div class="form-group">
                                      <label for="creditCard">creditCard</label>
                                      <input name="creditCard" type="number" class="form-control" placeholder="creditCard" onChange={(e)=>setInsAdmin({...insAdmin, creditCard: e.target.value})}/>
                                    </div>
                                    <div class="form-group">
                                    <label for="admin">status</label>
                                    <select onChange={(e)=>setInsAdmin({...insAdmin, admin: e.target.value})} name="admin" class="form-control">
                                      <option value="1">Users</option>
                                      <option value="0">Admin</option>
                                    </select>
                                  </div>
                                    <Button type="submit" color="primary">
                                      Submit
                                    </Button>{" "}
                                    <Button color="secondary" onClick={toggleeditadmin}>
                                      Cancel
                                    </Button>
                                  </form>
                                  </ModalBody>
                                </Modal>
                              </td>
                            </tr>
                          );
                        }
                      })}
                      {/* <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr> */}
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
