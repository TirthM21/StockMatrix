import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const Loading = ({ size }) => {
  return (
    <p className="flex justify-center items-center m-0">
      <AiOutlineLoading className={`animate-spin ${size}`} />
    </p>
  );
};

export default Loading;
