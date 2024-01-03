import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterThunk } from "../../features/user/auth";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import Loading from "../../components/Loading";

const EMAIL_REGEX = /^[a-z0-9._]+@[a-z]+\.[a-z]{2,4}$/;
const NAME_REGEX = /^[A-Za-z]+[\sA-Za-z]{5,20}$/;
const PASSWORD_REGEX = /^[A-Za-z0-9!@#$%^&*]{2,20}$/;
const PHONE_REGEX = /^[0-9]{10,11}$/;

const Register = ({ setAlert }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkName, setCheckName] = useState(false);
  const [checkPhone, setCheckPhone] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [matchPassword, setMatchPassword] = useState(false);

  // Focus
  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (NAME_REGEX.test(fullName)) {
      setCheckName(true);
    } else {
      setCheckName(false);
    }
  }, [fullName]);

  useEffect(() => {
    if (EMAIL_REGEX.test(email)) {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
  }, [email]);

  useEffect(() => {
    if (PHONE_REGEX.test(phone)) {
      setCheckPhone(true);
    } else {
      setCheckPhone(false);
    }
  }, [phone]);

  useEffect(() => {
    if (PASSWORD_REGEX.test(password)) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  }, [password]);

  useEffect(() => {
    if (password === confirmPassword) {
      setMatchPassword(password === confirmPassword);
    } else {
      setMatchPassword(false);
    }
  }, [password, confirmPassword]);

  const { isLoading, isError, isSuccess, id } = useSelector(
    (state) => state.authReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let t1 = NAME_REGEX.test(fullName);
    let t2 = EMAIL_REGEX.test(email);
    let t3 = PASSWORD_REGEX.test(password);
    let t4 = password === confirmPassword;

    if (!t1 || !t2 || !t3 || !t4) {
      setError("Please enter above field correctly.");
      return;
    }

    let data = {
      full_name: fullName,
      email,
      phone,
      password,
    };

    dispatch(userRegisterThunk(data)).then((data) => {
      if (!data?.payload?.success) {
        setAlert({
          show: true,
          type: "warning",
          message: `${data.payload?.message}`,
        });
      }
    });
  };

  useEffect(() => {
    if (id) {
      setAlert({
        show: true,
        type: "info",
        message: "Great! Please fill your required information.",
      });
      localStorage.setItem("userId", id);
      navigate("/user/info");
    }
  }, [id]);

  return (
    <>
      <div className="flex justify-end items-center">
        <button className="p-2 me-10 absolute top-3">
          <Link to="/">
            <RxCross2 className="text-3xl" />
          </Link>
        </button>
      </div>
      <section className="bg-gray-200 flex justify-center items-center">
        <div class="max-w-4xl w-1/2 p-6 my-10 mx-auto rounded-md shadow-md bg-white">
          <h2 class="text-3xl text-center font-bold text-gray-900 capitalize mb-6">
            Register
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Full Name"
                labelName="Full Name"
                value={fullName}
                handleValue={(val) => setFullName(val)}
                handleFocus={(val) => setNameFocus(val)}
              />
              {nameFocus &&
                (fullName === "" || !checkName ? (
                  <small className="text-red-500 flex justify-start items-center">
                    <AiOutlineInfoCircle className="me-2" />{" "}
                    <span>At least 5 characters for Name.</span>
                  </small>
                ) : (
                  <small className="text-green-500 flex justify-start items-center">
                    <BsCheckLg className="me-2" /> <span>Full Name.</span>
                  </small>
                ))}
              {(fullName === "" || !checkName) && error !== "" && (
                <small className="text-red-500">{error}</small>
              )}
            </div>
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Email"
                labelName="Email"
                value={email}
                handleValue={(val) => setEmail(val)}
                handleFocus={(val) => setEmailFocus(val)}
              />
              {emailFocus &&
                (email === "" || !checkEmail ? (
                  <small className="text-red-500 flex justify-start items-center">
                    <AiOutlineInfoCircle className="me-2" />{" "}
                    <span>Email is invalid.</span>
                  </small>
                ) : (
                  <small className="text-green-500 flex justify-start items-center">
                    <BsCheckLg className="me-2" /> <span>Email.</span>
                  </small>
                ))}
              {(email === "" || !checkEmail) && error !== "" && (
                <small className="text-red-500">{error}</small>
              )}
            </div>
            <div className="mb-4">
              <Input
                type="number"
                placeholder="Phone No."
                labelName="Phone No."
                value={phone}
                handleValue={(val) => setPhone(val)}
                handleFocus={(val) => setPhoneFocus(val)}
              />
              {phoneFocus &&
                (phone === "" || !checkPhone ? (
                  <small className="text-red-500 flex justify-start items-center">
                    <AiOutlineInfoCircle className="me-2" />{" "}
                    <span>Only 10 digit phone number.</span>
                  </small>
                ) : (
                  <small className="text-green-500 flex justify-start items-center">
                    <BsCheckLg className="me-2" /> <span>Phone number.</span>
                  </small>
                ))}
              {(phone === "" || !checkPhone) && error !== "" && (
                <small className="text-red-500">{error}</small>
              )}
            </div>
            <div className="mb-4">
              <Input
                type="password"
                placeholder="Password"
                labelName="Password"
                value={password}
                handleValue={(val) => setPassword(val)}
                handleFocus={(val) => setPasswordFocus(val)}
              />
              {passwordFocus &&
                (password === "" || !checkPassword ? (
                  <small className="text-red-500 flex justify-start items-center">
                    <AiOutlineInfoCircle className="me-2" />{" "}
                    <span>At least 5 characters for Password.</span>
                  </small>
                ) : (
                  <small className="text-green-500 flex justify-start items-center">
                    <BsCheckLg className="me-2" /> <span>Password.</span>
                  </small>
                ))}
              {(password === "" || !checkPassword) && error !== "" && (
                <small className="text-red-500">{error}</small>
              )}
            </div>
            <div className="mb-4">
              <Input
                type="password"
                placeholder="Confirm Password"
                labelName="Confirm Password"
                value={confirmPassword}
                handleValue={(val) => setConfirmPassword(val)}
                handleFocus={(val) => setConfirmPasswordFocus(val)}
              />
              {confirmPasswordFocus &&
                (confirmPassword === "" || !matchPassword ? (
                  <small className="text-red-500 flex justify-start items-center">
                    <AiOutlineInfoCircle className="me-2" />{" "}
                    <span>Password doesn't match.</span>
                  </small>
                ) : (
                  <small className="text-green-500 flex justify-start items-center">
                    <BsCheckLg className="me-2" />{" "}
                    <span>Confirm Password.</span>
                  </small>
                ))}
              {(confirmPassword === "" || !matchPassword) && error !== "" && (
                <small className="text-red-500">{error}</small>
              )}
            </div>
            <div class="flex justify-center mt-6">
              <button class="py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-600focus:outline-none focus:bg-gray-600 w-1/2">
                {isLoading ? <Loading /> : "Register"}
              </button>
            </div>
            <p className="text-center text-gray-800 mt-4">
              Already have an Account?{" "}
              <Link className="text-blue-600 underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
