from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient  # pymongo를 임포트 하기(패키지 인스톨 먼저 해야겠죠?)

app = Flask(__name__)

client = MongoClient('localhost', 27017)  # mongoDB는 27017 포트로 돌아갑니다.
db = client.reservation  # 'reservation'라는 이름의 db를 만듭니다.


## HTML을 주는 부분
@app.route('/')
def home():
    return render_template('fullcalendar.html')


@app.route('/client1')
def client1():
    return render_template('reservation.html')



## API 역할을 하는 부분
@app.route('/api/push', methods=['POST'])
def save_res():
    student_name = request.form['name_give']
    student_school = request.form['school_give']
    student_grade = request.form['grade_give']
    student_address = request.form['address_give']
    studnet_subject = request.form['subject_give']
    tel = request.form['tel_give']
    date_box = request.form['date_give']
    time_box = request.form['time_give']
    special_note = request.form['specialNote_give']
    print("Name", student_name)
    print("school", student_school)
    print("Subject", studnet_subject)
    print("Grade", student_grade)
    print("Address", student_address)
    print("tel", tel)
    print("dateBox", date_box)
    print("timeBox", time_box)
    print("specialNote", special_note)

# 2. DB에 정보 삽입하기
    res_info = {
        'Name': student_name,
        'School': student_school,
        'Subject': studnet_subject,
        'Grade': student_grade,
        'Address': student_address,
        'Tel': tel,
        'Date': date_box,
        'Time': time_box,
        'SpecialNote': special_note
    }
    db.reservation.insert_one(res_info)

# 3. 성공 여부 & 성공 메시지 반환하기
    return jsonify({'result': 'success', 'msg': '이 요청은 POST!'})


@app.route('/api/push', methods=['GET'])
def read_orders():
    reservation = list(db.reservation.find({}, {'_id': 0}))
    return jsonify({
        'result': 'success',
        'reservation': reservation
    })
    return jsonify({'result': 'success', 'msg': '이 요청은 GET!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)