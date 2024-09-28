import { useEffect, useState } from "react"
import axiosClient from "../../axios_client";
import {Link } from "react-router-dom"
import PaginationLinks from "./PaginationLinks";
import { useStateContext } from "../../contexts/contextProvider";

function MyPost() {

  const [myposts, setMyPost] = useState([])
  const [loading, setLoading] = useState(false)
  const [meta, setMeta] = useState(false)
  const [errors, setErrors] = useState(null)
  const {setNotification} = useStateContext()

  useEffect(()=>{
    getMyPost();
  }, [])

  const onDelete = (post) =>{
    if(!window.confirm("Are you sure you want to delete?")){
      return;
    }

    axiosClient.delete(`/blogs/${post.id}`)
    .then(()=>{
      getMyPost();
      setNotification("Blog Deleted Successfully.")      
    })
  }
 
  const getMyPost= (url) => {
    url = url || "/mypost"
    setLoading(true)
    axiosClient.get(url)
    .then(({data})=>{     
      setMyPost(data.data)
      setMeta(data.meta)
      setLoading(false)
      // console.log(data)
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
    getMyPost(link.url)
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
          <h3>MyPost List</h3>
          </div>
          <div className="col-3">
          <Link type="button" className="btn btn-primary" to={"/blogs/new"}>Add New</Link>
          </div>
        </div>
        
        <hr />
        

          {loading && <div class="alert alert-dark " role="alert">
            Loading..
          </div>
          }

<div>
{myposts?.map(post => {

  return(<div class="card mb-3">
    
    {/* <img class="card-img-top" src="..." alt="Card image cap"> */}
    <div class="card-body">
      <h5 class="card-title">{post.title}</h5>
      <p class="card-text">{post.body}</p>
      <Link to={"/blogs/readmore/"+post.id}>Read more</Link>

      <small class="text-muted"> || </small>
      
      <Link to={"/blogs/"+post.id}>Edit</Link>
      <small class="text-muted"> || </small>

      <button onClick={ev=>onDelete(post)}>Delete</button>

        <small class="text-muted"> || {post.created_at}</small>
        
    </div>
    
  </div>);

})}

</div>


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
  
export default MyPost