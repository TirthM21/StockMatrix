import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearGetWatchlist,
  getETFsWatchlistThunk,
  getMFsWatchlistThunk,
  getStocksWatchlistThunk,
} from "../../features/watchlist/getWatchlist";
import StockCards from "../../components/dashboard/cards/StockCards";
import MutualFundCards from "../../components/dashboard/cards/MutualFundCards";
import { removeWatchlistThunk } from "../../features/watchlist/watchlist";
import EtfCards from "../../components/dashboard/cards/EtfCards";
import StockModal from "../../components/dashboard/modals/StockModal";
import ETFModal from "../../components/dashboard/modals/ETFModal";
import MutualFundModal from "../../components/dashboard/modals/MutualFundModal";

const Watchlist = ({ setAlert }) => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [oneYear, setOneYear] = useState("");

  const [stockModal, setStockModal] = useState(false);
  const [mfModal, setMFModal] = useState(false);
  const [etfModal, setETFModal] = useState(false);

  const { stocksWatchlist, mfsWatchlist, etfsWatchlist, isLoading, isSuccess } =
    useSelector((state) => state.getWatchlistReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearGetWatchlist());
    dispatch(getStocksWatchlistThunk());
    dispatch(getMFsWatchlistThunk());
    dispatch(getETFsWatchlistThunk());
  }, []);

  const handleRemoveWatchlist = (data) => {
    dispatch(removeWatchlistThunk(data)).then((data) => {
      if (!data?.payload.success) {
        setAlert({
          show: true,
          type: "danger",
          message: data?.payload.message,
        });
      } else {
        setAlert({
          show: true,
          type: "success",
          message: `Successfully removed from watchlist.`,
        });
        dispatch(clearGetWatchlist());
        dispatch(getStocksWatchlistThunk());
        dispatch(getMFsWatchlistThunk());
        dispatch(getETFsWatchlistThunk());
      }
    });
  };

  return (
    <>
      {stockModal && (
        <StockModal
          name={name}
          setModal={(val) => setStockModal(val)}
          price={price}
          symbol={symbol}
          setAlert={setAlert}
        />
      )}
      {mfModal && (
        <MutualFundModal
          name={name}
          setModal={(val) => setMFModal(val)}
          price={price}
          oneYear={oneYear}
          symbol={symbol.split(".")[0]}
          setAlert={setAlert}
        />
      )}
      {etfModal && (
        <ETFModal
          name={name}
          setModal={(val) => setETFModal(val)}
          setAlert={setAlert}
          symbol={symbol}
          price={price}
        />
      )}
      <div className="bg-gray-100 p-2">
        <div className="bg-white rounded-md p-5">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">Stocks</h1>
            {isLoading && !isSuccess && !etfsWatchlist ? (
              <>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
              </>
            ) : (
              stocksWatchlist?.map((el) => {
                return (
                  <StockCards
                    link={`/dashboard/stocks/${el?.symbol}`}
                    id={el?.id}
                    key={el?.symbol}
                    name={el?.name}
                    symbol={el?.symbol}
                    price={el?.curr_price}
                    priceChange={el?.curr_change}
                    perChange={el?.curr_per_change}
                    setName={(val) => setName(val)}
                    setSymbol={(val) => setSymbol(val)}
                    setModal={(val) => setStockModal(val)}
                    setPrice={(val) => setPrice(val)}
                    handleWatchlist={(val) => {}}
                    removeWatchlist={(val) => handleRemoveWatchlist(val)}
                    rWatchlist={true}
                    isWatch={true}
                  />
                );
              })
            )}
            {stocksWatchlist === undefined || stocksWatchlist?.length === 0 && <p>No Data Avalaibale</p>}
          </div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">Mutual Funds</h1>
            {isLoading && !isSuccess && !etfsWatchlist ? (
              <>
                {" "}
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
              </>
            ) : (
              mfsWatchlist?.map((el) => {
                return (
                  <MutualFundCards
                    name={el?.name}
                    id={el?.id}
                    key={el?.symbol}
                    symbol={el?.symbol?.split(".")[0]}
                    price={"₹" + el?.curr_price}
                    oneYear={el?.per_change}
                    fiveYear={el?.price_change}
                    setName={(val) => setName(val)}
                    setModal={(val) => setMFModal(val)}
                    setSymbol={(val) => setSymbol(val)}
                    setPrice={(val) => setPrice(val)}
                    setOneYear={(val) => setOneYear(val)}
                    addToWatchlist={(val) => {}}
                    removeWatchlist={(val) => handleRemoveWatchlist(val)}
                    rWatchlist={true}
                    isWatch={true}
                  />
                );
              })
            )}
            {mfsWatchlist === undefined || mfsWatchlist?.length === 0 && <p>No Data Avalaibale</p>}
          </div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">ETFs</h1>
            {isLoading && !isSuccess && !etfsWatchlist ? (
              <>
                {" "}
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
              </>
            ) : (
              etfsWatchlist?.map((el) => {
                return (
                  <EtfCards
                    key={el?.id}
                    name={el?.name}
                    id={el?.id}
                    price={el?.curr_price}
                    priceChange={el?.price_change}
                    perChange={el?.per_change}
                    setModal={(val) => setETFModal(val)}
                    symbol={el?.symbol}
                    setSymbol={(val) => setSymbol(val)}
                    setName={(val) => setName(val)}
                    setPrice={(val) => setPrice(val)}
                    addToWatchlist={(val) => {}}
                    removeWatchlist={(val) => handleRemoveWatchlist(val)}
                    rWatchlist={true}
                    isWatch={true}
                  />
                );
              })
            )}
            {etfsWatchlist === undefined || etfsWatchlist?.length === 0 && <p>No Data Avalaibale</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Watchlist;
