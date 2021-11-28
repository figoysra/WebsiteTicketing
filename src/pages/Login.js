import "bootstrap/dist/css/bootstrap.min.css"
import '../css/Login.css'
import {useState} from "react"
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'
import {API_URL} from "../utils/constants";


const Login = ()=>{

  const [data, setData] = useState({
    username: '',
    password: ''
  })

  const insertData = (e) => {
    setData({
        ...data,
        [e.target.name]: e.target.value
      })
  }

  const history = useHistory();
  const submitLogin=(e) => {
    e.preventDefault();
    axios.post(`${API_URL}login`, data)
    .then((response) => {
      console.log(response)
        // // handle success
        const user = response.data.data
        localStorage.setItem("token", response.data.message)
        localStorage.setItem("idUsers", user.id_users)
        localStorage.setItem('admin', user.admin)
        localStorage.setItem("photoProfile", user.photoProfile);
        history.push(`/`)
      })
      .catch((error) => {
        // console.log(error)
        // handle error
        
        alert(`username/password salah`)
      })
  }

  const signUp = () => {
    history.push("/signup")
  }


  return(
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <aside className="asdlogin col-lg-7">
            </aside>
            <section className="lgn col-lg-5">
            <Link to="/" className="logosign">
              <div className="logosign">
                <img src="https://raw.githubusercontent.com/farizian/week15/master/img/plane.png" alt=""></img>
                <h1>Ankasa</h1>
              </div>
              </Link>
              <form onSubmit={submitLogin} className="formlgn">
                <div className="headerlogin">
                <h1 className>Login</h1>
                </div>
                <div className="signbox">
                  <div className="textbox">
                    <input 
                    type="text" 
                    placeholder="Username or Email" 
                    name="username"
                    onChange={insertData} 
                    >
                  </input>
                  </div>
                  <div className="textbox">
                    <input 
                    type="password" 
                    placeholder="Password" 
                    name="password" 
                    onChange={insertData}
                    >
                    </input>
                    {/* <img src="https://raw.githubusercontent.com/farizian/week15/master/img/view%201.png" alt=""></img> */}
                  </div>
                </div>
                <div className="buttonlgn">
                  <div className="btn">
                  <button className="btn-lg sign" >Sign In</button>
                  </div>
                  <div className="mt-3 btn">
                  <button className="sign" type="button" id="sign2" onClick={signUp}>Sign Up</button>
                  </div>
                </div>
              </form>
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
