import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategory,
  deleteCategory,
} from "../../redux/actions/categoryActions";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";

const Category = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => {
    return state.allCategories.category;
  });

  const fetchCategories = async () => {
    const response = await axios
      .get("http://127.0.0.1:8000/all_category/")
      .catch((err) => console.log(err));
    dispatch(setCategory(response.data));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  //delete handler
  const deleteHandler = (id) => {
    const deleteCat = async () => {
      const response = await axios
        .delete("http://127.0.0.1:8000/delete_category/" + id)
        .catch((err) => console.log(err));
    };

    deleteCat();
    dispatch(deleteCategory(id));
  };

  const data = categories.map((cat, index) => (
    <div className="row pt-2" key={index}>
      <div className="col-md-2">{cat.id}</div>
      <div className="col-md-3">{cat.category_name}</div>
      <div className="col-md-4">{cat.description}</div>
      <div className="col-md-3">
        <Link to={`/edit-category/${cat.id}`}>
          <FiEdit size={20} color="orange" />
        </Link>
        <button
          type="button"
          className="btn"
          onClick={() => deleteHandler(cat.id)}
        >
          <AiFillDelete size={20} color="red" />
        </button>
      </div>
    </div>
  ));

  return (
    <>
      <div className="container w-50 mt-4">
        <h2 className="heading">
          Category List <hr />
        </h2>
        <Link to="/add-category">
          <IoAdd size={30} color="green" />
        </Link>
        <div className="row pb-2 bg-dark text-white">
          <div className="col-md-2">
            <label>ID</label>
          </div>
          <div className="col-md-3">
            <label>CATEGORY NAME</label>
          </div>
          <div className="col-md-4">
            <label>DESCRIPTION</label>
          </div>

          <div className="col-md-3">
            <label>ACTION</label>
          </div>
        </div>
        {categories.length === 0 && <div>There is no record to show</div>}
        {categories && data}
      </div>
    </>
  );
};

export default Category;
