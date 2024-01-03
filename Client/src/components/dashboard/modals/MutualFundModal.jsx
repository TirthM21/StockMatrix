import React, { useEffect, useState } from "react";
import Input from "../../Input";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { buyMFThunk } from "../../../features/portfolio/mfTransaction";
import Loading from "../../Loading";

const MutualFundModal = ({
  name,
  setModal,
  price,
  oneYear,
  symbol,
  setAlert,
}) => {
  const [openLumpsum, setOpenLumpsum] = useState(true);
  const [openSIP, setOpenSIP] = useState(false);
  const [type, setType] = useState("");
  const [years, setYears] = useState("");
  const [investment, setInvestment] = useState("");

  const { isLoading, isSuccess } = useSelector(
    (state) => state.mfTransactionReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (openLumpsum) {
      setType(0);
    }
  }, [openLumpsum]);

  useEffect(() => {
    if (openSIP) {
      setType(1);
    }
  }, [openSIP]);

  const handleBuy = () => {
    if (Number(investment) < price) {
      setAlert({
        show: true,
        type: "warning",
        message: `You have to invest minimum ${investment}.`,
      });
    }

    if (investment === "" || years === "") {
      setAlert({
        show: true,
        type: "warning",
        message: "Please add Required Data.",
      });
    }

    let curr_year = Number(new Date().getFullYear());
    let data = {
      name,
      symbol,
      one_year_return: Number(oneYear),
      buy_investment: Number(investment?.substring(1)),
      investment: Number(investment),
      type_mf: type,
      total_years: Number(years),
      year_sell: curr_year + Number(years),
    };

    dispatch(buyMFThunk(data)).then((data) => {
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
          message: `Congratulations! You Successfully Invested in ${name}.`,
        });
        setYears("");
        setInvestment("");
      }
    });

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

              <ul
                className="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0"
                role="tablist"
                data-te-nav-ref
              >
                <li role="presentation" className="flex-auto text-center">
                  <Link
                    to=""
                    className={`my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-lg font-bold uppercase leading-tight hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent ${
                      openLumpsum ? "text-blue-600" : "text-neutral-500"
                    }`}
                    onClick={() => {
                      setOpenSIP(false);
                      setOpenLumpsum(true);
                    }}
                  >
                    Lumpsum
                  </Link>
                </li>
                <li role="presentation" class="flex-auto text-center">
                  <Link
                    to=""
                    class={`my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-lg font-bold uppercase leading-tight hover:isolate hover:border-transparent  focus:isolate hover:bg-neutral-100 focus:border-transparent ${
                      openSIP ? "text-blue-600" : "text-neutral-500"
                    }`}
                    onClick={() => {
                      setOpenSIP(true);
                      setOpenLumpsum(false);
                    }}
                  >
                    SIP
                  </Link>
                </li>
              </ul>

              <div className="mb-6">
                <div
                  className={`${
                    openLumpsum ? "opacity-100" : "hidden opacity-0"
                  } transition-opacity duration-150 ease-linear data-[te-tab-active]:block`}
                  id="tabs-home01"
                >
                  <div className="mb-4">
                    <Input
                      type={"text"}
                      labelName={"Lumpsum - Money"}
                      value={investment}
                      handleValue={(val) => setInvestment(val)}
                      handleFocus={() => {}}
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      type={"text"}
                      labelName={"Lumpsum - No. of Years"}
                      value={years}
                      handleValue={(val) => setYears(val)}
                      handleFocus={() => {}}
                    />
                  </div>
                </div>

                <div
                  class={`${
                    openSIP ? "opacity-100" : "hidden opacity-0"
                  } transition-opacity duration-150 ease-linear data-[te-tab-active]:block`}
                  id="tabs-message01"
                >
                  <div className="mb-4">
                    <Input
                      type={"text"}
                      labelName={"SIP - Money"}
                      value={investment}
                      handleValue={(val) => setInvestment(val)}
                      handleFocus={() => {}}
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      type={"text"}
                      labelName={"SIP - No. of Years"}
                      value={years}
                      handleValue={(val) => setYears(val)}
                      handleFocus={() => {}}
                    />
                  </div>
                </div>
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

export default MutualFundModal;
