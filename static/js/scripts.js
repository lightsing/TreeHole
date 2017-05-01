$(document).ready(function() {
    var socket = io.connect(window.location.href);
    socket.on('recordUpdate', function(data) {
        record = toRecord(data);
        $('#records').prepend(record);
    });
    function getRecords(since, number, callback) {
        $.ajax({
            url: 'query',
            type: "get",
            data: {
                since: since,
                number: number
            },
            success: function(response) {
                callback(null, response);
            },
            error: function(err) {
                callback(err, null);
            }
        });
    }
    function toRecord(data) {
        date = new Date(data.timestamp);
        record = '<div class="info-tile"><div class="tile-heading">';
        record += data.nickname;
        record += '<small> ';
        record += date.toLocaleString();
        record += ' ';
        if (data.remark) record += data.remark;
        record += '</small></div><div class="tile-body">';
        record += data.content;
        record += '</div></div>';
        return record;
    }

    getRecords(null, 5, function (err, response) {
        if(!err) {
            response.forEach(function (element) {
                record = toRecord(element);
                $('#records').prepend(record);
            });
        }
    });

    $("#dialog").on('shown.bs.modal', function (e) {
        $("#submit").click(function(e) {
            e.preventDefault();
            $.post("add", {
                    nickname: $('#nickname').val(),
                    content: $('#content').val(),
                    remark: $('#remark').val()
                }, function(data, status) {
                $("#dialog").modal('hide');
            });
        });
    });
});
