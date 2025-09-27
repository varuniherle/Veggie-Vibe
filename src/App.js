import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import RecipeCard from './components/cards/RecipeCard';
function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeCard />} />
      </Routes>
    </Router>
  );
}

export default App;
