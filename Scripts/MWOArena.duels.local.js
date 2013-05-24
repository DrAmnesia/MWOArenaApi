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
        createMsgBox: function() {
            if ($("#MWOArenaMsgBox").length == 0)
                $("#MWOArenaDuels .interface").prepend("<div id='MWOArenaMsgBox' class='notification' style='display:none'><div class='msg-title'></div><div class='msg-body'></div><div>");
            if ($("#MWOArenaMsgBox div.msg-title").length == 0)
                $("#MWOArenaMsgBox").html("<div class='msg-title'></div><div class='msg-body'></div>");
        },
        clearMsgBox: function (dur) {
            if (dur == 0)
                $("#MWOArenaMsgBox").hide();
            else
                $("#MWOArenaMsgBox").fadeOut(dur,function() {
                     $("#MWOArenaMsgBox div.msg-title").empty();
            $("#MWOArenaMsgBox div.msg-body").empty();
                });
           
            
        },
        setMsgBox: function (title, message) {
            $("#MWOArenaMsgBox").show();
            $("#MWOArenaMsgBox div.msg-title").html(title);
            $("#MWOArenaMsgBox div.msg-body").html(message);
 
        },
        busyOn: function(m) {
            var msel = "#" + m;
            $(msel).show();

        },
        busyOff: function (m) {
            var msel = "#" + m;
            $(msel).fadeOut(2000);
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
                        MWOArena.clearMsgBox(0);
                        // $('#duel-form').html(result);
                        $(".interface").hide();
                        MWOArena.setMsgBox("Success", "Your Duel has been added.");
                        $("#duel-form")[0].reset();
                        $("#duel-form").show();
                        MWOArena.clearMsgBox(2000);
                    },
                    error: function (jqXHR, tranStatus, errorThrown) {
                             MWOArena.setMsgBox("POST Error!", "Connection issues are preventing us from adding duels at this time");
                    }
                });
            },

            /**
            * Get a list of Duels (filtered by AuthorityName)
			*/
            listDuels: function() {
                $(".interface").hide();
            
                if ($("#duels-results").length == 0) {
                    MWOArena.busyOn("MWOArenabusy");
                    $("#MWOArenaDuels .container-title").after('<div id="duels-results" class="interface"></div>');
                }
                $("#duels-results").empty();
                //clear and reload the match list
                var tmpltduelsHead = document.getElementById("tmpltDuelsHead").innerHTML;
                var tmpltduelsList = document.getElementById("tmpltDuelsList").innerHTML;
                $("#duels-results").append(tmpltduelsHead);
 
                    // set the form action subtitle
                    $(".api-action").html("Results");
                    //clear any messages order errors
                    MWOArena.clearMsgBox(0);

                    $.ajax({
                        url: "http://localhost/MWOArena.WebAPIs.Duels/api/duels",
                        type: "GET",
                        crossDomain: true,
                        dataType: "json",
                        contentType: "application/json",
                        success: function(result) {
                            $.each(result, function() {
                                var validated = (this.IsValid == true ? ' checked="checked "' : '');
                                var duelsListHtml = tmpltduelsList;
                                duelsListHtml = duelsListHtml.replace('~DuelPIdString~', this.DuelPId.toString());
                                duelsListHtml = duelsListHtml.replace('~Id~', this.Id);
                                duelsListHtml = duelsListHtml.replace('~DropDate~', this.DropDate);
                                duelsListHtml = duelsListHtml.replace('~DivisionId~', this.DivisionId);
                                duelsListHtml = duelsListHtml.replace('~MatchGroupName~', this.MatchGroupName);
                                duelsListHtml = duelsListHtml.replace('~DivisionName~', this.DivisionName);
                                duelsListHtml = duelsListHtml.replace('~ModeName~', this.ModeName);
                                duelsListHtml = duelsListHtml.replace('~WinnerName~', this.WinnerName);
                                duelsListHtml = duelsListHtml.replace('~WinnerChassisName~', this.WinnerChassisName);
                                duelsListHtml = duelsListHtml.replace('~LoserName~', this.LoserName);
                                duelsListHtml = duelsListHtml.replace('~LoserChassisName~', this.LoserChassisName);
                                if (this.IsValid == true) {
                                    duelsListHtml.replace('<input type="checkbox" name="IsValid"', '<input type="checkbox" name="IsValid" ' + validated + ' ');
                                }
                                $("#duels-list").append(duelsListHtml);
                            });
                            $("#duels-results").show();
                            MWOArena.busyOff("MWOArenabusy");
                            $(".colhead").click(MWOArena.Duels.sortListTable);
                        },
                        error: function(jqXHR, tranStatus, errorThrown) {
                            MWOArena.setMsgBox("POST Error!", "Connection issues are preventing us from retreiving duel results at this time");
                        }
                    });
                } ,

            /**
          * Get a list of Duels (filtered by AuthorityName)
          */
    listRankings: function () {
        $(".interface").hide();

        //create the match list scaffolding
        if ($("#rankings-results").length == 0) {
            $(".interface").hide();
            MWOArena.busyOn("MWOArenabusy");
            $("#MWOArenaDuels .container-title").after("<div id='rankings-results' class='interface'><ul id='rankings-head'  ></ul><div class='listframe'><ul id='rankings-list'  ></ul></div></div>");
                }

        //clear the match list
        $("#rankings-head").empty();
        $("#rankings-list").empty();
        // set the form action subtitle
        $(".api-action").html("Rankings");
        //clear any messages order errors
        MWOArena.clearMsgBox(0);

        $.ajax({
            url: "http://localhost/MWOArena.WebAPIs.Duels/api/overallrankings",
            type: "GET",
            crossDomain: true,
            dataType: "json",
            contentType: "application/json",
            success: function (result) {
                var html = '<div><div class="pilot colhead" data-sortdir="">Pilot</div><div class="wins colhead"> Wins </div><div class="losses colhead"> Losses </div><div class="wlRatio colhead"> Win Loss Ratio </div></div>';
                $("#rankings-head").append('<li class="thead colhead">' + html + '</li>');

                $.each(result, function () {
                    html = '<div class="list-row ranking"><div class="pilot">' + this.username + '</div><div class="wins">' + this.wins + '</div><div class="losses">' + this.losses + '</div><div class="wlRatio">' + this.wlRatio + '</div></div>';
                    $("#rankings-list").append('<li>' + html + '</li>');
                });
                MWOArena.busyOff("MWOArenabusy");
                $("#rankings-results").show();

            },
            error: function (jqXHR, tranStatus, errorThrown) {
                MWOArena.setMsgBox("POST Error!", "Connection issues are preventing us from retreiving rankings at this time");
            }
        });
    },
sortListTable: function (event) {
    var elem = $(event.target);
    var nc = (elem.hasClass("asc")) ? "desc" : (elem.hasClass("desc")) ? "colhead" : "asc";
    var tid = elem.closest('ul').attr('id');
    var liid = elem.closest('li').attr("id");
    $('#' + liid + ' div.colhead').removeClass("asc").removeClass("desc");
    elem.addClass(nc);
    var colidx = $('#' + liid + ' .colhead').index(elem);
    //var pcolidx = $('#' + liid + '>div.colwrap').index(parent);
    if (elem.hasClass("desc")) {
        $('#' + tid.replace("head", "list") + '>li').tsort(".list-item:eq(" + colidx.toString() + ")", { order: 'desc' });
    } else if (elem.hasClass("asc")) {
        $('#' + tid.replace("head", "list") + '>li').tsort(".list-item:eq(" + colidx.toString() + ")");
    } else {
        $('#' + tid.replace("head", "list") + '>li').tsort(".list-item:eq(1)", { order: 'desc' }, ".list-item:eq(2)", { order: 'desc' }, ".list-item:eq(6)", { order: 'desc' });
    }
    return false;
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
            MWOArena.setMsgBox("POST Error!", "Connection issues are preventing us from retreiving pilot lists at this time");
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
            MWOArena.setMsgBox("POST Error!", "Connection issues are preventing us from retreiving chassis lists at this time");
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
            MWOArena.setMsgBox("POST Error!", "Connection issues are preventing us from retreiving division lists at this time");
        }
    });
}



}
};


$("#MWOArenaDuels").append('<div id="MWOArenabusy" class="busy-list notification"><div class="msg-title">Fetching data... Hey did you know:</div><div class="msg-body">' +
'<div class="busy-item">Yeah, my other mech is a POS too... <br> - Anonymous HBK-4J Pilot</div>' +
'<div class="busy-item">*NEW*: Hero COM-2d with Fleshtone Camo!<br>They call him The Streak...</div>' +
'<div class="busy-item">Summer 2050: Kellog Corp serves cease and desist to all "Pop Tart" pilots.</div>' +
'<div class="busy-item">Tip: AltF4 to raise the new LRM Umbrella.</div>' +
'<div class="busy-item">Tortuga Prime: CN9-A voted "Most Rock-a-Billy Mech"...</div>' +
'<div class="busy-item">"I never overheat! My mech has Narcolepsy" <br>- Anonymous headstone on Tortuga Prime</div>' +
'<div class="busy-item">"Small lazer hunchback wolfpack? sure. What could go wrong? <br>- Anonymous headstone on Turtle Bay"</div>' +
'<div class="busy-item">"Love your Awesome Buckaneer camo, pimp that Wide Load trampstamp!" <br>- Mercenary flirting</div>' +
'<div class="busy-item">Urbie v.s. Dalek. Tortuga Prime OAB opens in 3... 2... 1...</div>' +
'<div class="busy-item">"Gauss Spider in Echo-4"... <br>"Roger that.. Wait... WTF?!?!" - Renkord </div></div></div>');

$("#MWOArenabusy div.msg-body div.busy-item").tsort({ order: 'rand' });
 
$(".interface").hide();
MWOArena.busyOn("MWOArenabusy");
MWOArena.createMsgBox();
MWOArena.Duels.listRankings();
MWOArena.Duels.fillPilotLists();
MWOArena.Duels.fillChassisLists();
MWOArena.Duels.fillDivisionLists();
MWOArena.clearMsgBox(0);
$("#submitForm").click(MWOArena.Duels.addDuel);
$("#btnDuels-Add").click(function () {
    MWOArena.clearMsgBox(0);
    // clear the container
    $(".interface").hide();
    // show the form
    $("#duel-form").show();
    // set the form action subtitle
    $(".api-action").html("Add");
});
$("#btnDuels-List").click(MWOArena.Duels.listDuels);
$("#btnRankings-List").click(MWOArena.Duels.listRankings);

$("div.colhead").click(MWOArena.Duels.sortListTable);
});
