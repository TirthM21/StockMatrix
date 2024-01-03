import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearStockTopState,
  getStockTopThunk,
} from "../../features/stocks/stocksTop";
import TopStocks from "../../components/dashboard/cards/TopStocks";

const TopStocksPage = () => {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(50);

  const [openGainers, setOpenGainers] = useState(true);
  const [openLosers, setOpenLosers] = useState(false);

  const { stocks, isLoading } = useSelector((state) => state.stockTopReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(clearStockTopState());
    dispatch(getStockTopThunk({ skip, limit }));
  }, []);

  return (
    <>
      <div className='bg-gray-100 p-3'>
        <div className='bg-white p-5 rounded-md'>
          <ul
            className='mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0'
            role='tablist'
            data-te-nav-ref
          >
            <li role='presentation' className='flex-auto text-center'>
              <Link
                to='#tabs-home01'
                className={`my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-lg font-bold uppercase leading-tight hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent ${
                  openGainers ? "text-blue-600" : "text-neutral-500"
                }`}
                onClick={() => {
                  setOpenLosers(false);
                  setOpenGainers(true);
                }}
              >
                Top Gainers
              </Link>
            </li>
            <li role='presentation' class='flex-auto text-center'>
              <Link
                to='#tabs-message01'
                class={`my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-lg font-bold uppercase leading-tight hover:isolate hover:border-transparent  focus:isolate hover:bg-neutral-100 focus:border-transparent ${
                  openLosers ? "text-blue-600" : "text-neutral-500"
                }`}
                onClick={() => {
                  setOpenLosers(true);
                  setOpenGainers(false);
                }}
              >
                Top Losers
              </Link>
            </li>
          </ul>

          <div className='mb-6'>
            <div
              className={`${
                openGainers ? "opacity-100" : "hidden opacity-0"
              } transition-opacity duration-150 ease-linear data-[te-tab-active]:block`}
              id='tabs-home01'
            >
              <div className='flex justify-between items-center p-4 border bg-gray-50 overflow-hidden'>
                <div>
                  <h2 className={`text-sm font-bold me-3`}>Symbol</h2>
                </div>
                <div className='flex justify-around items-center w-[58%]'>
                  <p className={`text-xs font-semibold`}>LTP</p>
                  <p className={`font-semibold text-xs `}>%Chng</p>
                </div>
              </div>
              {isLoading ? (
                <>
                  <span className='w-full h-5 block rounded p-5 bg-gray-200 animate-pulse'></span>
                  <span className='w-full h-5 block rounded p-5 bg-gray-200 animate-pulse'></span>
                  <span className='w-full h-5 block rounded p-5 bg-gray-200 animate-pulse'></span>
                </>
              ) : (
                stocks?.gainers?.map((el) => {
                  return (
                    <Link to={`${el?.symbol}`} className='hover:bg-slate-100'>
                      <TopStocks
                        key={el?.name}
                        name={el?.company}
                        ltp={el?.price}
                        priceChange={el?.change}
                        link={`/dashboard/stocks/${el?.symbol}`}
                      />
                    </Link>
                  );
                })
              )}
            </div>

            <div
              class={`${
                openLosers ? "opacity-100" : "hidden opacity-0"
              } transition-opacity duration-150 ease-linear data-[te-tab-active]:block`}
              id='tabs-message01'
            >
              <div className='flex justify-between items-center p-4 border bg-gray-50 overflow-hidden'>
                <div>
                  <h2 className={`text-sm font-bold me-3`}>Symbol</h2>
                </div>
                <div className='flex justify-around items-center w-[58%]'>
                  <p className={`text-xs font-semibold`}>LTP</p>
                  <p className={`font-semibold text-xs `}>%Chng</p>
                </div>
              </div>
              {isLoading ? (
                <>
                  <span className='w-full h-5 block rounded p-5 bg-gray-200 animate-pulse'></span>
                  <span className='w-full h-5 block rounded p-5 bg-gray-200 animate-pulse'></span>
                  <span className='w-full h-5 block rounded p-5 bg-gray-200 animate-pulse'></span>
                </>
              ) : (
                stocks?.losers?.map((el) => {
                  return (
                    <Link to={`${el?.symbol}`} className='hover:bg-slate-100'>
                      <TopStocks
                        key={el?.name}
                        name={el?.company}
                        ltp={el?.price}
                        priceChange={el?.change}
                        link={`/dashboard/stocks/${el?.symbol}`}
                      />
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopStocksPage;
