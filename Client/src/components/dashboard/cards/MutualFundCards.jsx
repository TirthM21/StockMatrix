import React from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { BiListCheck } from "react-icons/bi";
import { Link } from "react-router-dom";

const MutualFundCards = ({
  name,
  price,
  symbol,
  oneYear,
  fiveYear,
  setName,
  setModal,
  setSymbol,
  setPrice,
  setOneYear,
  addToWatchlist,
  removeWatchlist,
  rWatchlist,
  isWatch,
  id,
}) => {
  return (
    <>
      <div className="flex justify-between items-center p-4 border bg-gray-50 mb-4">
        <div>
          <h2 className={`text-xl font-bold`}>{name?.substring(0, 35)}..</h2>
        </div>
        <div className="flex justify-between items-center w-[25%]">
          <p className={` font-semibold`}>{price}</p>
          {oneYear > 0 ? (
            <p className={` text-green-500 font-semibold`}>
              {parseFloat(oneYear).toFixed(2)}%
            </p>
          ) : oneYear < 0 ? (
            <p className={` text-red-500 font-semibold`}>
              {parseFloat(oneYear).toFixed(2)}%
            </p>
          ) : (
            <p className="font-semibold">N/A</p>
          )}
          {fiveYear > 0 ? (
            <p className={` text-green-500 font-semibold`}>
              {parseFloat(fiveYear).toFixed(2)}%
            </p>
          ) : fiveYear < 0 ? (
            <p className={` text-red-500 font-semibold`}>
              {parseFloat(fiveYear).toFixed(2)}%
            </p>
          ) : (
            <p className="font-semibold">N/A</p>
          )}
        </div>
        <div className="w-[15%] flex justify-between">
          <button
            onClick={() => {
              setName(name);
              setModal(true);
              setSymbol(symbol);
              setPrice(price);
              setOneYear(oneYear);
            }}
            className="p-1 px-3 text-white bg-green-700 text-sm rounded-sm"
          >
            Buy
          </button>
          <Link to={`/dashboard/mutual-funds/${symbol}`}>
            <button className="p-1 px-3 text-white bg-gray-700 text-sm rounded-sm">
              Details
            </button>
          </Link>
          {isWatch ? (
            <button
              onClick={() => {
                if (rWatchlist) {
                  removeWatchlist({
                    type: "mutual_funds",
                    id,
                  });
                }
              }}
              className="p-1 px-1 text-white bg-slate-200 text-sm rounded-sm"
            >
              <BiListCheck className="text-green-600 text-lg" />
            </button>
          ) : (
            <button
              onClick={() =>
                addToWatchlist({
                  name,
                  symbol,
                  type: "mutual_funds",
                })
              }
              className="p-1 px-1 text-white bg-slate-200 text-sm rounded-sm"
            >
              <MdOutlinePlaylistAdd className="text-black text-lg" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default MutualFundCards;
