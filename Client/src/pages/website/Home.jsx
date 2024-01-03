import React from "react";
import Hero from "../../components/website/Hero";
import InvestmentOptionSection from "../../components/website/InvestmentOptionSection";
import FeaturesSection from "../../components/website/FeaturesSection";
import Header from "../../components/website/Header";
import Footer from "../../components/website/Footer";
import Testimony from "../../components/website/Testimony";

export const Home = ({ setAlert }) => {
  return (
    <>
      <Header />
      <div className="mx-auto lg:w-[80%] md:w-[90%] sm:w-[100%]">
        <Hero />
      </div>
      {/* <FeaturesSection />
      <InvestmentOptionSection />
      <Testimony /> */}
      <Footer />
    </>
  );
};

export default Home;
