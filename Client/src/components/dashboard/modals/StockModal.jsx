import React, { useState } from "react";
import Input from "../../Input";
import { useDispatch, useSelector } from "react-redux";
import { buyStockThunk } from "../../../features/portfolio/stockTransaction";
import Loading from "../../Loading";

const StockModal = ({ name, setModal, price, symbol, setAlert }) => {
  const [quantity, setQuantity] = useState(0);

  const { isLoading, isSuccess } = useSelector(
    (state) => state.stockTransactionReducer
  );
  const dispatch = useDispatch();

  const handleBuy = () => {
    if (quantity === "") {
      setAlert({
        show: true,
        type: "warning",
        message: "Please add Required Data.",
      });
    }

    let hour = new Date().getHours();
    let day = new Date().getDay();

    if (hour < 15 && hour > 9 && day > 0 && day < 6) {
      let data = {
        buy_price: price,
        no_of_shares: Number(quantity),
        symbol: symbol,
        name,
      };

      dispatch(buyStockThunk(data)).then((data) => {
        if (!data?.payload?.success) {
          setAlert({
            show: true,
            type: "warning",
            message: data?.payload.message,
          });
        } else {
          setAlert({
            show: true,
            type: "success",
            message: `Congratulations! You Successfully bought ${name}.`,
          });
          setModal(false);
          setQuantity("");
        }
      });
    } else {
      setAlert({
        show: true,
        type: "danger",
        message: "Currently, The Market is closed.",
      });
    }
    return;
  };

  return (
    <>
      <div className="relative flex justify-center">
        <div
          className="fixed inset-0 z-10 overflow-y-auto  bg-black/50"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl lg:w-[40rem] sm:my-8 sm:align-middle  sm:w-full sm:p-6">
              <div>
                <div className="mt-4 text-center">
                  <h3
                    className="font-bold text-xl text-gray-800 capitalize"
                    id="modal-title"
                  >
                    {name}
                  </h3>
                </div>
              </div>

              <div className="mt-4">
                <Input
                  type={"text"}
                  labelName={"Quantity"}
                  value={quantity}
                  handleValue={(val) => setQuantity(val)}
                  handleFocus={() => {}}
                />
              </div>

              <div className="mt-4 sm:mt-6 sm:flex sm:items-center sm:-mx-2">
                <button
                  className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                  onClick={() => setModal(false)}
                >
                  Close
                </button>

                <button
                  className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-green-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  onClick={() => handleBuy()}
                >
                  {isLoading && !isSuccess ? (
                    <Loading size={"text-lg"} />
                  ) : (
                    "Buy Now"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockModal;
