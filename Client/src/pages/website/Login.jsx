import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { clearUserAuthState, userLoginThunk } from "../../features/user/auth";
import Loading from "../../components/Loading";

const Login = ({ setAlert }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error
  const [error, setError] = useState("");

  const { isSuccess, isError, isLoading, token } = useSelector(
    (state) => state.authReducer
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("Please Enter above field.");
      return;
    }

    let data = {
      email,
      password,
    };

    dispatch(userLoginThunk(data)).then((data) => {
      if (!data.payload?.success) {
        setAlert({
          show: true,
          type: "warning",
          message: data.payload?.message,
        });
        return;
      }
    });
  };

  useEffect(() => {
    if (token) {
      setAlert({
        show: true,
        type: "success",
        message: "Login Successfully.",
      });
      localStorage.setItem("token", token);
      dispatch(clearUserAuthState());
      navigate("/dashboard/home");
    }
  }, [token]);

  return (
    <>
      <div className="flex justify-end items-center">
        <button className="p-2 me-10 absolute top-3">
          <Link to="/">
            <RxCross2 className="text-3xl" />
          </Link>
        </button>
      </div>
      <section className="bg-gray-200 h-[100vh] flex justify-center items-center">
        <div class="max-w-4xl w-1/3 p-6 mx-auto rounded-md shadow-md bg-white">
          <h2 class="text-3xl text-center font-bold text-gray-900 capitalize mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Email"
                labelName="Email"
                value={email}
                handleFocus={() => {}}
                handleValue={(val) => setEmail(val)}
              />
              {email === "" && error && (
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
                handleFocus={() => {}}
              />
              {password === "" && error && (
                <small className="text-red-500">{error}</small>
              )}
            </div>
            <div class="flex justify-center mt-6">
              <button class="py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-600focus:outline-none focus:bg-gray-600 w-1/2">
                {isLoading && !isSuccess ? (
                  <Loading size={"text-lg"} />
                ) : (
                  "Login"
                )}
              </button>
            </div>
            <p className="text-center text-gray-800 mt-4">
              Don't have an Account?{" "}
              <Link className="text-blue-600 underline" to="/register">
                Register
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
