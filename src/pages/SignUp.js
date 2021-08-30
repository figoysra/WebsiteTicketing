import "bootstrap/dist/css/bootstrap.min.css"
import '../css/logsign/section.css'
import { useState } from "react"
import {Link} from 'react-router-dom'
import { Input } from 'reactstrap';



const Signup =(props)=>{
  const [user, setUser] = useState([])
  const setData=(event)=>{
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }
  const submitData=(event)=>{

    const {fullname, email, password}= user
    event.preventDefault();
    const data = {fullname, email, password}
    const local = localStorage.getItem('user')
    const localuser = JSON.parse(local)
    if(localuser===null){
      localStorage.setItem('user', JSON.stringify(data))
      props.history.push('/login');
    }else{
      if(localuser.email===data.email){
        alert('email sudah digunakan')
      }else{
        localStorage.setItem('user', JSON.stringify(data))
        props.history.push('/login');
      }
    }
    console.log(user)
  }
  return(
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <aside className="asdlogin col-lg-7">
            </aside>
            <section className="lgn col-lg-5 ">
              <div className="logosign">
                <img src="https://raw.githubusercontent.com/farizian/week15/master/img/plane.png" alt=""></img>
                <h1>Ankasa</h1>
              </div>
              <form onSubmit={submitData}  className="formlgn">
                <div className="headerlogin">
                <h1>Register</h1>
                </div>
                <div className="signbox">
                  <div class="textbox">
                    <input type="text" placeholder="Full Name" name="fullname" onChange={setData}></input>
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
                <div className="btn">
                  <button className="sign" type="submit">Sign Up</button>
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