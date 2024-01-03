import React from "react";

const StockWidget = ({ name, symbol, price, priceChange, titleText, valText }) => {
  return (
    <>
      <div className="flex justify-between items-center p-4 border">
        <div>
          <h2 className={`${titleText} font-bold`}>{name?.substring(0,10)}..</h2>
        </div>
        <div className="flex justify-between items-center w-[65%]">
          <p className={`${valText} me-2`}>{symbol.substring(0, 7)}..</p>
          <p className={`${valText} me-2 font-semibold text-xs`}>₹{price}</p>
          {priceChange > 0 ? (
            <p className={`${valText} me-2 text-green-500 font-semibold text-xs`}>
              {priceChange}
            </p>
          ) : (
            <p className={`${valText} me-2 text-red-500 font-semibold text-xs`}>
              {priceChange}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default StockWidget;
