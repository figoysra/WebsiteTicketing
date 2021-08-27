import '../css/footer.css'
import "bootstrap/dist/css/bootstrap.min.css"
const Footer =()=>{
  return(
    <div>
      <footer>
        <div className="container-fluid">
          <div className="row">
            <div className="text1 col-lg-3 col-12">
              <div className="logo">
                <img src="https://raw.githubusercontent.com/farizian/week15/master/img/plane.png" alt=""></img>
                <h1>Ankasa</h1>
              </div>
              <div className="find">
                <p>Find your Flight and explore the world with us. We will take care of the rest</p>
              </div>
              <p className="copyright">© Ankasa.  All Rights Reserved.</p>
            </div>
            <div className="text2 col-lg-3 col-12">
              <div className="features">
                <p>Features</p>
              </div>
              <div className="menu">
                <p>Find Ticket</p>
                <p>My Booking</p>
                <p>Chat</p>
                <p>Notification</p>
              </div>
            </div>
            <div className="text3 col-lg-3 col-12">
              <div className="app">
                <p>Download Angkasa app</p>
              </div>
              <div className="imgbox">
                <img src="https://raw.githubusercontent.com/farizian/week15/master/img/apple-app-store-travel-awards-globestamp-7%203.png" alt=""></img>
                <img id="ps" src="https://raw.githubusercontent.com/farizian/week15/master/img/apple-app-store-travel-awards-globestamp-7%202.png" alt=""></img>
              </div>
            </div>
            <div className="text4 col-lg-3 col-12">
              <div className="follow">
                <p>Follow Us</p>
              </div>
              <div className="imgbox">
                <img src="https://raw.githubusercontent.com/farizian/week15/master/img/facebook.png" alt=""></img>
                <img src="https://raw.githubusercontent.com/farizian/week15/master/img/twitter.png" alt=""></img>
                <img src="https://raw.githubusercontent.com/farizian/week15/master/img/instagram.png" alt=""></img>
                <img id="img4" src="https://raw.githubusercontent.com/farizian/week15/master/img/youtube.png" alt=""></img>
              </div>
              <div className="location">
                <img src="https://raw.githubusercontent.com/farizian/week15/master/img/map-pin.png" alt=""></img>
                <p>Jakarta Indonesia</p>
              </div>
              <p className="copyright2">© Ankasa.  All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer