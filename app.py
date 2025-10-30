from flask import Flask, jsonify, request
from flask_cors import CORS
import finnhub
import yfinance as yf

app = Flask(__name__)
CORS(app)

API = 'd415j31r01qo6qdf1ga0d415j31r01qo6qdf1gag'
finnhub_client = finnhub.Client(api_key=API)

# ✅ Home route (fixes 404 on root)
@app.route('/')
def home():
    return jsonify({
        "message": "Welcome to the Stock Market Data API 🚀",
        "usage": "Use /api/stock?symbol=AAPL to fetch stock data."
    })


@app.route('/api/stock', methods=['GET'])
def stockData():
    symbol = request.args.get('symbol', 'AAPL').upper()

    try:
        # --- Finnhub Data ---
        stockDetails = finnhub_client.quote(symbol)
        companyDetails = finnhub_client.company_profile2(symbol=symbol)

        # --- Yahoo Finance Data ---
        stock = yf.Ticker(symbol)
        info = stock.info
        history = stock.history(period='1d')

        data = {
            "symbol": symbol,
            "name": companyDetails.get("name", info.get("longName", "N/A")),
            "price": stockDetails.get("c", info.get("currentPrice", "N/A")),
            "open": stockDetails.get("o", info.get("open", "N/A")),
            "high": stockDetails.get("h", info.get("dayHigh", "N/A")),
            "low": stockDetails.get("l", info.get("dayLow", "N/A")),
            "previousClose": stockDetails.get("pc", info.get("previousClose", "N/A")),
            "volume": stockDetails.get("v", info.get("volume", "N/A")),

            # 📊 Market stats
            "marketCap": info.get("marketCap", "N/A"),
            "peRatio": info.get("trailingPE", "N/A"),
            "dividendYield": info.get("dividendYield", "N/A"),
            "fiftyTwoWeekHigh": info.get("fiftyTwoWeekHigh", "N/A"),
            "fiftyTwoWeekLow": info.get("fiftyTwoWeekLow", "N/A"),

            # 🏢 Company details
            "industry": companyDetails.get("finnhubIndustry", info.get("industry", "N/A")),
            "sector": info.get("sector", "N/A"),
            "employees": info.get("fullTimeEmployees", "N/A"),
            "headquarters": f"{info.get('city', '')}, {info.get('country', '')}",
            "website": info.get("website", "N/A"),

            # 💬 Description & visuals
            "about": companyDetails.get("description", info.get("longBusinessSummary", "N/A")),
            "logo": companyDetails.get("logo", info.get("logo_url", None)),

            # 🔗 Source info
            "exchange": companyDetails.get("exchange", info.get("exchange", "N/A")),
            "source": "Finnhub + Yahoo Finance"
        }

        return jsonify(data)

    except Exception as e:
        return jsonify({'Error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
