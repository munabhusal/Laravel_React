import { useEffect, useState } from "react"
import axiosClient from "../../axios_client";
import {Link } from "react-router-dom"
import PaginationLinks from "./PaginationLinks";

function Catagory() {

  
  const [catagories, setCatagories] = useState([])
  const [loading, setLoading] = useState(false)
  const [meta, setMeta] = useState(false)
  const [errors, setErrors] = useState(null)

  

  useEffect(()=>{
    getCatagories();
  }, [])

  
  const onDelete = (cata) =>{
    if(!window.confirm("Are you sure you want to delete?")){
      return;
    }

    axiosClient.delete(`/catagories/${cata.id}`)
    .then(()=>{
      //to show notification

      getCatagories();
    })
  }
 
  const getCatagories= (url) => {
    url = url || "/catagories"
    setLoading(true)
    axiosClient.get(url)
    .then(({data})=>{     
      setCatagories(data.data)
      setMeta(data.meta)
      setLoading(false)
      console.log(data)
    })
    .catch(err => {
      const response = err.response;
      if(response && response.status === 403){
        console.log(err.response.data);
        setErrors(err.response.data);
    }    
    setLoading(false)
    })
  }

  const onPageChange = (link)=>{
    getCatagories(link.url)
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
          <h3>Catagories's List</h3>
          </div>
          <div className="col-3">
          <Link type="button" className="btn btn-primary" to={"/catagory/new"}>Add New</Link>
          </div>
        </div>
        
        <hr />
        
        <table className="table table-striped">

          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Catagory Name</th>
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
          {catagories?.map(cata => {
            
              return(<tr>
              <th>{cata.id}</th>
              <td>{cata.catagory}</td>
              <td>
          <Link type="button" className="btn btn-warning" to={"/catagory/"+cata.id}>Edit</Link>
          {'\t'}
          <button type="button" className="btn btn-danger" onClick={ev=>onDelete(cata)}>Delete</button>
                
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
  
  export default Catagory
  