import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCategory } from "../../redux/actions/categoryActions";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AddCategory = () => {
  const [catName, setCatName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      category_name: catName,
      description: description,
    };
    console.log(data);

    const add = async () => {
      const response = await axios
        .post("http://127.0.0.1:8000/add_category/", data)
        .catch((err) => console.log(err));
      dispatch(addCategory(response.data));
    };

    if (data) {
      add();
      dispatch(addCategory(data));
      history.push("/category");
    }
  };
  return (
    <div className="container w-50 mt-4">
      <h2 className="heading mb-4">
        Add Category <hr />
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2 row">
          <label className="col-sm-4 col-form-label">Category Name</label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              name="catName"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-2 row">
          <label className="col-sm-4 col-form-label">Description</label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label className="col-sm-4 col-form-label"></label>
          <div className="col-sm-8">
            <button className="btn btn-success form-control" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
