import React, { useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Category from "./pages/data-entry-forms/Category";
import Product from "./pages/data-entry-forms/Product";
import Navbar from "./components/navbar/Navbar";
import AddCategory from "./pages/data-entry-forms/AddCategory";
import EditCategory from "./pages/data-entry-forms/EditCategory";

import { FaBars } from "react-icons/fa";
import { toast } from "react-toastify";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import { useSelector } from "react-redux";

toast.configure();
function App() {
  const user_name = useSelector((state) => state.allUsers.user.user_name);

  const [isSidebar, setIsSidebar] = useState(false);

  const showSidebar = () => {
    setIsSidebar(!isSidebar);
  };

  return (
    <>
      <header>
        <FaBars onClick={showSidebar} /> Dashboard
      </header>
      <Router>
        {isSidebar && <Navbar showSidebar={showSidebar} />}
        <div className={isSidebar ? "main active" : "main"}>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          {user_name && (
            <>
              <Route exact path="/category" component={Category} />
              <Route exact path="/add-category" component={AddCategory} />
              <Route exact path="/edit-category/:id" component={EditCategory} />
              <Route exact path="/product" component={Product} />{" "}
            </>
          )}
        </div>
      </Router>
    </>
  );
}

export default App;
