/**
 * @fileOverview The MWOArena.Duels client API Example
 * @author <a href="mailto:my@in4mr.com.net">DrAmnesia</a>
 * @version 1.0.1
 */

$(document).ready(function () {


    /**
        @namespace MWOArena client api namespace
    */
    window.MWOArena = {

        /**
            *Clears the MWOArenaMsgBox Div
        */
        clearMsgBox: function () {
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
                        $('#MWOArenaMsgBox').html("<h3>POST Error!</h3>Browser may not support <a href='http://en.wikipedia.org/wiki/Cross-origin_resource_sharing#Browser_support'>Cross Origin Resource Sharing</a> ");
                    }
                });
            },

            /**
            * Get a list of Duels (filtered by AuthorityName)
			*/
            listDuels: function () {
                //create the match list scaffolding
                if ($("#duels-list").length == 0) {
                    $(".interface").hide();
                    $("#MWOArenaDuels .container-title").after("<div id='duels-results' class='interface'><ul id='duels-head'  ></ul></div>");
                    $("#duels-head").after("<div class='listframe'><ul id='duels-list'  ></ul></div>");
                    //  $("#MWOArenaDuels").append("<ul id='duels-list' class='interface list'></ul>");
                }
                //clear the match list
                $("#duels-head").empty();
                $("#duels-list").empty();
                // set the form action subtitle
                $(".api-action").html("List");
                //clear any messages order errors
                MWOArena.clearMsgBox();

                $.ajax({
                    url: "http://localhost/MWOArena.WebAPIs.Duels/api/duels",
                    type: "GET",
                    crossDomain: true,
                    dataType: "json",
                    contentType: "application/json",
                    success: function (result) {
                        $("#duels-results").hide();

                        var html = '<div><div class="MatchGroupName colhead"> Match Set </div><div class="DivisionName colhead"> Division </div><div class="ModeName colhead"> Mode </div><div class="WinnerName colhead"> Winner </div><div class="WinnerChassisName colhead"> Chassis </div><div class="LoserName colhead"> Loser </div><div class="LoserChassisName colhead"> Chassis </div> </div>';
                        $("#duels-head").append('<li class="colhead">' + html + '</li>');

                        $.each(result, function () {
                            var validated = (this.IsValid == true ? ' checked="checked "' : '');
                            html = '<div class="list-row duel"><div class="MatchGroupName">' + this.MatchGroupName + '</div><div class="DivisionName">' + this.DivisionName + '</div><div class="ModeName">' + this.ModeName + '</div><div class="WinnerName">' + this.WinnerName + '</div><div class="WinnerChassisName">' + this.WinnerChassisName + '</div><div class="LoserName">' + this.LoserName + '</div><div class="LoserChassisName">' + this.LoserChassisName + '</div> <input type="checkbox" name="IsValid" class="IsValid" value="' + this.DuelPId.toString() + '" ' + validated + '/></div>';
                            $("#duels-list").append('<li>' + html + '</li>');
                        });
                        $(".interface").hide();
                        $("#duels-results").show();

                    },
                    error: function (jqXHR, tranStatus, errorThrown) {
                        $('#MWOArenaMsgBox').html("<h3>POST Error!</h3>Browser may not support <a href='http://en.wikipedia.org/wiki/Cross-origin_resource_sharing#Browser_support'>Cross Origin Resource Sharing</a> ");
                    }
                });
            },
            /**
          * Get a list of Duels (filtered by AuthorityName)
          */
            listRankings: function () {
                //create the match list scaffolding
                if ($("#rankings-list").length == 0) {
                    $(".interface").hide();
                    $("#MWOArenaDuels .container-title").after("<div id='rankings-results' class='interface'><ul id='rankings-head'  ></ul></div>");
                    $("#rankings-head").after("<div class='listframe'><ul id='rankings-list'  ></ul></div>");
                    //  $("#MWOArenarankings").append("<ul id='rankings-list' class='interface list'></ul>");
                }
                //clear the match list
                $("#rankings-head").empty();
                $("#rankings-list").empty();
                // set the form action subtitle
                $(".api-action").html("Rankings");
                //clear any messages order errors
                MWOArena.clearMsgBox();

                $.ajax({
                    url: "http://localhost/MWOArena.WebAPIs.Duels/api/overallrankings",
                    type: "GET",
                    crossDomain: true,
                    dataType: "json",
                    contentType: "application/json",
                    success: function (result) {
                        $(".interface").hide();


                        var html = '<div><div class="pilot colhead"> Pilot </div><div class="wins colhead"> Wins </div><div class="losses colhead"> losses </div><div class="wlRatio colhead"> Win Loss Ratio </div></div>';
                        $("#rankings-head").append('<li class="colhead">' + html + '</li>');

                        $.each(result, function () {
                            html = '<div class="list-row ranking"><div class="pilot">' + this.username + '</div><div class="wins">' + this.wins + '</div><div class="losses">' + this.losses + '</div><div class="wlRatio">' + this.wlRatio + '</div></div>';
                            $("#rankings-list").append('<li>' + html + '</li>');
                        });

                        $("#rankings-results").show();

                    },
                    error: function (jqXHR, tranStatus, errorThrown) {
                        $('#MWOArenaMsgBox').html("<h3>POST Error!</h3>Browser may not support <a href='http://en.wikipedia.org/wiki/Cross-origin_resource_sharing#Browser_support'>Cross Origin Resource Sharing</a> ");
                    }
                });
            },
            fillPilotLists: function () {
                $("#WinnerName").empty();
                $("#LoserName").empty();
                $('#WinnerName').append($('<option>', { value: "" }).text(" WinnerName "));
                $('#LoserName').append($('<option>', { value: "" }).text(" LoserName "));

                $.ajax({
                    url: "http://localhost/MWOArena.WebAPIs.Duels/api/pilots",
                    type: "GET",
                    crossDomain: true,
                    dataType: "json",
                    contentType: "application/json",
                    success: function (result) {
                        $.each(result, function () {

                            $('select.pilot-list').append($('<option>', { value: this.UserName }).text(this.UserName));
                        });

                    },
                    error: function (jqXHR, tranStatus, errorThrown) {
                        $('#MWOArenaMsgBox').html("<h3>POST Error!</h3>Browser may not support <a href='http://en.wikipedia.org/wiki/Cross-origin_resource_sharing#Browser_support'>Cross Origin Resource Sharing</a> ");
                    }
                });
            },
            fillChassisLists: function () {
                $("#WinnerChassisName").empty();
                $("#LoserChassisName").empty();
                $('#WinnerChassisName').append($('<option>', { value: "" }).text(" WinnerChassisName "));
                $('#LoserChassisName').append($('<option>', { value: "" }).text(" LoserChassisName "));

                $.ajax({
                    url: "http://localhost/MWOArena.WebAPIs.Duels/api/chassis",
                    type: "GET",
                    crossDomain: true,
                    dataType: "json",
                    contentType: "application/json",
                    success: function (result) {
                        $.each(result, function () {
                            $('select.chassis-list')
                                .append($('<option>', { value: this.VariantName })
                                    .text(this.ChassisName + " - " + this.VariantName));
                        });
                    },
                    error: function (jqXHR, tranStatus, errorThrown) {
                        $('#MWOArenaMsgBox').html("<h3>POST Error!</h3>Browser may not support <a href='http://en.wikipedia.org/wiki/Cross-origin_resource_sharing#Browser_support'>Cross Origin Resource Sharing</a> ");
                    }
                });
            }
       ,
            fillDivisionLists: function () {
                $("#DivisionName").empty();
                $('#DivisionName').append($('<option>', { value: "" }).text(" DivisionName "));

                $.ajax({
                    url: "http://localhost/MWOArena.WebAPIs.Duels/api/division",
                    type: "GET",
                    crossDomain: true,
                    dataType: "json",
                    contentType: "application/json",
                    success: function (result) {
                        $.each(result, function () {
                            $('select.division-list')
                                .append($('<option>', { value: this.DivisionName })
                                    .text(this.DivisionName));
                        });

                    },
                    error: function (jqXHR, tranStatus, errorThrown) {
                        $('#MWOArenaMsgBox').html("<h3>POST Error!</h3>Browser may not support <a href='http://en.wikipedia.org/wiki/Cross-origin_resource_sharing#Browser_support'>Cross Origin Resource Sharing</a> ");
                    }
                });
            }



        }
    };

    $(".interface").hide();
    MWOArena.Duels.listRankings();
    MWOArena.Duels.fillPilotLists();
    MWOArena.Duels.fillChassisLists();
    MWOArena.Duels.fillDivisionLists();
    MWOArena.clearMsgBox();
    $("#submitForm").click(MWOArena.Duels.addDuel);
    $("#btnDuels-Add").click(function () {
        // clear the container
        $(".interface").hide();
        // show the form
        $("#duel-form").show();
        // set the form action subtitle
        $(".api-action").html("Add");
    });
    $("#btnDuels-List").click(MWOArena.Duels.listDuels);
    $("#btnRankings-List").click(MWOArena.Duels.listRankings);
});
