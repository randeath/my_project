 function order_listing() {
            $.ajax({
                type: "GET", // GET 방식으로 요청한다.
                url: "/order",
                data: {}, // 요청하면서 함께 줄 데이터 (GET 요청시엔 비워두세요)
                success: function (response) {
                    let orders = response['orders'];
                    for (let i = 0; i < orders.length; i++) {
                        let name = orders[i]['name'];
                        let count = orders[i]['count'];
                        let address = orders[i]['address'];
                        let phone = orders[i]['phone'];

                        let temp_html = `            <tr>
                <td>${name}</td>
                <td>${count}</td>
                <td>${address}</td>
                <td>${phone}</td>
            </tr>`
                        $(`#orders-box`).append(temp_html)
                    }

                }
            });
        }


        function Reservation() {
            let name = $("#studentName").val();
            let grade = $("#studentGrade").val();
            let address = $("#studentAddress").val();
            let tel = $("#tlno").val();
            let subject = $("#subjectSelect").val();
            let time = $("#dateBox #timeBox").val();
            // let specialNote = $("#specialNote").val();

            if (name == "" || grade == "" || address == "" || tel == "" || subject == "" || time == "") {
                alert('입력하지 않은 부분이 없는지 확인해 주세요! 정보가 부족합니다.');
            } else {
                $.ajax({
                    type: "POST",
                    url: "/order",
                    data: {'name_give': name, 'grade_give': grade, 'address_give': address, 'tel_give': tel, 'subject_give': subject, 'time_give': time},
                    success: function (response) {
                        if (response.result == 'success') {
                            console.log(name, grade, address, tel, subject, time );
                            // alert(response['msg']);
                            window.location.reload();
                        }
                    }
                })

            }
        }
