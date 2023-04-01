/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

// icons
import { HiMenuAlt1, HiX } from "react-icons/hi";
import {
  FaUserCircle,
  FaInstagram,
  FaGithub,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { BiSearch, BiMoviePlay } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { MdMonitor } from "react-icons/md";
// =============

import { auth } from "../../firebase/Firebase";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";

function Navbar() {
  const [activemobile, setActivemobile] = useState(false);
  const [user, setUser] = useAuthState(auth);

  // console.log(user)

  return (
    <div>
      {/* mobilebutton */}
      <button
        className="z-50 text-3xl text-black fixed right-0 bottom-0 m-6 p-4 duration-150 rounded-full active:scale-90 bg-white block md:hidden"
        onClick={() => setActivemobile(!activemobile)}
      >
        {activemobile ? <HiX /> : <HiMenuAlt1 />}
      </button>

      <nav
        className={`${
          activemobile ? "block" : "hidden"
        } fixed top-0 bg-black/90 md:bg-black h-full w-full md:w-[15rem] z-40 md:block`}
      >
        <motion.div
          animate={{ scale: 1 }}
          initial={{ scale: 0 }}
          transition={{ duration: 0.4 }}
        >
          <NavLink
            to="/"
            className="logo flex flex-col justify-center items-center m-7 gap-2"
            onClick={() => setActivemobile(!activemobile)}
          >
            <h3 className="flex md:flex-col items-center md:text-5xl text-6xl font-['Niconne'] tracking-wide bg-transparent hover:drop-shadow-md font-light text-gray-400 hover:text-gray-700 active:text-gray-500 border-b border-gray-700 ">
              <span className="text-5xl pb-2">🎬</span>
              CinePolis
            </h3>
          </NavLink>
        </motion.div>

        <ul className="md:text-base text-xl text-gray-400 font-semibold md:relative md:left-14 py-4 flex flex-col items-center md:items-start md:gap-y-8 gap-y-10">
          <NavLink to="/">
            <li
              className="flex items-center hover:text-gray-500 active:text-gray-500 gap-x-2"
              onClick={() => setActivemobile(!activemobile)}
            >
              <AiFillHome size={20} />
              Home
            </li>
          </NavLink>

          <NavLink to="/movies">
            <li
              className="flex items-center hover:text-gray-500 active:text-gray-500 gap-x-2"
              onClick={() => setActivemobile(!activemobile)}
            >
              <BiMoviePlay size={20} />
              Movies
            </li>
          </NavLink>

          <NavLink to="/series">
            <li
              className="flex items-center hover:text-gray-500 active:text-gray-500 gap-x-2"
              onClick={() => setActivemobile(!activemobile)}
            >
              <MdMonitor size={20} />
              TV Series
            </li>
          </NavLink>

          <NavLink to="/search">
            <li
              className="flex items-center hover:text-gray-500 active:text-gray-500 gap-x-2"
              onClick={() => setActivemobile(!activemobile)}
            >
              <BiSearch size={20} />
              Search
            </li>
          </NavLink>
        </ul>

        {/* Loginsection */}

        <div className="absolute bottom-7 w-full p-5 md:px-4 text-gray-400">
          {user ? (
            <>
              <div className="w-full bg-gray-900 px-5 py-3 gap-4 rounded flex items-center justify-center font-semibold border-2 border-blue-100/10">
                <img
                  src={
                    user.photoURL === null ? <FaUserCircle /> : user.photoURL
                  }
                  alt="user"
                  className="h-10 rounded-full hover:animate-pulse cursor-pointer"
                />
                <h3 className="text-sm">{user.displayName}</h3>
              </div>

              <div
                className="cursor-pointer bg-rose-700 flex justify-center items-center p-2 rounded mt-2 hover:bg-rose-900 transition-all duration-150 ease-in"
                onClick={() =>
                  auth.signOut(
                    toast.error("Logout successfully", {
                      position: "bottom-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: false,
                      progress: undefined,
                      theme: "dark",
                    })
                  )
                }
              >
                <h1>Logout</h1>
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="w-full bg-gray-900 mt-16 p-2 gap-4 rounded flex items-center justify-center font-semibold border-2 border-blue-100/10"
                onClick={() => setActivemobile(!activemobile)}
              >
                <h1>Log in</h1>
              </NavLink>
            </>
          )}
        </div>

        {/* social links */}
        <div className="flex gap-x-5 pb-3 absolute bottom-0 justify-center w-full">
          {/* github */}
          <a
            href="https://github.com/ANKUSH-meshram"
            target={"_blank"}
            rel="noreferrer"
            className="text-gray-400 hover:text-pink-800 duration-150 transition-all ease-in hover:-translate-y-1 "
          >
            <FaGithub size={20} />
          </a>
          {/* instagram */}
          <a
            href="https://www.instagram.com/aankuushhh/"
            target={"_blank"}
            rel="noreferrer"
            className="text-gray-400 hover:text-pink-800 duration-150 transition-all ease-in hover:-translate-y-1 "
          >
            <FaInstagram size={20} />
          </a>
          {/* linkedin */}
          <a
            href="https://www.linkedin.com/in/ankush-meshram-2b1739227/"
            target={"_blank"}
            rel="noreferrer"
            className="text-gray-400 hover:text-pink-800 duration-150 transition-all ease-in hover:-translate-y-1 "
          >
            <FaLinkedin size={20} />
          </a>
          {/* twitter */}
          <a
            href="https://twitter.com/AnkushM48240707"
            target={"_blank"}
            rel="noreferrer"
            className="text-gray-400 hover:text-pink-800 duration-150 transition-all ease-in hover:-translate-y-1 "
          >
            <FaTwitter size={20} />
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
