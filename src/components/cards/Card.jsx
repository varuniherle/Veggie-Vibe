
import "./card.css";

import { useNavigate } from "react-router-dom"
function Card({recipe }) {
       const navigate = useNavigate();

  const goToDetails = () => {
    // Navigate to recipe page with recipe id
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <div className="vegan-card">
      <h3>{recipe.name}</h3>
      <p>{recipe.category}</p>
      <button className="vegan-btn" onClick={goToDetails}>Learn More</button>
      
    </div>
  );
}

export default Card;
