import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../../axios_client"


function UserForm() {

  const {id} = useParams()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)

  const [User, setUser] = useState({
    id: null,
    name : '',
    email: '',
    password: '',
    password_confirmation: ''
  }) 

  if(id){
    useEffect(()=>{
      setLoading(true)
      axiosClient.get(`/users/${id}`)
      .then(({data})=>{      
        setLoading(false)
        setUser(data)
      })
      .catch(()=>{
        setLoading(false)
      })

    }, [])
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if(User.id){
      axiosClient.put(`/users/${User.id}`, User)
      .then(()=>{
        navigate('/users')
      })
      .catch(err => {
        const response = err.response;
        if(response && response.status === 422){
          setErrors(response.data.errors);
      }
      })
    }else{
      axiosClient.post("/users", User)
      .then(()=>{
        navigate('/users')
      })
      .catch(err => {
        const response = err.response;
        if(response && response.status === 422){
          setErrors(response.data.errors);
      }
      })

    }
  }

    return (
      <div className="UserForm">
        <div className="container"> 
          {User.id && <h3>Updating : {User.name}</h3>}
          {!User.id && <h3>New User</h3>}

          {loading && <div className="alert alert-secondary" role="alert">
            Loading!!
          </div>}

        
          {errors && <div  class="alert alert-danger" role="alert">
            {Object.keys(errors).map(key=>(

            <p key={key}>{errors[key][0]}</p>

            ))}

          </div>
          }

          {!loading && <form onSubmit={onSubmit}>

            
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input value={User.name} onChange={ev=>setUser({...User, name:ev.target.value})} ype="text" className="form-control" id="exampleInputEmail0" placeholder="Enter your Full Name" aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input value={User.email} onChange={ev=>setUser({...User, email:ev.target.value})} type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter Email Address" aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input onChange={ev=>setUser({...User, password:ev.target.value})} type="password" className="form-control" placeholder="Enter Password" id="exampleInputPassword0"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Password Confirmation</label>
            <input onChange={ev=>setUser({...User, password_confirmation:ev.target.value})} type="password" className="form-control" placeholder="Re-enter  your Password" id="exampleInputPassword1"/>
          </div>

          <button type="submit" className="btn btn-primary">Sign Up</button>
            
          </form>}




        </div>
      </div>
    )
  }
  
  export default UserForm
  