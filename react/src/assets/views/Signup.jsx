import { useRef, useState } from "react"
import {Link } from "react-router-dom"
import axiosClient from "../../axios_client";
import { useStateContext } from "../../contexts/contextProvider";

function Signup() {

  const nameref = useRef();
  const emailref = useRef();
  const passwordref = useRef();
  const passwordConfirmationref = useRef();
  const [errors, setErrors] = useState(null)
  const {setUser, setToken} = useStateContext()

  const onSubmit = (event)=>{
    // debugger;
  event.preventDefault()
  const payload = {
    name: nameref.current.value,
    email: emailref.current.value,
    password: passwordref.current.value,
    password_confirmation: passwordConfirmationref.current.value
  }

  axiosClient.post('/signup', payload)
    .then(({data})=>{
      setUser(data.user)
      setToken(data.token)
    })
    .catch(err => {
      // console.log(err)
      const response = err.response;
      if(response && response.status === 422){
        setErrors(response.data.errors);
      }
    })
}

  return (
      <>      
      <div className="container">
        <form onSubmit={onSubmit}>
          <h2>Sign Up Form</h2>

        
          {errors && <div  class="alert alert-danger" role="alert">
            {Object.keys(errors).map(key=>(

            <p key={key}>{errors[key][0]}</p>

            ))}

          </div>
          }
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input ref={nameref} type="text" className="form-control" id="exampleInputEmail0" placeholder="Enter your Full Name" aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input ref={emailref} type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter Email Address" aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input ref={passwordref} type="password" className="form-control" placeholder="Enter Password" id="exampleInputPassword0"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Password Confirmation</label>
            <input ref={passwordConfirmationref} type="password" className="form-control" placeholder="Re-enter  your Password" id="exampleInputPassword1"/>
          </div>

          <button type="submit" className="btn btn-primary">Sign Up</button>

          
          <div className="mb-3">
            <div id="emailHelp" className="form-text">
            Already have Account? <Link to="/login">Sign In</Link>
            </div>
          </div>
        </form>
        </div>
      </>
    )
  }
  
  export default Signup
  