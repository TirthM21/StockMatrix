import json
from scrapers.MutualFunds import MUTUALFUND
import yfinance as yf
import asyncio
import aiohttp
import math

mutualFunds = MUTUALFUND()

refinedArray = []


# Get All Mutual Fund
async def all_mutual_fund(skip: int, limit: int):
    with open("./data/code.json") as file:
        json_data = json.load(file)

    arr = []
    
    async with aiohttp.ClientSession() as session:
        tasks = [mutualFunds.get_custom_data(key + ".BO", session) for data in json_data[skip:limit] for key, value in data.items()]
        refinedData = await asyncio.gather(*tasks)
        return {
            "data": refinedData,
            "total": math.floor((len(json_data) - limit)/10)
        }


# Get UTI Mutual Fund
def uti_mutual_fund(skip: int, limit: int):
    with open("./data/UTI.json") as file:
        json_data = json.load(file)

    return {
        "data": json_data[skip:limit],
        "total_pages": int(len(json_data) / 10),
        "page_num": limit / 10,
    }


# Get Union Mutual Fund
def union_mutual_fund(skip: int, limit: int):
    with open("./data/Union.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Get Tata Mutual Fund
def tata_mutual_fund(skip: int, limit: int):
    with open("./data/Tata.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Get SBI Mutual Fund
def sbi_mutual_fund(skip: int, limit: int):
    with open("./data/SBI.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Get Reliance Mutual Fund
def reliance_mutual_fund(skip: int, limit: int):
    with open("./data/Reliance.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Get Nippon Mutual Fund
def nippon_mutual_fund(skip: int, limit: int):
    with open("./data/Nippon.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Get Navi Mutual Fund
def navi_mutual_fund(skip: int, limit: int):
    with open("./data/Navi.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Get Motilal Mutual Fund
def moitilal_mutual_fund(skip: int, limit: int):
    with open("./data/Motilal_Oswal.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Get Mahindra Manulife Mutual Fund
def mahindra_manulife_mutual_fund(skip: int, limit: int):
    with open("./data/Mahindra_Manulife.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Get LIC Mutual Fund
def lic_mutual_fund(skip: int, limit: int):
    with open("./data/LIC.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Get Kotak Mahindra Mutual Fund
def kotak_mutual_fund(skip: int, limit: int):
    with open("./data/Kotak_Mahindra.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Get IDFC Mutual Fund
def idfc_mutual_fund(skip: int, limit: int):
    with open("./data/IDFC.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Get IDBI Mutual Fund
def idbi_mutual_fund(skip: int, limit: int):
    with open("./data/IDBI.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Get ICICI Mutual Fund
def icici_mutual_fund(skip: int, limit: int):
    with open("./data/ICICI.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Get HSBC Mutual Fund
def hsbc_mutual_fund(skip: int, limit: int):
    with open("./data/HSBC.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Get HDFC Mutual Fund
def hdfc_mutual_fund(skip: int, limit: int):
    with open("./data/HDFC.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Get Franklin Mutual Fund
def franklin_mutual_fund(skip: int, limit: int):
    with open("./data/Franklin.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Get Axis Mutual Fund
def axis_mutual_fund(skip: int, limit: int):
    with open("./data/Axis.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Get Aditya Birla Mutual Fund
def aditya_birla_mutual_fund(skip: int, limit: int):
    with open("./data/Aditya_Birla_Sun_Life.json") as file:
        json_data = json.load(file)

    return {
        "data": json_data[skip:limit],
        "total_pages": int(len(json_data) / 10),
        "page_num": int(limit / 10),
    }


# Get Best Debt Fund
def best_debt_mutual_fund(skip: int, limit: int):
    with open("./data/Best_Debt_Funds.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Get Best Equity Fund
def best_equity_mutual_fund(skip: int, limit: int):
    with open("./data/Best_Equity_Funds.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Get Best Long Duration Fund
def best_long_duration_mutual_fund(skip: int, limit: int):
    with open("./data/Best_Long_Duration_Funds.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Get Best Returns Fund
def best_returns_mutual_fund(skip: int, limit: int):
    with open("./data/Best_Returns_Funds.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Get Best Tax Saver Fund
def best_tax_saver_mutual_fund(skip: int, limit: int):
    with open("./data/Best_Tax_Saver_Funds.json") as file:
        json_data = json.load(file)

        return {
            "data": json_data[skip:limit],
            "total_pages": int(len(json_data) / 10),
            "page_num": int(limit / 10),
        }


# Mutual Fund History
def mutualfund_history(mf_id: str, period: str, interval: str):
    data = json.loads(yf.Ticker(mf_id + ".BO").history(period, interval).to_json(orient="table"))['data']
    return data


# Mutual Fund Details
def mutualfund_info(mf_id: str):
    
    info_data = mutualFunds.get_curr_data(mf_id + ".BO")
    performance = mutualFunds.get_performace(mf_id + ".BO")
    holdingInfo = mutualFunds.get_holdings_data(mf_id + ".BO")
    return {
        "info": info_data,
        "performance": performance,
        "holding_info": holdingInfo,
    }


def mutualFundCurrentPrice(symbol: str):
    data = mutualFunds.get_curr_data(symbol + ".BO")
    return data

def handle_search_mutual_fund(search: str):
    with open("./data/code.json", "r") as mfFile:
        data = json.load(mfFile)
    searchedMF = [] 
    for mfD in data:
        for key, value in mfD.items():
            if search in value or search in value.lower():
                searchedMF.append({
                                    "symbol": key,
                                    "name": value
                                })
    return searchedMF