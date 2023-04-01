import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { passwordReset } from "../../firebase/Firebase";

const PasswordReset = () => {
  const [reset, setReset] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    passwordReset(navigate, reset);
  };

  return (
    <div className="flex w-full justify-center items-center h-[90vh] ">
      <img
        src="http://images.cdn2.stockunlimited.net/preview1300/cinema-background-with-movie-objects_1823384.jpg"
        alt="bg"
        className="absolute right-0 w-[85%] h-[110vh] opacity-5"
      />

      <form onSubmit={handleSubmit} className=' md:ml-[13rem] flex flex-col bg-black pt-4 pb-4 px-10 rounded-md drop-shadow-md '>
        <h3 className="text-center text-gray-600 font-bold text-2xl pb-4">Password Reset</h3>
        <div>

          <input
            placeholder="Email..."
            type="text"
            id="email"
            onChange={(e) => setReset(e.target.value)}
            required
            className="bg-gray-700 mb-4 w-60 h-10 outline-none border-none pl-2 rounded-sm text-sm font-semibold text-gray-900 placeholder:text-gray-400 "
          />
        </div>
        <button
          className="bg-rose-800 my-2 h-10 rounded text-sm font-medium hover:bg-slate-900 hover:text-gray-400 transition-all duration-100 ease-in flex  items-center justify-center gap-x-2"
          type="submit">Submit
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
