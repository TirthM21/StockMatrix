import yfinance as yf
import json
from scrapers.StockData import STOCKMARKET
import asyncio
import aiohttp

stockMarket = STOCKMARKET()


# Stock List
async def handle_stock_list(exchange: str, offset: int, limit: int):
    if exchange == "NSE":
        with open("./data/NSE_Stocks.json", "r") as file:
            objArr = json.load(file)
            
        async with aiohttp.ClientSession() as session:
            testData = [stockMarket.get_company_data(el["Symbol"], session) for el in objArr[offset:limit]]
            refinedData = await asyncio.gather(*testData)
            return refinedData
    else:
        with open("./data/BSE_Stocks.json", "r") as file:
            objArr = json.load(file)
        async with aiohttp.ClientSession() as session:
            testData = [stockMarket.get_company_data(el["Symbol"], session) for el in objArr[offset:limit]]
            refinedData = await asyncio.gather(*testData)
            return refinedData


# Stock Financial Ratios
def handle_stock_financial_ratios(symbol: str):
    financial = stockMarket.get_financial_ratios(symbol)
    return financial


# Stock Historical Data
def handle_stock_historical_data(symbol: str, period: str, interval: str):
    historical_data = json.loads(
        yf.Ticker(symbol + ".NS").history(period, interval).to_json(orient="table")
    )["data"]
    return historical_data


# Stock Info Profile
def handle_stock_info_profile(symbol: str):
    summary = stockMarket.get_company_price_summary(symbol)
    essentials = stockMarket.get_company_essentials(symbol)
    return {"summary": summary, "essentialInfo": essentials}


# Stock Balance Sheet
def handle_stock_balance_sheet(symbol: str):
    balanceSheet = stockMarket.get_yearly_balance_sheet(symbol)
    return balanceSheet


# Stock Cash Flow
def handle_stock_cash_flow(symbol: str):
    cashFlow = stockMarket.get_yearly_cash_flow(symbol)
    return cashFlow


# Stock Income Statement
def handle_stock_income_statement(symbol: str):
    incomestatement = stockMarket.get_yearly_results(symbol)
    return incomestatement


# Stock Current Price
def handle_stock_price(symbol: str):
    stock = stockMarket.get_company_price_data(symbol)
    return stock


# Stocks Strengths and weakness
def handle_strengths_weakness(symbol: str):
    stock = stockMarket.get_company_strengths_and_limitations(symbol)
    return stock


def handle_index():
    nse = stockMarket.get_index_data("nse/nifty", "NIFTY50")
    bse = stockMarket.get_index_data("bse/sensex", "SENSEX")

    return {"nse": nse, "bse": bse}


def handle_index_details(name: str):
    details = ""
    if name == "nifty":
        details = stockMarket.get_index_details("nse/nifty")
    else:
        details = stockMarket.get_index_details("bse/sensex")

    return details


def handle_top_stock(skip=0, limit=5):
    top_gainers = stockMarket.get_market_gainers(skip, limit)
    top_losers = stockMarket.get_market_losers(skip, limit)

    return {"gainers": top_gainers, "losers": top_losers}

def handle_search_stock(search: str):
    with open("./data/NSE_Stocks.json", "r") as nseFile:
        data = json.load(nseFile)
    searchedStock = []  
    for sD in data:
        if search in sD['Company Name'] or search in sD['Company Name'].lower():
            searchedStock.append({
                                  "name": sD['Company Name'],
                                  "symbol": sD['Symbol']
                                  })
    return searchedStock