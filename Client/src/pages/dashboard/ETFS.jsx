import React, { useEffect, useState } from "react";
import EtfCards from "../../components/dashboard/cards/EtfCards";
import { useDispatch, useSelector } from "react-redux";
import { clearAllETFsState, getAllETFThunk } from "../../features/etfs/allEtfs";
import { IoPieChartSharp } from "react-icons/io5";
import { AiFillGolden } from "react-icons/ai";
import { HiChartSquareBar } from "react-icons/hi";
import { GiTiedScroll } from "react-icons/gi";
import TypeETF from "../../components/dashboard/widgets/TypeETF";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import ETFModal from "../../components/dashboard/modals/ETFModal";
import { buyETFThunk } from "../../features/portfolio/etfTransaction";
import { addToWatchlistThunk } from "../../features/watchlist/watchlist";

import {
  clearGetWatchlist,
  getETFsWatchlistThunk,
} from "../../features/watchlist/getWatchlist";

const ETFs = ({ setAlert }) => {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  const [etfName, setETFName] = useState("");
  const [etfSymbol, setETFSymbol] = useState("");
  const [etfPrice, setETFPrice] = useState("");
  const [isModal, setIsModal] = useState(false);

  const { isLoading, isSuccess, allETF, isError } = useSelector(
    (state) => state.allEtfsReducer
  );
  const { etfsWatchlist, isLoading: watchlistLoading } = useSelector(
    (state) => state.getWatchlistReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearGetWatchlist());
    dispatch(getETFsWatchlistThunk());
  }, []);

  useEffect(() => {
    dispatch(clearAllETFsState());
    dispatch(getAllETFThunk({ skip, limit }));
  }, []);

  const handleNext = () => {
    if (limit < 50) {
      dispatch(clearAllETFsState());
      dispatch(getAllETFThunk({ skip: skip + 10, limit: limit + 10 }));

      setSkip(skip + 10);
      setLimit(limit + 10);
    }
  };

  const handlePrev = () => {
    if (skip > 0) {
      dispatch(clearAllETFsState());
      dispatch(getAllETFThunk({ skip: skip - 10, limit: limit - 10 }));

      setSkip(skip - 10);
      setLimit(limit - 10);
    }
  };

  // Data
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
          message: `You added ${etfName} to watchlist.`,
        });
        dispatch(clearGetWatchlist());
        dispatch(getETFsWatchlistThunk());
      }
    });
  };
  
  return (
    <>
      {isModal && (
        <ETFModal
          name={etfName}
          setModal={(val) => setIsModal(val)}
          setAlert={setAlert}
          symbol={etfSymbol}
          price={etfPrice}
        />
      )}
      <div className="bg-gray-100 p-2">
        <div className="bg-white rounded-md p-5">
          <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">ETFs</h1>
            <div className="my-8">
              <h1 className="text-xl font-semibold text-center p-5 pt-0">
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
              allETF?.data?.map((el) => {
                let watchlistFind = etfsWatchlist?.find(
                  (wl) => wl.symbol === el.symbol
                );
                return (
                  <EtfCards
                    name={el?.name}
                    price={el?.curr_price}
                    priceChange={el?.price_change}
                    perChange={el?.per_change}
                    setModal={(val) => setIsModal(val)}
                    symbol={el?.symbol}
                    setSymbol={(val) => setETFSymbol(val)}
                    setName={(val) => setETFName(val)}
                    setPrice={(val) => setETFPrice(val)}
                    addToWatchlist={(val) => handleAddToWatchlist(val)}
                    isWatch={watchlistFind !== undefined ? true : false}
                  />
                );
              })
            )}
            {isError && (
              <p className="text-red-500 text-3xl">Some Error Occurred</p>
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
        </div>
      </div>
    </>
  );
};

export default ETFs;
