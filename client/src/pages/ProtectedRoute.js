import { Navigate } from "react-router-dom";
import { UserContext } from "../context/user_context";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/register" />;
  }
  return children;
};

export default ProtectedRoute;
