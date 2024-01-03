import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

import {
  clearBestMFState,
  getBestDebtFundsThunk,
  getBestEquityFundsThunk,
  getBestLongTermFundsThunk,
  getBestReturnsFundsThunk,
  getBestTaxSaverFundsThunk,
} from "../../features/mutualfunds/bestMF";
import BestMutualFunds from "../../components/dashboard/BestMutualFunds";
import { buyMFThunk } from "../../features/portfolio/mfTransaction";
import MutualFundModal from "../../components/dashboard/modals/MutualFundModal";

const BestMF = ({ setAlert }) => {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState({});

  const [mfName, setMFName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [price, setPrice] = useState("");
  const [oneYear, setOneYear] = useState("");

  const { name } = useParams();

  const {
    isSuccess,
    isLoading,
    isError,
    bestDebt,
    bestLongTerm,
    bestReturns,
    bestEquity,
    bestTaxSaver,
  } = useSelector((state) => state.bestMFReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (name === "long-term") {
      dispatch(clearBestMFState());
      dispatch(getBestLongTermFundsThunk({ skip, limit }));
    }
    if (name === "returns") {
      dispatch(clearBestMFState());
      dispatch(getBestReturnsFundsThunk({ skip, limit }));
    }
    if (name === "tax-saver") {
      dispatch(clearBestMFState());
      dispatch(getBestTaxSaverFundsThunk({ skip, limit }));
    }
    if (name === "equity") {
      dispatch(clearBestMFState());
      dispatch(getBestEquityFundsThunk({ skip, limit }));
    }
    if (name === "debt") {
      dispatch(clearBestMFState());
      dispatch(getBestDebtFundsThunk({ skip, limit }));
    }
  }, [skip, limit]);

  useEffect(() => {
    if (bestDebt?.data?.length > 0) {
      setData(bestDebt);
    }

    if (bestEquity?.data?.length > 0) {
      setData(bestEquity);
    }

    if (bestLongTerm?.data?.length > 0) {
      setData(bestLongTerm);
    }

    if (bestReturns?.data?.length > 0) {
      setData(bestReturns);
    }

    if (bestTaxSaver?.data?.length > 0) {
      setData(bestTaxSaver);
    }
  }, [bestDebt, bestEquity, bestLongTerm, bestReturns, bestTaxSaver]);

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
            <h1 className="text-2xl font-bold mb-5">
              {name === "long-term"
                ? "Best Long Term Mutual Funds"
                : name === "returns"
                ? "Best Returns Mutual Funds"
                : name === "tax-saver"
                ? "Best Tax Saver Mutual Funds"
                : name === "equity"
                ? "Best Equity Mutual Funds"
                : "Best Debt Mutual Funds"}
            </h1>
            {isLoading && !isSuccess && !isError && (
              <>
                {" "}
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
                <span className="w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse"></span>
              </>
            )}

            <BestMutualFunds
              data={data?.data}
              setName={(val) => setMFName(val)}
              setModal={(val) => setIsModal(val)}
              setSymbol={(val) => setSymbol(val)}
              setPrice={(val) => setPrice(val)}
              setOneYear={(val) => setOneYear(val)}
              mfName={mfName}
              setAlert={setAlert}
            />

            {isError && (
              <p className="text-red-500 text-3xl">Some Error Occurred.</p>
            )}

            <div className="flex items-center justify-evenly">
              <button
                className="px-4 py-2 bg-black text-gray-100 rounded-md hover:bg-gray-800 font-semibold flex items-center"
                onClick={() => {
                  if (skip > 0) {
                    setSkip(skip - 10);
                    setLimit(limit - 10);
                  }
                }}
              >
                <BsChevronLeft className="me-3" />
                Prev
              </button>
              <button
                className="px-4 py-2 bg-black text-gray-100 rounded-md hover:bg-gray-800 font-semibold flex items-center"
                onClick={() => {
                  if (limit < data?.data?.length * data?.total_pages) {
                    setSkip(skip + 10);
                    setLimit(limit + 10);
                  }
                }}
              >
                Next
                <BsChevronRight className="ms-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestMF;
