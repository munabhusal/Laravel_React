import { useEffect, useState } from "react"
import axiosClient from "../../axios_client";
import {Link } from "react-router-dom"

function User() {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    getUsers();
  }, [])

  const onDelete = (user) =>{
    if(!window.confirm("Are you sure you want to delete?")){
      return;
    }

    axiosClient.delete(`/users/${user.id}`)
    .then(()=>{
      //to show notification

      getUsers();
    })
  }
 

  const getUsers= () => {
    setLoading(true)
    axiosClient.get("/users")
    .then(({data})=>{
      setLoading(false)      
      setUsers(data.data)
    })
    .catch(()=>{
      setLoading(false)
    })
  }
    return (
      <div className="container">
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
              <td colSpan={4} className="text-center">Loading...</td>
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
          <button type="button" className="btn btn-danger" onClick={ev=>onDelete(user)}>Delete</button>
                
              </td>
            </tr>)

})}
          </tbody>  
        </table>


      </div>
    )
  }
  
  export default User
  