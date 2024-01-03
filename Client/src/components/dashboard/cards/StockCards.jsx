import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearStockCurrentPrice,
  getStocksCurrentPriceThunk,
} from "../../../features/stocks/currentPrice";
import { Link } from "react-router-dom";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { BiListCheck } from "react-icons/bi";

const StockCards = ({
  name,
  symbol,
  price,
  priceChange,
  perChange,
  setName,
  setSymbol,
  setModal,
  link,
  setPrice,
  handleWatchlist,
  rWatchlist,
  removeWatchlist,
  isWatch,
  id,
}) => {
  const [stockPrice, setStockPrice] = useState("");
  const [stockPriceChange, setStockPriceChange] = useState("");
  const [stockPerChange, setStockPerChange] = useState("");

  const { stock_price, isLoading } = useSelector(
    (state) => state.stockCurrentPriceReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (price) {
      setStockPrice(price);
    }
  }, [price]);

  useEffect(() => {
    if (priceChange) {
      setStockPriceChange(priceChange);
    }
  }, [priceChange]);

  useEffect(() => {
    if (perChange) {
      setStockPerChange(perChange);
    }
  }, [perChange]);

  useEffect(() => {
    if (symbol && price && priceChange && perChange) {
      let timeOut = setInterval(() => {
        let hour = new Date().getHours();
        if (hour < 16 && hour > 9) {
          dispatch(clearStockCurrentPrice());
          dispatch(getStocksCurrentPriceThunk(symbol));
        }
      }, 30000);

      return () => {
        clearInterval(timeOut);
      };
    }
  }, [symbol, price, priceChange, perChange]);

  useEffect(() => {
    if (
      stock_price &&
      !isLoading &&
      price &&
      priceChange &&
      perChange &&
      stock_price?.symbol === symbol
    ) {
      setStockPrice(stock_price?.curr_price);
      setStockPriceChange(stock_price?.curr_change);
      setStockPerChange(stock_price?.curr_per_change);
    }
  }, [stock_price, isLoading, price, priceChange, perChange]);

  return (
    <>
      <div className="flex justify-between items-center p-4 border bg-gray-50 mb-4">
        <div>
          <h2 className={`text-xl font-bold`}>
            {name?.length > 35 ? name.substring(0, 35) + "..." : name}
          </h2>
        </div>
        <div className="flex justify-between items-center w-[40%]">
          <p className={``}>{symbol}</p>
          <p className="font-semibold">₹{stockPrice}</p>
          {stockPriceChange > 0 ? (
            <p className={` text-green-500 font-semibold`}>
              {stockPriceChange}
            </p>
          ) : stockPriceChange < 0 ? (
            <p className={` text-red-500 font-semibold`}>{stockPriceChange}</p>
          ) : (
            <p className="font-semibold">{stockPriceChange}</p>
          )}
          {stockPerChange > 0 ? (
            <p className={` text-green-500 font-semibold`}>{stockPerChange}%</p>
          ) : stockPerChange < 0 ? (
            <p className={` text-red-500 font-semibold`}>{stockPerChange}%</p>
          ) : (
            <p className="font-semibold">{stockPerChange}</p>
          )}
        </div>
        <div className="w-[15%] flex justify-between">
          <button
            type="button"
            className="p-1 px-3 text-white bg-green-700 text-sm rounded-sm"
            data-te-toggle="modal"
            data-te-target="#exampleModal"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={() => {
              setSymbol(symbol);
              setName(name);
              setModal(true);
              setPrice(stockPrice);
            }}
          >
            Buy
          </button>
          <Link to={link}>
            <button className="p-1 px-3 text-white bg-gray-700 text-sm rounded-sm">
              Details
            </button>
          </Link>
          {isWatch ? (
            <button
              onClick={() => {
                if (rWatchlist) {
                  removeWatchlist({
                    type: "stocks",
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
                handleWatchlist({
                  name,
                  symbol,
                  type: "stocks",
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

export default StockCards;
