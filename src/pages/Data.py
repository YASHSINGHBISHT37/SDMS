# from flask import Flask, jsonify, request
# import yfinance as yf
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Allow requests from your React app

# @app.route('/api/stock', methods=['GET'])
# def get_stock_data():
#     symbol = request.args.get('symbol', 'AAPL')  # default Apple
#     stock = yf.Ticker(symbol)
#     info = stock.info

#     data = {
#         "symbol": symbol.upper(),
#         "name": info.get("shortName", "N/A"),
#         "price": info.get("currentPrice", "N/A"),
#         "peRatio": info.get("trailingPE", "N/A"),
#         "fiftyTwoWeekLow": info.get("fiftyTwoWeekLow", "N/A"),
#         "fiftyTwoWeekHigh": info.get("fiftyTwoWeekHigh", "N/A"),
#         "about": info.get("longBusinessSummary", "N/A"),
#         "source": "Yahoo Finance"
#     }

#     return jsonify(data)

# if __name__ == '__main__':
#     app.run(debug=True)
