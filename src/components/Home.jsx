import { useState, useEffect } from "react";
import React from "react";
import RecipeList from "./RecipeList";
import SidebarFilter from "./SidebarFilter"
import Header from "./HeadContents"
import HeadContents from "./HeadContents";
import Footer from "./Footer";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    fetch('/recipes.json')
      .then((response) => response.json())
      .then((response_data) => {
        setData(response_data);
        // console.log(response_data)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div>
      {/* Hamburger button */}
      <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <SidebarFilter data={data} filter={filter} setFilter={setFilter} />
      </div>

      <div className="content">
        <HeadContents />
        <RecipeList data={data} filter={filter} />
        
      </div>
      <Footer />
    </div>
  );
}

export default Home;
