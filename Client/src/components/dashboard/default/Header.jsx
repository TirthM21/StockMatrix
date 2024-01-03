import React, { useEffect, useState } from "react";
import Notification from "../Notification";
import { useDispatch, useSelector } from "react-redux";
import {
  clearNotification,
  getSIPNotificationThunk,
} from "../../../features/notification";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import Searchlisting from "../Searchlisting";
import {
  clearSearch,
  searchETFThunk,
  searchMFThunk,
  searchStockThunk,
} from "../../../features/searchTicker";
import { GoSearch } from "react-icons/go";

const Header = ({ openSidebar, setSidebar }) => {
  const [searchTicker, setSearchTicker] = useState("");
  const [openSearchList, setOpenSearchList] = useState(false);

  const { sipNotifications } = useSelector(
    (state) => state.notificationReducer
  );
  const { stocks, mfs, etfs, isLoading } = useSelector(
    (state) => state.searchTickerReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearNotification());
    dispatch(getSIPNotificationThunk());
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token on logout action
    navigate("/");
  };

  useEffect(() => {
    if (searchTicker) {
      let time = setTimeout(() => {
        dispatch(clearSearch());
        dispatch(searchStockThunk(searchTicker));
        dispatch(searchMFThunk(searchTicker));
        dispatch(searchETFThunk(searchTicker));
        setOpenSearchList(true);
      }, 2000);
      return () => clearTimeout(time);
    }
  }, [searchTicker]);

  return (
    <>
      <nav className="md:relative bg-gray-800">
        <div className="xl:container px-6 py-4 mx-auto">
          <div className="lg:flex lg:items-center lg:justify-end">
            <div className="flex items-center justify-between lg:w-[50%]">
              <div className="flex lg:hidden">
                {!openSidebar ? (
                  <button
                    type="button"
                    className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                    aria-label="toggle menu"
                    onClick={() => setSidebar(true)}
                  >
                    <HiMenuAlt1 className="text-2xl" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                    aria-label="toggle menu"
                    onClick={() => setSidebar(false)}
                  >
                    <IoCloseSharp className="text-2xl" />
                  </button>
                )}
              </div>

              <div className="absolute lg:w-[100%] sm:static sm:p-0 sm:w-[50%] inset-x-0 z-20 px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
                {/* <div className='flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8'></div> */}
                <div className="flex items-center mt-4 lg:mt-0 sm:mt-0 w-[100%]">
                  <div className="relative mt-4 sm:mt-0 w-[100%]">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <GoSearch className="text-xl text-white" />
                    </span>
                    {openSearchList && (
                      <span
                        onClick={() => {
                          setOpenSearchList(false);
                          setSearchTicker("");
                        }}
                        className="absolute inset-y-0 hover:cursor-pointer right-0 flex items-center pr-3"
                      >
                        <IoCloseSharp className="text-xl text-white" />
                      </span>
                    )}

                    <div className="lg:w-full sm:w-[90%]">
                      <input
                        type="text"
                        className="w-[100%] py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                        placeholder="Search Tickers"
                        onChange={(e) => setSearchTicker(e.target.value)}
                      />
                      {openSearchList && (
                        <Searchlisting
                          stocks={stocks}
                          mfs={mfs}
                          etfs={etfs}
                          setOpen={setOpenSearchList}
                        />
                      )}
                    </div>
                  </div>

                  <Notification notifications={sipNotifications} />

                  <button
                    onClick={() => handleLogout()}
                    className="flex justify-between items-center bg-slate-900 hover:bg-red-600 rounded-md p-2 px-3 text-white"
                  >
                    <span className="me-3">Logout</span>
                    <span>
                      <LuLogOut />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
