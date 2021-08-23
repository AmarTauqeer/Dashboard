import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCategory,
  selectedCategory,
} from "../../redux/actions/categoryActions";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditCategory = () => {
  const [catName, setCatName] = useState("");
  const [description, setDescription] = useState("");
  const [catId, setCatId] = useState("");
  const dispatch = useDispatch();

  const history = useHistory();
  const { id } = useParams();

  const category = useSelector((state) => state.allCategories.category);

  useEffect(() => {
    if (id && id !== null) fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    const selectedCat = category.filter((item) => item.id === parseInt(id));
    setCatName(selectedCat[0].category_name);
    setDescription(selectedCat[0].description);
    setCatId(parseInt(id));
    dispatch(selectedCategory(selectedCat));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: catId,
      category_name: catName,
      description: description,
    };

    const update = async () => {
      const response = await axios
        .put(`http://127.0.0.1:8000/update_category/${catId}`, data)
        .catch((err) => console.log(err));

      if (response) {
        toast("data updated successfully");
        dispatch(updateCategory(data));
        history.push("/category");
      }
    };

    if (data) {
      update();
    }
  };
  return (
    <div className="container w-50 mt-4">
      <h2 className="heading mb-4">
        Update Category <hr />
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
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
