from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils.stocks import *
from utils.mutualfunds import *
from utils.etf import *
# import os
# from dotenv import load_dotenv

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Get the path to the directory this file is in
# BASEDIR = os.path.abspath(os.path.dirname(__file__))

# # Connect the path with your '.env' file name
# load_dotenv(os.path.join(BASEDIR, 'config.env'))

# test_var = os.getenv("TEST_VAR")

# print(test_var)

@app.get("/")
def read_root():
    return {"message": "Stock Market API"}

# ------------------------------------ STOCKS -------------------------------------------
# Get Nifty50 and Sensex
@app.get("/stock/index")
def read_stock_index():
    data = handle_index()
    return data

# Index Details
@app.get("/stocks/index/details/{index}")
def read_index_details(index: str):
    data=handle_index_details(index)
    return data

# Get Top Gainers and Losers
@app.get("/top/stocks")
def read_stock_index(skip: int=0, limit: int=5):
    data = handle_top_stock(skip, limit)
    return data

# ALl Stocks NSE or BSE
@app.get("/all/stocks/{exchange}")
async def read_stocks(exchange: str, skip: int = 0, limit: int = 10):
    stocklist = await handle_stock_list(exchange, skip, limit)
    return stocklist

# Stock Current Price
@app.get("/stock/currentprice/{stock}")
def read_current_price(stock: str):
    stock_price = handle_stock_price(stock)
    return stock_price

# Stock Financial ratios
@app.get("/stock/financial/ratios/{stock}")
def read_stock_financial_ratios(stock: str):
    stock_financial_ratios = handle_stock_financial_ratios(stock)
    return stock_financial_ratios

# Stock Historical Data
@app.get("/stock/historical/data/{stock}")
def read_historical_data(stock: str, period: str, interval: str):
    stock_historical_data = handle_stock_historical_data(stock, period, interval)
    return stock_historical_data

# Stock Information
@app.get("/stock/info/{stock}")
def read_stock_info(stock: str):
    stock_info = handle_stock_info_profile(stock)
    return stock_info

@app.get("/stocks/suggestion/{stock}")
def read_stock_suggestion(stock: str):
    stock_suggestion=handle_strengths_weakness(stock)
    return stock_suggestion

# Stock Cash Flow
@app.get("/stock/cash/flow/{stock}")
def read_stock_cash_flow(stock: str):
    stock_cashflow = handle_stock_cash_flow(stock)
    return stock_cashflow

# Stock Balance Sheet
@app.get("/stock/balancesheet/{stock}")
def read_balancesheet(stock: str):
    stock_balancesheet = handle_stock_balance_sheet(stock)
    return stock_balancesheet

# Stock Income Statement
@app.get("/stock/income/statement/{stock}")
def read_income_statement(stock: str):
    stock_incomestatement = handle_stock_income_statement(stock)
    return stock_incomestatement

@app.get("/stock")
def read_search_stock(search: str):
    search_result = handle_search_stock(search)
    return search_result

async def request_func(url, session):
    async with session.get(url) as data:
        return await data.json()

@app.get("/stock/details/all/{symbol}")
async def read_stock_details(symbol: str):
    urls=[
        "https://stockapi-rasp.onrender.com/stock/income/statement/"+symbol,
        "https://stockapi-rasp.onrender.com/stock/balancesheet/"+symbol,
        "https://stockapi-rasp.onrender.com/stock/cash/flow/"+symbol,
        "https://stockapi-rasp.onrender.com/stocks/suggestion/"+symbol,
        "https://stockapi-rasp.onrender.com/stock/info/"+symbol,
        "https://stockapi-rasp.onrender.com/stock/currentprice/"+symbol,
        "https://stockapi-rasp.onrender.com/stock/financial/ratios/"+symbol,
    ]
    
    async with aiohttp.ClientSession() as session:
        data = [request_func(url, session) for url in urls]
        refinedData=await asyncio.gather(*data)
        return refinedData

# -------------------------------- MUTUAL FUND ----------------------------------

# Get All Mutual Fund
@app.get("/mutualfund/all")
async def read_all_mf(skip: int=0, limit: int=10):
    data = await all_mutual_fund(skip, limit)
    return data

# Get UTI Mutual Fund
@app.get("/mutualfund/uti")
def read_uti_mf(skip: int=0, limit: int=10):
    data = uti_mutual_fund(skip, limit)
    return data

# Get Union Mutual Fund
@app.get("/mutualfund/union")
def read_union_mf(skip: int=0, limit: int=10):
    data = union_mutual_fund(skip, limit)
    return data

# Get Tata Mutual Fund
@app.get("/mutualfund/tata")
def read_tata_mf(skip: int=0, limit: int=10):
    data = tata_mutual_fund(skip, limit)
    return data

# Get SBI Mutual Fund
@app.get("/mutualfund/sbi")
def read_sbi_mf(skip: int=0, limit: int=10):
    data = sbi_mutual_fund(skip, limit)
    return data

# Get Reliance Mutual Fund
@app.get("/mutualfund/reliance")
def read_reliance_mf(skip: int=0, limit: int=10):
    data = reliance_mutual_fund(skip, limit)
    return data

# Get Nippon Mutual Fund
@app.get("/mutualfund/nippon")
def read_nippon_mf(skip: int=0, limit: int=10):
    data = nippon_mutual_fund(skip, limit)
    return data

# Get Navi Mutual Fund
@app.get("/mutualfund/navi")
def read_navi_mf(skip: int=0, limit: int=10):
    data = navi_mutual_fund(skip, limit)
    return data

# Get Motilal Mutual Fund
@app.get("/mutualfund/motilal")
def read_moitilal_mf(skip: int=0, limit: int=10):
    data = moitilal_mutual_fund(skip, limit)
    return data

# Get Mahindra-Manulife Mutual Fund
@app.get("/mutualfund/mahindra-manulife")
def read_mahindra_manulife_mf(skip: int=0, limit: int=10):
    data = mahindra_manulife_mutual_fund(skip, limit)
    return data

# Get LIC Mutual Fund
@app.get("/mutualfund/lic")
def read_lic_mf(skip: int=0, limit: int=10):
    data = lic_mutual_fund(skip, limit)
    return data

# Get Kotak Mutual Fund
@app.get("/mutualfund/kotak")
def read_kotak_mf(skip: int=0, limit: int=10):
    data = kotak_mutual_fund(skip, limit)
    return data

# Get IDFC Mutual Fund
@app.get("/mutualfund/idfc")
def read_idfc_mf(skip: int=0, limit: int=10):
    data = idfc_mutual_fund(skip, limit)
    return data

# Get IDBI Mutual Fund
@app.get("/mutualfund/idbi")
def read_idbi_mf(skip: int=0, limit: int=10):
    data = idbi_mutual_fund(skip, limit)
    return data

# Get ICICI Mutual Fund
@app.get("/mutualfund/icici")
def read_icici_mf(skip: int=0, limit: int=10):
    data = icici_mutual_fund(skip, limit)
    return data

# Get HSBC Mutual Fund
@app.get("/mutualfund/hsbc")
def read_hsbc_mf(skip: int=0, limit: int=10):
    data = hsbc_mutual_fund(skip, limit)
    return data

# Get HDFC Mutual Fund
@app.get("/mutualfund/hdfc")
def read_hdfc_mf(skip: int=0, limit: int=10):
    data = hdfc_mutual_fund(skip, limit)
    return data

# Get Franklin Mutual Fund
@app.get("/mutualfund/franklin")
def read_franklin_mf(skip: int=0, limit: int=10):
    data = franklin_mutual_fund(skip, limit)
    return data

# Get Axis Mutual Fund
@app.get("/mutualfund/axis")
def read_axis_mf(skip: int=0, limit: int=10):
    data = axis_mutual_fund(skip, limit)
    return data

# Get Aditya-Birla Mutual Fund
@app.get("/mutualfund/aditya-birla")
def read_aditya_birla_mf(skip: int=0, limit: int=10):
    data = aditya_birla_mutual_fund(skip, limit)
    return data

# Get Best Debt Mutual Fund
@app.get("/mutualfund/best-debt")
def read_best_debt_mf(skip: int=0, limit: int=10):
    data = best_debt_mutual_fund(skip, limit)
    return data

# Get Best Long Duration Mutual Fund
@app.get("/mutualfund/best-long-duration")
def read_best_long_duration_mf(skip: int=0, limit: int=10):
    data = best_long_duration_mutual_fund(skip, limit)
    return data

# Get Best Returns Mutual Fund
@app.get("/mutualfund/best-returns")
def read_best_returns_mf(skip: int=0, limit: int=10):
    data = best_returns_mutual_fund(skip, limit)
    return data

# Get Best Equity Mutual Fund
@app.get("/mutualfund/best-equity")
def read_best_equity_mf(skip: int=0, limit: int=10):
    data = best_equity_mutual_fund(skip, limit)
    return data

# Get Best Tax Saver Mutual Fund
@app.get("/mutualfund/best-tax-saver")
def read_best_tax_saver_mf(skip: int=0, limit: int=10):
    data = best_tax_saver_mutual_fund(skip, limit)
    return data

# Get Mutual Fund History
@app.get("/mutualfund/history/{mf}")
def read_mutual_fund_history(mf: str, period: str, interval: str):
    data = mutualfund_history(mf, period, interval)
    return data

# Get Mutual Fund Details
@app.get("/mutualfund/details/{mf}")
def read_mutual_fund_info(mf: str):
    data = mutualfund_info(mf)
    return data

# Get Current Price of 
@app.get("/mutualfund/current/price/{symbol}")
def read_mutual_fund_price(symbol: str):
    data = mutualFundCurrentPrice(symbol)
    return data

@app.get("/mutual-fund")
def read_search_mutual_funds(search: str):
    search_result = handle_search_mutual_fund(search)
    return search_result

# async def request_mf_func(url, session):
#     async with session.get(url) as data:
#         return await data.json()

# @app.get("/mf/details/all/{symbol}")
# async def read_mf_details(symbol: str):
#     urls=[
#         "https://stock-market-api-3wxl.onrender.com/stock/income/statement/"+symbol,
#         "https://stock-market-api-3wxl.onrender.com/stock/balancesheet/"+symbol,
#         "https://stock-market-api-3wxl.onrender.com/stock/cash/flow/"+symbol,
#         "https://stock-market-api-3wxl.onrender.com/mutualfund/current/price/"+symbol,
#     ]
    
#     async with aiohttp.ClientSession() as session:
#         data = [request_func(url, session) for url in urls]
#         refinedData=await asyncio.gather(*data)
#         return refinedData

# ------------------------------------------ ETFs ---------------------------------------------

@app.get("/all/etfs")
async def read_etfs(skip: int = 1, limit: int = 10):
    data = await all_etfs(skip, limit)
    return data

@app.get("/etfs/{etf}")
def read_single_etf(etf: str):
    data = singleETFs(etf)
    return data

@app.get("/etf/best-bond-etf")
async def read_best_bond_etf():
    data = await best_bond_etf()
    return data

@app.get("/etf/best-index-etf")
async def read_best_index_etf():
    data = await best_index_etf()
    return data

@app.get("/etf/best-gold-etf")
async def read_best_gold_etf():
    data = await best_gold_etf()
    return data

@app.get("/etf/best-sector-etf")
async def read_best_sector_etf():
    data = await best_sector_etf()
    return data

@app.get("/etf/current/price/{symbol}")
def read_etf_price(symbol: str):
    data = etfCurrentPrice(symbol)
    return data

@app.get("/etf/details/{symbol}")
def read_etf_details(symbol: str):
    data = etfDetails(symbol)
    return data

@app.get("/etf/historical-data/{symbol}")
def read_etf_historical_data(symbol: str, period: str, interval: str):
    data = etfHistoricalData(symbol, period, interval)
    return data

@app.get("/etf")
def read_search_etfs(search: str):
    search_result = handle_search_etfs(search)
    return search_result