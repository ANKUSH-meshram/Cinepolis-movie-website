import React from 'react';
import { AiFillStar } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import noimage from '../../images/no-image.jpg'


const Card = ({poster, title, type, releaseDate, rating, id, poster_path }) => {

  return (
    <NavLink to={`/Details/${type}/${id} `} >
    
    <div className='card w-[160px] md:w-[200px] h-[250px] md:h-[300px]' >
      <div className='relative rounded cursor-pointer drop-shadow-md w-full border-4 overflow-hidden h-[95%]'>
      {poster_path === null ? <img src={noimage} alt='poster' className='h-full w-full' /> : <img src={poster} alt='poster' className='h-full w-full' />}

        {/* overlay */}
        <div className='absolute left-0 top-0 z-10 w-full h-full flex flex-col justify-center items-center gap-y-4 py-12 hover:pb-14 bg-[#000000cc] text-gray-300 text-lg font-semibold opacity-0 hover:opacity-100 duration-150 transition-all ease-in hover:top-0'>

          <div className={`flex flex-col items-center justify-center ${rating > 7 ? 'text-emerald-500' :'text-yellow-500'} ${rating < 4 ? 'text-rose-700' : ""} ${!rating ? 'hidden' : ''}`}>
            <AiFillStar />
            <h5>{rating}<span className='text-gray-300'> / 10</span></h5>
          </div>
          <h3 className=''> 
            {type}
          </h3>
          <button className='border-none outline-none bg-green-600 h-10 px-4 text-sm font-semibold text-gray-200 rounded drop-shadow-md hover:bg-green-800 transition-all duration-150 ease-in'>
            View Details
          </button>
          
        </div>
      </div>

      <div className='pt-2 px-1 text-gray-300'>
        <h3 className='text-sm font-bold hover:text-gray-900 cursor-pointer active:text-gray-500'>
          {title}
        </h3>
        
        
        <h5 className=' text-[10px] font-light cursor-pointer '>
          {releaseDate}
        </h5>
        
      </div>

    </div>
    
    </NavLink>
  );
};

export default Card;