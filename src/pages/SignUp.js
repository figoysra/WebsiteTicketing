import "bootstrap/dist/css/bootstrap.min.css"
import '../css/logsign/section.css'
import { useState } from "react"
import {Link} from 'react-router-dom'
import { Input } from 'reactstrap';
import axios from "axios";



const Signup =(props)=>{
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    admin:'',
  })
  const setData=(event)=>{
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }
  // eslint-disable-next-line no-unused-vars
  // const [Tnc, setTnc] = useState(false)
  // // console.log(Tnc)
  // const handleTnc = () =>{
  //   setTnc(true)
  //   console.log(Tnc)
  // }
  
  const submitData=(event)=>{
    event.preventDefault();
    const data = {
                    username: user.username, 
                    email: user.email, 
                    password: user.password,
                    admin: user.admin
                 }
    axios.post(`${process.env.REACT_APP_URL_API}/register`, data)
    .then(function(response){
      setUser({...data, users: response.data})
      localStorage.setItem("token", response.data.message.tokenAcces)
      alert("registrasi berhasil")
      props.history.push('/')
    })
    .catch(function (error){
      console.log(error);
      alert("registrasi gagal")
    })
    // const local = localStorage.getItem('user')
    // const localuser = JSON.parse(local)
    // if(localuser===null){
    //   localStorage.setItem('user', JSON.stringify(data))
    //   props.history.push('/login');
    // }else{
    //   if(localuser.email===data.email){
    //     alert('email sudah digunakan')
    //   }else{
    //     localStorage.setItem('user', JSON.stringify(data))
    //     props.history.push('/login');
    //   }
    // }
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
                    <input type="text" placeholder="Full Name" name="username" onChange={setData}></input>
                  </div>
                  <div className="textbox">
                    <input type="text" placeholder="Email" name="email" onChange={setData}></input>
                  </div>
                  <div className="textbox">
                    <input type="password" placeholder="Password" name="password" onChange={setData}></input>
                    <img src="https://raw.githubusercontent.com/farizian/week15/master/img/view%201.png" alt=""></img>
                  </div>
                  <div>Status</div>
                  <Input
                          className="bg-white border-end-0 select"
                          type="select"
                          name="admin"
                          onChange={setData}                 
                        >
                          <option value="">Select your option</option>
                          <option value="0">Admin</option>
                          <option value="1">User</option>
                        </Input>
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