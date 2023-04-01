import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { useContext } from "react";

const PrivateRouter = () => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRouter;