import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  clearGetTransaction,
  getAllDepositThunk,
} from "../../features/transaction/getTransaction";
import {
  clearWalletState,
  getWalletThunk,
} from "../../features/transaction/wallet";
import { addDepositThunk } from "../../features/transaction/addTransaction";

const Deposit = ({ setAlert }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const { deposit, isLoading } = useSelector(
    (state) => state.getTransactionReducer
  );
  const { wallet } = useSelector((state) => state.walletReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearWalletState());
    dispatch(clearGetTransaction());
    dispatch(getAllDepositThunk());
    dispatch(getWalletThunk());
  }, []);

  const handleDeposit = (e) => {
    e.preventDefault();

    if (amount === "") {
      setError("Please add some Amount.");
      return;
    }

    let data = {
      amount: Number(amount),
    };

    dispatch(addDepositThunk(data)).then((data) => {
      if (!data?.payload.success) {
        setAlert({
          show: true,
          type: "danger",
          message: data?.payload.message,
        });
      } else {
        setAlert({
          show: true,
          type: "success",
          message: "Deposit Successfull.",
        });
        setAmount("");
        dispatch(clearWalletState());
        dispatch(clearGetTransaction());
        dispatch(getAllDepositThunk());
        dispatch(getWalletThunk());
      }
    });
    return;
  };

  return (
    <>
      <div className='bg-gray-100 p-2'>
        <div className='bg-white rounded-md p-5'>
          <h1 className='text-3xl font-bold mb-4 p-5'>Deposits</h1>
          <div className='flex justify-between items-start mb-10'>
            <div className='w-[30%] bg-gray-100 p-6 rounded-md'>
              <h2 className='text-2xl font-medium'>Wallet Balance</h2>
              <p className='text-2xl font-semibold mt-4'>₹ {wallet?.balance}</p>
            </div>
            <div className='w-[68%] bg-gray-100 p-6 rounded-md'>
              <form onSubmit={handleDeposit}>
                <div className='mb-4'>
                  <Input
                    type={"number"}
                    labelName={"Amount"}
                    placeholder={"Your Amount"}
                    value={amount}
                    handleValue={(val) => setAmount(val)}
                    handleFocus={() => {}}
                  />
                  {amount === "" && error && (
                    <small className='text-red-500'>{error}</small>
                  )}
                  <small>You will be provided with a fake Bank Balance containing the balance of ₹ 1,00,000</small>
                </div>
                <div className='text-start'>
                  <button
                    className='bg-black text-white p-4 py-2 rounded-md'
                    type='submit'
                  >
                    Deposit to Wallet
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className='container p-2 mx-auto sm:p-4'>
            <div className='overflow-x-auto'>
              <table className='min-w-full text-xs'>
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead className='bg-gray-100'>
                  <tr className='text-left'>
                    <th className='p-3 text-lg text-gray-700'>
                      Transaction Id
                    </th>
                    <th className='p-3 text-lg text-gray-700'>Amount</th>
                    <th className='p-3 text-lg text-gray-700'>
                      Bank Account Number
                    </th>
                    <th className='p-3 text-lg text-gray-700'>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <>
                      <tr>
                        <span className='w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse'></span>
                      </tr>
                      <tr>
                        <span className='w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse'></span>
                      </tr>
                      <tr>
                        <span className='w-full mb-3 h-5 block rounded bg-gray-200 p-8 animate-pulse'></span>
                      </tr>
                    </>
                  ) : deposit?.deposits?.length > 0 ? (
                    deposit?.deposits?.map((el) => {
                      return (
                        <tr className='border-b border-opacity-20'>
                          <td className='p-3 text-base'>
                            <p>#{el?.transaction_id}</p>
                          </td>
                          <td className='p-3 text-base'>
                            <p>{el?.amount}</p>
                          </td>
                          <td className='p-3 text-base'>
                            <p>{el?.bank_account_number}</p>
                          </td>
                          <td className='p-3 text-base'>
                            <p>{new Date(el?.createdAt).toLocaleString()}</p>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className=''>
                      <td className='p-3' colSpan={3}>
                        No Data Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deposit;
