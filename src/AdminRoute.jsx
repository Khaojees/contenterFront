//This never use because it for v5
import { getUser } from "./services/authorize";
import { Outlet,Navigate } from "react-router-dom";

// const AdminRoute=({component:Component,...rest})=>(
//       <Route
//       {...rest}
//       element = {props=>
//             getUser()?
//             <Component {...props}/> :
//             <Navigate
//             to={{pathname:"/login",state:{from:props.location}}}
//             />
//       }
//       />
//       )
// export default AdminRoute

//for v6
const AdminRoute=()=>{
      return(
            getUser()? <Outlet/> : <Navigate to="/login" replace/>
      )
}
export default AdminRoute

