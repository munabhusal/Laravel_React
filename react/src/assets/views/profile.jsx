import { useEffect, useState } from "react";
import axiosClient from "../../axios_client";


function Profile() {

  const [profile, setProfile] = useState([])

  useEffect(()=>{
    getProfile();
  }, [])
  
  const getProfile= () => {
    axiosClient.get('/user')
    .then(({data})=>{
        setProfile(data.user)
        // console.log(data.user.role.role)
    })
    .catch(err => {
      const response = err.response;
      if(response && response.status === 403){
        setErrors(err.response.data);
    }
    })
  }


    return (
      <div className="Profile">
        <br />
        <div className="container">
            <h5>My Profile</h5>
            <div className="row">
                <div className="col-md-6">
                    <div class="card w-100 border-light mb-3">
                        <div class="card-body ">
                            <p class="card-text">Name</p>
                            <p class="card-text">E-mail</p>
                            <p class="card-text">Role</p>
                            <p class="card-text">Status</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div class="card w-100 border-light mb-3">
                        <div class="card-body">
                            <p class="card-text">{profile.name}</p>
                            <p class="card-text">{profile.email}</p>
                            <p class="card-text">{profile.role_id}</p>
                            <p class="card-text">{profile.is_blocked}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      
    )   
  }
  
  export default Profile
  