import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../../axios_client"
import { useStateContext } from "../../contexts/contextProvider";



function CataForm() {

  const {id} = useParams()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const {setNotification} = useStateContext()


  const [Cata, setCatagory] = useState({
    id: null,
    catagory : '',
  }) 

  if(id){
    useEffect(()=>{
      setLoading(true)
      axiosClient.get(`/catagories/${id}`)
      .then(({data})=>{      
        setLoading(false)
        setCatagory(data)
      })
      .catch(()=>{
        setLoading(false)
      })

    }, [])
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if(Cata.id){
      axiosClient.put(`/catagories/${Cata.id}`, Cata)
      .then(()=>{
        navigate('/catagories')
        setNotification("Catagory List Updated Successfully.")

      })
      .catch(err => {
        const response = err.response;
        if(response && response.status === 422){
          setErrors(response.data.errors);
      }
      })
    }else{
      axiosClient.post("/catagories", Cata)
      .then(()=>{
        navigate('/catagories')
        setNotification("New Catagory Added Successfully.")

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
      <div className="CataForm">
        <div className="container"> 
          {Cata.id && <h3>Updating : {Cata.catagory}</h3>}
          {!Cata.id && <h3>Add New Catagory</h3>}
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

              <label className="form-label">Catagory Name</label>
              <input value={Cata.catagory} onChange={ev=>setCatagory({...Cata, catagory:ev.target.value})} ype="text" className="form-control" id="exampleInputEmail0" placeholder="Catagoty Name" aria-describedby="emailHelp"/>
          </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                

            
          </form>}




        </div>
      </div>
    )
  }
  
  export default CataForm
  