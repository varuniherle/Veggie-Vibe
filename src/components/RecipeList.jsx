import React, { useEffect, useState } from "react";
import Card from "./cards/Card";

function RecipeList({ data, filter }) {
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // for search input
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

  // Filter recipes based on selected categories AND search term
  useEffect(() => {
    let filtered = data;

    // Filter by category if any
    if (filter.length > 0) {
      filtered = filtered.filter((recipe) => {
        const categories = Array.isArray(recipe.category)
          ? recipe.category
          : [recipe.category];
        return categories.some((cat) => filter.includes(cat));
      });
    }

    // Filter by search term if any
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1); // reset to first page when filter/search changes
  }, [filter, searchTerm, data]);

  // Pagination logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredData.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );
  const totalPages = Math.ceil(filteredData.length / recipesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      {/* Search box */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search recipes by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "98%",
            
          }}
        />
      </div>

      {currentRecipes.length > 0 ? (
        <>
          <div>
            {currentRecipes.map((recipe, index) => (
              <Card key={index} recipe={recipe} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="pagination-content">
            <button
              className="page-btn"
              onClick={handlePrev}
              disabled={currentPage === 1}
              style={{ marginRight: "10px" }}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="page-btn"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              style={{ marginLeft: "10px" }}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <h2>No recipes found.</h2>
      )}
    </div>
  );
}

export default RecipeList;
