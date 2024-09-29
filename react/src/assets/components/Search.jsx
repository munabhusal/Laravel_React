import { useEffect, useState } from "react"
import axiosClient from "../../axios_client"
import {Link } from "react-router-dom"


function Search() {

  const [filtered, setSearch] = useState('');
  const [filter_tags, setFilterTags] = useState([])
  const [filter_cata, setFilterCata] = useState([])
// console.log(filter_cata.length, filter_tags.length)

const clearSearch=()=>{
  setSearch('')

}

  const fetchData = (value)=>{
    
    axiosClient.get(`/search_catagory/${value}`)
    .then(({data})=>{
        setFilterCata(data.data)
    })
    .catch(()=>{         
    })

    
    axiosClient.get(`/search_tag/${value}`)
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

{filter_cata.length!==0 &&<>
    <div className="col-md-12">
<p><b>Catagories</b></p>


    {filter_cata?.map(cat => {
            return(<p>    
    <Link to={"/catagoryfeeds/"+cat.id} onClick={clearSearch}>{cat.catagory}</Link>
          </p>)

})}
</div>

</>}

{filter_tags.length!==0 &&<>

    
    <div className="col-md-12">
<p><b>Tags</b></p>

    {filter_tags?.map(ta => {
            return(<p>  
    <Link to={"/tagfeeds/"+ta.id} onClick={clearSearch}>{ta.tag}  </Link>
                        
          </p>)

})}

    </div>

    </>}
</div>


</>}

      </div>
    )
  }
  
  export default Search
  


