import React, { useContext } from "react";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import { AuthContext } from "../context/AuthContextProvider";
import Login from "../components/auth/Login";
import PasswordReset from "../components/auth/PasswordReset";
import Register from "../components/auth/Register";
import Home from "../components/pages/Home";
import Movies from "../components/pages/Movie";
import TvSeries from "../components/pages/TvSeries";
import Search from "../components/pages/Search";
import MovieDetails from "../components/details/Details";


const AppRouter = () => {
  const LoginRouter = () => {
    const { currentUser } = useContext(AuthContext);

    return !currentUser ? <Outlet /> : <Navigate to="/" />;
  };
  
  return (
    // <BrowserRouter >
    <div>
      <Navbar />
      
      <Routes>

        <Route path="/" element={<Home />} exact/>
        <Route path="/movies" element={<Movies />}/>
        <Route path="/series" element={<TvSeries />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/Details/:type/:movieId" element={<MovieDetails/>}/>
        <Route path='/login' element={<Login/>}/>

        <Route path="/register" element={<LoginRouter />}>
          <Route path="" element={<Register />} />
        </Route>

        <Route path="/password-reset" element={<LoginRouter />}>
          <Route path="" element={<PasswordReset />} />
        </Route>
      </Routes>

    {/* </BrowserRouter> */}
    </div>
  );
};

export default AppRouter;