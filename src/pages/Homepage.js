import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import "bootstrap/dist/css/bootstrap.min.css"
import "../css/homepage/home.css"
import { useState } from "react"

const Home = () =>{
  const [trending] = useState([
      {
          id: "1",
          image: "https://github.com/aliefabdussalam/learn-html1/blob/master/image%203.png?raw=true",
          city: "Tokyo",
          country: "Japan",
          airline: 15,
          price: 100,
      },
      {
          id: "2",
          image: "https://github.com/aliefabdussalam/learn-html1/blob/master/lvXeO04CxwQ.png?raw=true",
          city: "Barcelona",
          country: "Spain",
          airline: 22,
          price: 125,
      },
      {
          id: "3",
          image: "https://github.com/aliefabdussalam/learn-html1/blob/master/image%203.png?raw=true",
          city: "Tokyo",
          country: "Japan",
          airline: 15,
          price: 100,
      },
      {
          id: "4",
          image: "https://github.com/aliefabdussalam/learn-html1/blob/master/lvXeO04CxwQ.png?raw=true",
          city: "Barcelona",
          country: "Spain",
          airline: 22,
          price: 125,
      },
      {
          id: "5",
          image: "https://github.com/aliefabdussalam/learn-html1/blob/master/image%203.png?raw=true",
          city: "Tokyo",
          country: "Japan",
          airline: 15,
          price: 100,
      },
  ])
  
  const [destination] = useState([
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
      }
  ])

  return (
    <div>
        <Navbar navtype={1}/>
        <div className="header container-fluid m-0 p-0 row">
            <div className="container-fluid m-0 p-0 headerLeft col-8">
                <div className="textHeader p-0">
                    <span className="text1">Find your</span>
                    <span className="text2"> Flight</span>
                    <div className="text3">and explore the world with us</div>
                </div>
                <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt='pict' className="imgLeft bg-black"></img>
            </div>
            <div className="headerRight m-0 p-0 col-4 p-0">
                <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt='pict' className="imgRight bg-black"></img>
                <img src="https://github.com/aliefabdussalam/week6/blob/main/vector%206.png?raw=true" alt="p" className="vector1"></img>
            </div>
        </div>
        <div className="trending container-fluid p-0">
            <div className="trendText1 offset-1">TRENDING</div>
            <div className="d-flex col-12">
                <div className="trendText2 col-7 offset-1">Trending destination</div>
                <div className="trendText3 col-3">View All</div>
            </div>
            <div className="cardTrending d-flex row col-12 ">
                {trending.map((e, i)=>(
                    <div key={i} id={e.id} className="card col-lg-2 col-xs-5 mt-lg-10">
                        <img
                            className="imgTrending" 
                            src={e.image}
                            
                            alt="pict"
                        />
                        <div className="card-img-overlay bg-opacity-50 bg-dark" />
                        <div className="btn rounded-pill bg-white bg-opacity-50 cardText1" style={{position: "absolute",top: "15px",left: "15px", color: "white"}}>{e.airline} Airline</div>
                        <div className="textTrending2 fs-4" style={{position: "absolute", left:"25px", bottom:"15px", color:"white"}}>{e.country}</div>
                        <div className="textTrending3" style={{position:"absolute", left:"25px", bottom:"45px", color:"white"}}>{e.city},</div>
                        <div className="btn rounded-circle bg-white bg-opacity-25 btnback" style={{position: "absolute",bottom: "15px",right: "25px", color: "white"}}><img src="https://github.com/aliefabdussalam/learn-html1/blob/master/btnback.png?raw=true" alt=""/></div>
                    </div>
                ))}
            </div>
            <div className="container-fluid topDestination col-10 offset-1">
                    <div className="topDestText"> Top 10</div>
                    <div className="topDestText2"> Top 10 Destination</div>
                    <div className="cardtop row col-lg-12">
                    {destination.map((e, i)=>(
                        <div key={i} id={e.id} className="destcard col-2 mt-lg-10">
                            <img
                                className="imgdest rounded-circle"
                                src={e.img}
                                alt="pict"
                            />
                            <div className="destText">{e.name}</div>
                        </div>
                    ))}
                    </div>
                    <div className="d-flex row destbtn">
                        <div className="btn rounded col-1 border-white"><img src="https://github.com/aliefabdussalam/learn-html1/blob/master/btnback%20(2).png?raw=true" alt=""/></div>
                        <div className="btn-light rounded col-1 offset-1 "><img style={{marginTop:"8px", marginLeft:"8px"}} src="https://github.com/aliefabdussalam/learn-html1/blob/master/btnback%20(1).png?raw=true" alt=""/></div>
                    </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Home