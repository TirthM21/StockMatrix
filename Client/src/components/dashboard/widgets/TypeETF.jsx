import React from "react";
import { Link } from "react-router-dom";

const TypeETF = ({ name, logo, url }) => {
  return (
    <>
      <Link to={url} className=''>
        <div
          className={`my-2 mx-1 p-5 rounded-md hover:cursor-pointer text-center bg-gray-100 hover:bg-gray-50 w-[10rem] h-32`}
        >
          <div className=''>
            <div className='flex justify-center items-center'>{logo}</div>
            <p className='font-semibold text-gray-500 mt-2'>{name}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default TypeETF;
