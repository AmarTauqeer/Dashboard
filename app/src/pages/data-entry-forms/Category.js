import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategory,
  deleteCategory,
} from "../../redux/actions/categoryActions";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentCsv } from "react-icons/gr";
import { BsSearch } from "react-icons/bs";
import { RiAddCircleLine } from "react-icons/ri";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";

const Category = () => {
  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(0);
  const departmentsPerPage = 10;
  const pagesVisited = pageNumber * departmentsPerPage;

  const [searchTerms, setSearchTerms] = useState("");
  const [searchResults, setSearchResults] = React.useState([]);

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
    toast("data deleted successfully");
    dispatch(deleteCategory(id));
  };

  const handleChange = (e) => {
    setSearchTerms(e.target.value);

    if (categories) {
      const results = categories.filter((cat) =>
        cat.category_name.toLowerCase().includes(e.target.value)
      );
      setSearchResults(results);
    }
  };

  let category = [];
  if (searchTerms) {
    category = searchResults;
  } else {
    category = categories;
  }

  const data = category
    .slice(pagesVisited, pagesVisited + departmentsPerPage)
    .map((cat, index) => (
      <div className="row pt-2 border" key={index}>
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

  const pageCount = Math.ceil(categories.length / departmentsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const headers = [
    { label: "ID", key: "id" },
    { label: "Category Name", key: "category_name" },
    { label: "Description", key: "description" },
  ];

  const csvReport = {
    filename: "Category.csv",
    headers: headers,
    data: categories,
  };
  return (
    <>
      <div className="container-fluid w-50 mt-4">
        <h2 className="heading">
          Category List <hr />
        </h2>
        <div className="row pb-2" align="right">
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-md"
              onChange={handleChange}
              placeholder="Enter category name"
              value={searchTerms}
            />
            <button className="btn btn-dark">
              <BsSearch size={25} />
            </button>
            <Link to="/add-category" className="nav-link">
              Add
              <RiAddCircleLine size={20} color="green" />
            </Link>
            {categories && (
              <>
                <CSVLink {...csvReport} className="nav-link">
                  Export
                  <GrDocumentCsv size={20} />
                </CSVLink>
              </>
            )}
          </div>
        </div>

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
        <div className="row border">
          <div className="col">
            <ReactPaginate
              previousLabel={"<<"}
              nextLabel={">>"}
              nextClassName={"page-item"}
              pageLinkClassName={"page-link"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"pagination"}
              previousLinkClassName={"page-link"}
              nextLinkClassName={"page-link"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
              containerClassName={"pagination"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
