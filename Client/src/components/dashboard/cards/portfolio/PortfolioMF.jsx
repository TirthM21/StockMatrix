import React from "react";
import { Link } from "react-router-dom";

const PortfolioMF = ({
  name,
  buyPrice,
  expectedProfit,
  expectedInterest,
  totalYears,
  dateOfBuy,
  totalInvestment,
  symbol,
  id,
  setSymbol,
  setName,
  setTickerId,
  setModal,
  setType,
  setProfit,
  setPrice,
}) => {
  return (
    <>
      <div className="flex justify-between items-center p-4 border bg-slate-50">
        <div>
          <h2 className={`text-xl font-bold`}>
            {name.length > 20 ? name.substring(0, 20) + "..." : name}
          </h2>
        </div>
        <div className="flex justify-between items-center w-[75%]">
          <p className={`font-semibold`}>₹{buyPrice}</p>
          <p className={`font-semibold`}>₹{expectedProfit.toFixed(3)}</p>
          {totalInvestment ? (
            <p className={`font-semibold`}>₹ {totalInvestment.toFixed(3)}</p>
          ) : (
            ""
          )}
          <p className={`font-semibold`}>₹{expectedInterest.toFixed(3)}</p>
          <p className={`font-semibold`}>{totalYears}</p>
          <p className={`font-semibold`}>{dateOfBuy}</p>
          <button
            onClick={() => {
              setName(name);
              setSymbol(symbol);
              setModal(true);
              setType("mutual_funds");
              setTickerId(id);
              setProfit(expectedProfit);
              setPrice(buyPrice);
            }}
            className="p-1 px-3 text-white bg-red-600 text-sm rounded-sm"
          >
            Sell
          </button>
        </div>
      </div>
    </>
  );
};

export default PortfolioMF;
