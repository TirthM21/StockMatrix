import React from "react";
import { Link } from "react-router-dom";

const TopStocks = ({ name, ltp, priceChange, link }) => {
  return (
    <>
      <div className='flex justify-between items-center p-4 border bg-gray-50 overflow-hidden'>
        <div>
          <Link to={link}>
            <h2 className={`text-sm font-bold me-3`}>{name}</h2>
          </Link>
        </div>
        <div className='flex justify-around items-center w-[58%]'>
          <p className={` text-xs font-semibold`}>₹{ltp}</p>
          {priceChange > 0 ? (
            <p className={` text-green-500 font-semibold text-xs `}>
              {priceChange}%
            </p>
          ) : (
            <p className={` text-red-500 font-semibold text-xs `}>
              {priceChange}%
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default TopStocks;
