import "bootstrap/dist/css/bootstrap.min.css"
import '../css/logsign/section.css'
import { useState } from "react"
import {Link} from 'react-router-dom'


const Login =(props)=>{
const [user, setUser] = useState()

const setData=(event)=>{
  setUser({
    ...user,
    [event.target.name]: event.target.value
  })
}

const submit=(event)=>{
  const {email, password}= user
  event.preventDefault();
  const data = {email, password}
  const local = localStorage.getItem('user')
  const localuser = JSON.parse(local)
  if(data.email===localuser.email&&data.password===localuser.password){
    localStorage.setItem("token","123abc123abc123abcbca123")
  }else if(data.email!==localuser.email){
    alert("account tidak ditemukan, silahkan registrasi")
    props.history.push('/signup');
  }
  else{
    alert("password salah")
  }
  console.log(data)
  // localStorage.removeItem('user')
  console.log(localuser)
}
  return(
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <aside className="asdlogin col-lg-7">
            </aside>
            <section className="lgn col-lg-5">
              <div className="logosign">
                <img src="https://raw.githubusercontent.com/farizian/week15/master/img/plane.png" alt=""></img>
                <h1>Ankasa</h1>
              </div>
              <form onSubmit={submit} className="formlgn">
                <div className="header">
                <h1>Login</h1>
                </div>
                <div className="signbox">
                  <div className="textbox">
                    <input type="text" placeholder="Username" name="username" onChange={setData}></input>
                  </div>
                  <div className="textbox">
                    <input type="password" placeholder="Password" name="password" onChange={setData}></input>
                    <img src="https://raw.githubusercontent.com/farizian/week15/master/img/view%201.png" alt=""></img>
                  </div>
                </div>
              </form>
              <div className="buttonlgn">
                <Link className="btn">
                  <button className="sign" onClick={submit}>Sign In</button>
                </Link>
              </div>
              <div className="anothersign">
                <h3 className="forgot">Did you forgot your password?</h3>
                <h3 className="forgottap">Tap here for reset</h3>
              </div>
              <div className="anothersign" id="othersgn1">
                <h3 className="forgot">or sign in with</h3>
                <div className="btn">
                <button>
                  <img src="https://raw.githubusercontent.com/farizian/week15/master/img/google.png" alt=""></img>
                </button>
                <button id="bt2">
                  <img src="https://raw.githubusercontent.com/farizian/week15/master/img/fb.png" alt=""></img>
                </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login