import React from "react";

const StockIndexWidget = ({ name, symbol, currPrice, currPer, currGap, size }) => {
  return (
    <>
      <div className={`border p-4 ${size} bg-gray-100 rounded-sm`}>
        {currPrice && currPer && currGap && name && symbol ? (
          <>
            <h2 className="text-2xl font-extrabold">
              {name}
              <span className="text-lg font-normal mt-2"> ({symbol})</span>
            </h2>
          </>
        ) : (
          <span className="w-5/6 h-5 block rounded bg-gray-200 animate-pulse"></span>
        )}
        <div className="flex justify-between items-center mt-2">
          {currPrice && currPer && currGap && name && symbol ? (
            <>
              <h1 className="text-xl font-semibold">
                <span className="text-lg">₹ </span>
                {currPrice}
              </h1>
              {currGap < 0 ? (
                <p className="text-red-500 font-semibold">
                  <span>{currGap}</span>
                  <span>({currPer}%)</span>
                </p>
              ) : (
                <p className="text-green-500 font-semibold">
                  <span>+{currGap}</span> <span>({currPer}%)</span>
                </p>
              )}
            </>
          ) : (
            <span className="w-5/6 h-5 block rounded bg-gray-200 animate-pulse"></span>
          )}
        </div>
      </div>
    </>
  );
};

export default StockIndexWidget;
