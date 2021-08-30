import "bootstrap/dist/css/bootstrap.min.css"
import '../css/logsign/section.css'
import { useState, useEffect} from "react"
// import {Link} from 'react-router-dom'
import axios from 'axios'
import {useHistory} from 'react-router-dom'


const Login = ()=>{

  const [data, setData] = useState({
    username: '',
    password: ''
  }) 
 

  const insertemail = (e) => {
    setData({
        ...data,
        username: e.target.value
      })
  }

  const insertpass = (e) => {
    setData({
        ...data,
        password: e.target.value
      })
  }

  console.log(data)
  const history = useHistory();
  const login=(e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/login', data)
    .then(function (response) {
        // handle success
        // setData({users:response.data.data.users})
         localStorage.setItem("token", response.data.message.tokenAcces)
         const usersId = response.data.data.users
         const id = usersId.map((e) => {
            return(e.id_users)
         })
         localStorage.setItem("idUsers", id)
         alert("succes")
         history.push('/searchpage')
      })
      .catch(function (error) {
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
              <form onSubmit={login} className="formlgn">
                <div className="header">
                <h1>Login</h1>
                </div>
                <div className="signbox">
                  <div className="textbox">
                    <input 
                    type="text" 
                    placeholder="Username" 
                    name="email"
                    onChange={insertemail} 
                   >
                  </input>
                  </div>
                  <div className="textbox">
                    <input 
                    type="password" 
                    placeholder="Password" 
                    name="password" 
                    onChange={insertpass}
                    >
                    </input>
                    <img src="https://raw.githubusercontent.com/farizian/week15/master/img/view%201.png" alt=""></img>
                  </div>
                </div>
                  <button className="btn-lg btnSign" type="submit">Sign In</button>        
              </form>

              <div className="buttonlgn">
                {/* <Link className="btn"> */}
                  {/* <button className="sign" type="submit">Sign In</button> */}
                {/* </Link> */}
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