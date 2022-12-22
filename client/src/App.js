import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Favorite from "./pages/Favorite/Favorite";
import CreateRecipe from "./pages/CreateRecipe/CreateRecipe";
import FoodRecipe from "./pages/FoodRecipe/FoodRecipe";
import Search from "./pages/Search/Search";
import Error from "./pages/Error/Error";
import Register from "./pages/Register/Register";
import ProtectedRoute from "./pages/ProtectedRoute";
import Account from "./pages/Account/Account";
import PersonalRecipes from "./pages/PersonalRecipes/PesonalRecipes";
import RecipesFound from "./pages/RecipesFound/RecipesFound";

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorite />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/myrecipes"
          element={
            <ProtectedRoute>
              <PersonalRecipes />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateRecipe />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/searchedrecipes"
          element={
            <ProtectedRoute>
              <RecipesFound />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/recipes/:id"
          element={
            <ProtectedRoute>
              <FoodRecipe />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        ></Route>

        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
