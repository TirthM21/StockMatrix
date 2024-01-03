import React from "react";
import Button from "../Button";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 id="appname" className="title-font md:text-5xl sm:text-4xl leading-normal font-extrabold text-3xl mb-4 text-gray-900">
              ScripVault
            </h1>
            <span id="apptitle" className="text-3xl font-bold mb-3 text-gray-700">
              The Best Investment Advisor
            </span>
            <p id="appdesc" className="mb-8 leading-relaxed text-xl">
              Fast, Efficient and Research oriented Investments at your
              fingertips. Build your Portfolio with us.
            </p>
            <div id="getstartedbtn" className="flex justify-center">
              <Button
                text={
                  <span className="flex items-center justify-between">
                    Get Started <BsArrowRight className="ms-3 text-lg" />
                  </span>
                }
                link="/register"
                textSize="text-lg"
                color="bg-indigo-500"
                hoverColor="hover:bg-indigo-600 hover:scale-105 transition-all duration-150"
                textColor="text-white"
              />
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="/assets/svgs/hero.svg"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
