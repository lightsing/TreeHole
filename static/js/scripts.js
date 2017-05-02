$(document).ready(function() {
    var socket = io.connect(window.location.href);
    var last = null;
    socket.on('recordUpdate', function(data) {
        record = toRecord(data);
        $('#records').prepend(record);
    });
    function getRecords(number, callback) {
        $.ajax({
            url: 'query',
            type: "get",
            data: {
                since: last,
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

    $("#dialog").on('shown.bs.modal', function (e) {
        $("#submit").click(function(e) {
            e.preventDefault();
            $.post("add", {
                    nickname: $('#nickname').val(),
                    content: $('#content').val(),
                    remark: $('#remark').val()
                }, function(data, status) {
                    $('#nickname').val("");
                    $('#content').val("");
                    $('#remark').val("");
                    $("#dialog").modal('hide');
            });
        });
    });

    $('.footer').waypoint(function() {
        console.log('yes');
        $('.loader-wrapper').fadeIn();
        getRecords(5, function (err, response) {
            if(!err) {
                var len = response.length;
                if (len > 0) {
                    last = response[0].timestamp;
                    for (var i = 0; i < len; i++) {
                        record = toRecord(response[i]);
                        $('#records').append(record);
                    }
                    $('.loader-wrapper').fadeOut();
                }
            }
        });
    }, {
        offset: 'bottom-in-view'
    });
});
