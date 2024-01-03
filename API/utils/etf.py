import json
from yahooquery import Ticker
import yfinance as yf
from scrapers.ETF import ETF
import asyncio
import aiohttp

etfs = ETF()


async def all_etfs(skip: int = 1, limit: int = 10):
    with open("./data/all_ETFs.json", "r") as write_file:
        objArr = json.load(write_file)

    objArr = objArr[1:]
    async with aiohttp.ClientSession() as session:
        data=[etfs.get_curr_data(ticker["1"] + ".NS", session) for ticker in objArr[skip:limit]]
        refinedData=await asyncio.gather(*data)
        return {"data": refinedData, "total": int(len(objArr) - limit)/10}


def singleETFs(symbol: str):
    data = yf.Ticker(symbol).info
    priceData = etfs.get_etf_data(symbol)

    if ".NS" not in symbol:
        data = yf.Ticker(symbol + ".NS").info
        priceData = etfs.get_etf_data(symbol + ".NS")

    sData = {
        "price": priceData["curr_price"],
        "price_change": priceData["price_change"],
        "per_change": priceData["per_change"],
        "data": data,
    }

    return sData


async def best_bond_etf():
    with open("./data/Best_Bond_ETF.json") as file:
        bondData = json.load(file)
    async with aiohttp.ClientSession() as session:
        data=[etfs.get_curr_data(ticker["symbol"], session) for ticker in bondData]
        refinedData=await asyncio.gather(*data)
        return {"data": refinedData, "total_pages": int(len(bondData)/10), "page_num": int(len(bondData) / 10)}


async def best_gold_etf():
    with open("./data/Best_Gold_ETF.json") as file:
        goldData = json.load(file)
    async with aiohttp.ClientSession() as session:
        data=[etfs.get_curr_data(ticker["symbol"], session) for ticker in goldData]
        refinedData=await asyncio.gather(*data)
        return {"data": refinedData, "total_pages": int(len(goldData)/10), "page_num": int(len(goldData) / 10)}


async def best_index_etf():
    with open("./data/Best_Index_ETF.json") as file:
        indexData = json.load(file)
    async with aiohttp.ClientSession() as session:
        data=[etfs.get_curr_data(ticker["symbol"], session) for ticker in indexData]
        refinedData=await asyncio.gather(*data)
        return {"data": refinedData, "total_pages": int(len(indexData)/10), "page_num": int(len(indexData) / 10)}


async def best_sector_etf():
    with open("./data/Best_Sector_ETF.json") as file:
        sectorData = json.load(file)
    async with aiohttp.ClientSession() as session:
        data=[etfs.get_curr_data(ticker["symbol"], session) for ticker in sectorData]
        refinedData=await asyncio.gather(*data)
        return {"data": refinedData, "total_pages": int(len(sectorData)/10), "page_num": int(len(sectorData) / 10)}


def etfCurrentPrice(symbol: str):
    data = etfs.get_etf_data(symbol)
    return data


def etfDetails(symbol: str):
    info = yf.Ticker(symbol).info
    priceData = etfs.get_etf_data(symbol)

    return {
        "info": info,
        "priceData": priceData
    }


def etfHistoricalData(symbol: str, period: str, interval: str):
    historical_data = json.loads(yf.Ticker(symbol).history(period, interval).to_json(orient="table"))['data']
    return historical_data

def handle_search_etfs(search: str):
    with open("./data/all_ETFs.json", "r") as etfFile:
        data = json.load(etfFile)
    searchedETF = []  
    for etfD in data[1:]:
        if search in etfD['0'] or search in etfD['0'].lower():
            searchedETF.append({
                                "name": etfD['0'],
                                "symbol": etfD['1']
                                })
    return searchedETF