import React, { useState } from "react";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNominateThunk } from "../../features/user/nominate";
import { sendEmailLoginThunk } from "../../features/email/sendLoginEmail";
import Loading from "../../components/Loading";

const UserNominate = ({ setAlert }) => {
  const [relationship, setRelationship] = useState("");
  const [name, setName] = useState("");
  const [dob, setDOB] = useState("");
  const [address, setAddress] = useState("");

  const { isLoading, isSuccess, isError } = useSelector(
    (state) => state.nominateReducer
  );

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (relationship === "" || name === "" || dob === "" || address === "") {
      setError("Please Enter above field correctly.");
      return;
    }

    let data = {
      relationship,
      dob,
      name,
      id: localStorage.getItem("userId"),
      address,
    };

    dispatch(addNominateThunk(data)).then((data) => {
      if (!data.payload.success) {
        setAlert({
          show: true,
          type: "warning",
          message: `${data.payload?.message}`,
        });
        return;
      } else {
        setAlert({
          show: true,
          type: "info",
          message: "Great! Please do your KYC.",
        });
        navigate("/user/kyc");
        return;
      }
    });
  };

  return (
    <>
      <section className="bg-gray-200 h-[100vh] flex justify-center items-center">
        <div class="max-w-4xl w-[60%] p-6 my-10 mx-auto rounded-md shadow-md bg-white">
          <form onSubmit={handleSubmit}>
            <p className="text-3xl text-center font-bold text-gray-900 capitalize mb-6">
              Your Nominations
            </p>
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div className="mb-4">
                <Input
                  type="text"
                  labelName="Relationship"
                  placeholder="Relationship"
                  value={relationship}
                  handleValue={(val) => setRelationship(val)}
                  handleFocus={() => {}}
                />
                {relationship === "" && error && (
                  <small className="text-red-500">{error}</small>
                )}
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  labelName="Full Name of Nominee"
                  placeholder="Full Name"
                  value={name}
                  handleValue={(val) => setName(val)}
                  handleFocus={() => {}}
                />
                {name === "" && error && (
                  <small className="text-red-500">{error}</small>
                )}
              </div>
              <div className="mb-4">
                <Input
                  type="date"
                  labelName="Date of Birth"
                  placeholder="Date of Birth"
                  value={dob}
                  handleValue={(val) => setDOB(val)}
                  handleFocus={() => {}}
                />
                {dob === "" && error && (
                  <small className="text-red-500">{error}</small>
                )}
              </div>
              <div className="mb-4">
                <TextArea
                  label="Address"
                  placeholderText="Address"
                  value={address}
                  handleChange={(val) => setAddress(val)}
                  handleFocus={() => {}}
                />
                {address === "" && error && (
                  <small className="text-red-500">{error}</small>
                )}
              </div>
            </div>
            <div class="flex justify-evenly mt-6">
              <button class="py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 w-1/3">
                {isLoading ? <Loading size={"text-lg"} /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default UserNominate;
