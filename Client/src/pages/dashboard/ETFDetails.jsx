import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearETFDetails,
  clearETFHistoricalData,
  getETFDetailsThunk,
  getETFHistoryThunk,
} from "../../features/etfs/etfDetails";
import Chart from "react-apexcharts";
import ETFModal from "../../components/dashboard/modals/ETFModal";
import { buyETFThunk } from "../../features/portfolio/etfTransaction";

const ETFDetails = ({ setAlert }) => {
  const { id } = useParams();

  const { details, isLoading, historicalData } = useSelector(
    (state) => state.etfDetailsReducer
  );
  const dispatch = useDispatch();

  const [period, setPeriod] = useState("ytd");
  const [interval, setInterval] = useState("1d");
  const [isModal, setIsModal] = useState(false);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(clearETFDetails());
      dispatch(getETFDetailsThunk(id));
      dispatch(getETFHistoryThunk({ symbol: id, period, interval }));
    }
  }, [id]);

  const handleChangeInPeriod = (prd) => {
    setPeriod(prd);
    dispatch(clearETFHistoricalData());
    dispatch(getETFHistoryThunk({ symbol: id, period: prd, interval }));
  };

  const handleChangeInInterval = (itl) => {
    dispatch(clearETFHistoricalData());
    dispatch(getETFHistoryThunk({ symbol: id, period, interval: itl }));
  };

  const options = {
    chart: {
      type: "candlestick",
      height: 250,
      width: "100%",
    },
    title: {
      text: details?.priceData?.name,
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const handleBuy = () => {
    if (quantity === "") {
      setAlert({
        show: true,
        type: "warning",
        message: "Please add Required Data.",
      });
    }

    let data = {
      name: details?.priceData?.name,
      symbol: id,
      buy_price: details?.priceData?.curr_price,
      no_of_shares: Number(quantity),
    };

    dispatch(buyETFThunk(data)).then((data) => {
      if (!data?.payload?.success) {
        setAlert({
          show: true,
          type: "warning",
          message: data?.payload.message,
        });
      } else {
        setAlert({
          show: true,
          type: "success",
          message: `Congratulations! You Successfully bought ${details?.priceData?.name}.`,
        });
        setQuantity("");
        setIsModal(false);
        return;
      }
    });
  };

  return (
    <>
      {isModal && (
        <ETFModal
          name={details?.priceData?.name}
          setModal={(val) => setIsModal(val)}
          handleBuy={() => handleBuy()}
          quantity={quantity}
          setQuantity={(val) => setQuantity(val)}
        />
      )}
      <div className="bg-gray-100 p-3">
        <div className="flex justify-between my-5 px-5">
          <div className="w-[48%]">
            <h1 className="text-3xl mb-4 font-bold">
              {details?.priceData?.name}
            </h1>
            <button className="bg-black text-white px-2 py-1 text-sm rounded-md">
              {id}
            </button>
          </div>
          <div className="w-[48%] text-end">
            <div className="flex justify-end items-center">
              {!details && isLoading ? (
                <span className="w-1/2 p-7 mb-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
              ) : (
                <h2 className="text-3xl font-bold mb-2 me-3">
                  ₹ {details?.priceData?.curr_price}
                </h2>
              )}

              {!details && isLoading ? (
                <span className="w-1/2 p-7 mb-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
              ) : details?.priceData?.price_change > 0 ? (
                <p className={"text-green-500 font-semibold text-lg"}>
                  +{details?.priceData?.price_change} ( +
                  {details?.priceData?.per_change}% )
                </p>
              ) : details?.priceData?.price_change < 0 ? (
                <p className={"text-red-500 font-semibold text-lg"}>
                  {details?.priceData?.price_change} ({" "}
                  {details?.priceData?.per_change}% )
                </p>
              ) : (
                <p className={"text-gray-800 font-semibold text-lg"}>
                  {details?.priceData?.price_change} ({" "}
                  {details?.priceData?.per_change}% )
                </p>
              )}
            </div>
            <button
              className="w-full px-4 py-2 lg:mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-green-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              onClick={() => setIsModal(true)}
            >
              Buy Now
            </button>
          </div>
        </div>

        <div className="bg-white rounded-md my-3 p-5">
          <h3 className="text-2xl font-semibold mb-4">Price Summary</h3>
          {isLoading && details ? (
            <span className="w-full p-7 h-5 block rounded bg-gray-200 animate-pulse"></span>
          ) : (
            <>
              <div className="flex justify-between">
                <div className="">
                  <h3 className="uppercase text-lg mb-2">Today's High</h3>
                  <p className="font-bold text-lg">
                    ₹ {details?.info?.dayHigh}
                  </p>
                </div>
                <div className="">
                  <h3 className="uppercase text-lg mb-2">Today's Low</h3>
                  <p className="font-bold text-lg">₹ {details?.info?.dayLow}</p>
                </div>
                <div className="">
                  <h3 className="uppercase text-lg mb-2">52 Week High</h3>
                  <p className="font-bold text-lg">
                    ₹ {details?.info?.fiftyTwoWeekHigh}
                  </p>
                </div>
                <div className="">
                  <h3 className="uppercase text-lg mb-2">52 Week Low</h3>
                  <p className="font-bold text-lg">
                    ₹ {details?.info?.fiftyTwoWeekLow}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="bg-white rounded-md my-3 p-5">
          <h3 className="text-2xl font-semibold mb-4">Price Chart</h3>
          <div className="flex justify-center">
            <div className="w-[90%]">
              <div className="mb-5">
                <div className="flex justify-evenly items-center">
                  <div className="flex">
                    <button
                      className={`${
                        period === "1mo"
                          ? "bg-slate-800 text-white"
                          : "bg-slate-100 text-black"
                      } p-3 me-2 text-sm`}
                      onClick={() => handleChangeInPeriod("1mo")}
                    >
                      1M
                    </button>
                    <button
                      className={`${
                        period === "3mo"
                          ? "bg-slate-800 text-white"
                          : "bg-slate-100 text-black"
                      } p-3 me-2 text-sm`}
                      onClick={() => handleChangeInPeriod("3mo")}
                    >
                      3M
                    </button>
                    <button
                      className={`${
                        period === "ytd"
                          ? "bg-slate-800 text-white"
                          : "bg-slate-100 text-black"
                      } p-3 me-2 text-sm`}
                      onClick={() => handleChangeInPeriod("ytd")}
                    >
                      YTD
                    </button>
                    <button
                      className={`${
                        period === "1y"
                          ? "bg-slate-800 text-white"
                          : "bg-slate-100 text-black"
                      } p-3 me-2 text-sm`}
                      onClick={() => handleChangeInPeriod("1y")}
                    >
                      1Y
                    </button>
                    <button
                      className={`${
                        period === "5y"
                          ? "bg-slate-800 text-white"
                          : "bg-slate-100 text-black"
                      } p-3 me-2 text-sm`}
                      onClick={() => handleChangeInPeriod("5y")}
                    >
                      5Y
                    </button>
                    <button
                      className={`${
                        period === "max"
                          ? "bg-slate-800 text-white"
                          : "bg-slate-100 text-black"
                      } p-3 me-2 text-sm`}
                      onClick={() => handleChangeInPeriod("max")}
                    >
                      MAX
                    </button>
                  </div>
                  <div className="w-25%]">
                    <select
                      className="block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      onChange={(e) => handleChangeInInterval(e.target.value)}
                      value={interval}
                    >
                      <option value={""}>Select Intervals</option>
                      <option value={"1d"}>Daily</option>
                      <option value={"1wk"}>Weekly</option>
                      <option value={"1mo"}>Monthly</option>
                    </select>
                  </div>
                </div>
              </div>
              {historicalData?.length > 0 && !isLoading ? (
                <Chart
                  options={options}
                  series={[
                    {
                      data: historicalData?.map((el) => {
                        let candle = "";
                        if (el["Date"]) {
                          candle = {
                            x: el["Date"],
                            y: [
                              el["Open"].toFixed(2),
                              el["High"].toFixed(2),
                              el["Low"].toFixed(2),
                              el["Close"].toFixed(2),
                            ],
                          };
                        } else {
                          candle = {
                            x: el["Datetime"],
                            y: [
                              el["Open"].toFixed(2),
                              el["High"].toFixed(2),
                              el["Low"].toFixed(2),
                              el["Close"].toFixed(2),
                            ],
                          };
                        }
                        return candle;
                      }),
                    },
                  ]}
                  type="candlestick"
                />
              ) : (
                <span className="w-full p-7 h-[20rem] mb-3 block rounded bg-gray-200 animate-pulse"></span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ETFDetails;
