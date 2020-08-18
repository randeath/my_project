function Reservation() {
    let name = $("#studentName").val();
    let school = $("#School").val();
    let grade = $("#studentGrade").val();
    let address = $("#studentAddress").val();
    let tel = $("#tlno").val();
    let subject = $("#subjectSelect").val();
    let date = $("#dateBox").val();
    let time = $("#timeBox").val();
    let specialNote = $("#specialNote").val();


    if (name == "" || school == "" || grade == "" || address == "" || tel == "" || subject == "" || time == "" || specialNote == "") {
        alert('입력하지 않은 부분이 없는지 확인해 주세요! 정보가 부족합니다.');
    } else {
        $.ajax({
            type: "POST",
            url: "/api/push",
            data: {
                'name_give': name,
                'school_give': school,
                'grade_give': grade,
                'address_give': address,
                'tel_give': tel,
                'subject_give': subject,
                'date_give': date,
                'time_give': time,
                'specialNote_give': specialNote

            },
            success: function (response) {
                if (response["result"] == "success") {
                    alert(response["msg"]);
                    window.location.reload();
                }
            }
        })

    }
}

function advance_reservation() {
    $.ajax({
        type: "GET", // GET 방식으로 요청한다.
        url: "/api/push",
        data: {}, // 요청하면서 함께 줄 데이터 (GET 요청시엔 비워두세요)
        success: function (response) {
            if (response.result != 'success') {
                alert('정보를 가져오는데 실패');
                return;
            }
            let reservation = response['reservation'];
            for (let i = 0; i < reservation.length; i++) {
                let date = reservation[i]['Date'];
                let time = reservation[i]['Time'];
                let school = reservation[i]['School'];
                let address = reservation[i]['Address'];
                let subject = reservation[i]['Subject'];

                res_listing(date, time, school, address, subject);



            }

        }
    });
}

function res_listing(date, time, school, address, subject) {
    console.log(date, time, school, address, subject)
}