import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Favorite from "./pages/Favorite/Favorite";
import Create from "./pages/CreateRecipe/Create";
import FoodRecipe from "./pages/FoodRecipe/FoodRecipe";
import Search from "./pages/Search/Search";
import Error from "./pages/Error/Error";
import Navbar from "./components/Navbar/Navbar";
import Register from "./pages/Register/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/favorites" element={<Favorite />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/recipes" element={<Search />}></Route>
        <Route path="/recipes/:id" element={<FoodRecipe />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
      <Navbar />
    </BrowserRouter>
  );
}

export default App;
