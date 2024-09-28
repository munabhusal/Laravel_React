import { useEffect, useState , useRef} from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../../axios_client"
import { useStateContext } from "../../contexts/contextProvider";


function UserForm() {

  const {id} = useParams()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const {setNotification} = useStateContext()


  const [User, setUser] = useState({
    id: null,
    name : '',
    email: '',
    role_id: '',
    is_blocked: '',
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
    console.log(User)
    if(User.id){
      axiosClient.put(`/users/${User.id}`, User)
      .then(()=>{
        navigate('/users')
        setNotification("User was successfully Updated.")


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
        setNotification("User Created Successfully.")

      })
      .catch(err => {
        const response = err.response;
        console.log(response)
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
            <input value={User.name} onChange={ev=>setUser({...User, name:ev.target.value})} type="text" className="form-control" placeholder="Enter your Full Name" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input value={User.email} onChange={ev=>setUser({...User, email:ev.target.value})} type="email" className="form-control"  placeholder="Enter Email Address"/>
          </div>
          
          
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input value={User.password} name="password" type="password" onChange={ev=>setUser({...User, password:ev.target.value})} className="form-control" placeholder="Enter Password" id="exampleInputPassword0"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Password Confirmation</label>
            <input type="password" onChange={ev=>setUser({...User, password_confirmation:ev.target.value})} className="form-control" placeholder="Re-enter  your Password" id="exampleInputPassword1"/>
          </div>


          <div className="mb-3">
            <label className="form-label">Role</label>
            
            <select class="form-select" aria-label="Default select example" name="role_id" onChange={ev=>setUser({...User, role_id:ev.target.value})}>
              
              <option>Please Select</option>
              <option value='1' onChange={ev=>setUser({...User, role_id:ev.target.value})} >User {...User.role_id == 1 ?  '-- Selected' :'' }</option>
              <option value='2' onChange={ev=>setUser({...User, role_id:ev.target.value})} >Admin {...User.role_id == 2 ?  '-- Selected' :'' }</option>
                  
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Blocked Status</label>

            
            <select class="form-select" aria-label="Default select example" name="is_blocked" onChange={ev=>setUser({...User, is_blocked:ev.target.value})}>
              <option>Please Select</option>              
              <option value='0' onChange={ev=>setUser({...User, is_blocked:ev.target.value})}>Unblocked {...User.is_blocked < 2 ?  '-- Selected' :'' }</option>
              <option value='3' onChange={ev=>setUser({...User, is_blocked:ev.target.value})} >Blocked {...User.is_blocked >= 2 ?  '-- Selected' :'' }</option>
                  
            </select>
          </div>
          

          <button type="submit" className="btn btn-primary">Sign Up</button>
            
          </form>}




        </div>
      </div>
    )
  }
  
  export default UserForm
  