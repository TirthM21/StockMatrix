import React, { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";

const Notification = ({ notifications }) => {
  const [openNotification, setOpenNotification] = useState(false);

  return (
    <>
      <div className="relative">
        <button
          class="hidden relative mx-6 text-gray-600 transition-colors duration-300 transform lg:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
          aria-label="show notifications"
          onClick={() => setOpenNotification(!openNotification)}
        >
          <IoIosNotificationsOutline className="text-gray-300 text-3xl" />
          {notifications?.length > 0 && (
            <div
              className="absolute text-white bg-red-600 px-1.5 py-0.5 rounded-full top-0 -right-1"
              style={{ fontSize: "0.6rem" }}
            >
              {notifications?.length}
            </div>
          )}
        </button>

        {openNotification && (
          <div className="absolute bg-slate-200 w-[18rem] right-0 rounded-md">
            <h2 className="text-lg px-4 py-2 font-bold">Notifications</h2>
            {notifications?.length > 0 ? (
              notifications?.map((el) => {
                return (
                  <div className="p-4 border bg-gray-100">
                    <h5 className="font-semibold">{el?.title}</h5>
                    <p className="text-xs mt-1">{el?.body}</p>
                  </div>
                );
              })
            ) : (
              <p className="p-3 bg-gray-100">No Notifications</p>
            )}
            <div className="p-2 text-center">
              <button className="text-sm w-[100%]">Read More</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
