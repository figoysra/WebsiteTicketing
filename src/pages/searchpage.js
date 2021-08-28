import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
// import { useState } from "react"
import { Input } from 'reactstrap';
import "../css/searchpage/body.css"
import "bootstrap/dist/css/bootstrap.min.css"

const Searchpage=()=>{

  return(
    <div>
      <Navbar navtype={2}/>
      <div>
        <div className="container-fluid">
          <div className="row">
            <header className="head col-lg-12">
            <div className="container-fluid">
              <div className="row">
                <div className="searchbox col-lg-6">
                  <div className="resultbox">
                    <div className="img">
                      <img src="https://raw.githubusercontent.com/farizian/week15/master/img/planewhite.png" alt=""></img>
                    </div>
                    <div className="textsrc">
                      <div className="txt">
                        <p className="from">From</p>
                        <p className="to">To</p>
                      </div>
                      <div className="txt">
                        <p className="route1">Medan (IDN)</p>
                        <div className="img">
                          <img src="https://raw.githubusercontent.com/farizian/week15/master/img/panah.png" alt=""></img>
                        </div>
                        <p className="route2">Tokyo (JPN)</p>
                      </div>
                      <div className="txt">
                        <p>Monday, 20 July 20</p>
                        <div className="img2">
                          <img src="https://raw.githubusercontent.com/farizian/week15/master/img/Ellipse.png" alt=""></img>
                        </div>
                        <p>6 Passenger</p>
                        <div className="img2">
                          <img src="https://raw.githubusercontent.com/farizian/week15/master/img/Ellipse.png" alt=""></img>
                        </div>
                        <p>Economy</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="searchbtn col-lg-6 bg-primary">
                  Change
                </div>
              </div>
            </div>
            </header>
            <aside className="aside col-lg-4 bg-secondary">
              <div className="menuside">
                <p className="filter">Filter</p>
                <p className="reset">Reset</p>
              </div>
              <div className="filtercard">
                <div className="card">
                  <div className="menu">
                    <p className="header">Transit</p>
                    <p>Direct</p>
                    <p>Transit</p>
                  </div>
                  <div className="checkbox">
                    <div className="imgbox">
                      <img src="https://raw.githubusercontent.com/farizian/week15/master/img/btnback.png" alt=""></img>
                    </div>
                    <div className="squarebox">
                      <Input type="checkbox" className="check" name="Transit" value="Direct">
                      </Input>
                    </div>
                    <div className="squarebox">
                      <Input type="checkbox" className="check" name="Transit" value="Transit">
                      </Input>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="menu">
                    <p className="header">Facilities</p>
                    <p>Luggage</p>
                    <p>In-Flight Meal</p>
                    <p>Wi-fi</p>
                  </div>
                  <div className="checkbox">
                    <div className="imgbox">
                      <img src="https://raw.githubusercontent.com/farizian/week15/master/img/btnback.png" alt=""></img>
                    </div>
                    <div className="squarebox">
                      <Input type="checkbox" className="check" name="Facilities" value="Luggage">
                      </Input>
                    </div>
                    <div className="squarebox">
                      <Input type="checkbox" className="check" name="Facilities" value="In-Flight Meal">
                      </Input>
                    </div>
                    <div className="squarebox">
                      <Input type="checkbox" className="check" name="Facilities" value="Wi-fi">
                      </Input>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="menu">
                    <p className="header">Departure Time</p>
                    <p>00:00 - 06:00</p>
                    <p>06:00 - 12:00</p>
                    <p>12:00 - 18:00</p>
                    <p>18:00 - 24:00</p>
                  </div>
                  <div className="checkbox">
                    <div className="imgbox">
                      <img src="https://raw.githubusercontent.com/farizian/week15/master/img/btnback.png" alt=""></img>
                    </div>
                    <div className="squarebox">
                      <Input type="checkbox" className="check" name="Departure Time" value="00:00 - 06:00">
                      </Input>
                    </div>
                    <div className="squarebox">
                      <Input type="checkbox" className="check" name="Departure Time" value="06:00 - 12:00">
                      </Input>
                    </div>
                    <div className="squarebox">
                      <Input type="checkbox" className="check" name="Departure Time" value="12:00 - 18:00">
                      </Input>
                    </div>
                    <div className="squarebox">
                      <Input type="checkbox" className="check" name="Departure Time" value="18:00 - 24:00">
                      </Input>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="menu">
                    <p className="header">Time Arrived</p>
                    <p>00:00 - 06:00</p>
                    <p>06:00 - 12:00</p>
                    <p>12:00 - 18:00</p>
                    <p>18:00 - 24:00</p>
                  </div>
                  <div className="checkbox">
                    <div className="imgbox">
                      <img src="https://raw.githubusercontent.com/farizian/week15/master/img/btnback.png" alt=""></img>
                    </div>
                    <div className="squarebox">
                      <Input type="checkbox" className="check" name="Time Arrived" value="00:00 - 06:00">
                      </Input>
                    </div>
                    <div className="squarebox">
                      <Input type="checkbox" className="check" name="Time Arrived" value="06:00 - 12:00">
                      </Input>
                    </div>
                    <div className="squarebox">
                      <Input type="checkbox" className="check" name="Time Arrived" value="12:00 - 18:00">
                      </Input>
                    </div>
                    <div className="squarebox">
                      <Input type="checkbox" className="check" name="Time Arrived" value="18:00 - 24:00">
                      </Input>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="menu">
                    <p className="header">Airlines</p>
                    <p>Garuda Indonesia</p>
                    <p>Air Asia</p>
                    <p>Lion Air</p>
                  </div>
                  <div className="checkbox">
                    <div className="imgbox">
                      <img src="https://raw.githubusercontent.com/farizian/week15/master/img/btnback.png" alt=""></img>
                    </div>
                    <div className="squarebox">
                      <Input type="checkbox" className="check" name="Airlines" value="Garuda Indonesia">
                      </Input>
                    </div>
                    <div className="squarebox">
                      <Input type="checkbox" className="check" name="Airlines" value="Air Asia">
                      </Input>
                    </div>
                    <div className="squarebox">
                      <Input type="checkbox" className="check" name="Airlines" value="Lion Air">
                      </Input>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            <section className="section col-lg-8 bg-primary">
              <div className="headers">
                <div className="txt">
                  <h1>Select Ticket</h1>
                  <p>(6 flight found)</p>
                </div>
                <div className="sortby">
                  <p>Sort by</p>
                  <img src="https://raw.githubusercontent.com/farizian/week15/master/img/asc.png" alt=""></img>
                </div>
              </div>
              <div className="cardticket">
                <div className="flightlogo">
                  <img src="https://raw.githubusercontent.com/farizian/week15/master/img/garuda.png" alt=""></img>
                  <p>Garuda Indonesia</p>
                </div>
                <div className="menubar">
                  <div className="country">
                    <div className="row">
                      <p className="country1">IDN</p>
                      <p className="time">12:33</p>
                    </div>
                    <div className="img">
                      <img src="https://raw.githubusercontent.com/farizian/week15/master/img/littleplane.png" alt=""></img>
                    </div>
                    <div className="row">
                      <p className="country1">JPN</p>
                      <p className="time">15:21</p>
                    </div>
                  </div>
                  <div className="time">
                    <p className="detailtime">3 hours 11 minutes</p>
                    <p className="transit">(1 transit)</p>
                  </div>
                  <div className="facilitieslogo">
                    <img src="https://raw.githubusercontent.com/farizian/week15/master/img/luggage.png" alt=""></img>
                    <img src="https://raw.githubusercontent.com/farizian/week15/master/img/meal.png" alt=""></img>
                    <img src="https://raw.githubusercontent.com/farizian/week15/master/img/wi-fi.png" alt=""></img>
                  </div>
                  <div className="price">
                    <p>$ 214,00 /pax</p>
                  </div>
                  <div className="btn">
                    <button className="select">
                    Select
                    </button>
                  </div>
                </div>
                <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Accordion Item #1
                      </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                      </div>
                    </div>
                  </div>
                </div>
                  
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Searchpage