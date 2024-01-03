import React from "react";
import { Link } from "react-router-dom";

const Searchlisting = ({ stocks, mfs, etfs, setOpen }) => {
  return (
    <div className="absolute left-0 bg-slate-100 w-[100%]  rounded-md pb-3">
      <div className=" rounded-md">
        <h4 className="text-lg font-bold p-3 bg-gray-300 lg:w-full rounded-t-md sm:w-[90%]">
          Stocks
        </h4>
        <ul>
          {stocks?.length > 0 ? (
            stocks?.map((el) => {
              return (
                <Link
                  to={`/dashboard/stocks/${el?.symbol}`}
                  onClick={() => setOpen(false)}
                >
                  <li
                    key={el?.symbol}
                    className="border-b border-t border-gray-200 hover:text-white hover:bg-slate-800 p-3"
                  >
                    {el?.name}
                  </li>
                </Link>
              );
            })
          ) : (
            <li className="p-3">No Data Available</li>
          )}
        </ul>
      </div>
      <div className="">
        <h4 className="text-lg font-bold p-3 bg-gray-300 lg:w-full sm:w-[90%]">
          Mutual Funds
        </h4>
        <ul>
          {mfs?.length > 0 ? (
            mfs?.map((el, index) => {
              if (index <= 5) {
                return (
                  <Link
                    to={`/dashboard/mutual-funds/${el?.symbol}`}
                    onClick={() => setOpen(false)}
                  >
                    <li
                      key={el?.symbol}
                      className="border-b border-t border-gray-200 hover:text-white hover:bg-slate-800 p-3"
                    >
                      {el?.name}
                    </li>
                  </Link>
                );
              }
            })
          ) : (
            <li className="p-3">No Data Available</li>
          )}
        </ul>
      </div>
      <div className="">
        <h4 className="text-lg font-bold p-3 bg-gray-300 lg:w-full sm:w-[90%]">
          ETFs
        </h4>
        <ul>
          {etfs?.length > 0 ? (
            etfs?.map((el, index) => {
              if (index <= 5) {
                return (
                  <Link
                    to={`/dashboard/etfs/${el?.symbol}`}
                    onClick={() => setOpen(false)}
                  >
                    <li
                      key={el?.symbol}
                      className="border-b border-t border-gray-200 hover:text-white hover:bg-slate-800 p-3"
                    >
                      {el?.name}
                    </li>
                  </Link>
                );
              }
            })
          ) : (
            <li className="p-3">No Data Available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Searchlisting;
