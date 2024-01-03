import React, { useEffect, useState } from "react";
import StockCards from "../../components/dashboard/cards/StockCards";
import StockIndexWidget from "../../components/dashboard/widgets/StockIndexWidget";
import { useDispatch, useSelector } from "react-redux";
import {
  allNSEStocksThunk,
  clearNSEStocksState,
} from "../../features/stocks/allNSEStocks";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import {
  clearStockIndexesState,
  getStockIndexesThunk,
} from "../../features/stocks/stockIndexes";
import StockModal from "../../components/dashboard/modals/StockModal";
import { buyStockThunk } from "../../features/portfolio/stockTransaction";
import { addToWatchlistThunk } from "../../features/watchlist/watchlist";
import {
  clearGetWatchlist,
  getStocksWatchlistThunk,
} from "../../features/watchlist/getWatchlist";

const Stocks = ({ setAlert }) => {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  const [stockName, setStockName] = useState("");
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockPrice, setStockPrice] = useState("");
  const [isModal, setIsModal] = useState(false);

  const { indexes } = useSelector((state) => state.stockIndexesReducer);
  const { isSuccess, isLoading, nseData } = useSelector(
    (state) => state.stockNSEReducer
  );
  const { stocksWatchlist, isLoading: watchlistLoading } = useSelector(
    (state) => state.getWatchlistReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearNSEStocksState());
    dispatch(allNSEStocksThunk({ skip, limit }));
  }, []);

  useEffect(() => {
    dispatch(getStockIndexesThunk());
  }, []);

  useEffect(() => {
    dispatch(clearGetWatchlist());
    dispatch(getStocksWatchlistThunk());
  }, []);

  useEffect(() => {
    let timeOut = setInterval(() => {
      let hour = new Date().getHours();
      let day = new Date().getDay();
      if (hour < 16 && hour > 9 && day > 0 && day < 6) {
        dispatch(clearStockIndexesState());
        dispatch(getStockIndexesThunk());
      }
    }, 15000);

    return () => {
      clearInterval(timeOut);
    };
  }, []);

  // mstockTransactionReducer

  const handleNext = () => {
    if (limit < 50) {
      dispatch(clearNSEStocksState());
      dispatch(allNSEStocksThunk({ skip: skip + 10, limit: limit + 10 }));

      setSkip(skip + 10);
      setLimit(limit + 10);
    }
  };

  const handlePrev = () => {
    if (skip > 0) {
      dispatch(clearNSEStocksState());
      dispatch(allNSEStocksThunk({ skip: skip - 10, limit: limit - 10 }));

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
          message: `You added ${stockName} to watchlist.`,
        });
        dispatch(clearGetWatchlist());
        dispatch(getStocksWatchlistThunk());
      }
    });
  };

  return (
    <>
      {isModal && (
        <StockModal
          name={stockName}
          setModal={(val) => setIsModal(val)}
          price={stockPrice}
          symbol={stockSymbol}
          setAlert={setAlert}
        />
      )}
      <div className="bg-gray-100 p-2">
        <div className="bg-white rounded-md p-5">
          <h1 className="text-3xl font-bold mb-8 p-5">Stocks</h1>
          <div className="flex justify-evenly items-center mb-5">
            <StockIndexWidget
              name={indexes?.nse?.name}
              symbol={indexes?.nse?.symbol}
              currPrice={parseFloat(indexes?.nse?.curr_price).toFixed(2)}
              currPer={parseFloat(indexes?.nse?.curr_per_change).toFixed(3)}
              currGap={parseFloat(indexes?.nse?.curr_change).toFixed(3)}
              size={"w-[40%]"}
            />
            <StockIndexWidget
              name={indexes?.bse?.name}
              symbol={indexes?.bse?.symbol}
              currPrice={parseFloat(indexes?.bse?.curr_price).toFixed(2)}
              currPer={parseFloat(indexes?.bse?.curr_per_change).toFixed(3)}
              currGap={parseFloat(indexes?.bse?.curr_change).toFixed(3)}
              size={"w-[40%]"}
            />
          </div>
          <div className="p-5">
            {(isLoading || watchlistLoading) && !isSuccess ? (
              <>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
              </>
            ) : (
              nseData?.map((el) => {
                let watchlistFind = stocksWatchlist?.find(
                  (wl) => wl.symbol === el.symbol
                );
                return (
                  <StockCards
                    link={`/dashboard/stocks/${el?.symbol}`}
                    key={el?.symbol}
                    name={el?.name}
                    symbol={el?.symbol}
                    price={el?.curr_price}
                    priceChange={el?.curr_change}
                    perChange={el?.curr_per_change}
                    setName={(val) => setStockName(val)}
                    setSymbol={(val) => setStockSymbol(val)}
                    setModal={(val) => setIsModal(val)}
                    setPrice={(val) => setStockPrice(val)}
                    handleWatchlist={(val) => handleAddToWatchlist(val)}
                    isWatch={watchlistFind !== undefined ? true : false}
                  />
                );
              })
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

export default Stocks;
