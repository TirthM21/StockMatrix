import React from "react";
import { Link } from "react-router-dom";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { BiListCheck } from "react-icons/bi";

const EtfCards = ({
  name,
  symbol,
  priceChange,
  perChange,
  price,
  setModal,
  setSymbol,
  setName,
  setPrice,
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
          <h2 className={`text-xl font-bold`}>
            {name?.length > 20 ? name?.substring(0, 20) + "..." : name}
          </h2>
        </div>
        <div className="flex justify-between items-center w-[40%]">
          {/* <p className={``}>{symbol}</p> */}
          <p className={` font-semibold`}>₹{price}</p>
          {priceChange > 0 ? (
            <p className={` text-green-500 font-semibold`}>{priceChange}</p>
          ) : priceChange < 0 ? (
            <p className={` text-red-500 font-semibold`}>{priceChange}</p>
          ) : (
            <p className={` text-gray-800 font-semibold`}>{priceChange}</p>
          )}
          {perChange > 0 ? (
            <p className={` text-green-500 font-semibold`}>{perChange}%</p>
          ) : perChange < 0 ? (
            <p className={` text-red-500 font-semibold`}>{perChange}%</p>
          ) : (
            <p className={` text-gray-800 font-semibold`}>{perChange}</p>
          )}
        </div>
        <div className="w-[20%] flex justify-between">
          <button
            className="p-1 px-3 text-white bg-green-700 text-sm rounded-sm"
            onClick={() => {
              setSymbol(symbol);
              setModal(true);
              setName(name);
              setPrice(price);
            }}
          >
            Buy
          </button>
          <Link to={`/dashboard/etfs/${symbol}`}>
            <button className="p-1 px-3 text-white bg-gray-700 text-sm rounded-sm">
              Details
            </button>
          </Link>
          {isWatch ? (
            <button
              onClick={() => {
                if (rWatchlist) {
                  removeWatchlist({
                    type: "etfs",
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
                  type: "etfs",
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

export default EtfCards;
