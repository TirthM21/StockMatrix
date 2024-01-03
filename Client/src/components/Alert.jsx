import React from "react";
import { RxCross2 } from "react-icons/rx";

const Alert = ({ data, closeVisible }) => {
  return (
    <div
      className={`border-l-4 p-4 fixed w-[80vw] left-32 top-10 z-40 ${
        data?.show ? "opacity-100 h-[8vh]" : "hidden opacity-0 h-0"
      } ${
        data?.type === "warning"
          ? "border-orange-500 text-orange-700 bg-orange-100 "
          : data?.type === "danger"
          ? "border-red-500 text-red-700 bg-red-100 "
          : data?.type === "info"
          ? "border-blue-500 text-blue-700 bg-blue-100 "
          : data?.type === "success"
          ? "border-green-500 text-green-700 bg-green-100 "
          : "border-gray-500 text-gray-700 bg-gray-100 "
      }`}
      role="alert"
    >
      <div className="flex justify-between items-center">
        <p>{data?.message}</p>
        <button
          onClick={() =>
            closeVisible({
              show: false,
              type: "",
              message: "",
            })
          }
        >
          <RxCross2 className="text-black text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Alert;
