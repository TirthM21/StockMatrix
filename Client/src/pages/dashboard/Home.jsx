import React, { useEffect, useState } from "react";
import StockIndexWidget from "../../components/dashboard/widgets/StockIndexWidget";
import TypeMF from "../../components/dashboard/widgets/TypeMF";
import { useDispatch, useSelector } from "react-redux";
import {
  clearStockIndexesState,
  getStockIndexesThunk,
} from "../../features/stocks/stockIndexes";
import TopStocks from "../../components/dashboard/cards/TopStocks";
import {
  clearStockTopState,
  getStockTopThunk,
} from "../../features/stocks/stocksTop";
import { IoPieChartSharp } from "react-icons/io5";
import { AiFillGolden } from "react-icons/ai";
import { HiChartSquareBar } from "react-icons/hi";
import { GiTiedScroll } from "react-icons/gi";
import TypeETF from "../../components/dashboard/widgets/TypeETF";
import { Link } from "react-router-dom";
import {
  clearWalletState,
  getWalletThunk,
} from "../../features/transaction/wallet";
import {
  clearDepositWithdrawGraph,
  getDepositGraphThunk,
  getWithdrawGraphThunk,
} from "../../features/graph/depositWithdraw";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  clearInvestmentDetailsState,
  getTotalInvestmentThunk,
  getTotalProfitThunk,
} from "../../features/portfolio/investmentDetails";
// name, symbol, currPrice, currPer, currGap, size

// Data
let dataMF = [
  {
    name: "Best Long Term Mutual Funds",
    logo: "/assets/svgs/best-long-term.svg",
    url: "/dashboard/mutual-funds/best/long-term",
  },
  {
    name: "Best Returns Mutual Funds",
    logo: "/assets/svgs/best-returns.svg",
    url: "/dashboard/mutual-funds/best/returns",
  },
  {
    name: "Best Tax Saver Mutual Funds",
    logo: "/assets/svgs/best-tax-saver.svg",
    url: "/dashboard/mutual-funds/best/tax-saver",
  },
  {
    name: "Best Equity Mutual Funds",
    logo: "/assets/svgs/best-equity.svg",
    url: "/dashboard/mutual-funds/best/equity",
  },
  {
    name: "Best Debt Mutual Funds",
    logo: "/assets/svgs/best-debt.svg",
    url: "/dashboard/mutual-funds/best/debt",
  },
];

let etfData = [
  {
    name: "Best Sector ETFs",
    logo: (
      <>
        <IoPieChartSharp className="text-3xl text-gray-500" />
      </>
    ),
    url: "/dashboard/etfs/best/sector",
  },
  {
    name: "Best Gold ETFs",
    logo: (
      <>
        <AiFillGolden className="text-3xl text-gray-500" />
      </>
    ),
    url: "/dashboard/etfs/best/gold",
  },
  {
    name: "Best Index ETFs",
    logo: (
      <>
        <HiChartSquareBar className="text-3xl text-gray-500" />
      </>
    ),
    url: "/dashboard/etfs/best/index",
  },
  {
    name: "Best Bond ETFs",
    logo: (
      <>
        <GiTiedScroll className="text-3xl text-gray-500" />
      </>
    ),
    url: "/dashboard/etfs/best/bond",
  },
];

const Home = () => {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(50);

  const { indexes } = useSelector((state) => state.stockIndexesReducer);
  const { stocks, isLoading } = useSelector((state) => state.stockTopReducer);
  const { wallet } = useSelector((state) => state.walletReducer);
  const { deposit, withdraw } = useSelector(
    (state) => state.depositWithdrawReducer
  );
  const { investment, profit } = useSelector(
    (state) => state.investmentDetailsReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearInvestmentDetailsState());
    dispatch(getTotalInvestmentThunk());
    dispatch(getTotalProfitThunk());
  }, []);


  useEffect(() => {
    dispatch(clearDepositWithdrawGraph());
    dispatch(getDepositGraphThunk());
    dispatch(getWithdrawGraphThunk());
  }, []);

  useEffect(() => {
    dispatch(clearWalletState());
    dispatch(getWalletThunk());
    dispatch(getStockIndexesThunk());
    dispatch(getStockTopThunk({ skip, limit }));
  }, []);

  useEffect(() => {
    let timeOut = setInterval(() => {
      let hour = new Date().getHours();
      let day = new Date().getDay();
      if (hour < 16 && hour > 9 && day > 0 && day < 6) {
        dispatch(clearStockIndexesState());
        dispatch(clearStockTopState());
        dispatch(getStockIndexesThunk());
        dispatch(getStockTopThunk({ skip, limit }));
      }
    }, 30000);

    return () => {
      clearInterval(timeOut);
    };
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Chart.js Line Chart - Multi Axis",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Deposit",
        data: labels.map((el, index) => {
          let data = "";
          let curryear = new Date().getFullYear();
          deposit?.deposits?.forEach((el) => {
            if (el?._id?.month === index + 1 && curryear === el?._id?.year) {
              data = el?.total;
            } else {
              data = 0;
            }
          });
          return data;
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Withdraw",
        data: labels.map((el, index) => {
          let data = "";
          let curryear = new Date().getFullYear();
          withdraw?.withdraws?.forEach((el) => {
            if (el?._id?.month === index + 1 && curryear === el?._id?.year) {
              data = el?.total;
            } else {
              data = 0;
            }
          });
          return data;
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

  return (
    <>
      {/* <div className="p-4">
        <div className="flex justify-evenly">
          <StockWidget
            name={"Nifty 50"}
            symbol={"NFTY50"}
            currPrice={23591.78}
            currPer={0.48}
            currGap={1.72}
            size={"w-[30%]"}
          />
          <StockWidget
            name={"Nifty 50"}
            symbol={"NFTY50"}
            currPrice={23591.78}
            currPer={0.48}
            currGap={1.72}
            size={"w-[30%]"}
          />
        </div>

        <MutualFundWidget
          name="Nippon India Interval Fund-Quarterly Interval Fund-Series-I- Dividend Payout"
          oneYear={5.92903}
          fiveYear={4.045}
        />

        <div className="mutual-fund-recommendations mt-20">
          <h1 className="mb-4 text-3xl font-bold text-center">
            Discover Mutual Funds
          </h1>
          <div className="flex justify-center items-center flex-wrap w-[100%]">
            {data?.map((el, index) => {
              if (randomNumArr.includes(index)) {
                return (
                  <TypeMF
                    key={el.name}
                    name={el.name}
                    logo={el.logo}
                    recommended={true}
                    url={el.url}
                  />
                );
              } else {
                return (
                  <TypeMF
                    key={el.name}
                    name={el.name}
                    logo={el.logo}
                    recommended={false}
                    url={el.url}
                  />
                );
              }
            })}
          </div>
        </div>
      </div> */}

      <div className="bg-gray-100 p-2">
        <div className="text-xl font-extrabold bg-white p-3 mb-2">
          We have provided a free & fake Bank Balance of ₹1,00,000 as it is a demo
          project to use. You can deposit and withdraw the money from Bank to
          Wallet and vise-versa
        </div>
        <div className="xl:flex xl:flex-row flex sm:flex-col-reverse">
          <div className="xl:w-[69%] lg:w-[100%] p-4 me-2 bg-white rounded-md">
            <h1 className="text-3xl font-bold p-5">Dashboard</h1>
            <div className="flex justify-evenly mb-10 mt-3">
              <div className="w-[32%] border p-4">
                <h4 className="text-xl font-bold">Wallet Balance</h4>
                <p className="text-lg mt-4 text-gray-600 font-semibold">
                  ₹ {wallet?.balance > 0 ? wallet?.balance : 0}
                </p>
              </div>
              <div className="w-[32%] border p-4">
                <h4 className="text-xl font-bold">Total Investment</h4>
                <p className="text-lg mt-4 text-gray-600 font-semibold">
                  ₹ {investment > 0 ? investment : 0}
                </p>
              </div>
              <div className="w-[32%] border p-4">
                <h4 className="text-xl font-bold ">Total Profit</h4>
                {profit > 0 ? (
                  <p className="text-lg mt-4 text-green-500 font-semibold">
                    ₹ {profit}
                  </p>
                ) : profit < 0 ? (
                  <p className="text-lg mt-4 text-red-500 font-semibold">
                    ₹ {profit}
                  </p>
                ) : (
                  <p className="text-lg mt-4 text-gray-800 font-semibold">
                    ₹ 0
                  </p>
                )}
              </div>
            </div>
            {/* <img src="/assets/images/demo-chart.png" width={800} /> */}
            <Line options={options} data={data} />
            <div className="mt-8">
              <h1 className="text-2xl font-semibold text-start p-5 pt-0">
                Discover Mutual Funds
              </h1>
              <div className="flex justify-center items-center flex-wrap w-[100%]">
                {dataMF?.map((el) => {
                  return (
                    <TypeMF
                      key={el.name}
                      name={el.name}
                      logo={el.logo}
                      url={el.url}
                    />
                  );
                })}
              </div>
            </div>
            <div className="mt-8">
              <h1 className="text-2xl font-semibold text-start p-5 pt-0">
                Discover ETFs
              </h1>
              <div className="flex justify-center items-center flex-wrap w-[100%]">
                {etfData?.map((el) => {
                  return (
                    <TypeETF
                      key={el.name}
                      name={el.name}
                      logo={el.logo}
                      url={el.url}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="xl:w-[29%] xl:block lg:w-[100%] lg:justify-between lg:flex">
            <div className="bg-white p-3 rounded-md mb-3 xl:w-[100%] lg:w-[39%]">
              <h1 className="text-lg mb-2 font-semibold">Stock Indexes</h1>
              <StockIndexWidget
                name={indexes?.nse?.name}
                symbol={indexes?.nse?.symbol}
                currPrice={parseFloat(indexes?.nse?.curr_price).toFixed(2)}
                currPer={parseFloat(indexes?.nse?.curr_per_change).toFixed(2)}
                currGap={parseFloat(indexes?.nse?.curr_change).toFixed(2)}
                size={"w-[100%] mb-4"}
              />
              <StockIndexWidget
                name={indexes?.bse?.name}
                symbol={indexes?.bse?.symbol}
                currPrice={parseFloat(indexes?.bse?.curr_price).toFixed(2)}
                currPer={parseFloat(indexes?.bse?.curr_per_change).toFixed(2)}
                currGap={parseFloat(indexes?.bse?.curr_change).toFixed(2)}
                size={"w-[100%]"}
              />
            </div>
            <div className="bg-white p-3 rounded-md mb-3 xl:block xl:w-[100%] lg:w-[60%] lg:flex lg:justify-between lg:items-center">
              <div className="lg:w-[48%] xl:w-[100%]">
                <div className="flex justify-between mb-2 items-center">
                  <h1 className="text-lg font-semibold">Top Gainers</h1>
                  <Link to={"/dashboard/topstock"}>
                    <button className="text-sm text-blue-600 underline">
                      Know More
                    </button>
                  </Link>
                </div>
                <div className="flex justify-between items-center p-4 border bg-gray-50 overflow-hidden">
                  <div>
                    <h2 className={`text-lg font-bold me-3`}>Symbol</h2>
                  </div>
                  <div className="flex justify-around items-center w-[58%]">
                    <p className={`text-xs font-semibold`}>LTP</p>
                    <p className={`font-semibold text-xs `}>%Chng</p>
                  </div>
                </div>
                {isLoading ? (
                  <>
                    <span className="w-full p-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                    <span className="w-full p-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                    <span className="w-full p-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                  </>
                ) : (
                  stocks?.gainers?.map((el, index) => {
                    if (index < 3) {
                      return (
                        <TopStocks
                          key={el?.name}
                          name={
                            el?.company?.length > 14
                              ? el?.company?.substring(0, 14) + "..."
                              : el?.company
                          }
                          ltp={el?.price}
                          priceChange={el?.change}
                          link={`/dashboard/stocks/${el?.symbol}`}
                        />
                      );
                    }
                  })
                )}
              </div>
              <div className="lg:w-[48%]  xl:w-[100%]">
                <div className="flex justify-between mb-2 items-center xl:mt-3">
                  <h1 className="text-lg font-semibold">Top Losers</h1>
                  <Link to={"/dashboard/topstock"}>
                    <button className="text-sm text-blue-600 underline">
                      Know More
                    </button>
                  </Link>
                </div>
                <div className="flex justify-between items-center p-4 border bg-gray-50 overflow-hidden">
                  <div>
                    <h2 className={`text-lg font-bold me-3`}>Symbol</h2>
                  </div>
                  <div className="flex justify-around items-center w-[58%]">
                    <p className={`text-xs font-semibold`}>LTP</p>
                    <p className={`font-semibold text-xs `}>%Chng</p>
                  </div>
                </div>
                {isLoading ? (
                  <>
                    <span className="w-full p-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                    <span className="w-full p-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                    <span className="w-full p-3 h-5 block rounded bg-gray-200 animate-pulse"></span>
                  </>
                ) : (
                  stocks?.losers?.map((el, index) => {
                    if (index < 3) {
                      return (
                        <TopStocks
                          key={el?.name}
                          name={
                            el?.company?.length > 14
                              ? el?.company?.substring(0, 14) + "..."
                              : el?.company
                          }
                          ltp={el?.price}
                          priceChange={el?.change}
                          link={`/dashboard/stocks/${el?.symbol}`}
                        />
                      );
                    }
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
