from flask import Flask, jsonify, request
from flask_cors import CORS
import finnhub
import requests
import traceback

app = Flask(__name__)
CORS(app)

FINNHUB_API = "d415j31r01qo6qdf1ga0d415j31r01qo6qdf1gag"
TWELVE_API = "739d88f24c8d47a989fbfb20a1827636"

finnhub_client = finnhub.Client(api_key=FINNHUB_API)


@app.route('/')
def home():
    return jsonify({
        "message": "Welcome to the Stock Market Data API 🚀",
        "usage": "Use /api/stock?symbol=AAPL to fetch stock data."
    })


@app.route('/api/stock', methods=['GET'])
def stockData():
    symbol = request.args.get('symbol', '').upper()
    print(f"\n📩 Request received for: {symbol}")

    if not symbol:
        return jsonify({"error": "Missing symbol parameter"}), 400

    try:
        # --- Finnhub Data ---
        companyDetails = finnhub_client.company_profile2(symbol=symbol)
        quote = finnhub_client.quote(symbol)

        # --- Twelve Data (extra stats) ---
        stats_url = f"https://api.twelvedata.com/statistics?symbol={symbol}&apikey={TWELVE_API}"
        stats = requests.get(stats_url).json()

        print(f"✅ Fetched Data for {symbol}")

        # 🧩 Combine Data
        data = {
            "symbol": symbol,
            "name": companyDetails.get("name", "N/A"),
            "exchange": companyDetails.get("exchange", "N/A"),
            "currency": companyDetails.get("currency", "USD"),  # ✅ Add currency
            "datetime": stats.get("datetime", "N/A"),  # ✅ Add datetime if available

            # --- Market Info ---
            "price": quote.get("c", "N/A"),
            "open": quote.get("o", "N/A"),
            "high": quote.get("h", "N/A"),
            "low": quote.get("l", "N/A"),
            "previousClose": quote.get("pc", "N/A"),
            "volume": quote.get("v", "N/A"),

            # --- Stats ---
            "marketCap": stats.get("market_cap", "N/A"),
            "peRatio": stats.get("pe_ratio", "N/A"),
            "dividendYield": stats.get("dividend_yield", "N/A"),
            "fiftyTwoWeekHigh": stats.get("52_week_high", quote.get("h", "N/A")),
            "fiftyTwoWeekLow": stats.get("52_week_low", quote.get("l", "N/A")),

            # --- Company Info ---
            "industry": companyDetails.get("finnhubIndustry", "N/A"),
            "sector": companyDetails.get("sector", "N/A"),
            "employees": companyDetails.get("employeeTotal", "N/A"),
            "headquarters": f"{companyDetails.get('city', '')}, {companyDetails.get('country', '')}",
            "website": companyDetails.get("weburl", "N/A"),
            "logo": companyDetails.get("logo", None),

            "source": "Finnhub + Twelve Data"
        }

        return jsonify(data)

    except Exception as e:
        print("❌ Error while fetching data:")
        traceback.print_exc()
        return jsonify({"error": str(e), "message": "Something went wrong"}), 500


if __name__ == '__main__':
    app.run(debug=True)
