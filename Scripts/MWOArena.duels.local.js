/**
 * @fileOverview The MWOArena.Duels client API Example
 * @author <a href="mailto:my@in4mr.com.net">DrAmnesia</a>
 * @version 1.0.1
 */

$(document).ready(function () {


    /**
        @namespace MWOArena client api namespace
    */
    MWOArena = {
      
        /**
            *Clears the MWOArenaMsgBox Div
        */
        clearMsgBox: function() {
            if ($("#MWOArenaMsgBox").length == 0)
                $("#MWOArenaDuels .interface").prepend("<div id='MWOArenaMsgBox'></div>");
            $("#MWOArenaMsgBox").empty();
        },
  

    /**
         * MWOArena.Duels
         *@class MWOArena Duel Management client api
		*/

        Duels: {
            
            /**
              * Submit a duel form to the MWOArenaApis
			*/
            addDuel: function () {
                var formData = $('#duel-form').serialize();
                $.support.cors = true;
                $.ajax({
                    url: "http://localhost/MWOArena.WebAPIs.Duels/api/duels",
                    type: "POST",
                    crossDomain: true,
                    data: formData,
                    dataType: "html",
                    success: function (result) {
                        MWOArena.clearMsgBox();
                        // $('#duel-form').html(result);
                        $(".interface").hide();
                        $("#MWOArenaMsgBox").html("<b><i>Duel Added</i></b>");
                        $("#duel-form")[0].reset();
                        $("#duel-form").show();
                    },
                    error: function (jqXHR, tranStatus, errorThrown) {
                        $('#duel-form').html("<h3>POST Error!</h3>Browser may not support <a href='http://en.wikipedia.org/wiki/Cross-origin_resource_sharing#Browser_support'>Cross Origin Resource Sharing</a> ");
                    }
                });
            },

            /**
            * Get a list of Duels (filtered by AuthorityName)
			*/
            listDuels: function () {
                if ($("#duels-list").length == 0)
                    $("#MWOArenaDuels").append("<ul id='duels-list' class='interface list'></ul>");

                MWOArena.clearMsgBox();

                $.ajax({
                    url: "http://localhost/MWOArena.WebAPIs.Duels/api/duels",
                    type: "GET",
                    crossDomain: true,
                    dataType: "json",
                    contentType: "application/json",
                    success: function (result) {
                        $("#duels-list").hide();
                        $.each(result, function () {
                            var validated = (this.IsValid == true ? ' checked="checked "' : '');
                            var html = '<div class="list-row duel"><div class="MatchGroupName">' + this.MatchGroupName + '</div><div class="DivisionName">' + this.DivisionName + '</div><div class="ModeName">' + this.ModeName + '</div><div class="WinnerName">' + this.WinnerName + '</div><div class="WinnerChassisName">' + this.WinnerChassisName + '</div><div class="LoserName">' + this.LoserName + '</div><div class="LoserChassisName">' + this.LoserChassisName + '</div><div class="Notes">' + this.Notes + '</div><input type="checkbox" name="IsValid"   value="' + this.DuelPId.toString() + '" '+validated+ '/></div>';
                            $("#duels-list").append('<li>' + html + '</li>');
                        });
                        $(".interface").hide();
                        $("#duels-list").show();
                    },
                    error: function (jqXHR, tranStatus, errorThrown) {
                        $('#duels-list').html("<h3>POST Error!</h3>Browser may not support <a href='http://en.wikipedia.org/wiki/Cross-origin_resource_sharing#Browser_support'>Cross Origin Resource Sharing</a> ");
                    }
                });
            }



        }
    };





    $("#submit").click(MWOArena.Duels.addDuel);
    $("#btnDuels-Add").click(function () {
        $(".interface").hide();
        $("#duel-form").show();
    });
    $("#btnDuels-List").click(MWOArena.Duels.listDuels);
});
