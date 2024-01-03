import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { verifyLoginThunk } from "../../features/verify/verifyLogin";

const VerifyLogin = ({ setAlert }) => {
  const { token } = useParams();

  const { isSuccess, isLoading, isError } = useSelector(
    (state) => state.verifyLoginReducer
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(verifyLoginThunk(token)).then((data) => {
      if (!data.payload?.success) {
        setAlert({
          show: true,
          type: "warning",
          message: data.payload?.message,
        });
      } else {
        let timeout = setTimeout(() => {
          setAlert({
            show: true,
            type: "success",
            message: "Email Verified. You can Login.",
          });
          navigate("/login");
        }, 4000);

        return () => clearTimeout(timeout);
      }
    });
  }, []);

  return (
    <div className="p-5 text-center">
      <h1 className="text-5xl mb-5">Successfully Verified.</h1>
      <p className="text-xl">Redirecting to login...</p>
    </div>
  );
};

export default VerifyLogin;
