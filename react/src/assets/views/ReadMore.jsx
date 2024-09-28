import {useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axiosClient from "../../axios_client";


function ReadMore() {

const {id} = useParams()
const [loading, setLoading] = useState(false)
const [doc, setDoc] = useState([])
const [mycata, setMyCata] = useState([])
const [mytags, setMyTags] = useState([])
const [myuser, setMyUser] = useState([])


useEffect(()=>{
  setLoading(true)  
  axiosClient.get(`/blogs/${id}`)
  .then(({data})=>{      
    setLoading(false)
    setDoc(data.result)
    setMyCata(data.result.catagory)
    setMyTags(data.result.tag)
    setMyUser(data.result.user)
  })
  .catch(()=>{
    setLoading(false)
  })

}, [])


    return (

      <div className="ReadMore">


{loading && <div class="alert alert-dark " role="alert">
            Loading..
          </div>
          }

        <div className="container">
      
        <div class="card">
  <div class="card-body">
    <h5 class="card-title">{doc.title}</h5>
  <img src="..." class="card-img-top" alt="..."/>
    {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
  </div>
<hr />

  <p>{doc.body}</p>
<hr />

  <div class="card-body">
    <b>Author: </b>
  <a href="#" class="card-link">{myuser.name}</a>

    <br />
    <b>Catagory: </b>
  <a href="#" class="card-link">{mycata.catagory}</a>

    <br />

    <b>Tags: </b>

    {mytags?.map(tag => { 
                  return(
                    <a href="#" class="card-link">
                        {tag.tag}
                    </a>
            )
            })}




  </div>
</div>


        </div>
      </div>
    )
  }
  
  export default ReadMore
  