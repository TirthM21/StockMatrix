import React from "react";

const MutualFundWidget = ({ name, oneYear, fiveYear, titleText, valText }) => {
  return (
    <>
      <div className="flex justify-between items-center p-4 border">
        <div>
          <h2 className={`${titleText} font-bold`}>{name.substring(0, 20)}...</h2>
        </div>
        <div className="flex justify-evenly items-center w-[40%]">
          {oneYear > 0 ? (
            <p className={`${valText} me-2 text-green-500 font-semibold text-xs`}>{oneYear}%</p>
          ) : (
            <p className={`${valText} me-2 text-red-500 font-semibold text-xs`}>{oneYear}%</p>
          )}
          {fiveYear > 0 ? (
            <p className={`${valText} me-2 text-green-500 font-semibold text-xs`}>{fiveYear}%</p>
          ) : (
            <p className={`${valText} me-2 text-red-500 font-semibold text-xs`}>{fiveYear}%</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MutualFundWidget;
