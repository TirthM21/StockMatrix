import requests
from bs4 import BeautifulSoup

class ETF:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
        }
        self.session = requests.Session()
    
    async def get_curr_data(self, symbol: str, session):

        async with session.get("https://finance.yahoo.com/quote/"+symbol, headers=self.headers) as data:
            html=BeautifulSoup(await data.text(), "lxml")
            
            name = html.find(class_="D(ib) Fz(18px)").getText()
            price=float(html.find(class_="Fw(b) Fz(36px) Mb(-4px) D(ib)").getText().replace(",", ""))
            price_change=float(html.find(class_="Fw(500) Pstart(8px) Fz(24px)").find("span").getText().replace("+", ""))
            per_change=float(html.find_all(class_="Fw(500) Pstart(8px) Fz(24px)")[1].find("span").getText().replace("(", "").replace(")", "").replace("+", "").replace("%", ""))

            return {
                "name": name,
                "symbol": symbol,
                "curr_price": price,
                "price_change": price_change,
                "per_change": per_change,
            }
    
    def get_etf_data(self, symbol: str):
        data=self.session.get("https://finance.yahoo.com/quote/"+symbol, headers=self.headers)
        
        html=BeautifulSoup(data.text, "lxml")
        
        name = html.find(class_="D(ib) Fz(18px)").getText()
        price=float(html.find(class_="Fw(b) Fz(36px) Mb(-4px) D(ib)").getText().replace(",", ""))
        price_change=float(html.find(class_="Fw(500) Pstart(8px) Fz(24px)").find("span").getText().replace("+", ""))
        per_change=float(html.find_all(class_="Fw(500) Pstart(8px) Fz(24px)")[1].find("span").getText().replace("(", "").replace(")", "").replace("+", "").replace("%", ""))

        return {
            "name": name,
            "symbol": symbol,
            "curr_price": price,
            "price_change": price_change,
            "per_change": per_change,
        }
    
    def get_summary(self, symbol: str):
        data=self.session.get("https://finance.yahoo.com/quote/"+symbol, headers=self.headers)
        html=BeautifulSoup(data.text, "lxml")
        
        summary=html.find(id="quote-summary").find(class_="D(ib) W(1/2) Bxz(bb) Pend(12px) Va(t) ie-7_D(i) smartphone_D(b) smartphone_W(100%) smartphone_Pend(0px) smartphone_BdY smartphone_Bdc($seperatorColor)").find("table").find("tbody").find_all(class_="Bxz(bb) Bdbw(1px) Bdbs(s) Bdc($seperatorColor) H(36px)")
        summaryData=[]
        
        for s in summary:
            name=s.find(class_="C($primaryColor) W(51%)").getText()
            value=s.find(class_="Ta(end) Fw(600) Lh(14px)").getText()

            summaryData.append({
                "name": name,
                "value": value
            })
        
        return summaryData
    
    # Get Historical Data
    def get_historical_data(self, symbol: str, start: str, end: str, interval: str):
        data=self.session.get("https://finance.yahoo.com/quote/"+ symbol +"/history?period1="+ start +"&period2="+ end +"&interval="+ interval +"&filter=history&frequency="+ interval +"1d&includeAdjustedClose=true", headers=self.headers)
        html=BeautifulSoup(data.text, "lxml")
        
        historytable=html.find(id="Col1-1-HistoricalDataTable-Proxy").find("table").find("tbody").find_all("tr")
        historyData=[]
        
        for history in historytable:
            date=history.find(class_="Py(10px) Ta(start) Pend(10px)").getText()
            tds=history.find_all(class_="Py(10px) Pstart(10px)")
            
            historyData.append({
                "date": date,
                "open": tds[0].getText(),
                "high": tds[1].getText(),
                "low": tds[2].getText(),
                "close": tds[3].getText(),
                "adjClose": tds[4].getText()
            })

        return historyData