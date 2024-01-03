import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <section className="bg-white  ">
        <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12 w-[80%]">
          <div className="wf-ull lg:w-1/2">
            <p className="text-sm font-medium text-blue-500">404 error</p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800">
              Page not found
            </h1>
            <p className="mt-4 text-gray-500 ">
              Sorry, the page you are looking for doesn't exist.Here are some
              helpful links:
            </p>

            <div className="flex items-center mt-6 gap-x-3">
              <Link to={"/dashboard/home"}>
                <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100 ">
                  <span>Home</span>
                </button>
              </Link>
            </div>
          </div>

          <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
            <img
              className="w-full max-w-lg lg:mx-auto"
              src="/assets/svgs/not-found.svg"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
