import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage/HomePage";
import ShoeProduct from "./HomePage/ShoeProduct";
import ShoeDetails from "./ShoeDetails/ShoeDetails";
import MenShoesPage from "./MenShoes/MenShoesPage";
import FemaleShoesPage from "./FemaleShoes/FemaleShoesPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shoe/:slug" element={<ShoeDetails />} />
        <Route path="/Men-shoes" element={<MenShoesPage />} />
        <Route path="/Female-shoes" element={<FemaleShoesPage />} />
      </Routes>
    </div>
  );
}

export default App;
