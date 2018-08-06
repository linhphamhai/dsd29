var saveMethod;


function addSensor() {
    saveMethod = 'addSensor';
    $('#form-sensor')[0].reset();
    $('#modal-sensor').modal('show');
    $('.modal-sensor-title').text('Thêm mới sensor');
}

function editSensor() {
    $('body').on('click', ".edit-sensor", function() {

        sensorId= $(this).attr("data-id");
        saveMethod = 'updateSensor';

        $('#form-sensor')[0].reset();
        $.ajax({
            url: baseUrl + "/api/sensor/get?sensor_id=" + sensorId,
            type: "GET",
            dataType: "JSON",
            success: function(data) {
                console.log(data);
                $('[name="sensor_id"]').val(data[0].sensor_id);
                $('.current_tree_id').val(data[0].current_tree_id);
                $('[name="sensor_name"]').val(data[0].sensor_name);
                $('[name="sensor_detail"]').val(data[0].sensor_detail);
                $('.sensor_state').val(data[0].sensor_state);

                $('#modal-sensor').modal('show'); // show bootstrap modal when complete loaded
                $('.modal-sensor-title').text('Chỉnh sửa thông tin của sensor'); // Set title to Bootstrap modal title

            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Error get data from ajax');
            }
        });

    });
}

function saveSensor() {
    validateName = $('.sensor-name').val();
    validateDetail = $('.sensor-detail').val();
    if ((validateName == "")||(validateDetail == "")) 
    {
        alert("Vui lòng điền đầy đủ thông tin!");
        return false;
    }
    var url;
    var type;
    if (saveMethod == 'addSensor') {
        url = baseUrl + "/api/sensor/create";
        type= "POST";
    } else if (saveMethod == 'updateSensor') {
        url = baseUrl + "/api/sensor/update";
        type= "PUT";
    }
    console.log(type);
    // ajax adding data to database
    $.ajax({
        url: url,
        type: type,
        data: $('#form-sensor').serialize(),
        dataType: "JSON",
        success: function(data) {
            console.log(data);
            $('#modal-sensor').hide();
            location.reload(true);
        },
    });
   
}