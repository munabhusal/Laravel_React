import {Link } from "react-router-dom"
function Login() {

  const onSubmit = (event)=>{
    event.preventDefault()
  }

    return (
      <div className="Login">
      <div className="container">
      <form onSubmit={onSubmit}>
        <h2>Login Form</h2> 
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"/>
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
  