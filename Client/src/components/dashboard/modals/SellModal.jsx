import React, { useState } from "react";
import Input from "../../Input";
import { useDispatch, useSelector } from "react-redux";
import { sellStockThunk } from "../../../features/portfolio/stockTransaction";
import {
  clearPortfolioState,
  getETFPortfolioThunk,
  getMutualFundPortfolioThunk,
  getStockPortfolioThunk,
} from "../../../features/portfolio/portfolio";
import { sellMFThunk } from "../../../features/portfolio/mfTransaction";
import { sellETFThunk } from "../../../features/portfolio/etfTransaction";
import Loading from "../../Loading";

const SellStockModal = ({
  name,
  setModal,
  profit,
  price,
  symbol,
  setAlert,
  type,
  id,
  nos,
  currPrice,
}) => {
  const [quantity, setQuantity] = useState("");

  const { isLoading: etfLoading, isSuccess: etfSuccess } = useSelector(
    (state) => state.etfTransactionReducer
  );
  const { isLoading: stockLoading, isSuccess: stockSuccess } = useSelector(
    (state) => state.stockTransactionReducer
  );
  const { isLoading: mfLoading, isSuccess: mfSuccess } = useSelector(
    (state) => state.mfTransactionReducer
  );

  const dispatch = useDispatch();

  const handleStockSell = () => {
    let hour = new Date().getHours();
    let day = new Date().getDay();
    if (hour < 16 && hour > 9 && day > 0 && day < 6) {
      if (Number(nos) < Number(quantity)) {
        setAlert({
          show: true,
          type: "warning",
          message: `Not Allowed! Quantity of selling is higher than Current total shares.`,
        });
        return;
      }

      let data = {
        name,
        symbol,
        buy_price: price,
        sell_price: currPrice,
        no_of_shares: quantity,
        profit: parseFloat((currPrice - price) * quantity).toFixed(2),
        stocks_id: id,
      };

      dispatch(sellStockThunk(data)).then((data) => {
        if (!data?.payload?.success) {
          setAlert({
            show: true,
            type: "danger",
            message: data?.payload.message,
          });
          return;
        } else {
          setAlert({
            show: true,
            type: "success",
            message: `Successful! Stock Sold at a price of ${currPrice} with profit/loss ${profit}`,
          });
          setQuantity(0);
          dispatch(clearPortfolioState());
          dispatch(getStockPortfolioThunk());
          dispatch(getMutualFundPortfolioThunk());
          dispatch(getETFPortfolioThunk());
          return;
        }
      });
    } else {
      setAlert({
        show: true,
        type: "danger",
        message: "Currently, The Market is closed.",
      });
    }
  };

  const handleMFSell = () => {
    let hour = new Date().getHours();
    let day = new Date().getDay();
    if (hour < 16 && hour > 9 && day > 0 && day < 6) {
      let data = {
        name,
        symbol,
        mf_id: id,
        profit,
      };

      dispatch(sellMFThunk(data)).then((data) => {
        if (!data?.payload.success) {
          setAlert({
            show: true,
            type: "danger",
            message: data?.payload.message,
          });
          return;
        } else {
          setAlert({
            show: true,
            type: "success",
            message: `Successful! Mutual Fund Sold at a NAV of ${currPrice} with profit/loss ${profit}`,
          });
          dispatch(clearPortfolioState());
          dispatch(getStockPortfolioThunk());
          dispatch(getMutualFundPortfolioThunk());
          dispatch(getETFPortfolioThunk());
          return;
        }
      });
    } else {
      setAlert({
        show: true,
        type: "danger",
        message: "Currently, The Market is closed.",
      });
    }
  };

  const handleETFSell = () => {
    // let hour = new Date().getHours();
    // let day = new Date().getDay();
    // if (hour < 16 && hour > 9 && day > 0 && day < 6) {
    if (Number(nos) < Number(quantity)) {
      setAlert({
        show: true,
        type: "warning",
        message: `Not Allowed! Quantity of selling is higher than Current total shares.`,
      });
      return;
    }
    // return;
    let data = {
      name,
      symbol,
      sell_price: parseFloat(currPrice),
      profit,
      etf_id: id,
      no_of_shares: parseFloat(quantity),
    };

    dispatch(sellETFThunk(data)).then((data) => {
      if (!data?.payload.success) {
        setAlert({
          show: true,
          type: "danger",
          message: data?.payload.message,
        });
        return;
      } else {
        setAlert({
          show: true,
          type: "success",
          message: `Successful! ETF Sold at a Price of ${currPrice} with profit/loss ${profit}`,
        });
        setModal(false);
        dispatch(clearPortfolioState());
        dispatch(getStockPortfolioThunk());
        dispatch(getMutualFundPortfolioThunk());
        dispatch(getETFPortfolioThunk());
        return;
      }
    });
    // } else {
    //   setAlert({
    //     show: true,
    //     type: "danger",
    //     message: "Currently, The Market is closed.",
    //   });
    // }
  };

  return (
    <>
      <div className="relative flex justify-center">
        <div
          className="fixed inset-0 z-10 overflow-y-auto  bg-black/50"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl lg:w-[40rem] sm:my-8 sm:align-middle  sm:w-full sm:p-6">
              <div>
                <div className="mt-4 text-center">
                  <h3
                    className="font-bold text-xl text-gray-800 capitalize"
                    id="modal-title"
                  >
                    {name}
                  </h3>
                  <p className="mt-3">{symbol}</p>
                </div>
              </div>

              {type === "stocks" || type === "etfs" ? (
                <>
                  <div className="flex justify-center flex-wrap mt-3">
                    <p className=" w-[15rem] mb-2 text-lg">
                      Buy Price: <span className="font-semibold">₹{price}</span>
                    </p>
                    <p className=" w-[15rem] mb-2 text-lg">
                      Current Price:{" "}
                      <span className="font-semibold">₹{currPrice}</span>
                    </p>
                    <p className=" w-[15rem] mb-2 text-lg">
                      Total Shares: <span className="font-semibold">{nos}</span>
                    </p>
                    <p className=" w-[15rem] mb-2 text-lg">
                      Total Profit:{" "}
                      <span className="font-semibold">₹{profit}</span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <Input
                      type={"text"}
                      labelName={"Quantity"}
                      value={quantity}
                      handleValue={(val) => setQuantity(val)}
                      handleFocus={() => {}}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-center text-3xl font-bold mt-4">
                    Are you sure?
                  </h1>
                  <div className="">
                    <p className="mt-4 text-lg text-center">
                      Total Profit:{" "}
                      <span className="font-semibold">
                        ₹{profit.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </>
              )}

              <div className="mt-4 sm:mt-6 sm:flex sm:items-center sm:-mx-2">
                <button
                  className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                  onClick={() => setModal(false)}
                >
                  Close
                </button>

                {type === "stocks" ? (
                  <button
                    className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-red-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    onClick={() => handleStockSell()}
                  >
                    {stockLoading && !stockSuccess ? (
                      <Loading size={"text-lg"} />
                    ) : (
                      "Sell Now"
                    )}
                  </button>
                ) : type === "etfs" ? (
                  <button
                    className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-red-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    onClick={() => handleETFSell()}
                  >
                    {etfLoading && !etfSuccess ? (
                      <Loading size={"text-lg"} />
                    ) : (
                      "Sell Now"
                    )}
                  </button>
                ) : (
                  <button
                    className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-red-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    onClick={() => handleMFSell()}
                  >
                    {mfLoading && !mfSuccess ? (
                      <Loading size={"text-lg"} />
                    ) : (
                      "Sell Now"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellStockModal;
