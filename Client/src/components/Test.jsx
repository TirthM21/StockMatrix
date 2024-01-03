import React, { useEffect, useState } from "react";

const Test = () => {
  const [count, setCount] = useState(-10);
  const [isCold, setIsCold] = useState(false);
  const [isHot, setIsHot] = useState(false);

  const red = "bg-red-400";
  const blue = "bg-blue-400";
  const neutral = "bg-white";

  useEffect(() => {
    if (count >= -10 && count < 17) {
      setIsCold(true);
      setIsHot(false);
    }
    if (count > 17 && count <= 30) {
      setIsHot(true);
      setIsCold(false);
    }
    if (count === 17) {
      setIsCold(false);
      setIsHot(false);
    }
  }, [count]);

  return (
    <div>
      <div className="bg-blue-200 p-5">
        <div
          className={`rounded-full p-5 ${isCold && blue} ${isHot && red} ${
            !isCold && !isHot && neutral
          }`}
        >
          {count}^ C
        </div>
        <button onClick={() => {if(count < 30) {setCount(count + 1)} }}>+</button>
        <button onClick={() => {if(count > -10) {setCount(count - 1)} }}>-</button>
      </div>
    </div>
  );
};

export default Test;
