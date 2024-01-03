import requests
from bs4 import BeautifulSoup
import re


class STOCKMARKET:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
        }
        self.session = requests.Session()

    # Get Index Data
    def get_index_data(self, urlStr: str, symbol: str):
        data=self.session.get("https://ticker.finology.in/market/index/"+urlStr, headers=self.headers)
        html=BeautifulSoup(data.text, "lxml")
        # Get Name
        name=html.find("h1").getText()
        # Get Data
        data=html.find(id="mainContent_clsprice")
        curr_price=float(data.find(class_="currprice").find(class_="Number").getText())
        check=data.find(id="mainContent_pnlPriceChange").find(class_="text-success")
        curr_change=""
        curr_per_change=""
        if (check != None):
            curr_change=float(data.find(id="mainContent_pnlPriceChange").find(class_="text-success").find(class_="Number").getText())
            curr_per_change=float("0"+data.find(id="mainContent_pnlPriceChange").find_all(class_="text-success")[1].find(class_="Number").getText())
        else:
            allChange=data.find(id="mainContent_pnlPriceChange").find_all(class_="Number")
            curr_change=float(allChange[0].getText())
            curr_per_change=float(allChange[1].getText())
        return {
            "name": name,
            "symbol": symbol,
            "curr_price": curr_price,
            "curr_change": curr_change,
            "curr_per_change": curr_per_change
        }
        
    # Get Market Gainers
    def get_market_gainers(self, skip: int, limit: int):
        data=self.session.get("https://ticker.finology.in/market/top-gainers", headers=self.headers)
        html=BeautifulSoup(data.text, "lxml")
        gainersTable=html.find(id="mainContent_pnlhighlow").find("tbody").find_all("tr")
        gainersData=[]
        for gainers in gainersTable[skip:limit]:
            g=gainers.find_all("td")[1:]
            gainersData.append({
                "symbol": g[0].find("a").attrs["href"].split("/")[2],
                "company": g[0].find("a").getText(),
                "price": float(g[1].getText()),
                "change": float(g[2].find('span').getText().replace("%", "").replace("+", "")),
            })
        return gainersData
    
    # Get Market Losers
    def get_market_losers(self, skip: int, limit: int):
        data=self.session.get("https://ticker.finology.in/market/top-losers", headers=self.headers)
        html=BeautifulSoup(data.text, "lxml")
        losersTable=html.find(id="mainContent_pnlhighlow").find("tbody").find_all("tr")
        losersData=[]
        for losers in losersTable[skip:limit]:
            l=losers.find_all("td")[1:]
            losersData.append({
                "symbol": l[0].find("a").attrs["href"].split("/")[2],
                "company": l[0].find("a").getText(),
                "price": float(l[1].getText()),
                "change": float(l[2].find('span').getText().replace("%", "").replace("+", "")),
            })
        return losersData
    
    # Index Details
    def get_index_details(self, urlStr: str):
        data=self.session.get("https://ticker.finology.in/market/index/"+urlStr, headers=self.headers)
        html=BeautifulSoup(data.text, "lxml")
        
        gainersTable=html.find(id="pills-gainer").find("table").find("tbody").find_all("tr")
        losersTable=html.find(id="pills-loser").find("table").find("tbody").find_all("tr")
        
        gainersData=[]
        losersData=[]
        
        for gainers in gainersTable:
            g=gainers.find_all("td")
            gainersData.append({
                "name": g[0].find("a").getText(),
                "symbol": g[0].find("a").attrs["href"].split("/")[2],
                "price": g[1].getText(),
                "change":float(g[2].getText().replace("+", "").replace("%", ""))
            })
            
        for losers in losersTable:
            l=losers.find_all("td")
            losersData.append({
                "name": l[0].find("a").getText(),
                "symbol": l[0].find("a").attrs["href"].split("/")[2],
                "price": l[1].getText(),
                "change":float(l[2].getText().replace("+", "").replace("%", ""))
            })
        
        topPerformerTable=html.find(id="mainContent_TopreturnandTopperformer").find("table").find("tbody").find_all("tr")
        topPerformerData=[]
        
        for topP in topPerformerTable:
            p=topP.find_all("td")
            topPerformerData.append({
                "name": p[0].find("a").getText(),
                "symbol": p[0].find("a").attrs["href"].split("/")[2],
                "profit": p[1].getText()
            })
            
        return {
            "top_gainers": gainersData,
            "top_losers": losersData,
            "topperformer": topPerformerData
        }
    
    # Get Company Data
    async def get_company_data(self, symbol: str, session):
        async with session.get("https://ticker.finology.in/company/"+symbol, headers=self.headers) as data:
            html=BeautifulSoup(await data.text(), "lxml")
            full_name=html.find(id="mainContent_ltrlCompName").getText()
            priceData=html.find(id="mainContent_clsprice")
            curr_price=float(priceData.find(class_="currprice").find(class_="Number").getText())
            
            changeData=priceData.find(id="mainContent_pnlPriceChange").getText()
            curr_change=float(changeData.split()[0].replace("+", ""))
            curr_per_change=float(changeData.split()[1].replace("(", "").replace(")", "").replace("%", ""))
            return {
                "name": full_name,
                "symbol": symbol,
                "curr_price": curr_price,
                "curr_change": curr_change,
                "curr_per_change": curr_per_change
            }
                
    def get_company_price_data(self, symbol: str):
            data=self.session.get("https://ticker.finology.in/company/"+symbol, headers=self.headers)
            html=BeautifulSoup(data.text, "lxml")
            full_name=html.find(id="mainContent_ltrlCompName").getText()
            priceData=html.find(id="mainContent_clsprice")
            curr_price=float(priceData.find(class_="currprice").find(class_="Number").getText())
            
            changeData=priceData.find(id="mainContent_pnlPriceChange").getText()
            curr_change=float(changeData.split()[0].replace("+", ""))
            curr_per_change=float(changeData.split()[1].replace("(", "").replace(")", "").replace("%", ""))
            return {
                "name": full_name,
                "symbol": symbol,
                "curr_price": curr_price,
                "curr_change": curr_change,
                "curr_per_change": curr_per_change
            } 
    
    # Get Company Strengths Limitations
    def get_company_strengths_and_limitations(self, symbol: str):
        data=self.session.get("https://ticker.finology.in/company/"+symbol, headers=self.headers)
        html=BeautifulSoup(data.text, "lxml")
        strengths=html.find(id="mainContent_ProsAndCons").find(class_="strength").find_all("li")
        strengthsData=[]
        for s in strengths:
            strengthsData.append(s.getText())
            
        limitations=html.find(id="mainContent_ProsAndCons").find(class_="limitations").find_all("li")
        limitationsData=[]
        for l in limitations:
            limitationsData.append(l.getText())
            
        return {
            "strengths": strengthsData,
            "limitations": limitationsData
        }
        
    # Get Company Price Summary
    def get_company_price_summary(self, symbol: str):
        data=self.session.get("https://ticker.finology.in/company/"+symbol, headers=self.headers)
        html=BeautifulSoup(data.text, "lxml")
        priceData=html.find(id="mainContent_clsprice")
        curr_price=float(priceData.find(class_="currprice").find(class_="Number").getText())
        todaysHigh=float(html.find(id="mainContent_ltrlTodayHigh").getText())
        yearHigh=float(html.find(id="mainContent_ltrl52WH").getText())
        todaysLow=float(html.find(id="mainContent_ltrlTodayLow").getText())
        yearLow=float(html.find(id="mainContent_ltrl52WL").getText())
        return {
            "curr_price": curr_price,
            "today_high": todaysHigh,
            "today_low": todaysLow,
            "year_high": yearHigh,
            "year_low": yearLow
        }
    
    # Get Company Essentials
    def get_company_essentials(self, symbol: str):
        data=self.session.get("https://ticker.finology.in/company/"+symbol, headers=self.headers)
        html=BeautifulSoup(data.text, "lxml")
        companyData=html.find(id="mainContent_updAddRatios").find_all(class_="compess")[:-1]
        companyEssentials=[]
        for data in companyData:
            companyEssentials.append({
                "name": re.sub(" +", " ", data.find("small").getText().replace("\n", "").replace("\r", "")),
                "value": re.sub(" +", " ", data.find("p").getText().replace("\n", "").replace("\r", "")).replace("\xa0", "")
            })
        return {
            "companyEssentials": companyEssentials
        }
    
    # Get Quaterly Results
    def get_quaterly_results(self, symbol: str):
        data=self.session.get("https://ticker.finology.in/company/"+symbol, headers=self.headers)
        html=BeautifulSoup(data.text, "lxml")
        quaterlyTable=html.find(id="mainContent_quarterly").find("table")
        tableBody=quaterlyTable.find("tbody").find_all("tr")
        quaterlyTableData=[]
        for allRow in tableBody:
            head=allRow.find("th").getText()
            allCol=allRow.find_all("td")
            quaterlyTableData.append({
                "particular": head,
                "March 2022": re.sub(" +", " ", allCol[0].find("span").getText().replace("\n", "").replace("\r", "")),
                "Jun 2022": re.sub(" +", " ", allCol[1].find("span").getText().replace("\n", "").replace("\r", "")),
                "Sep 2022": re.sub(" +", " ", allCol[2].find("span").getText().replace("\n", "").replace("\r", "")),
                "Dec 2022": re.sub(" +", " ", allCol[3].find("span").getText().replace("\n", "").replace("\r", "")),
                "March 2022": re.sub(" +", " ", allCol[4].find("span").getText().replace("\n", "").replace("\r", ""))
            })
        return {
            "quaterlyReturns": quaterlyTableData
        }

    # Get yearly Results 
    def get_yearly_results(self, symbol: str):
        data=self.session.get("https://ticker.finology.in/company/"+symbol, headers=self.headers)
        html=BeautifulSoup(data.text, "lxml")
        yearlyTable=html.find(id="profit").find("table")
        tableBody=yearlyTable.find("tbody").find_all("tr")
        yearlyTableData=[]
        for allRow in tableBody:
            head=allRow.find("th").getText()
            allCol=allRow.find_all("td")
            yearlyTableData.append({
                "particular": head,
                "March 2019": re.sub(" +", " ", allCol[0].find("span").getText().replace("\n", "").replace("\r", "")),
                "March 2020": re.sub(" +", " ", allCol[1].find("span").getText().replace("\n", "").replace("\r", "")),
                "March 2021": re.sub(" +", " ", allCol[2].find("span").getText().replace("\n", "").replace("\r", "")),
                "March 2022": re.sub(" +", " ", allCol[3].find("span").getText().replace("\n", "").replace("\r", "")),
                "March 2023": re.sub(" +", " ", allCol[4].find("span").getText().replace("\n", "").replace("\r", ""))
            })
        return {
            "yearlyReturns": yearlyTableData
        }
    
    # Get Yearly Balance Sheet
    def get_yearly_balance_sheet(self, symbol: str):
        data=self.session.get("https://ticker.finology.in/company/"+symbol, headers=self.headers)
        html=BeautifulSoup(data.text, "lxml")
        balanceSheetTable=html.find(id="balance").find("table")
        tableBody=balanceSheetTable.find("tbody").find_all("tr")
        equityLiabilities=[]
        assets=[]
        for index, allRow in enumerate(tableBody):
            if (index > 0 and index < 7):
                head=allRow.find("th").getText()
                allCol=allRow.find_all("td")
                equityLiabilities.append({
                    "particular": head,
                    "March 2019": re.sub(" +", " ", allCol[0].find("span").getText().replace("\n", "").replace("\r", "")),
                    "March 2020": re.sub(" +", " ", allCol[1].find("span").getText().replace("\n", "").replace("\r", "")),
                    "March 2021": re.sub(" +", " ", allCol[2].find("span").getText().replace("\n", "").replace("\r", "")),
                    "March 2022": re.sub(" +", " ", allCol[3].find("span").getText().replace("\n", "").replace("\r", "")),
                    "March 2023": re.sub(" +", " ", allCol[4].find("span").getText().replace("\n", "").replace("\r", ""))
                })
            if (index > 7):
                head=allRow.find("th").getText()
                allCol=allRow.find_all("td")
                assets.append({
                    "particular": head,
                    "March 2019": re.sub(" +", " ", allCol[0].find("span").getText().replace("\n", "").replace("\r", "")),
                    "March 2020": re.sub(" +", " ", allCol[1].find("span").getText().replace("\n", "").replace("\r", "")),
                    "March 2021": re.sub(" +", " ", allCol[2].find("span").getText().replace("\n", "").replace("\r", "")),
                    "March 2022": re.sub(" +", " ", allCol[3].find("span").getText().replace("\n", "").replace("\r", "")),
                    "March 2023": re.sub(" +", " ", allCol[4].find("span").getText().replace("\n", "").replace("\r", ""))
                })
        return {
            "balanceSheet": equityLiabilities + assets
        }

    # Get Yearly Cash Flow
    def get_yearly_cash_flow(self, symbol: str):
        data=self.session.get("https://ticker.finology.in/company/"+symbol, headers=self.headers)
        html=BeautifulSoup(data.text, "lxml")
        if (html.find(id="mainContent_cashflows") == None):
            return {
                "cashflow": []
            }

        yearlyTable=html.find(id="mainContent_cashflows").find("table")        
        tableBody=yearlyTable.find("tbody").find_all("tr")
        yearlyTableData=[]
        for allRow in tableBody:
            head=allRow.find("th").getText()
            allCol=allRow.find_all("td")[:-3]
            yearlyTableData.append({
                "particular": head,
                "March 2019": re.sub(" +", " ", allCol[0].getText().replace("\n", "").replace("\r", "")),
                "March 2020": re.sub(" +", " ", allCol[1].getText().replace("\n", "").replace("\r", "")),
                "March 2021": re.sub(" +", " ", allCol[2].getText().replace("\n", "").replace("\r", "")),
                "March 2022": re.sub(" +", " ", allCol[3].getText().replace("\n", "").replace("\r", "")),
                "March 2023": re.sub(" +", " ", allCol[4].getText().replace("\n", "").replace("\r", ""))
            })
        return {
            "cashflows": yearlyTableData
        }
    
    # Get All Ratios
    def get_financial_ratios(self, symbol: str):
        data=self.session.get("https://ticker.finology.in/company/"+symbol, headers=self.headers)
        html=BeautifulSoup(data.text, "lxml")
        ratiosData=html.find(id="ratios").find_all(class_="col-12")
        allRatios=[]
        for ratios in ratiosData:
            name=re.sub(" +", " ", ratios.find(class_="card").find("h4").getText().replace("\n", "").replace("\r", ""))
            ratiosYears = ratios.find_all(class_="ratiosingle")
            data=""
            
            if (len(ratiosYears) > 0):
                data={
                    "1 year": re.sub(" +", " ", ratiosYears[0].find(class_="durationvalue").getText().replace("\n", "").replace("\r", "")),
                    "3 year": re.sub(" +", " ", ratiosYears[1].find(class_="durationvalue").getText().replace("\n", "").replace("\r", "")),
                    "5 year": re.sub(" +", " ", ratiosYears[2].find(class_="durationvalue").getText().replace("\n", "").replace("\r", ""))
                }
            else:
                print(ratios)
                data=re.sub(" +", " ", ratios.find(class_="Number").getText().replace("\n", "").replace("\r", ""))
            allRatios.append({
                "name": name,
                "data": data
            })
        return {
            "ratios": allRatios
        }
    