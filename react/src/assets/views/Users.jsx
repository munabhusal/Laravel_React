import { useEffect, useState } from "react"
import axiosClient from "../../axios_client";
import {Link } from "react-router-dom"
import PaginationLinks from "./PaginationLinks";
import { useStateContext } from "../../contexts/contextProvider";


function User() {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [meta, setMeta] = useState(false)
  const [errors, setErrors] = useState(null)
  const {setNotification} = useStateContext()


  useEffect(()=>{
    getUsers();
  }, [])

  const onDelete = (user) =>{
    if(!window.confirm("Are you sure you want to delete?")){
      return;
    }

    axiosClient.delete(`/users/${user.id}`)
    .then(()=>{    
      getUsers();
      setNotification("User Deleted Successfully.")

    })
  }

  const onChangeStatus=(id)=>{
    
    if(!window.confirm("Are you sure you change the status of the user?")){
      return;
    }
  }
 
  const getUsers= (url) => {
    url = url || "/users"
    setLoading(true)
    axiosClient.get(url)
    .then(({data})=>{     
      setUsers(data.data)
      setMeta(data.meta)
      setLoading(false)
    })
    .catch(err => {
      const response = err.response;
      if(response && response.status === 403){
        // console.log(err.response.data);
        setErrors(err.response.data);
    }    
    setLoading(false)
    })
  }

  const onPageChange = (link)=>{
    getUsers(link.url)
  }


    return (

      <div className="container">

{errors &&<>

  <div class="alert alert-warning alert-dismissible fade show" role="alert">
    
    
  {Object.keys(errors).map(key=>(
      <strong><span key={key}>{errors[key]}</span></strong>

))}
</div>
   
</>}

{!errors &&<>
        <div className="row">
      <div className="col-9">
          <h3>User's List</h3>
          </div>
          <div className="col-3">
          <Link type="button" className="btn btn-primary" to={"/users/new"}>Add New</Link>
          </div>
        </div>
        
        <hr />
        
        <table className="table table-striped">

          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {loading && <tbody>
            <tr>
              <td colSpan={4} className="text-center">
                <span class="sr-only">Loading...</span>
              </td>
              
            </tr>
          </tbody>
}
          <tbody>
          {users?.map(user => {
            
              return(<tr>
              <th>{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
          <Link type="button" className="btn btn-warning" to={"/users/"+user.id}>Edit</Link>
          {'\t'}

          {user.is_blocked <2 &&   
          <Link type="button" className="btn btn-success">
            {user.role_id == 2 &&<i class="bi bi-0-circle">A</i>}
            {user.role_id == 1 &&<i class="bi bi-0-circle">U</i>}
            </Link>
          }

          {user.is_blocked >= 2 &&   
          <Link type="button" className="btn btn-danger">
            {user.role_id == 2 &&<i class="bi bi-0-circle">A</i>}
            {user.role_id == 1 &&<i class="bi bi-0-circle">U</i>}
            </Link>
          }
          {'\t'}
          <button type="button" className="btn btn-danger" onClick={ev=>onDelete(user)}>Delete</button>
                
              </td>
            </tr>)

})}
          </tbody>  
        </table>

        {meta && <div>
            <div>
                <PaginationLinks meta={meta} onPageChange= {onPageChange}/>
            </div>
          </div>
        }

        
</>}
      </div>
    )    
  }
  
export default User
  