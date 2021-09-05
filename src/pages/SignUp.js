import "bootstrap/dist/css/bootstrap.min.css"
import '../css/Login.css'
import { useState } from "react"
import {Link, useHistory} from 'react-router-dom'
import { Input } from 'reactstrap';
import axios from "axios";


const Signup =(props)=>{
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    photoProfile: 'https://th.bing.com/th/id/OIP.1LRUIB2OXVePxD5hQm4fqwHaHa?w=184&h=184&c=7&r=0&o=5&pid=1.7',
    admin:'1',
  })
  const setData=(event)=>{
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }
  const history = useHistory()
  
  const submitData=(event)=>{
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}register`, user)
    .then(function(response){
      localStorage.setItem("token", response.data.message.tokenAcces)
      alert("registrasi berhasil")
      history.push('/')
      
      localStorage.setItem("idUsers", response.data.data.insertId)
    })
    .catch(function (error){
      
      alert(`${error } registrasi gagal`)
    })
  }
  return(
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <aside className="asdlogin col-lg-7">
            </aside>
            <section className="lgn col-lg-5 ">
            <Link to="/" className="logosign">
              <div className="logosign">
                <img src="https://raw.githubusercontent.com/farizian/week15/master/img/plane.png" alt=""></img>
                <h1>Ankasa</h1>
              </div>
              </Link>
              <form onSubmit={submitData}  className="formlgn">
                <div className="headerlogin">
                <h1>Register</h1>
                </div>
                <div className="signbox">
                  <div class="textbox">
                    <input type="text" placeholder="Full Name" name="username" onChange={setData}></input>
                  </div>
                  <div className="textbox">
                    <input type="text" placeholder="Email" name="email" onChange={setData}></input>
                  </div>
                  <div className="textbox">
                    <input type="password" placeholder="Password" name="password" onChange={setData}></input>
                    <img src="https://raw.githubusercontent.com/farizian/week15/master/img/view%201.png" alt=""></img>
                  </div>
                </div>
              </form>
              <div className="buttonlgn">
                <div className="btn mt-1">
                  <button className="sign" onClick={submitData}>Sign Up</button>
                </div>
                <div className="checkbox">
                  <Input type="checkbox" className="check" name="terms" value={true}>
                      </Input>
                  <p>Accept terms and condition</p>
                </div>
                <div className="textbox">
                  <p>Already have an account?</p>
                </div>
                <Link to="/login" className="btn">
                  <button className="sign" id="sign2">Sign In</button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Signup