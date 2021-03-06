import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Landing.css"
import {useEffect, useState} from 'react'
import Calendar from 'react-calendar';
import { Input } from "reactstrap";
import 'react-calendar/dist/Calendar.css';
import moment from "moment"
import {useHistory } from "react-router-dom";
import { API_URL } from "../utils/constants";
import axios from "axios";

const Landing = () => {
  const trending = [
    {
      id: "1",
      image:
        "https://github.com/aliefabdussalam/learn-html1/blob/master/image%203.png?raw=true",
      city: "Tokyo",
      country: "Japan",
      airline: 15,
      price: 100,
    },
    {
      id: "2",
      image:
        "https://github.com/aliefabdussalam/learn-html1/blob/master/lvXeO04CxwQ.png?raw=true",
      city: "Barcelona",
      country: "Spain",
      airline: 22,
      price: 125,
    },
    {
      id: "3",
      image:
        "https://github.com/aliefabdussalam/learn-html1/blob/master/image%203.png?raw=true",
      city: "Tokyo",
      country: "Japan",
      airline: 15,
      price: 100,
    },
    {
      id: "4",
      image:
        "https://github.com/aliefabdussalam/learn-html1/blob/master/lvXeO04CxwQ.png?raw=true",
      city: "Barcelona",
      country: "Spain",
      airline: 22,
      price: 125,
    },
    {
      id: "5",
      image:
        "https://github.com/aliefabdussalam/learn-html1/blob/master/image%203.png?raw=true",
      city: "Tokyo",
      country: "Japan",
      airline: 15,
      price: 100,
    },
  ];

  const destination = [
    {
      id: 1,
      name: "Sydney",
      img: "https://github.com/aliefabdussalam/learn-html1/blob/master/Sydney.png?raw=true",
    },
    {
      id: 2,
      name: "Bali",
      img: "https://github.com/aliefabdussalam/learn-html1/blob/master/Bali.png?raw=true",
    },
    {
      id: 3,
      name: "Singapore",
      img: "https://github.com/aliefabdussalam/learn-html1/blob/master/Singapore.png?raw=true",
    },
    {
      id: 4,
      name: "Paris",
      img: "https://github.com/aliefabdussalam/learn-html1/blob/master/Paris.png?raw=true",
    },
    {
      id: 5,
      name: "Taj Mahal",
      img: "https://github.com/aliefabdussalam/learn-html1/blob/master/Taj%20Mahal.png?raw=true",
    },
  ];
  // eslint-disable-next-line no-unused-vars
  const [trip, setTrip]= useState({
    trip: ""
  })
  const [dataCountry,setDataCountry] = useState([])
  const [departure, setDeparture] = useState('Surabaya')
  const [dest, setDest]  = useState('Surabaya')
  const [date, setDate] = useState(new Date());
  const [checked,setChecked] = useState({
    Economy : '',
    Business : '',
    FirstClass : '',
  })
  const token = localStorage.getItem("token");
  // const [dep, setDep] = useState('')
  // const [dest, setDest] = useState('')
  // const [suggestions, setSuggestions] = useState([])

  const getdataCountry = () =>{
    axios.get(`${API_URL}country`)
    .then((response)=>{
      setDataCountry(response.data.data.country)
    }).catch((err)=>{
      alert(`${err.message} Cannot Access Data from Server
      Please Call Admin in 021-082`)
    })
  }
  
  const showDate={
    day: date.getDay()===1?"Monday":date.getDay()===2?"Tuesday":date.getDay()===3?"Wednesday":date.getDay()===4?"Thursday":date.getDay()===5?"Friday":date.getDay()===6?"Saturday":"Sunday",
    date: date.getDate(),
    month: date.getMonth()===0?"January":date.getMonth()===1?"Febuary":date.getMonth()===2?"March":date.getMonth()===3?"April":date.getMonth()===4?"May":date.getMonth()===4?"June":date.getMonth()===6?"July":date.getMonth()===7?"August":date.getMonth()===8?"September":date.getMonth()===9?"October":date.getMonth()===10?"November":"Desember",
    year: date.getFullYear()
  }
  function clickTrip(data) {
    setTrip({
      trip: data
    })
  }
  const newClass = Object.keys(checked).filter(x=>checked[x])
  const newDate = moment(date).format("YYYY-MM-DD");
  const history = useHistory();
  const handleSubmit = (e) =>{
    e.preventDefault();
    history.push(`/searchpage?from=${departure}&to=${dest}&date=${newDate}&cls=${newClass}`);
  }

  useEffect(()=>{
    getdataCountry()
  },[])
  
  return (
    <div>
      <Navbar token={token} />
      <div className="headerlanding container-fluid m-0 p-0 row">
        <div className="container-fluid m-0 p-0 headerLeft col-8">
          <div className="textHeader p-0">
            <span className="text1">Find your</span>
            <span className="text2"> Flight</span>
            <div className="text3">and explore the world with us</div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
            alt="pict"
            className="imgLeft bg-black"
          />
        </div>

        <div className="headerRight m-0 p-0 col-4 p-0">
          <img
            src="https://raw.githubusercontent.com/farizian/week15/master/img/image4.png"
            alt="pict"
            className="imgRight"
          />
          <img
            src="https://github.com/aliefabdussalam/week6/blob/main/vector%206.png?raw=true"
            alt="p"
            className="vector1"
          />
        </div>
      </div>
      <div className="srcbox">
        <p className="hey">Hey,</p>
        <p className="where">Where you want to go?</p>
        <div className="recent">
          <p className="txt">Recently Searched</p>
          <p>{">"}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="countryselect">
            <div className="input">
              <p className="txt">From</p>
              <select onChange={(e) => setDeparture(e.target.value)}>
                {dataCountry.map((e) => {
                  return <option value={e.town}>{e.town}</option>;
                })}
              </select>
              {/* {suggestions && suggestions.map((value,i)=>
                <div key={i} className="suggestions"
                onClick = {(()=> onSuggestHandler(value.town))}
                >
                  {value.town}
                </div>
              )} */}
              <input className="country" type="text" placeholder="country" />
            </div>
            <img
              src="https://raw.githubusercontent.com/farizian/week15/master/img/panahbiru.png"
              alt=""
            />
            <div className="input" id="in2">
              <p className="txt">To</p>
              <select onChange={(e) => setDest(e.target.value)}>
                {dataCountry.map((e) => {
                  return <option value={e.town}>{e.town}</option>;
                })}
              </select>
              <input className="country" type="text" placeholder="country" />
            </div>
          </div>
          <div className="btnbox">
            <button className="btn" onClick={() => clickTrip("One way")}>
              <img
                src="https://raw.githubusercontent.com/farizian/week15/master/img/littleplanewhite.png"
                alt=""
              ></img>
              <p>One way</p>
            </button>
            <button
              className="btn"
              id="btn2"
              onClick={() => clickTrip("Round trip")}
            >
              <img
                src="https://raw.githubusercontent.com/farizian/week15/master/img/replay.png"
                alt=""
              ></img>
              <p>Round trip</p>
            </button>
          </div>
          <div className="departure">
            <p>Departure</p>
            <div class="accordion-item item">
              <h2 class="accordion-header" id="headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <p>{`${showDate.day}, ${showDate.date} ${showDate.month} ${showDate.year}`}</p>
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <Calendar onChange={setDate} />
                </div>
              </div>
            </div>
          </div>
          <div className="person">
            <p>How many person?</p>
            <div className="personinput">
              <div className="inputbox">
                <input
                  type="text"
                  placeholder="2 child"
                  onChange=""
                  value=""
                ></input>
                <img
                  src="https://raw.githubusercontent.com/farizian/week15/master/img/iconright.png"
                  alt=""
                ></img>
              </div>
              <div className="inputbox" id="box2">
                <input
                  type="text"
                  placeholder="4 Adult"
                  onChange=""
                  value=""
                ></input>
                <img
                  src="https://raw.githubusercontent.com/farizian/week15/master/img/iconright.png"
                  alt=""
                ></img>
              </div>
            </div>
          </div>
          <div className="class">
            <p>Which class do you want?</p>
            <div className="classbox">
              <div className="checkbox">
                <Input
                  type="checkbox"
                  className="check"
                  name="Economy"
                  value="Economy"
                  onChange={(e) => setChecked({ Economy: e.target.value })}
                ></Input>
                <p>Economy</p>
              </div>
              <div className="checkbox">
                <Input
                  type="checkbox"
                  className="check"
                  name="Business"
                  value="Business"
                  onChange={(e) => setChecked({ Business: e.target.value })}
                ></Input>
                <p>Business</p>
              </div>
              <div className="checkbox" id="cb3">
                <Input
                  type="checkbox"
                  className="check"
                  name="First Class"
                  value="FirstClass"
                  onChange={(e) => setChecked({ FirstClass: e.target.value })}
                ></Input>
                <p>First Class</p>
              </div>
            </div>
          </div>
          <div className="btnflight">
            <button className="searchflight" type="submit">
              <p>SEARCH FLIGHT</p>
              <img
                src="https://raw.githubusercontent.com/farizian/week15/master/img/panah2.png"
                alt=""
              />
            </button>
          </div>
        </form>
      </div>
      <div className="trending container-fluid p-0">
        <div className="trendText1 offset-1">TRENDING</div>
        <div className="d-flex col-12">
          <div className="trendText2 col-7 offset-1">Trending destination</div>
          <div className="trendText3 col-3">View All</div>
        </div>
        <div className="cardTrending d-flex">
          {trending.map((e, i) => (
            <div key={i} id={e.id} className="card cardtrendingBody">
              <img className="imgTrending" src={e.image} alt="pict" />
              <div className="card-img-overlay bg-opacity-50 bg-dark" />
                <div
                  className="btn rounded-pill bg-white bg-opacity-50 cardText1"
                  style={{
                    position: "absolute",
                    top: "15px",
                    left: "15px",
                    color: "white",
                  }}
                >
                  {e.airline} Airline
                </div>
                <div
                  className="textTrending2 fs-4"
                  style={{
                    position: "absolute",
                    left: "25px",
                    bottom: "15px",
                    color: "white",
                  }}
                >
                  {e.country}
                </div>
                <div
                  className="textTrending3"
                  style={{
                    position: "absolute",
                    left: "25px",
                    bottom: "45px",
                    color: "white",
                  }}
                >
                  {e.city},
                </div>
                <div
                  className="btn rounded-circle bg-white bg-opacity-25 btnback"
                  style={{
                    position: "absolute",
                    bottom: "15px",
                    right: "25px",
                    color: "white",
                  }}
                >
                  <img
                    src="https://github.com/aliefabdussalam/learn-html1/blob/master/btnback.png?raw=true"
                    alt=""
                  />
                </div>
              </div>  
          ))}
        </div>
        <div className="container-fluid topDestination col-10 offset-1">
          <div className="topDestText"> Top 10</div>
          <div className="topDestText2"> Top 10 Destination</div>
          <div className="d-flex align-items-lg-center justify-content-lg-center destCard">
            {destination.map((e, i) => (
              <div
                key={i}
                id={e.id}
                className="destcardBody d-flex flex-column me-lg-5 ms-lg-5 me-3 mt-4"
              >
                <div className=" destImage">
                  <img src={e.img} width="100%" height="auto" alt="pict" className="rounded-circle" />
                </div>
                <div className="destText">{e.name}</div>
              </div>
            ))}
          </div>
          <div className="d-flex row destbtn">
            <div className="btn rounded col-1 border-white">
              <img
                src="https://github.com/aliefabdussalam/learn-html1/blob/master/btnback%20(2).png?raw=true"
                alt=""
              />
            </div>
            <div className="btn-light rounded col-1 offset-1 ">
              <img
                style={{ marginTop: "8px", marginLeft: "8px" }}
                src="https://github.com/aliefabdussalam/learn-html1/blob/master/btnback%20(1).png?raw=true"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing