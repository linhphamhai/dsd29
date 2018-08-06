$(document).ready(function() {
    editStaff();
});
function editStaff() {
    $('body').on('click', ".btn-edit-staff", function() {
        staffId = $(this).attr("data-id");
        console.log(staffId);
        $('#form-staff')[0].reset();

        $.ajax({
            url: baseUrl + "/api/staff?id=" + staffId,
            type: "GET",
            dataType: "JSON",
            success: function(data) {
                console.log(data);
                $('[name="staff_id"]').val(data[0].staff_id);
                $('[name="staff_code"]').val(data[0].staff_code);
                $('[name="staff_name"]').val(data[0].staff_name);
                $('[name="staff_phone"]').val(data[0].staff_phone);
                $('[name="staff_address"]').val(data[0].staff_address);

                $('.staff-state').val(data[0].staff_state);
                $('.staff-role').val(data[0].staff_role);

                $('[name="username"]').val(data[0].username);
                $('[name="staff_dob"]').val(data[0].staff_dob.substring(0, 10));

                $('#modal-staff').modal('show'); // show bootstrap modal when complete loaded
                $('.modal-staff-title').text('Chỉnh sửa thông tin nhân viên'); // Set title to Bootstrap modal title

            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Error get data from ajax');
            }
        });

    });
}

//Xem lại api update, có vấn đề
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
    // ajax adding data to database
    $.ajax({
        url: baseUrl + "/api/staff/update",
        type: "PUT",
        data: $('#form-staff').serialize(),
        dataType: "JSON",
        success: function(data) {
            console.log(data);
        },
    });
    $('#modal-staff').hide();
    location.reload();
}
