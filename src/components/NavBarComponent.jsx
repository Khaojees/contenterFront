import { getUser,logout } from "../services/authorize";
import {Link,useNavigate} from "react-router-dom";
import weblogo from "../assets/Contenter.svg";
const NavBarComponent = () => {
  const navigate = useNavigate()
  return (
    <nav className="d-flex justify-content-between align-items-center bg-dark">
        <div className="p-3 w-auto d-flex justify-content-start align-items-center ">
        <Link to="/">
        <img src={weblogo} alt="" className="" style={{width:"150px"}}/>
          </Link>          
          <Link to="/" className="nav-link text-light px-3">
            หน้าแรก
          </Link>
        </div>
      <ul className="nav">
        {getUser() && 
        <li className="nav-item pr-3">
          <Link to="/create" className="nav-link text-light ">
            เขียนบทความ
          </Link>
        </li>
        }
        {!getUser() && 
          <li className="nav-item pr-3">
            <Link to="/login" className="nav-link text-light">
              เข้าสู่ระบบ
            </Link>
          </li>
        }
        {getUser() && 
          <li className="nav-item pr-3">
            <button className="nav-link text-light"
            onClick={()=>{logout(()=>{
                  navigate('/')
                  window.location.reload();
                  })}}>
              ออกจากระบบ
            </button>
          </li>
        }
      </ul>
    </nav>
  );
};

export default NavBarComponent;
