import { useEffect, useState } from "react"
import axiosClient from "../../axios_client"
import {Link } from "react-router-dom"


function Search() {

  const [filtered, setSearch] = useState('');
  const [filter_tags, setFilterTags] = useState([])
  const [filter_cata, setFilterCata] = useState([])
  console.log(filtered);

  const fetchData = (value)=>{
    
    axiosClient.get(`/catagories`)
    .then(({data})=>{
        setFilterCata(data.data)
    })
    .catch(()=>{ 
        
    })

    
    axiosClient.get(`/tags`)
    .then(({data})=>{
        setFilterTags(data.data)
    })
    .catch(()=>{ 
        
    })

  }

  const handleChange = (value)=>{
    setSearch(value);
    fetchData(value)
  }


    return (
      <div className="Search">
        
        
        
<form className="d-flex">
<input className="form-control me-2" onChange={(e)=>handleChange(e.target.value)} type="search" placeholder="Search" aria-label="Search"/>
{/* <button className="btn btn-outline-success" type="submit">Search</button> */}
</form>

{filtered &&<>
<div className="row">
    <div className="col-md-6">
<p><b>Catagories</b></p>


    {filter_cata?.map(cat => {
            return(<p>            
                <Link>{cat.catagory}</Link>
          </p>)

})}
</div>


    
    <div className="col-md-6">
<p><b>Tags</b></p>

    {filter_tags?.map(ta => {
            return(<p>            
                <Link>{ta.tag}</Link>
          </p>)

})}

    </div>
</div>


</>}

      </div>
    )
  }
  
  export default Search
  


