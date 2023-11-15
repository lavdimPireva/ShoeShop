import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage/HomePage";
import ShoeProduct from "./HomePage/ShoeProduct";
import ShoeDetails from "./ShoeDetails/ShoeDetails";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shoe/:slug" element={<ShoeDetails />} />
        {/* other routes */}
      </Routes>
    </div>
  );
}

export default App;
