import { Navigate, Outlet} from "react-router-dom"
import { useStateContext } from "../../contexts/contextProvider"
import HeaderDefault from "./HeaderDefault"


function DefaultLayout() {

  const {token} = useStateContext()

  if(!token){
    return <Navigate to="/login" />
  }

    return (
      <div className="DefaultLayout" id="defaultLayout">
        <header>
         <HeaderDefault/>
         </header>

        <main>
          <Outlet/>
          Hello World!
        </main>

        
      </div>
    )
  }
  
  export default DefaultLayout
  