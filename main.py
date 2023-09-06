from flask import Flask, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/hello', methods=['GET'])
def hello():
    response = make_response("Hello from Flask!")
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


if __name__ == '__main__':
    app.run(debug=True)
