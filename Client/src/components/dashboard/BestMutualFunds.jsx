import React from "react";
import MutualFundCards from "./cards/MutualFundCards";
import { useDispatch, useSelector } from "react-redux";
import {
  clearGetWatchlist,
  getMFsWatchlistThunk,
} from "../../features/watchlist/getWatchlist";
import { addToWatchlistThunk } from "../../features/watchlist/watchlist";

const BestMutualFunds = ({
  data,
  setName,
  setModal,
  setSymbol,
  setPrice,
  setOneYear,
  setAlert,
  mfName,
}) => {
  const { mfsWatchlist, isLoading: watchlistLoading } = useSelector(
    (state) => state.getWatchlistReducer
  );
  const dispatch = useDispatch();

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
      {data?.map((el) => {
        let watchlistFind = mfsWatchlist?.find(
          (wl) => wl.symbol === el.symbol + ".BO"
        );
        return (
          <MutualFundCards
            name={el?.fund}
            key={el?.symbol}
            symbol={el?.symbol}
            oneYear={el?.return_one_year}
            fiveYear={el?.return_five_year}
            setName={(val) => setName(val)}
            setModal={(val) => setModal(val)}
            setSymbol={(val) => setSymbol(val)}
            setPrice={(val) => setPrice(val)}
            setOneYear={(val) => setOneYear(val)}
            addToWatchlist={(val) => handleAddToWatchlist(val)}
            isWatch={watchlistFind !== undefined ? true : false}
          />
        );
      })}
    </>
  );
};

export default BestMutualFunds;
