import {Link } from "react-router-dom"
import { useEffect } from "react"
import axiosClient from "../../axios_client";
import { useStateContext } from "../../contexts/contextProvider"


function HeaderDefault() {

  const {user, setUser, setToken} = useStateContext()

  // console.log(user);
  
  const onLogout = (event)=>{
    event.preventDefault()
    axiosClient.post('/logout')
    .then(()=>{
      setUser({})
      setToken(null)
    })
  }

  useEffect(()=>{
    axiosClient.get('/user')
    .then(({data})=>{
      setUser(data.user)
      // console.log(data.user)
    })
  }, [])

    return (
      <div className="HeaderDefault">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/dashboard">Blogs and News</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/feeds">Feeds</Link>
        </li>

        {/* if role_id is of Admin */}
        {user.role_id ==2 && <>
        
        <li className="nav-item">
          <Link className="navbar-brand" to="/catagories">Catagory</Link>
        </li>

        <li className="nav-item">
        <Link className="navbar-brand" to="/tags">Tags</Link>
        </li>

        <li className="nav-item">
        <Link className="navbar-brand" to="/posts">MyPost</Link>
        </li> <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/users">Users</Link>
        </li>        
        </> }

      </ul>

      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>

      <ul className="navbar-nav">

<li className="nav-item">
    <a className="nav-link" href="#">{user.name}</a>
  </li>

<li className="nav-item">
<Link className="nav-link" aria-current="page" to="/profile">Profile</Link>
  </li>

        <li className="nav-item">
          <Link className="nav-link" to="/logout" onClick={onLogout}>Log out</Link>
        </li>
      </ul>

    </div>
  </div>
</nav>


      </div>
    )
  }
  
  export default HeaderDefault
  