import requests
from bs4 import BeautifulSoup


class MUTUALFUND:
    def __init__(self):
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
        }
        self.session = requests.Session()
    
    async def get_custom_data(self, symbol: str, session):
        async with session.get("https://finance.yahoo.com/quote/" + symbol, headers=self.headers) as data1:
            html1= BeautifulSoup(await data1.text(), "lxml")
            name = html1.find(class_="D(ib) Fz(18px)").getText()
            price = float(html1.find(class_="Fw(b) Fz(36px) Mb(-4px) D(ib)").getText().replace(",", ""))
        
        async with session.get("https://finance.yahoo.com/quote/" + symbol + "/performance?p=" + symbol, headers=self.headers) as data2:
            html2= BeautifulSoup(await data2.text(), "lxml")
            returnsTable = html2.find(
                class_="Pb(20px) smartphone_Px(20px) smartphone_Pt(20px)"
            ).find_all(class_="Mb(25px)")[1]
            all_returns = returnsTable.find_all(
                class_="Bdbw(1px) Bdbc($seperatorColor) Bdbs(s) H(25px) Pt(10px)"
            )
            one_year = all_returns[3].find(class_="W(20%)").getText().replace("%", "")
            five_year = all_returns[5].find(class_="W(20%)").getText().replace("%", "")
        
        return {
            "symbol": symbol,
            "fund": name,
            "nav": price,
            "return_one_year": one_year,
            "return_five_year": five_year,
        }
    
    def get_mf_data(self, symbol: str):
        
        data1=self.session.get("https://finance.yahoo.com/quote/" + symbol, headers=self.headers)
        data2=self.session.get("https://finance.yahoo.com/quote/" + symbol + "/performance?p=" + symbol, headers=self.headers)
        
        html1= BeautifulSoup(data1.text, "lxml")
        name = html1.find(class_="D(ib) Fz(18px)").getText()
        price = float(html1.find(class_="Fw(b) Fz(36px) Mb(-4px) D(ib)").getText().replace(",", ""))
        
        html2= BeautifulSoup(data2.text, "lxml")
        returnsTable = html2.find(
            class_="Pb(20px) smartphone_Px(20px) smartphone_Pt(20px)"
        ).find_all(class_="Mb(25px)")[1]
        all_returns = returnsTable.find_all(
            class_="Bdbw(1px) Bdbc($seperatorColor) Bdbs(s) H(25px) Pt(10px)"
        )
        one_year = all_returns[3].find(class_="W(20%)").getText().replace("%", "")
        five_year = all_returns[5].find(class_="W(20%)").getText().replace("%", "")
        return {
            "symbol": symbol,
            "fund": name,
            "nav": price,
            "return_one_year": one_year,
            "return_five_year": five_year,
        }
        

    def get_curr_data(self, symbol: str):
        data = self.session.get(
            "https://finance.yahoo.com/quote/" + symbol, headers=self.headers
        )
        html = BeautifulSoup(data.text, "lxml")

        name = html.find(class_="D(ib) Fz(18px)").getText()
        price = float(
            html.find(class_="Fw(b) Fz(36px) Mb(-4px) D(ib)").getText().replace(",", "")
        )
        price_change = float(
            html.find(class_="Fw(500) Pstart(8px) Fz(24px)")
            .find("span")
            .getText()
            .replace("+", "")
        )
        per_change = float(
            html.find_all(class_="Fw(500) Pstart(8px) Fz(24px)")[1]
            .find("span")
            .getText()
            .replace("(", "")
            .replace(")", "")
            .replace("+", "")
            .replace("%", "")
        )

        return {
            "name": name,
            "symbol": symbol,
            "curr_price": price,
            "price_change": price_change,
            "per_change": per_change,
        }
    

    def get_performace(self, symbol: str):
        data = self.session.get(
            "https://finance.yahoo.com/quote/" + symbol + "/performance?p=" + symbol,
            headers=self.headers,
        )
        html = BeautifulSoup(data.text, "lxml")

        returnsTable = html.find(
            class_="Pb(20px) smartphone_Px(20px) smartphone_Pt(20px)"
        ).find_all(class_="Mb(25px)")[1]
        all_returns = returnsTable.find_all(
            class_="Bdbw(1px) Bdbc($seperatorColor) Bdbs(s) H(25px) Pt(10px)"
        )

        ytd = all_returns[0].find(class_="W(20%)").getText().replace("%", "")
        one_month = all_returns[1].find(class_="W(20%)").getText().replace("%", "")
        three_month = all_returns[2].find(class_="W(20%)").getText().replace("%", "")
        one_year = all_returns[3].find(class_="W(20%)").getText().replace("%", "")
        three_year = all_returns[4].find(class_="W(20%)").getText().replace("%", "")
        five_year = all_returns[5].find(class_="W(20%)").getText().replace("%", "")

        return [
            {
                "name": "YTD",
                "value": float(ytd),
            },
            {
                "name": "One Month",
                "value": float(one_month),
            },
            {
                "name": "Three Month",
                "value": float(three_month),
            },
            {
                "name": "One Year",
                "value": float(one_year),
            },
            {
                "name": "Three Year",
                "value": float(three_year),
            },
            {
                "name": "Five Year",
                "value": float(five_year),
            },
        ]

    def get_holdings_data(self, symbol: str):
        data = self.session.get(
            "https://finance.yahoo.com/quote/" + symbol + "/holdings?p=" + symbol,
            headers=self.headers,
        )
        html = BeautifulSoup(data.text, "lxml")

        alltable = html.find(id="Main").find("section").find_all(class_="Mb(25px)")

        positionComposition = alltable[0].find_all(
            class_="Bdbw(1px) Bdbc($seperatorColor) Bdbs(s) H(25px) Pt(10px)"
        )
        positionCompositionData = []

        for pc in positionComposition:
            name = pc.find(class_="Mend(5px) Whs(nw)").getText()
            value = pc.find(class_="Fl(end)").getText()
            positionCompositionData.append({"name": name, "value": value})

        sectorWeighting = alltable[1].find_all(
            class_="Bdbw(1px) Bdbc($seperatorColor) Bdbs(s) H(25px) Pt(10px)"
        )
        sectorWeightingData = []

        for sw in sectorWeighting:
            name = sw.find(class_="Mend(5px) Whs(nw)").getText()
            value = sw.find(class_="W(20%) D(b) Fl(start) Ta(e)").getText()
            sectorWeightingData.append({"name": name, "value": value})

        equityHoldings = alltable[2].find_all(
            class_="Bdbw(1px) Bdbc($seperatorColor) Bdbs(s) H(25px) Pt(10px)"
        )
        equityHoldingsData = []

        for eh in equityHoldings:
            name = eh.find(class_="Mend(5px) Whs(nw)").getText()
            value = eh.find(class_="W(20%) D(b) Fl(start) Ta(e)").getText()
            equityHoldingsData.append({"name": name, "value": value})

        return {
            "portfolioComposition": positionCompositionData,
            "sectorWeighting": sectorWeightingData,
            "equityHoldings": equityHoldingsData,
        }

    def get_historical_data(self, symbol: str, start: str, end: str, interval: str):
        url="https://finance.yahoo.com/quote/"+ symbol + "/history?period1=" + start + "&period2=" + end + "&interval=" + interval + "&filter=history&frequency=" + interval + "&includeAdjustedClose=false"
        
        data = self.session.get(
            "https://finance.yahoo.com/quote/"
            + symbol
            + "/history?period1="
            + start
            + "&period2="
            + end
            + "&interval="
            + interval
            + "&filter=history&frequency="
            + interval
            + "&includeAdjustedClose=false",
            headers=self.headers,
        )
        html = BeautifulSoup(data.text, "lxml")

        historytable = (
            html.find(id="Col1-1-HistoricalDataTable-Proxy")
            .find("table")
            .find("tbody")
            .find_all("tr")
        )
        historyData = []

        for history in historytable:
            date = history.find(class_="Py(10px) Ta(start) Pend(10px)").getText()
            tds = history.find_all(class_="Py(10px) Pstart(10px)")
            
            if tds[0].getText() != "-":
                historyData.append(
                    {
                        "date": date,
                        "price": tds[0].getText(),
                    }
                )

        return historyData


# MUTUALFUND().get_historical_data("0P0001IUCE.BO", "1672531200", "1689465600", "1d")
