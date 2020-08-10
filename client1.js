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


        function order() {
            let address = $("#O_address").val();
            let phone = $("#O_phone").val();
            let name = $("#O_name").val();
            let count = $("#O_number").val();
            if (address == "" || phone == "" || name == "" || count == "") {
                alert('입력하지 않은 부분이 없는지 확인해 주세요! 정보가 부족합니다.');
            } else {
                $.ajax({
                    type: "POST",
                    url: "/order",
                    data: {'name_give': name, 'count_give': count, 'address_give': address, 'phone_give': phone},
                    success: function (response) {
                        if (response.result == 'success') {
                            alert(response['msg']);
                            window.location.reload();
                        }
                    }
                })

            }
        }

        function phoneNumber() {
            var patt = new RegExp("[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}");
            var res = patt.test($("#tlno").val());

            if (!patt.test($("#tlno").val())) {
                alert("전화번호를 정확히 입력하여 주십시오.");
                window.location.reload();
            }
        }
