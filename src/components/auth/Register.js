import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, loginWithGoogle } from "../../firebase/Firebase";

import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [register, setRegister] = useState({});
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, surname, email, password } = register;
    createUser(name, surname, email, password, navigate);
  };

  return (
    <div className="flex w-full justify-center h-[90vh] items-center">
      <img
        src="http://images.cdn2.stockunlimited.net/preview1300/cinema-background-with-movie-objects_1823384.jpg"
        alt="bg"
        className="absolute right-0 w-[85%] h-[110vh] opacity-5"
      />

      <form
        onSubmit={handleRegister}
        className=" md:ml-[13rem] flex flex-col bg-black pt-4 pb-10 px-10 rounded-md drop-shadow-md "
      >
        <h3 className="text-center text-gray-600 font-bold text-2xl pb-6">
          Register Page
        </h3>
        <div>
          <input
            className="bg-gray-700 mb-4 w-60 h-10 outline-none border-none pl-2 rounded-sm text-sm font-semibold text-gray-900 placeholder:text-gray-400 "
            placeholder="Enter your first name."
            type="text"
            id="firstName"
            onChange={(e) => setRegister({ ...register, name: e.target.value })}
            required
          />
        </div>

        <div>
          <input
            className="bg-gray-700 mb-4 w-60 h-10 outline-none border-none pl-2 rounded-sm text-sm font-semibold text-gray-900 placeholder:text-gray-400 "
            placeholder="Enter your last name."
            type="text"
            id="lastName"
            onChange={(e) =>
              setRegister({ ...register, surname: e.target.value })
            }
            required
          />
        </div>

        <div>
          <input
            className="bg-gray-700 mb-4 w-60 h-10 outline-none border-none pl-2 rounded-sm text-sm font-semibold text-gray-900 placeholder:text-gray-400 "
            placeholder="Email..."
            type="text"
            id="email"
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
            required
          />
        </div>

        <div>
          <input
            className="bg-gray-700 mb-4 w-60 h-10 outline-none border-none pl-2 rounded-sm text-sm font-semibold text-gray-900 placeholder:text-gray-400 "
            placeholder="Password..."
            type="password"
            id="password"
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
            required
          />
        </div>
        <button
          type="submit"
          className="bg-gray-700 my-4 h-10 rounded text-lg font-medium hover:bg-slate-900 hover:text-gray-400 transition-all duration-100 ease-in"
        >
          Register
        </button>

        <button
          className="bg-rose-900/70 my-4 h-10 rounded font-medium hover:bg-slate-900 hover:text-gray-400 transition-all duration-100 ease-in flex items-center justify-center gap-x-1 "
          onClick={() => loginWithGoogle(navigate)}
        >
          <FcGoogle /> Register With Google
        </button>
      </form>
    </div>
  );
};

export default Register;
