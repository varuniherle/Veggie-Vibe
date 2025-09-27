import React from 'react'

function SidebarFilter({ data, filter, setFilter }) {
  const categories = Array.from(
    new Set(data.flatMap((recipe) => recipe.category))
  );
  const handleChange = (category) => {
    if (filter.includes(category)) {
      setFilter(filter.filter((f) => f !== category)); // remove
    } else {
      setFilter([...filter, category]); // add
    }
  };
  return (
    <div>
      {categories.map((cat) => (
        <label key={cat} className="checkbox-item">
          <input
            type="checkbox"
            checked={filter.includes(cat)}
            onChange={() => handleChange(cat)}
          />
          {cat}
        </label>
      ))}

    </div>
  )
}

export default SidebarFilter
