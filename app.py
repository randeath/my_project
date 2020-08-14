from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient  # pymongo를 임포트 하기(패키지 인스톨 먼저 해야겠죠?)

app = Flask(__name__)

client = MongoClient('localhost', 27017)  # mongoDB는 27017 포트로 돌아갑니다.
db = client.reservation  # 'dbsparta'라는 이름의 db를 만듭니다.


## HTML을 주는 부분
@app.route('/')
def home():
    return render_template('index.html')


@app.route('/client1')
def client1():
    return render_template('client1.html')



## API 역할을 하는 부분
@app.route('/push', methods=['POST'])
def write_review():
	# 1. 클라이언트가 준 studentName, studentGrade, studentAddress, tlno, subjectSelect, dateBox, timeBox, specialNote 가져오기.
    studentName = request.form['name_give']
    studentGrade = request.form['studentGrade']
    studentAddress = request.form['studentAddress']
    tlno = request.form['tlno']
    dateBox = request.form['dateBox']
    timeBox = request.form['timeBox']
    specialNote = request.form['specialNote']
    print("Name", studentName)
    print("Grade", studentGrade)
    print("Address", studentAddress)
    print("tlno", tlno)
    print("dateBox", dateBox)
    print("timeBox", timeBox)
    print("specialNote", specialNote)




	# 2. DB에 정보 삽입하기
    newRes = {
        'Name': studentName,
        'Grade': studentGrade,
        'Address': studentAddress,
        'tlno': tlno,
        'dateBox': dateBox,
        'timeBox': timeBox,
    }
    db.reservation.insert_one(newRes)

	# 3. 성공 여부 & 성공 메시지 반환하기
    return jsonify({'result': 'success', 'msg': '이 요청은 POST!'})


# @app.route('/review', methods=['GET'])
# def read_reviews():
#     reviews = list(db.reviews.find({}, {'_id': 0}))
#     return jsonify({
#         'result': 'success',
#         'reviews': reviews
#     })
#     return jsonify({'result': 'success', 'msg': '이 요청은 GET!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)