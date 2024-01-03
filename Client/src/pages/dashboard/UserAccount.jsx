import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUserInfoState, getUserThunk } from "../../features/user/info";
import {
  clearUserNominateState,
  getNominateThunk,
} from "../../features/user/nominate";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import { CgProfile } from "react-icons/cg";
import { FiEdit2 } from "react-icons/fi";
import {
  updateBankThunk,
  updateNominateThunk,
  updateUserInfoThunk,
  updateUserThunk,
} from "../../features/user/updateData";

const UserAccount = ({ setAlert }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [dob, setDob] = useState("");
  const [pan, setPan] = useState("");
  const [sourceWealth, setSourceWealth] = useState("");
  const [address, setAddress] = useState("");

  const [acctNo, setAcctNo] = useState("");
  const [acctType, setAcctType] = useState("");
  const [country, setCountry] = useState("");
  const [ifsc, setIfsc] = useState("");

  const [nomRelation, setNomRelation] = useState("");
  const [nomFullName, setNomFullName] = useState("");
  const [nomDob, setNomDob] = useState("");
  const [nomAddress, setNomAddress] = useState("");

  const [userEdit, setUserEdit] = useState(false);
  const [userInfoEdit, setUserInfoEdit] = useState(false);
  const [userBankEdit, setUserBankEdit] = useState(false);
  const [userNominateEdit, setUserNominateEdit] = useState(false);

  const { user, isLoading: userLoading } = useSelector(
    (state) => state.infoReducer
  );

  const { nominate, isLoading: nominateLoading } = useSelector(
    (state) => state.nominateReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearUserInfoState());
    dispatch(clearUserNominateState());

    dispatch(getUserThunk());
    dispatch(getNominateThunk());
  }, []);

  useEffect(() => {
    if (user && !userLoading) {
      setFullName(user?.basic?.full_name);
      setEmail(user?.basic?.email);
      setPhone(user?.basic?.phone);

      setDob(user?.info?.dob);
      setPan(user?.info?.pan);
      setSourceWealth(user?.info?.sourceWealth);
      setAddress(user?.info?.address);

      setAcctNo(user?.bank?.accountNumber);
      setAcctType(user?.bank?.accountType);
      setIfsc(user?.bank?.ifsc);
      setCountry(user?.bank?.country);
    }
  }, [user]);

  useEffect(() => {
    if (nominate && !nominateLoading) {
      setNomFullName(nominate?.nominate?.name);
      setNomRelation(nominate?.nominate?.relationship);
      setNomDob(nominate?.nominate?.dob);
      setNomAddress(nominate?.nominate?.address);
    }
  }, [nominate, nominateLoading]);

  // Update User
  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (fullName === "" || email === "" || phone === "") {
      setAlert({
        show: true,
        type: "warning",
        message: `Invalid Credentials`,
      });
      return;
    }

    let data = {
      full_name: fullName,
      email,
      phone,
    };

    dispatch(updateUserThunk(data)).then((data) => {
      if (!data?.payload?.success) {
        setAlert({
          show: true,
          type: "warning",
          message: `${data?.payload?.message}`,
        });
      } else {
        setUserEdit(false);
        setAlert({
          show: true,
          type: "success",
          message: `${data?.payload?.message}`,
        });
      }
    });
  };

  // Update Bank Details
  const handleBankDetailsSubmit = (e) => {
    e.preventDefault();

    if (acctType === "" || acctNo === "" || ifsc === "") {
      setAlert({
        show: true,
        type: "warning",
        message: `Invalid Credentials`,
      });
      return;
    }

    let data = {
      accountNumber: acctNo,
      accountType: acctType,
      ifsc,
    };
    dispatch(updateBankThunk(data)).then((data) => {
      if (!data?.payload?.success) {
        setAlert({
          show: true,
          type: "warning",
          message: `${data?.payload?.message}`,
        });
      } else {
        setUserBankEdit(false);
        setAlert({
          show: true,
          type: "success",
          message: `${data?.payload?.message}`,
        });
      }
    });
  };

  // Update User Info
  const handleInformationSubmit = (e) => {
    e.preventDefault();

    if (dob === "" || pan === "" || sourceWealth === "" || address === "") {
      setAlert({
        show: true,
        type: "warning",
        message: `Invalid Credentials`,
      });
      return;
    }

    let data = {
      dob,
      pan,
      sourceWealth,
      address,
    };
    dispatch(updateUserInfoThunk(data)).then((data) => {
      if (!data?.payload?.success) {
        setAlert({
          show: true,
          type: "warning",
          message: `${data?.payload?.message}`,
        });
      } else {
        setUserInfoEdit(false);
        setAlert({
          show: true,
          type: "success",
          message: `${data?.payload?.message}`,
        });
      }
    });
  };

  // update User Nominate
  const handleNominateSubmit = (e) => {
    e.preventDefault();

    if (
      nomRelation === "" ||
      nomFullName === "" ||
      nomDob === "" ||
      nomAddress === ""
    ) {
      setAlert({
        show: true,
        type: "warning",
        message: `Invalid Credentials`,
      });
      return;
    }

    let data = {
      relationship: nomRelation,
      name: nomFullName,
      dob: nomDob,
      address: nomAddress,
    };

    dispatch(updateNominateThunk(data)).then((data) => {
      if (!data?.payload?.success) {
        setAlert({
          show: true,
          type: "warning",
          message: `${data?.payload?.message}`,
        });
      } else {
        setUserNominateEdit(false);
        setAlert({
          show: true,
          type: "success",
          message: `${data?.payload?.message}`,
        });
      }
    });
  };

  return (
    <>
      <section className="bg-gray-200 p-10">
        <div className="flex justify-between flex-wrap">
          <div class="w-[48%] p-6 mx-auto rounded-md shadow-md bg-white mb-10">
            <div className="flex justify-end items-center">
              <button
                className="bg-black text-white p-3 rounded-md"
                onClick={() => setUserEdit(!userEdit)}
              >
                <FiEdit2 />
              </button>
            </div>
            <form onSubmit={handleUserSubmit}>
              <p className="text-3xl text-center font-bold text-gray-900 capitalize mb-6">
                User
              </p>
              {/* <div class='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'> */}
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Full Name"
                  labelName="Full Name"
                  value={fullName}
                  handleValue={(val) => {
                    setFullName(val);
                  }}
                  handleFocus={() => {}}
                  disabled={userEdit ? false : true}
                />
              </div>
              <div className="mb-4">
                <Input
                  type="email"
                  placeholder="Email"
                  labelName="Email"
                  value={email}
                  handleValue={(val) => {
                    setEmail(val);
                  }}
                  handleFocus={() => {}}
                  disabled={userEdit ? false : true}
                />
              </div>
              <div className="mb-4">
                <Input
                  type="number"
                  placeholder="Phone No."
                  labelName="Phone No."
                  value={phone}
                  handleValue={(val) => {
                    setPhone(val);
                  }}
                  handleFocus={(val) => {}}
                  disabled={userEdit ? false : true}
                />
              </div>
              {/* </div> */}
              <div class="flex justify-center mt-6">
                <button class="py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-600focus:outline-none focus:bg-gray-600 w-1/2">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div class="w-[48%] p-6  mx-auto rounded-md shadow-md bg-white mb-10">
            <div className="flex justify-end items-center">
              <button
                className="bg-black text-white p-3 rounded-md"
                onClick={() => setUserInfoEdit(!userInfoEdit)}
              >
                <FiEdit2 />
              </button>
            </div>
            <form onSubmit={handleInformationSubmit}>
              <p className="text-3xl text-center font-bold text-gray-900 capitalize mb-6">
                User Information
              </p>
              {/* <div class='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'> */}
              <div className="mb-4">
                <Input
                  type="date"
                  labelName="Date of Birth"
                  placeholder="Date of Birth"
                  value={dob}
                  handleValue={(val) => {
                    setDob(val);
                  }}
                  handleFocus={() => {}}
                  disabled={userInfoEdit ? false : true}
                />
                {/* {dob === "" && error && (
                  <small className='text-red-500'>{error}</small>
                )} */}
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  labelName="PAN Number"
                  placeholder="PAN No."
                  value={pan}
                  handleValue={(val) => {
                    setPan(val);
                  }}
                  handleFocus={() => {}}
                  disabled={userInfoEdit ? false : true}
                />
                {/* {panNum === "" && error && (
                  <small className='text-red-500'>{error}</small>
                )} */}
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  labelName="Source Wealth"
                  placeholder="Source Wealth"
                  value={sourceWealth}
                  handleValue={(val) => {
                    setSourceWealth(val);
                  }}
                  handleFocus={() => {}}
                  disabled={userInfoEdit ? false : true}
                />
                {/* {sourceWealth === "" && error && (
                  <small className='text-red-500'>{error}</small>
                )} */}
              </div>
              <div className="mb-4">
                <TextArea
                  label="Address"
                  placeholderText="Address"
                  value={address}
                  handleValue={(val) => {
                    setAddress(val);
                  }}
                  disabled={userInfoEdit ? false : true}
                />
                {/* {address === "" && error && (
                  <small className='text-red-500'>{error}</small>
                )} */}
                {/* </div> */}
              </div>
              <div class="flex justify-center mt-6">
                <button class="py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-600focus:outline-none focus:bg-gray-600 w-1/2">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-between flex-wrap">
          <div
            class="w-[48%] p-6  mx-auto rounded-md shadow-md bg-white mb-10"
            onClick={() => setUserBankEdit(true)}
          >
            <div className="flex justify-end items-center">
              <button className="bg-black text-white p-3 rounded-md">
                <FiEdit2 />
              </button>
            </div>
            <form onSubmit={handleBankDetailsSubmit}>
              <p className="text-3xl text-center font-bold text-gray-900 capitalize mb-6 mt-6">
                Bank Details
              </p>
              {/* <div class='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'> */}
              <div className="mb-4">
                <Input
                  type="text"
                  labelName="Acct No."
                  placeholder="Account Number"
                  value={acctNo}
                  handleValue={(val) => {
                    setAcctNo(val);
                  }}
                  handleFocus={() => {}}
                  disabled={userBankEdit ? false : true}
                />
                {/* {!checkAcctNo && error && (
                  <small className='text-red-500'>{error}</small>
                )} */}
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  labelName="Acct Type"
                  placeholder="Account Type"
                  value={acctType}
                  handleValue={(val) => {
                    setAcctType(val);
                  }}
                  handleFocus={() => {}}
                  disabled={userBankEdit ? false : true}
                />
                {/* {acctType === "" && error && (
                  <small className='text-red-500'>{error}</small>
                )} */}
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  labelName="IFSC Code"
                  placeholder="ifsc code"
                  value={ifsc}
                  handleValue={(val) => {
                    setIfsc(val);
                  }}
                  handleFocus={() => {}}
                  disabled={userBankEdit ? false : true}
                />
                {/* {ifscCode === "" && error && (
                  <small className='text-red-500'>{error}</small>
                )} */}
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  labelName="Country"
                  placeholder="Country"
                  value={country}
                  handleValue={(val) => {
                    setCountry(val);
                  }}
                  handleFocus={() => {}}
                  disabled={userBankEdit ? false : true}
                />
                {/* {country === "" && error && (
                  <small className='text-red-500'>{error}</small>
                )} */}
                {/* </div> */}
              </div>
              <div class="flex justify-center mt-6">
                <button class="py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-600focus:outline-none focus:bg-gray-600 w-1/2">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div class="w-[48%] p-6  mx-auto rounded-md shadow-md bg-white">
            <div className="flex justify-end items-center">
              <button
                className="bg-black text-white p-3 rounded-md"
                onClick={() => setUserNominateEdit(!userNominateEdit)}
              >
                <FiEdit2 />
              </button>
            </div>
            <form onSubmit={handleNominateSubmit}>
              <p className="text-3xl text-center font-bold text-gray-900 capitalize mb-6 mt-6">
                User Nominate
              </p>
              {/* <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2"> */}
              <div className="mb-4">
                <Input
                  type="text"
                  labelName="Nominate Relationship"
                  placeholder=""
                  value={nomRelation}
                  handleValue={(val) => {
                    setNomRelation(val);
                  }}
                  handleFocus={() => {}}
                  disabled={userNominateEdit ? false : true}
                />
                {/* {!checkAcctNo && error && (
                  <small className='text-red-500'>{error}</small>
                )} */}
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  labelName="Nominate Full Name"
                  placeholder=""
                  value={nomFullName}
                  handleValue={(val) => {
                    setNomFullName(val);
                  }}
                  handleFocus={() => {}}
                  disabled={userNominateEdit ? false : true}
                />
                {/* {acctType === "" && error && (
                  <small className='text-red-500'>{error}</small>
                )} */}
              </div>
              <div className="mb-4">
                <Input
                  type="date"
                  labelName="Nominate DOB"
                  placeholder=""
                  value={nomDob}
                  handleValue={(val) => {
                    setNomDob(val);
                  }}
                  handleFocus={() => {}}
                  disabled={userNominateEdit ? false : true}
                />
                {/* {ifscCode === "" && error && (
                  <small className='text-red-500'>{error}</small>
                )} */}
              </div>
              <div className="mb-4">
                <TextArea
                  label="Nominate Address"
                  placeholderText=""
                  value={nomAddress}
                  handleValue={(val) => {
                    setNomAddress(val);
                  }}
                  disabled={userNominateEdit ? false : true}
                />
                {/* {country === "" && error && (
                  <small className='text-red-500'>{error}</small>
                )} */}
                {/* </div> */}
              </div>
              <div class="flex justify-center mt-6">
                <button class="py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-600focus:outline-none focus:bg-gray-600 w-1/2">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserAccount;
