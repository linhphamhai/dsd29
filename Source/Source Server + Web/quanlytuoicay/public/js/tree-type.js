var saveMethod;


function addTreeType() {
    saveMethod = 'addTreeType';
    $('#form-tree-type')[0].reset();
    $('#modal-tree-type').modal('show');
    $('.modal-tree-type-title').text('Thêm mới loại cây');
}

function editTreeType() {
    $('body').on('click', ".edit-tree-type", function() {

        treeTypeId = $(this).attr("data-id");
        saveMethod = 'updateTreeType';

        $('#form-tree-type')[0].reset();
        $.ajax({
            url: baseUrl + "/api/tree-type/get?type_id=" + treeTypeId,
            type: "GET",
            dataType: "JSON",
            success: function(data) {
                console.log(data);
                $('[name="type_id"]').val(data[0].type_id);
                $('[name="type_name"]').val(data[0].type_name);
                $('[name="standard_temperature"]').val(data[0].standard_temperature);
                $('[name="standard_humidity"]').val(data[0].standard_humidity);
                $('[name="standard_water"]').val(data[0].standard_water);

                $('#modal-tree-type').modal('show'); // show bootstrap modal when complete loaded
                $('.modal-tree-type-title').text('Chỉnh sửa thông tin của loại cây'); // Set title to Bootstrap modal title

            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Error get data from ajax');
            }
        });

    });
}

function saveTreeType() {
    validateName = $('.type-name').val();
    validateTemperature = $('.standard-temperature').val();
    validateHumidity = $('.standard-humidity').val();
    validateVater = $('.standard-water').val();
    if ((validateName == "")||(validateTemperature == "")||(validateHumidity == "")||(validateVater == "")) 
    {
        alert("Vui lòng điền đầy đủ thông tin!");
        return false;
    }
    var url;
    var type;
    if (saveMethod == 'addTreeType') {
        url = baseUrl + "/api/tree-type/create";
        type= "POST";
    } else if (saveMethod == 'updateTreeType') {
        url = baseUrl + "/api/tree-type/update";
        type= "PUT";
    }
    console.log(type);
    // ajax adding data to database
    $.ajax({
        url: url,
        type: type,
        data: $('#form-tree-type').serialize(),
        dataType: "JSON",
        success: function(data) {
            console.log(data);
            $('#modal-tree-type').hide();
            location.reload(true);
        },
    });
   
}