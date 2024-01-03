import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearMFDetails,
  clearMFHistory,
  getMFCurentPriceThunk,
  getMFDetailsThunk,
  getMFHistoryThunk,
} from "../../features/mutualfunds/mfDetails";
import MutualFundModal from "../../components/dashboard/modals/MutualFundModal";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { buyMFThunk } from "../../features/portfolio/mfTransaction";

// 3 Month = 7889400
// 6 Month = 15778800
// 1 Year = 31557600
// 5 Year = 157788000

const MutualFundDetails = ({ setAlert }) => {
  const { id } = useParams();

  const [isModal, setIsModal] = useState(false);
  const [price, setPrice] = useState(0);
  const [years, setYears] = useState(0);
  const [type, setType] = useState("");
  const [investment, setInvestment] = useState("");

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [period, setPeriod] = useState("ytd");
  const [interval, setInterval] = useState("1d");

  const { isSuccess, isLoading, isError, priceData, detailsData, historyData } =
    useSelector((state) => state.mfDetailsReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(clearMFDetails());
      dispatch(getMFCurentPriceThunk(id));
      dispatch(getMFDetailsThunk(id));
      let year = new Date().getFullYear();
      dispatch(
        getMFHistoryThunk({
          symbol: id,
          period,
          interval,
        })
      );
    }
  }, [id]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: priceData?.name,
      },
    },
  };

  const handleChangeInPeriod = (prd) => {
    setPeriod(prd);

    dispatch(clearMFHistory());
    dispatch(
      getMFHistoryThunk({
        symbol: id,
        period: prd,
        interval,
      })
    );
  };

  const handleChangeInInterval = (itl) => {
    setInterval(itl);

    dispatch(clearMFHistory());
    dispatch(
      getMFHistoryThunk({
        symbol: id,
        period,
        interval: itl,
      })
    );
    return;
  };

  const handleBuy = () => {
    let curr_year = new Date().getFullYear();
    let data = {
      name: priceData?.name,
      symbol: id,
      one_year_return: Number(detailsData?.performance[3]["value"]),
      buy_price: Number(priceData?.curr_price),
      investment: Number(investment),
      type_mf: type,
      total_years: Number(years),
      year_sell: curr_year + Number(years),
    };

    dispatch(buyMFThunk(data)).then((data) => {
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
          message: `Congratulations! You Successfully Invested in ${priceData?.name}.`,
        });
        setYears("");
        setInvestment("");
        setIsModal(false);
      }
    });

    return;
  };

  return (
    <>
      {isModal && (
        <MutualFundModal
          handleBuy={() => handleBuy()}
          name={priceData?.name}
          setModal={(val) => setIsModal(val)}
          price={investment}
          setPrice={(val) => setInvestment(val)}
          years={years}
          setYears={(val) => setYears(val)}
          setType={(val) => setType(val)}
        />
      )}
      <div className="bg-gray-100 p-3">
        <div className="flex justify-between my-5 px-5">
          <div className="w-[48%]">
            <h1 className="text-3xl mb-4 font-bold">{priceData?.name}</h1>
            <button className="bg-black text-white px-2 py-1 text-sm rounded-md">
              {id}
            </button>
          </div>
          <div className="w-[48%] text-end">
            <div className="flex justify-end items-center">
              {!priceData && isLoading ? (
                <span className="w-1/2 p-7 mb-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
              ) : (
                <h2 className="text-3xl font-bold mb-2 me-3">
                  ₹ {priceData?.curr_price}
                </h2>
              )}

              {!priceData && isLoading ? (
                <span className="w-1/2 p-7 mb-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
              ) : priceData?.price_change > 0 ? (
                <p className={"text-green-500 font-semibold text-lg"}>
                  +{priceData?.price_change} ( +{priceData?.per_change}% )
                </p>
              ) : priceData?.price_change < 0 ? (
                <p className={"text-red-500 font-semibold text-lg"}>
                  {priceData?.price_change} ( {priceData?.per_change}% )
                </p>
              ) : (
                <p className={"text-gray-800 font-semibold text-lg"}>
                  {priceData?.price_change} ( {priceData?.per_change}% )
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
              {historyData?.length > 0 ? (
                <Line
                  options={options}
                  data={{
                    labels: historyData?.map((el) => new Date(el["Date"]).toDateString()),
                    datasets: [
                      {
                        fill: true,
                        data: historyData?.map((el) => parseFloat(el["Open"])),
                        borderColor: "rgb(53, 162, 235)",
                        label: "NAV",
                        backgroundColor: "rgba(53, 162, 235, 0.5)",
                      },
                    ],
                  }}
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
                Portfolio Composition
              </h3>
              {!detailsData && isLoading ? (
                <>
                  <span className="w-full p-7 mb-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                  <span className="w-full p-7 mb-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                </>
              ) : (
                <div className="">
                  {detailsData?.holding_info?.portfolioComposition?.map(
                    (el) => {
                      return (
                        <div className="flex justify-between items-center mb-3">
                          <h5 className="text-lg">{el?.name}</h5>
                          <p className="text-lg font-semibold">{el?.value}</p>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
            <div className="bg-white p-5 my-3">
              <h3 className="text-2xl font-semibold mb-4">Sector Weightings</h3>
              {!detailsData && isLoading ? (
                <>
                  <span className="w-full p-7 mb-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                  <span className="w-full p-7 mb-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                </>
              ) : (
                <div className="">
                  {detailsData?.holding_info?.sectorWeighting?.map((el) => {
                    return (
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="text-lg">{el?.name}</h5>
                        <p className="text-lg font-semibold">{el?.value}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="w-[49%]">
            <div className="bg-white p-5 my-3">
              <h3 className="text-2xl font-semibold mb-4">Equity Holdings</h3>
              {!detailsData && isLoading ? (
                <>
                  <span className="w-full p-7 mb-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                  <span className="w-full p-7 mb-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                </>
              ) : (
                <div className="">
                  {detailsData?.holding_info?.equityHoldings?.map((el) => {
                    return (
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="text-lg">{el?.name}</h5>
                        <p className="text-lg font-semibold">{el?.value}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="bg-white p-5 my-3">
              <h3 className="text-2xl font-semibold mb-4">Performance</h3>
              {!detailsData && isLoading ? (
                <>
                  <span className="w-full p-7 mb-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                  <span className="w-full p-7 mb-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                </>
              ) : (
                <div className="">
                  {detailsData?.performance?.map((el) => {
                    return (
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="text-lg">{el?.name}</h5>
                        <p className="text-lg font-semibold">{el?.value}%</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MutualFundDetails;
