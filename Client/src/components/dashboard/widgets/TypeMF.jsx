import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const TypeMF = ({ name, logo, url }) => {
  return (
    <Link to={url} className="">
      <div
        className={`my-2 mx-1 p-5 rounded-md hover:cursor-pointer text-center bg-gray-100 hover:bg-gray-50 w-[10rem]`}
      >
        <div className="">
            <div className="flex justify-center items-center">
          <img src={logo} alt="" className="w-[25%]" />
            </div>
          <p className="font-semibold text-gray-500 mt-2">{name}</p>
        </div>
      </div>
    </Link>
  );
};

export default TypeMF;
