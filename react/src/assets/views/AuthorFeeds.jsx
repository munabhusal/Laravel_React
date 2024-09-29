import { useEffect, useState } from "react"
import axiosClient from "../../axios_client";
import {Link , useParams} from "react-router-dom"
import PaginationLinks from "./PaginationLinks";


function AuthorFeeds() {

  const {id} = useParams()
  const [myposts, setMyPost] = useState([])
  const [loading, setLoading] = useState(false)
  const [meta, setMeta] = useState(false)
  const [errors, setErrors] = useState(null)


  useEffect(()=>{
    getMyPost();
  }, [])

 
  const getMyPost= () => {
    setLoading(true)
    axiosClient.get(`author_feeds/${id}`)
    .then(({data})=>{     
      setMyPost(data.data)
      setMeta(data.meta)
      setLoading(false)
      console.log(data)
    })
    .catch(err => {
      const response = err.response;
      console.log(err.response.data);

      if(response && response.status === 403){
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
      
    {/* <a href="#" class="card-link">Read more</a> */}

        
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
  
export default AuthorFeeds