import React, { useEffect, useState } from "react";
import MutualFundCards from "../../components/dashboard/cards/MutualFundCards";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllMFState,
  getAllMFThunk,
} from "../../features/mutualfunds/allMutualFunds";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import TypeMF from "../../components/dashboard/widgets/TypeMF";
import { Link } from "react-router-dom";
import MutualFundModal from "../../components/dashboard/modals/MutualFundModal";
import { buyMFThunk } from "../../features/portfolio/mfTransaction";
import {
  clearGetWatchlist,
  getMFsWatchlistThunk,
} from "../../features/watchlist/getWatchlist";
import { addToWatchlistThunk } from "../../features/watchlist/watchlist";

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

const allCompanies = [
  "UTI",
  "Tata",
  "Union",
  "Reliance",
  "SBI",
  "Nippon",
  "Navi",
  "Motilal",
  "Mahindra-Manulife",
  "LIC",
  "Kotak",
  "IDFC",
  "IDBI",
  "ICICI",
  "HDFC",
  "HSBC",
  "Franklin",
  "Axis",
  "Aditya-Birla",
];

const MutualFunds = ({ setAlert }) => {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  const [mfName, setMFName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [price, setPrice] = useState("");
  const [oneYear, setOneYear] = useState("");

  const { isSuccess, isLoading, isError, allMF } = useSelector(
    (state) => state.allMutualFundsReducer
  );
  const { mfsWatchlist, isLoading: watchlistLoading } = useSelector(
    (state) => state.getWatchlistReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearGetWatchlist());
    dispatch(getMFsWatchlistThunk());
  }, []);

  useEffect(() => {
    dispatch(clearAllMFState());
    dispatch(getAllMFThunk({ skip, limit }));
  }, []);

  const handleNext = () => {
    if (limit < allMF?.total) {
      dispatch(clearAllMFState());
      dispatch(getAllMFThunk({ skip: skip + 10, limit: limit + 10 }));

      setSkip(skip + 10);
      setLimit(limit + 10);
    }
  };

  const handlePrev = () => {
    if (skip > 0) {
      dispatch(clearAllMFState());
      dispatch(getAllMFThunk({ skip: skip - 10, limit: limit - 10 }));

      setSkip(skip - 10);
      setLimit(limit - 10);
    }
  };

  const handleAddToWatchlist = (data) => {
    dispatch(addToWatchlistThunk(data)).then((data) => {
      if (!data?.payload.success) {
        setAlert({
          show: true,
          type: "warning",
          message: data?.payload.message,
        });
      } else {
        setAlert({
          show: true,
          type: "success",
          message: `You added ${mfName} to watchlist.`,
        });
        dispatch(clearGetWatchlist());
        dispatch(getMFsWatchlistThunk());
      }
    });
  };

  return (
    <>
      {isModal && (
        <MutualFundModal
          name={mfName}
          setModal={(val) => setIsModal(val)}
          price={price}
          oneYear={oneYear}
          symbol={symbol}
          setAlert={setAlert}
        />
      )}
      <div className="bg-gray-100 p-2">
        <div className="bg-white rounded-md p-5">
          <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Mutual Funds</h1>
            <div className="my-8">
              <h1 className="text-xl font-semibold text-center p-5 pt-0">
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
            {isLoading ? (
              <>
                {" "}
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
              </>
            ) : (
              allMF?.data?.map((el) => {
                let watchlistFind = mfsWatchlist?.find(
                  (wl) => wl.symbol === el?.symbol
                );
                return (
                  <MutualFundCards
                    name={el?.fund}
                    key={el?.symbol}
                    symbol={el?.symbol.split(".")[0]}
                    price={"₹" + el?.nav}
                    oneYear={el?.return_one_year}
                    fiveYear={el?.return_five_year}
                    setName={(val) => setMFName(val)}
                    setModal={(val) => setIsModal(val)}
                    setSymbol={(val) => setSymbol(val)}
                    setPrice={(val) => setPrice(val)}
                    setOneYear={(val) => setOneYear(val)}
                    addToWatchlist={(val) => handleAddToWatchlist(val)}
                    isWatch={watchlistFind !== undefined ? true : false}
                  />
                );
              })
            )}
            {isError && (
              <p className="text-red-500 text-3xl">Some Error Occurred.</p>
            )}
          </div>
          <div className="flex items-center justify-evenly">
            <button
              className="px-4 py-2 bg-black text-gray-100 rounded-md hover:bg-gray-800 font-semibold flex items-center"
              onClick={() => handlePrev()}
            >
              <BsChevronLeft className="me-3" />
              Prev
            </button>
            <button
              className="px-4 py-2 bg-black text-gray-100 rounded-md hover:bg-gray-800 font-semibold flex items-center"
              onClick={() => handleNext()}
            >
              Next
              <BsChevronRight className="ms-3" />
            </button>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold">
              All Mutual Fund Companies
            </h2>
            <div className="flex justify-between items-center flex-wrap mt-10">
              {allCompanies?.map((el) => {
                return (
                  <Link
                    key={el}
                    to={`/dashboard/mutual-funds/company/${el?.toLowerCase()}`}
                    className="w-[28%] group mb-6"
                  >
                    <div className="bg-gray-100 p-4 rounded-md">
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold text-gray-700">
                          {el}
                        </p>
                        <BsChevronRight className="me-4 text-gray-700 font-bold transition-all duration-100 group-hover:me-0" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MutualFunds;
