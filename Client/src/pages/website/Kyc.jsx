import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendEmailLoginThunk } from "../../features/email/sendLoginEmail";
import { useNavigate } from "react-router-dom";
import { addKycThunk } from "../../features/kyc/kyc";
import config from "../../config";
import Loading from "../../components/Loading";

const Kyc = ({ setAlert }) => {
  const [poi, setPoi] = useState({});
  const [poa, setPoa] = useState({});

  const [error, setError] = useState("");

  const { isLoading, isSuccess, isError } = useSelector(
    (state) => state.kycReducer
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (poi === "" || poa === "") {
      setError("Please enter the above fields correctly.");
      return;
    }

    if (poi.size > 1048576 * 10 || poa.size > 1048576 * 10) {
      setError("The size of the above file is more.");
      return;
    }

    const formData = new FormData();

    formData.append("proof-1", poi);
    formData.append("proof-2", poa);
    formData.append("id", localStorage.getItem("userId"));

    dispatch(addKycThunk(formData)).then((data) => {
      if (!data?.payload.success) {
        setAlert({
          show: true,
          type: "warning",
          message: data?.payload?.message,
        });
        return;
      } else {
        setAlert({
          show: true,
          type: "success",
          message: "KYC uploaded Successfully.",
        });
        navigate("/approve/kyc");
        return;
      }
    });
  };

  return (
    <>
      <div>
        <section className="bg-gray-200 h-[100vh] flex justify-center items-center">
          <div className="max-w-4xl w-1/3 p-6 mx-auto rounded-md shadow-md bg-white">
            <h2 className="text-3xl text-center font-bold text-gray-900 capitalize mb-6">
              KYC
            </h2>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label for="poi" className="block text-sm text-gray-600">
                  Proof of Indentity
                </label>
                <input
                  type="file"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  name="poi"
                  id="poi"
                  onChange={(e) => setPoi(e.target.files[0])}
                />
                <small className="text-sm text-gray-400">
                  File Size upto: 10MB
                </small>
                <br />
                {poi === "" || error ? (
                  <small className="text-red-500 mt-2">{error}</small>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-4">
                <label for="poa" className="block text-sm text-gray-600 ">
                  Proof of Address
                </label>
                <input
                  type="file"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  name="poa"
                  id="poa"
                  onChange={(e) => setPoa(e.target.files[0])}
                />
                <small className="text-sm text-gray-400">
                  File Size upto: 10MB
                </small>
                <br />
                {poa === "" || error ? (
                  <small className="text-red-500 mt-2">{error}</small>
                ) : (
                  ""
                )}
              </div>
              <div className="flex justify-center mt-6">
                <button className="py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-600focus:outline-none focus:bg-gray-600 w-1/2">
                  {isLoading ? <Loading size={"text-lg"} /> : "Add Documents"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Kyc;
