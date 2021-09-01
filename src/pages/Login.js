import "bootstrap/dist/css/bootstrap.min.css"
import '../css/logsign/section.css'
import {useState} from "react"
import axios from 'axios'
import {useHistory} from 'react-router-dom'
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

  console.log(data)
  console.log(API_URL)

  const history = useHistory();
  const submitLogin=(e) => {
    e.preventDefault();
    axios.post(`${API_URL}login`, data)
    .then((response) => {
        // handle success
        localStorage.setItem("token", response.data.message.tokenAcces)
        const users = response.data.data.users
        const id = users.map((e) => {
           return(e.id_users)
        })
        localStorage.setItem("idUsers", id)
        alert("succes")
        history.push(`/`)
      })
      .catch((error) => {
        // handle error
        console.log(error);
        alert("username/password salah")
      })
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
              <form onSubmit={submitLogin} className="formlgn">
                <div className="headerlogin">
                <h1>Login</h1>
                </div>
                <div className="signbox">
                  <div className="textbox">
                    <input 
                    type="text" 
                    placeholder="username" 
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
                    <img src="https://raw.githubusercontent.com/farizian/week15/master/img/view%201.png" alt=""></img>
                  </div>
                </div>
                <div className="buttonlgn">
                  <div className="btn">
                  <button className="btn-lg sign" >Sign Up</button>
                  </div>
                  <div className="mt-5 btn">
                  <button className="sign" type="submit" id="sign2">Sign In</button>
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
