import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../../axios_client"
import { useStateContext } from "../../contexts/contextProvider";


function MyPostForm() {

  const {id} = useParams()
  const navigate = useNavigate();
  const [tags, setTags] = useState([])
  const [cata, setCata] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const {setNotification} = useStateContext()
  
  const [tag, setMyTags]= useState([]);
  const [image, setImg] = useState('');
  const [Post, setPost] = useState({
    id: null,
    title : '',
    body: '',
    catagory_id:'',
    status:''
  }) 

  useEffect(()=>{
    if(id){
      loaddata(id)
    }
    loadcata()
    loadtags()

  }, [])

  
  const handleTagChange = (e)=>{
    const value = e.target.value;
    const checked = e.target.checked;
    if(checked){
      setMyTags([...tag, value])   
    }else{
      setMyTags([...tag.filter( (e) => (e!==value) )]);
    }
  }

  const loadcata=()=>{
    setLoading(true)
    axiosClient.get(`/catagories`)
    .then(({data})=>{  
      // console.log(data)    
      setLoading(false)
      setCata(data.data)
    })
    .catch(()=>{ 
      setLoading(false)
    })    
  }

  const loadtags=()=>{
    setLoading(true)
    axiosClient.get(`/tags`)
    .then(({data})=>{  
      // console.log(data)    
      setLoading(false)
      setTags(data.data)
    })
    .catch(()=>{ 
      setLoading(false)
    })
    
  }

  const loaddata=(id)=>{
      setLoading(true)
      axiosClient.get(`/getMyPostWithId/${id}`)
      .then(({data})=>{  
        // console.log(data.data)    
        setLoading(false)
        setPost(data.data)
      })
      .catch(()=>{
        // console.log(Post)  
        setLoading(false)
      })
  }

  const handleFileChange = (e) =>{
    setImg(target.files[0]);
    // console.log(image)

  }

  const onSubmit = (ev) => {
    const request_data = {...Post, 'tag':tag, 'image':image}


    // console.log(request_data)
    ev.preventDefault();
  
    if(request_data.id){
      axiosClient.put(`/blogs/${request_data.id}`, request_data)
      .then(()=>{
        navigate('/mypost')
        setNotification("Blog Updated Successfully.")      

      })
      .catch(err => {
        const response = err.response;
        if(response && response.status === 422){
          setErrors(response.data.errors);
      }
      })
    }else{
      axiosClient.post("/blogs", request_data)
      .then(()=>{
        navigate('/mypost')
        setNotification("New Blog Added Successfully.")      

      
      })
      .catch(err => {
        // console.log(Post)
        const response = err.response;
        if(response && response.status === 422){
          setErrors(response.data.errors);
      }
      })

    }
  }

    return (
      <div className="PostForm">
        <div className="container"> 
          {Post.id && <h3>Updating : {Post.name}</h3>}
          {!Post.id && <h3>New Post</h3>}

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
            <label className="form-label">Title</label>
            <input value={Post.title} onChange={ev=>setPost({...Post, title:ev.target.value})} type="text" className="form-control" placeholder="Enter Title"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Body</label>
            <input value={Post.body} onChange={ev=>setPost({...Post, body:ev.target.value})} type="text" className="form-control" placeholder="Enter Body" />
          </div>

          <div className="mb-3">
            <label className="form-label">Image</label>
            <input onChange={handleFileChange} type="file" className="form-control"  aria-describedby="file"/>
          </div>

   

          <div className="mb-3">
            <label className="form-label">Select Catagory</label>
            <select class="form-select" aria-label="Default select example" name="catagory_id" onChange={ev=>setPost({...Post, catagory_id:ev.target.value})}>
              
              {!Post.id && <option selected>Open this select menu</option>}

              {cata?.map(cat => { 
                  return( 
                    <option value={cat.id} onChange={ev=>setPost({...Post, catagory_id:ev.target.value})} >{cat.catagory}{...Post.catagory_id == cat.id ? '--- Selected':'' }</option>
                  )
                })}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <input value={Post.status} onChange={ev=>setPost({...Post, status:ev.target.value})} type="number" className="form-control"  placeholder="Enter Status" />
          </div>


          <div className="mb-3">
            <div className="row">
            <label className="form-label">Select Tag</label>
            {tags?.map(tag => { 
                  return(
                    <div className="col-md-3">
                        <input type="checkbox" name="tag" id="id" value={tag.id} onChange={handleTagChange}/>
                        <label className="form-label">{tag.tag}</label>
                    </div>
            )
            })}

            </div>
            {/* <input value={Post.body} onChange={ev=>setPost({...Post, body:ev.target.value})} type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter Tags" aria-describedby="emailHelp"/> */}
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
            
          </form>}


        </div>
      </div>
    )
  }
  
  export default MyPostForm
  