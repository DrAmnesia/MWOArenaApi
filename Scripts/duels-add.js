/**
 * @fileOverview Say something meaningful about the js file.
 * @author <a href="mailto:my@email.net">My name</a>
 * @version 1.0.1
 */

$(document).ready(function () {
    /**
          @namespace MWOArena client api namespace
      */
    window.MWOArena = {};

    /**
        @namespace MWOArena Duels client api namespace
    */
    MWOArena.Duels = {
        /**
          * Submit a duel form to the MWOArenaApis
           */
        addDuel: function() {
            var formData = $('#duel-form').serialize();
            $.support.cors = true;
            $.ajax({
                url: "http://localhost/MWOArena.WebAPIs.Duels/api/duels",
                type: "POST",
                crossDomain: true,
                data: formData,
                dataType: "html",
                success: function(result) {
                    $('#duel-form').html(result);
                    $(".interface").hide();
                    $("#duel-form").show();
                },
                error: function(jqXHR, tranStatus, errorThrown) {
                    $('#duel-form').html("<h3>POST Error!</h3>Browser may not support <a href='http://en.wikipedia.org/wiki/Cross-origin_resource_sharing#Browser_support'>Cross Origin Resource Sharing</a> ");
                }
            });
        },

        /**
        * Get a list of Duels
         */
        listDuels: function() {
            $.ajax({
                url: "http://localhost/MWOArena.WebAPIs.Duels/api/duels",
                type: "GET",
                crossDomain: true,
                dataType: "json",
                contentType: "application/json",
                success: function (result) {
                    $("#MWOArenaDuels").append("<ul id='duels-list' class='interface list'></ul>");
                    $("#duels-list").hide();
                    $.each(result, function() {
                        var html = '<center>' + this.MatchGroupName + ' ' + this.DivisionName + '-' + this.ModeName + 's Winner:' + this.WinnerName + ' Loser:' + this.LoserName + '<center>';
                        $("#duels-list").append('<li>' + html + '</li>');
                    });
                    $(".interface").hide();
                    $("#duels-list").show();
                },
                error: function(jqXHR, tranStatus, errorThrown) {
                    $('#duels-list').html("<h3>POST Error!</h3>Browser may not support <a href='http://en.wikipedia.org/wiki/Cross-origin_resource_sharing#Browser_support'>Cross Origin Resource Sharing</a> ");
                }
            });
        }
    };
            
       
   
  

    $("#submit").click(MWOArena.Duels.addDuel);
    $("#btnDuels-List").click(MWOArena.Duels.listDuels);
});
