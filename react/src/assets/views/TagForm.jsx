import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../../axios_client"
import { useStateContext } from "../../contexts/contextProvider";

function TagForm() {

  const {id} = useParams()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const {setNotification} = useStateContext()

  const [Tag, setTag] = useState({
    id: null,
    tag : '',
  }) 

  if(id){
    useEffect(()=>{
      setLoading(true)  
      axiosClient.get(`/tags/${id}`)
      .then(({data})=>{      
        setLoading(false)
        setTag(data)
      })
      .catch(()=>{
        setLoading(false)
      })

    }, [])
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if(Tag.id){
      axiosClient.put(`/tags/${Tag.id}`, Tag)
      .then(()=>{
        navigate('/tags')
        setNotification("Tag Updated Successfully.")

      })
      .catch(err => {
        const response = err.response;
        if(response && response.status === 422){
          setErrors(response.data.errors);
      }
      })
    }else{
      axiosClient.post("/tags", Tag)
      .then(()=>{
        navigate('/tags')
        setNotification("Tag Added Successfully.")

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
      <div className="TagForm">
        <div className="container"> 
          {Tag.id && <h3>Updating : {Tag.tag}</h3>}
          {!Tag.id && <h3>Add New Tag</h3>}
          <hr />

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

              <label className="form-label">Tag Name</label>
              <input value={Tag.tag} onChange={ev=>setTag({...Tag, tag:ev.target.value})} ype="text" className="form-control"  placeholder="Tag Name"/>
          </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                

            
          </form>}




        </div>
      </div>
    )
  }
  
  export default TagForm
  