import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { selectedUser } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

const Login = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleCancelExit = () => {
    history.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user || !pass) {
      toast("Please fill all the requird fields.");
      return false;
    }

    // send data to django
    if (user && pass) {
      const data = {
        user_name: user,
        user_password: pass,
        is_admin: isAdmin,
      };

      axios.post("http://127.0.0.1:8000/check_user/", data).then((res) => {
        if (res.data === "Found") {
          dispatch(selectedUser(data));

          history.push({
            pathname: "/",
          });
          toast("Login successful");
        } else {
          toast("Invalid user credentials.");
        }
      });
    }
  };

  return (
    <div className="container-fluid w-50 mt-4">
      <br />
      <br />
      <h2 className="heading mb-4">
        Login <hr />
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group row mb-2">
          <label className="col-sm-4 col-form-label">User Name:</label>
          <div className="col-sm-8">
            <input
              name="user_name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="form-control form-control-md"
            />
          </div>
        </div>
        <div className="form-group row mb-2">
          <label className="col-sm-4 col-form-label">Password:</label>
          <div className="col-sm-8">
            <input
              name="user_password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="form-control form-control-md"
              type="password"
            />
          </div>
        </div>
        <div className="form-group row mb-2">
          <label className="col-sm-4 col-form-label"></label>
          <div className="col-sm-8">
            <button type="submit" className="btn btn-success btn-sm col-md-2">
              Login
            </button>

            <button
              type="button"
              className="btn btn-primary btn-sm col-md-2 m-1"
              onClick={handleCancelExit}
            >
              Cancel/Exit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
