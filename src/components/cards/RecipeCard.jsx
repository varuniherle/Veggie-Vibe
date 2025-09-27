import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./card.css";

function RecipeCard() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(process.env.PUBLIC_URL+"/recipes.json")
            .then((res) => res.json())
            .then((data) => {
                const selected = data.find((r) => r.id === parseInt(id));
                setRecipe(selected);
            });
    }, [id]);

    if (!recipe) return <h2>Loading...</h2>;

    return (
        <div className="content">
            <button className='vegan-btn' onClick={() => navigate(-1)} >
                ← Back
            </button>
            <div className="recipe">
            <h1>{recipe.name}</h1>
            <h2> Type: {recipe.category} </h2>
            <h2>Ingredients</h2>

            <ul>
                {recipe.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <h2>Instructions</h2>
            <ul>
                {recipe.instructions.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            </div>

        </div>
    );
}

export default RecipeCard;
