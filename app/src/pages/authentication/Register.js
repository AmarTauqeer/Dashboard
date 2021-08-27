import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addUser } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const dispatch = useDispatch();

  const history = useHistory();

  const handleCancelExit = () => {
    history.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user || !pass) {
      toast("Please fill all required fields");
      return false;
    }
    const data = {
      user_name: user,
      user_password: pass,
    };

    const add = async () => {
      const response = await axios
        .post("http://127.0.0.1:8000/add_user/", data)
        .catch((err) => console.log(err));
      dispatch(addUser(response.data));
    };

    if (data) {
      add();
      toast("data saved successfully");
      dispatch(addUser(data));
      history.push("/login");
    }
  };
  return (
    <div className="container w-50 mt-4">
      <br />
      <br />
      <h2 className="heading mb-4">
        Registration <hr />
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
          <div className="d-flex align-items-center justify-content-center col-sm-8">
            <button type="submit" className="btn btn-secondary btn-sm col-sm-4">
              Register
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm col-sm-4"
              onClick={handleCancelExit}
            >
              Cancel/Exit
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm col"
              onClick={() => {
                history.push("/login");
              }}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
