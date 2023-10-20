import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate } from "../services/authorize";
import { useNavigate } from "react-router-dom";
import NavBarComponent from "./NavBarComponent";
import { getUser } from "../services/authorize";
function LoginComponent() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const { username, password } = state;

  const inputValue = (name, e) => {
    setState({ ...state, [name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_REACT_APP_API}/login`, {
        username,
        password,
      })
      .then((res) => {
        // console.log(res)
        authenticate(res, () => {
          navigate("/create");
        });
      })
      .catch((err) => {
        Swal.fire("Error", err.response.data.err, "error");
      });
  };

  useEffect(() => {
    getUser() && navigate("/");
  }, []);
  return (
    <div>
      <NavBarComponent />
      <div className="container">
        <h1>เข้าสู่ระบบ | Admin</h1>
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => inputValue("username", e)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => inputValue("password", e)}
            />
          </div>
          <br />
          <input type="submit" value="Login" className="btn btn-primary" />
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;
