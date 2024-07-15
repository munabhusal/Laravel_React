import { useRef, useState } from "react";
import {Link } from "react-router-dom"
import { useStateContext } from "../../contexts/contextProvider";
import axiosClient from "../../axios_client";

function Login() {
  const emailref = useRef();
  const passwordref = useRef();
  const [errors, setErrors] = useState(null)
  const [msg, setMsg] = useState(null)
  const {setUser, setToken} = useStateContext()

  const onSubmit = (event)=>{
    event.preventDefault()
    const payload = {
      email: emailref.current.value,
      password: passwordref.current.value,
    } 
    setErrors(null);
    setMsg(null);

// console.log(payload)
    axiosClient.post('/login', payload)
      .then(({data})=>{
        setUser(data.user)
        setToken(data.token)        
      })
      .catch(err => {
        // console.log(err)
        const response = err.response;
        if(response && response.status === 422){
          if (response.data.errors) {
            setErrors(response.data.errors);            
          } else {
            setMsg(response.data.message);            
          }          
        }
      })
  }

    return (
      <div className="Login">
      <div className="container">
      <form onSubmit={onSubmit}>
        <h2>Login Form</h2> 
        
        {errors && <div  class="alert alert-danger" role="alert">
          {Object.keys(errors).map(key=>(

            <p key={key}>{errors[key]}</p>
          ))}
        </div>
        }
        
        {msg && <div  class="alert alert-danger" role="alert">
          <p>{msg}</p>
        </div>
        }
        

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input  ref={emailref} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input  ref={passwordref}  type="password" className="form-control" id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>

        
        <div className="mb-3">
          <div id="emailHelp" className="form-text">
          Not Registred? <Link to="/signup">Create an Account</Link>
          </div>
        </div>
      </form>
      </div>
      </div>
    )
  }
  
  export default Login
  