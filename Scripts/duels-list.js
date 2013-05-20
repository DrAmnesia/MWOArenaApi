$(document).ready(function () {
    $.ajax({
        url: "http://localhost/MWOArena.WebAPIs.Duels/api/duels",
        type: "GET",
        crossDomain: true,
        dataType: "json",
        contentType: "application/json",
        success: function (result) {
            $.each(result, function () {
                var html = '<center>' + this.MatchGroupName + ' ' + this.DivisionName + '-' + this.ModeName + 's Winner:' + this.WinnerName + ' Loser:' + this.LoserName + '<center>';
                $("#MWOArenaDuels").append("<ul id='duels-list'></ul>");
                $("#duels-list").append('<li>' + html + '</li>');
            });
        },
        error: function (jqXHR, tranStatus, errorThrown) {
            $('#duels-list').html("<h3>POST Error!</h3>Browser may not support <a href='http://en.wikipedia.org/wiki/Cross-origin_resource_sharing#Browser_support'>Cross Origin Resource Sharing</a> ");
        }
    });
});
