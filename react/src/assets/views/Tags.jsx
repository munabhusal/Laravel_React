import { useEffect, useState } from "react"
import axiosClient from "../../axios_client";
import {Link } from "react-router-dom"
import PaginationLinks from "./PaginationLinks";
import { useStateContext } from "../../contexts/contextProvider";

function Tags() {

  
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(false)
  const [meta, setMeta] = useState(false)
  const [errors, setErrors] = useState(null)
  const {setNotification} = useStateContext()

  

  useEffect(()=>{
    gettags();
  }, [])

  
  const onDelete = (tag) =>{
    if(!window.confirm("Are you sure you want to delete?")){
      return;
    }

    axiosClient.delete(`/tags/${tag.id}`)
    .then(()=>{
      setNotification("Tag Deleted Successfully.")


      gettags();
    })
  }
 
  const gettags= (url) => {
    url = url || "/tags"
    setLoading(true)
    axiosClient.get(url)
    .then(({data})=>{     
      setTags(data.data)
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
    gettags(link.url)
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
          <h3>Tag's List</h3>
          </div>
          <div className="col-3">
          <Link type="button" className="btn btn-primary" to={"/tags/new"}>Add New</Link>
          </div>
        </div>
        
        <hr />
        
        <table className="table table-striped">

          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Tag Name</th>
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
          {tags?.map(ta => {
            
              return(<tr>
              <th>{ta.id}</th>
              <td>{ta.tag}</td>
              <td>
          <Link type="button" className="btn btn-warning" to={"/tags/"+ta.id}>Edit</Link>
          {'\t'}
          <button type="button" className="btn btn-danger" onClick={ev=>onDelete(ta)}>Delete</button>
                
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
  
  export default Tags
  