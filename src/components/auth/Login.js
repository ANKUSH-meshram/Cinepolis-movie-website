import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { loginWithEmail, loginWithGoogle } from "../../firebase/Firebase";

import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [login, setLogin] = useState({});
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const { email, password } = login;

    loginWithEmail(email, password, navigate);
  };

  return (
    <div className="flex justify-center items-center h-[90vh]  ">
      <img
        src="http://images.cdn2.stockunlimited.net/preview1300/cinema-background-with-movie-objects_1823384.jpg"
        alt="bg"
        className="absolute right-0 w-[85%] h-[110vh] opacity-5"
      />

      <form
        onSubmit={handleLogin}
        className=" md:ml-[13rem] flex flex-col bg-zinc-800 pt-4 pb-10 px-10 rounded-md drop-shadow-md mt-10"
      >
        <h3 className="text-center text-gray-300 font-bold text-2xl pb-10">
          Login Page
        </h3>
        <div>
          <input
            className="bg-gray-600 mb-4 w-60 h-10 outline-none border-none pl-2 rounded-sm text-sm font-semibold text-gray-400 placeholder:text-gray-400 "
            placeholder="Email..."
            type="text"
            id="email"
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            required
          />
        </div>

        <div>
          <input
            className="bg-gray-600 mb-4 w-60 h-10 outline-none border-none pl-2 rounded-sm text-sm font-semibold text-gray-400 placeholder:text-gray-400 "
            placeholder="Password..."
            type="password"
            id="password"
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            required
          />
        </div>

        <NavLink
          to="/password-reset"
          className="text-violet-500 text-sm text-center"
        >
          Forgot Password?
        </NavLink>

        <button
          type="submit"
          className="bg-gray-500 my-4 mx-2 h-10 rounded text-lg font-medium hover:bg-slate-600 text-ggra-900 hover:text-gray-400 transition-all duration-100 ease-in"
        >
          Login
        </button>

        <div className="border border-gray-800 px-2">
          {/* sign in with google */}
          <button
            onClick={() => loginWithGoogle(navigate)}
            className="bg-gray-500 my-4 h-10 rounded text-sm font-medium hover:bg-slate-600 text-gray-900 hover:text-gray-400 transition-all duration-100 ease-in flex  items-center justify-center gap-x-2 w-full"
          >
            <FcGoogle size={18} /> Continue With Google
          </button>

          {/* <h5 className="text-gray-600 text-center text-xs py-0">OR</h5> */}

          {/* register */}
          <NavLink to={'/register'}>
            <button className="bg-gray-500 my-4 h-10 rounded text-sm font-medium hover:bg-slate-600 text-gray-900 hover:text-gray-400 transition-all duration-100 ease-in flex  items-center justify-center gap-x-2 w-full">
              Register Now
            </button>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
