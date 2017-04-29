from flask import Flask, request, \
    redirect, url_for,\
    render_template, jsonify


from config import *
from db import *

app = Flask(__name__)

@app.route('/query')
def queryRecords():
    since = request.args.get('since')
    number = request.args.get('number')
    records = Records(number, since)
    return jsonify(records.getRecordsDict())

@app.route('/add', methods=['POST'])
def addRecord():
    nickname = request.form.get('nickname')
    content = request.form.get('content')
    remark = request.form.get('remark')
    result = Records.addRecord((nickname, content, remark))
    return jsonify(result)


@app.route('/')
def index():
    return render_template('index.html')


@app.errorhandler(405)
def page_not_found(e):
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(host=HOST, port=PORT, debug=DEBUG)
