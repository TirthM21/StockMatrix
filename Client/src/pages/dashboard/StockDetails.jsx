import React, { useEffect, useState } from "react";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import StockDetailsTables from "../../components/dashboard/StockDetailsTables";
import { useParams } from "react-router-dom";
import StockModal from "../../components/dashboard/modals/StockModal";
import { useDispatch, useSelector } from "react-redux";
import {
  clearHistoricalState,
  clearStockDetails,
  getAllStockDetailsThunk,
  getBalanceSheetThunk,
  getCashFlowThunk,
  getFinancialRatiosThunk,
  getRevenueStmtThunk,
  getStockHistoricalDataThunk,
  getStockInfoThunk,
  getStockSuggestionThunk,
  getStocksDetailsCurrentPriceThunk,
} from "../../features/stocks/stockDetails";
import Chart from "react-apexcharts";
import { buyStockThunk } from "../../features/portfolio/stockTransaction";

const StockDetails = ({ setAlert }) => {
  const { id } = useParams();

  const [isModal, setIsModal] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const [period, setPeriod] = useState("ytd");
  const [interval, setInterval] = useState("1d");

  const {
    isSuccess,
    isError,
    isLoading: detailsLoading,
    priceData,
    cashFlow,
    balanceSheet,
    revenueStmt,
    suggestion,
    historicalData,
    financial,
    info,
  } = useSelector((state) => state.stockDetailsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(clearStockDetails());
      dispatch(getAllStockDetailsThunk(id));
      dispatch(getStockHistoricalDataThunk({ symbol: id, period, interval }));
    }
  }, [id]);

  const handleChangeInPeriod = (prd) => {
    setPeriod(prd);
    dispatch(clearHistoricalState());
    dispatch(
      getStockHistoricalDataThunk({ symbol: id, period: prd, interval })
    );
  };

  const handleChangeInInterval = (itl) => {
    dispatch(clearHistoricalState());
    dispatch(
      getStockHistoricalDataThunk({ symbol: id, period, interval: itl })
    );
  };

  const options = {
    chart: {
      type: "candlestick",
      height: 250,
      width: "100%",
    },
    title: {
      text: priceData?.name,
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

    let hour = new Date().getHours();
    let day = new Date().getDay();

    if (hour < 15 && hour > 9 && day > 0 && day < 6) {
      let data = {
        buy_price: priceData?.curr_price,
        no_of_shares: Number(quantity),
        symbol: id,
        name: priceData?.name,
      };

      dispatch(buyStockThunk(data)).then((data) => {
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
            message: `Congratulations! You Successfully bought ${priceData?.name}.`,
          });
          setIsModal(false);
          setQuantity("");
        }
      });
    } else {
      setAlert({
        show: true,
        type: "danger",
        message: "Currently Market is Closed.",
      });
    }
    return;
  };

  return (
    <>
      {isModal && (
        <StockModal
          quantity={quantity}
          setQuantity={(val) => setQuantity(val)}
          name={priceData?.name}
          handleBuy={() => handleBuy()}
          setModal={(val) => setIsModal(val)}
        />
      )}
      <div className="bg-gray-100 p-3">
        <div className="flex justify-between my-5 px-5">
          <div className="w-[48%]">
            <h1 className="text-5xl mb-4 font-bold">
              {detailsLoading && !priceData?.name ? (
                <span className="w-1/3 p-7 h-5 block rounded bg-gray-200 animate-pulse"></span>
              ) : (
                priceData?.name
              )}
            </h1>
            {detailsLoading && !priceData?.symbol ? (
              <span className="w-1/3 p-7 h-5 block rounded bg-gray-200 animate-pulse"></span>
            ) : (
              <button className="bg-black text-white px-2 py-1 text-sm rounded-md">
                {priceData?.symbol}
              </button>
            )}
          </div>
          <div className="w-[48%] text-end">
            <div className="flex justify-end items-center">
              {detailsLoading && !priceData?.curr_price ? (
                <span className="w-1/3 p-7 h-5 block rounded bg-gray-200 animate-pulse"></span>
              ) : (
                <h2 className="text-3xl font-bold mb-2 me-5">
                  ₹ {priceData?.curr_price}
                </h2>
              )}
              {detailsLoading && !priceData?.curr_change ? (
                <span className="w-1/3 p-7 h-5 block rounded bg-gray-200 animate-pulse"></span>
              ) : priceData?.curr_change > 0 ? (
                <p className={"text-green-500 font-semibold text-lg"}>
                  +{priceData?.curr_change} ( +{priceData?.curr_per_change}% )
                </p>
              ) : priceData?.curr_change < 0 ? (
                <p className={"text-red-500 font-semibold text-lg"}>
                  {priceData?.curr_change} ( {priceData?.curr_per_change}% )
                </p>
              ) : (
                <p className={"text-gray-800 font-semibold text-lg"}>
                  {priceData?.curr_change} ( {priceData?.curr_per_change}% )
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
          {detailsLoading && !info?.summary ? (
            <span className="w-full p-7 h-5 block rounded bg-gray-200 animate-pulse"></span>
          ) : (
            <>
              <div className="flex justify-between">
                <div className="">
                  <h3 className="uppercase text-lg mb-2">Today's High</h3>
                  <p className="font-bold text-lg">
                    ₹ {info?.summary?.today_high}
                  </p>
                </div>
                <div className="">
                  <h3 className="uppercase text-lg mb-2">Today's Low</h3>
                  <p className="font-bold text-lg">
                    ₹ {info?.summary?.today_low}
                  </p>
                </div>
                <div className="">
                  <h3 className="uppercase text-lg mb-2">52 Week High</h3>
                  <p className="font-bold text-lg">
                    ₹ {info?.summary?.year_high}
                  </p>
                </div>
                <div className="">
                  <h3 className="uppercase text-lg mb-2">52 Week Low</h3>
                  <p className="font-bold text-lg">
                    ₹ {info?.summary?.year_low}
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
                        period === "1d"
                          ? "bg-slate-800 text-white"
                          : "bg-slate-100 text-black"
                      } p-3 me-2 text-sm`}
                      onClick={() => handleChangeInPeriod("1d")}
                    >
                      1D
                    </button>
                    <button
                      className={`${
                        period === "5d"
                          ? "bg-slate-800 text-white"
                          : "bg-slate-100 text-black"
                      } p-3 me-2 text-sm`}
                      onClick={() => handleChangeInPeriod("5d")}
                    >
                      5D
                    </button>
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
                        period === "6mo"
                          ? "bg-slate-800 text-white"
                          : "bg-slate-100 text-black"
                      } p-3 me-2 text-sm`}
                      onClick={() => handleChangeInPeriod("6mo")}
                    >
                      6M
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
                        period === "2y"
                          ? "bg-slate-800 text-white"
                          : "bg-slate-100 text-black"
                      } p-3 me-2 text-sm`}
                      onClick={() => handleChangeInPeriod("2y")}
                    >
                      2Y
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
                      <option value={"1m"}>1 min</option>
                      <option value={"2m"}>2 min</option>
                      <option value={"5m"}>5 min</option>
                      <option value={"15m"}>15 min</option>
                      <option value={"30m"}>30 min</option>
                      <option value={"60m"}>60 min</option>
                      <option value={"90m"}>90 min</option>
                      <option value={"1d"}>1 day</option>
                      <option value={"5d"}>5 day</option>
                      <option value={"1wk"}>1 week</option>
                      <option value={"1mo"}>1 month</option>
                      <option value={"3mo"}>3 month</option>
                    </select>
                  </div>
                </div>
              </div>
              {historicalData?.length > 0 && !detailsLoading ? (
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
        <div className="flex justify-between">
          <div className="w-[49%]">
            <div className="bg-white p-5 my-3">
              <h3 className="text-2xl font-semibold mb-4">
                Company Essentials
              </h3>
              {detailsLoading && !info?.essentialInfo ? (
                <>
                  <span className="w-full p-7 mb-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                  <span className="w-full p-7 mb-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                  <span className="w-full p-7 mb-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                </>
              ) : (
                <div className="flex justify-between items-center flex-wrap">
                  {info?.essentialInfo?.companyEssentials?.map((el) => {
                    return (
                      <div className="mb-5 w-[10rem]" key={el?.name}>
                        <h5 className="text-sm mb-1">{el?.name}</h5>
                        <p className="font-bold">{el?.value}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="bg-white p-5 my-3">
              <div className="flex items-center mb-4">
                <h3 className="text-2xl font-semibold me-2">Strengths</h3>
                <FaRegThumbsUp className="text-green-500 text-xl" />
              </div>
              <div className="flex justify-between items-center flex-wrap">
                {detailsLoading && !suggestion?.strengths ? (
                  <>
                    <span className="w-full p-7 mb-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                    <span className="w-full p-7 mb-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                  </>
                ) : (
                  <ul className="p-4">
                    {suggestion?.strengths?.map((el) => {
                      return (
                        <li className="mb-3 list-disc" key={el}>
                          <p className="font-medium">{el}</p>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="w-[49%]">
            <div className="bg-white p-5 my-3 h-[32rem]">
              <h3 className="text-2xl font-semibold mb-4">Financial Ratios</h3>
              {detailsLoading && !financial?.ratios ? (
                <>
                  <span className="w-full p-7 mb-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                  <span className="w-full p-7 mb-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                </>
              ) : (
                <div className="flex justify-between items-center flex-wrap">
                  {financial?.ratios?.map((el, index) => {
                    if (index <= 3) {
                      return (
                        <div className="mb-5 w-[8rem]" key={el?.name}>
                          <h5 className="text-sm mb-1">{el?.name}</h5>
                          {Object.keys(el?.data)?.map((key) => {
                            return (
                              <p className="font-bold">
                                <span className="font-semibold">{key}</span>:{" "}
                                {el?.data[key]}
                              </p>
                            );
                          })}
                        </div>
                      );
                    } else {
                      return (
                        <div className="mb-5 w-[8rem]" key={el?.name}>
                          <h5 className="text-sm mb-1">{el?.name}</h5>
                          <p className="font-bold">
                            {parseFloat(el?.data)?.toFixed(2)}
                          </p>
                        </div>
                      );
                    }
                  })}
                </div>
              )}
            </div>
            <div className="bg-white p-5 my-3">
              <div className="flex items-center mb-4">
                <h3 className="text-2xl font-semibold me-2">Limitations</h3>
                <FaRegThumbsDown className="text-red-500 text-xl" />
              </div>
              <div className="flex justify-between items-center flex-wrap">
                {detailsLoading && !suggestion?.limitations ? (
                  <>
                    <span className="w-full p-7 mb-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                    <span className="w-full p-7 mb-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                  </>
                ) : (
                  <ul className="p-4">
                    {suggestion?.limitations?.map((el) => {
                      return (
                        <li className="mb-3 list-disc" key={el}>
                          <p className="font-medium">{el}</p>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 bg-white my-3">
          <StockDetailsTables
            title={"Yearly Balance Sheet (Cr.)"}
            headings={
              balanceSheet?.balanceSheet &&
              Object.keys(balanceSheet?.balanceSheet[0])?.map((el) => {
                return (
                  <th
                    scope="col"
                    className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                  >
                    <div className="flex items-center gap-x-3 font-bold">
                      <span>{el?.toUpperCase()}</span>
                    </div>
                  </th>
                );
              })
            }
            data={balanceSheet?.balanceSheet?.map((el) => {
              return (
                <tr key={el?.particular}>
                  {Object.keys(el)?.map((key) => {
                    return (
                      <td
                        key={key}
                        className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap"
                      >
                        {el[key]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          />
        </div>
        <div className="p-5 bg-white my-3">
          <StockDetailsTables
            title={"Yearly Income Statement (Cr.)"}
            headings={
              revenueStmt?.yearlyReturns &&
              Object.keys(revenueStmt?.yearlyReturns[0])?.map((el) => {
                return (
                  <th
                    scope="col"
                    className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                  >
                    <div className="flex items-center gap-x-3 font-bold">
                      {el?.toUpperCase()}
                    </div>
                  </th>
                );
              })
            }
            data={revenueStmt?.yearlyReturns?.map((el) => {
              return (
                <tr key={el?.particular}>
                  {Object.keys(el)?.map((key) => {
                    return (
                      <td
                        key={key}
                        className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap"
                      >
                        {el[key]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          />
        </div>
        <div className="p-5 bg-white my-3">
          <StockDetailsTables
            title={"Yearly Cash Flow (Cr.)"}
            headings={
              cashFlow?.cashflows &&
              Object.keys(cashFlow?.cashflows[0])?.map((el) => {
                return (
                  <th
                    scope="col"
                    className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                  >
                    <div className="flex items-center gap-x-3 font-bold">
                      {el?.toUpperCase()}
                    </div>
                  </th>
                );
              })
            }
            data={
              !cashFlow?.cashflows ? (
                <tr>
                  <td
                    className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap"
                    colSpan={6}
                  >
                    No Data Available
                  </td>
                </tr>
              ) : (
                cashFlow?.cashflows?.map((el) => {
                  return (
                    <tr key={el?.particular}>
                      {Object.keys(el)?.map((key) => {
                        return (
                          <td
                            key={key}
                            className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap"
                          >
                            {el[key]}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )
            }
          />
        </div>
      </div>
    </>
  );
};

export default StockDetails;
