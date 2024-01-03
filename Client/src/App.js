import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initTE, Tab, Modal, Ripple } from "tw-elements";
import Home from "./pages/website/Home";
import Login from "./pages/website/Login";
import Register from "./pages/website/Register";
import UserInfo from "./pages/website/UserInfo";
import UserNominate from "./pages/website/UserNominate";
import Layout from "./components/dashboard/default/Layout";
import Alert from "./components/Alert";
import { useState, useEffect } from "react";
import VerifyLogin from "./pages/website/VerifyLogin";
import Kyc from "./pages/website/Kyc";

import DashHome from "./pages/dashboard/Home";
import Portfolio from "./pages/dashboard/Portfolio";
import Stocks from "./pages/dashboard/Stocks";
import MutualFunds from "./pages/dashboard/MutualFunds";
import ETFs from "./pages/dashboard/ETFs";
import Deposit from "./pages/dashboard/Deposit";
import Withdraw from "./pages/dashboard/Withdraw";
import ApproveKyc from "./pages/website/ApproveKyc";
import TopStocksPage from "./pages/dashboard/TopStocksPage";
import UserAccount from "./pages/dashboard/UserAccount";
import BestMF from "./pages/dashboard/BestMF";
import StockDetails from "./pages/dashboard/StockDetails";
import MutualFundDetails from "./pages/dashboard/MutualFundDetails";
import CompanyMF from "./pages/dashboard/CompanyMF";
import BestETF from "./pages/dashboard/BestETF";
import ETFDetails from "./pages/dashboard/ETFDetails";
import Watchlist from "./pages/dashboard/Watchlist";
import ProtectedRoute from "./components/dashboard/default/ProtectedRoute";
import NotFound from "./pages/dashboard/NotFound";

function App() {
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    initTE({ Tab, Modal, Ripple });
  }, []);

  useEffect(() => {
    if (alert.show === true) {
      let timeout = setTimeout(() => {
        setAlert({
          show: false,
          type: "",
          message: "",
        });
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [alert]);

  return (
    <div className="App">
      <BrowserRouter>
        <Alert data={alert} closeVisible={(val) => setAlert(val)} />
        <Routes>
          <Route path="/" element={<Home setAlert={setAlert} />} />
          <Route path="/login" element={<Login setAlert={setAlert} />} />
          <Route path="/register" element={<Register setAlert={setAlert} />} />
          <Route path="/user/info" element={<UserInfo setAlert={setAlert} />} />
          <Route
            path="/verify/:token"
            element={<VerifyLogin setAlert={setAlert} />}
          />
          <Route
            path="/user/nominate"
            element={<UserNominate setAlert={setAlert} />}
          />
          <Route path="/user/kyc" element={<Kyc setAlert={setAlert} />} />
          <Route
            path="/approve/kyc"
            element={<ApproveKyc setAlert={setAlert} />}
          />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard/home" element={<DashHome />} />
              <Route
                path="/dashboard/portfolio"
                element={<Portfolio setAlert={setAlert} />}
              />

              <Route path="/dashboard/topstock" element={<TopStocksPage />} />

              <Route
                path="/dashboard/stocks"
                element={<Stocks setAlert={setAlert} />}
              />
              <Route
                path="/dashboard/stocks/:id"
                element={<StockDetails setAlert={setAlert} />}
              />

              <Route
                path="/dashboard/mutual-funds"
                element={<MutualFunds setAlert={setAlert} />}
              />
              <Route
                path="/dashboard/mutual-funds/:id"
                element={<MutualFundDetails setAlert={setAlert} />}
              />
              <Route
                path="/dashboard/mutual-funds/best/:name"
                element={<BestMF setAlert={setAlert} />}
              />
              <Route
                path="/dashboard/mutual-funds/company/:name"
                element={<CompanyMF setAlert={setAlert} />}
              />

              <Route
                path="/dashboard/etfs"
                element={<ETFs setAlert={setAlert} />}
              />
              <Route
                path="/dashboard/etfs/:id"
                element={<ETFDetails setAlert={setAlert} />}
              />
              <Route
                path="/dashboard/etfs/best/:name"
                element={<BestETF setAlert={setAlert} />}
              />

              <Route
                path="/dashboard/deposit"
                element={<Deposit setAlert={setAlert} />}
              />
              <Route
                path="/dashboard/withdraw"
                element={<Withdraw setAlert={setAlert} />}
              />
              <Route
                path="/dashboard/watchlist"
                element={<Watchlist setAlert={setAlert} />}
              />
              <Route
                path="/dashboard/profile"
                element={<UserAccount setAlert={setAlert} />}
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
