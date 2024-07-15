import { Navigate , Outlet } from "react-router-dom"
import { useStateContext } from "../../contexts/contextProvider"

function GuestLayout() {

  const {token} = useStateContext()

  if(token){
    return <Navigate to="/users" />
  }

    return (
      <div className="GuestLayout">
        <div>
        For Guest users only!
        </div>
        <Outlet/>
      </div>
    )
  }
  
  export default GuestLayout