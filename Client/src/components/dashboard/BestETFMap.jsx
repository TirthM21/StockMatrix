import React from "react";
import EtfCards from "./cards/EtfCards";

const BestETFMap = ({ data, setModal, setSymbol, setName, handleBuy, setPrice }) => {
  return (
    <>
      <>
        {data?.map((el) => {
          return (
            <EtfCards
              name={el?.name}
              key={el?.symbol}
              price={el?.curr_price}
              priceChange={el?.price_change}
              perChange={el?.per_change}
              symbol={el?.symbol}
              setModal={(val) => setModal(val)}
              setSymbol={(val) => setSymbol(val)}
              setName={(val) => setName(val)}
              setPrice={(val) => setPrice(val)}
              handleBuy={() => handleBuy()}
            />
          );
        })}
      </>
    </>
  );
};

export default BestETFMap;
