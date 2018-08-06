var saveMethod;
// $(document).ready(function() {
//     deleteStaff();
// });

function addStaff() {
    saveMethod = 'addStaff';
    $('#form-staff')[0].reset();
    $('#modal-staff').modal('show');
    $('.modal-staff-title').text('Thêm nhân viên');
}

// function editTable() {
//     $('body').on('click', "table .edit", function() {
//         tableId = $(this).attr("data-id");
//         saveMethod = 'updateTable';
//         $('#form-table')[0].reset();
//         $.ajax({
//             url: baseUrl + "admin/get_table_by_id/" + tableId,
//             type: "POST",
//             dataType: "JSON",
//             success: function(data) {
//                 console.log(data);
//                 $('[name="id"]').val(data.data.id);
//                 $('[name="name"]').val(data.data.name);
//                 $('#modal-table').modal('show'); // show bootstrap modal when complete loaded
//                 $('.modal-table-title').text('Chỉnh sửa thông tin bảng đấu'); // Set title to Bootstrap modal title

//             },
//             error: function(jqXHR, textStatus, errorThrown) {
//                 alert('Error get data from ajax');
//             }
//         });

//     });
// }

function saveStaff() {
    validateCode = $('.staff-code').val();
    validateName = $('.staff-name').val();
    validateDob = $('.staff-dob').val();
    validateAddress = $('.staff-address').val();
    validatePhone = $('.staff-phone').val();
    validateRole = $('.staff-role').val();
    validateState = $('.staff-state').val();
    validateUserName = $('.staff-username').val();
    validatePassword = $('.staff-password').val();
    if ((validateName == "")||(validateDob == "")||(validateAddress == "")||(validatePhone == "")
    ||(validateRole == "")||(validateState == "")||(validateUserName == "")||(validatePassword == "")||(validateCode == "")) 
    {
        alert("Vui lòng điền đầy đủ thông tin!");
        return false;
    }
    var url;
    if (saveMethod == 'addStaff') {
        url = baseUrl + "/api/staff/create";
    } else if (saveMethod == 'updateStaff') {
        // url = baseUrl + "admin/update_table";
    }
    // ajax adding data to database
    $.ajax({
        url: url,
        type: "POST",
        data: $('#form-staff').serialize(),
        dataType: "JSON",
        success: function(data) {
            console.log(data);
            // alert(data.message);
        },
    });
    $('#modal-staff').hide();
    location.reload();
}

function deleteStaff() {
    $('body').on('click', "table .delete", function() {
        if (confirm('Bạn thực sự muốn xóa nhân viên này?')) {
            //Chưa làm xong;
        }
    });
}