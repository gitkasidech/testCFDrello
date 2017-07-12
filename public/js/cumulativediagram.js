var board_id = $("#boardid").val()
var graph_complete = $("#graphcomplete").val()
var graph_inprogress = $("#graphinprogress").val()
var graph_backlog = $("#graphbacklog").val()

var color_complete = $("#colorcomplete").val();
var color_inprogress = $("#colorinprogress").val();
var color_backlog = $("#colorbacklog").val();

var countComplete = [];
var dateComplete = [];

var dateAction_Complete = [];
var count_ActionComplete = [];

var countInprogress = [];
var dateInprogress = [];

var countBacklog = [];
var dateBacklog = [];

//  get boards lists cards
var onAuthorize = function() {
    updateLoggedIn();
    $("#output").val();

    var token = Trello.token();
    Trello.members.get("me", function(member) {
        $("#fullName").text(member.fullName);
        $("#dashboard").attr("href", "dashboardname?userid=" + member.id);

        var card_complete = [];
        var card_inprogress = [];
        var card_backlog = [];
        Trello.get('/members/me/boards/', function(boards) {
            $.each(boards, function(index, board) {
                if (board_id == board.id) {
                    $('#boards')
                        .append($('<p>')
                            .text(board.name)
                        );
                    Trello.get('/boards/' + board.id + '/lists', function(lists) {
                        $.each(lists, function(index, list) {
                            // complete chart
                            if (graph_complete == list.id) {
                                $('#namecomplete').attr(
                                    'value', list.name
                                );
                                var dateActionComplete = [];
                                var dateArrayComplete = [];
                                Trello.get('/lists/' + list.id + '/cards?fields=name,shortUrl', function(cards) {
                                    $.each(cards, function(index, card) {
                                        card_complete.push(card.id);
                                        var id = card.id;
                                        var date = new Date(1000 * parseInt(id.substring(0, 8), 16)).toDateString();
                                        dateArrayComplete.push(date);

                                        Trello.get('/cards/' + card.id + '/actions?filter=updateCard:idList', function(actions) {
                                            $.each(actions, function(index, action) {
                                                var id_action = action.id;
                                                var newDate_actionComplete = new Date(1000 * parseInt(id.substring(0, 8), 16)).toDateString();
                                                var listAfterAction = action.data.listAfter.id;
                                                var listBeforeAction = action.data.listBefore.id;
                                                if (list.id == listAfterAction || list.id == listBeforeAction) {
                                                    dateActionComplete.push(newDate_actionComplete);
                                                };
                                            });
                                        });
                                    });
                                    // console.log(dateArrayComplete);
                                    var lap = dateArrayComplete.length;
                                    for (var i = 0; i < lap; i++) {
                                        var count = 1;
                                        for (var j = 0; j < lap; j++) {
                                            if (j == i) {
                                                continue;
                                            } else {
                                                var result = dateArrayComplete[i].localeCompare(dateArrayComplete[j]);
                                                if (result == 0) {
                                                    //console.log("date i: " + i + " " + dateArray[i] + " ,date j: " + j + " " + dateArray[j])
                                                    dateArrayComplete.splice(j, 1);
                                                    count++;
                                                    --lap;
                                                    --j;
                                                };
                                            };
                                        };
                                        dateComplete.push(dateArrayComplete[i]);
                                        countComplete.push(count);
                                        console.log("DATE : " + dateComplete[i] + " countCards > " + countComplete[i]);
                                        // $('#completeDate').append('<input id="dateCom' + i + '" value="' + dateArrayComplete[i] + '" type="hidden">')
                                        // $('#completeData').append('<input id="dataCom' + i + '" value="' + countComplete[i] + '" type="hidden">')
                                        setTimeout(function() {
                                            Highcharts.chart('completeChart', {
                                                title: {
                                                    text: 'Cumulative Flow Diagram'
                                                },

                                                xAxis: {
                                                    categories: dateComplete
                                                },

                                                yAxis: {
                                                    title: {
                                                        text: 'Cards'
                                                    }
                                                },
                                                tooltip: {
                                                    split: true,
                                                    crosshairs: true,
                                                    valueSuffix: ' cards'
                                                },

                                                series: [{
                                                    color: color_complete,
                                                    name: list.name,
                                                    data: countComplete
                                                }]
                                            });
                                        }, 1500);
                                    };
                                    var count_complete = card_complete.length;
                                    console.log("complete card: " + count_complete);
                                });

                            };

                            // inprogress chart
                            if (graph_inprogress == list.id) {
                                $('#nameinprogress').attr(
                                    'value', list.name
                                )
                                var dateArrayInprogress = [];
                                Trello.get('/lists/' + list.id + '/cards?fields=name,shortUrl', function(cards) {
                                    $.each(cards, function(index, card) {
                                        card_inprogress.push(card.id)
                                        var id = card.id;
                                        var date = new Date(1000 * parseInt(id.substring(0, 8), 16)).toDateString();
                                        dateArrayInprogress.push(date)

                                    });
                                    //console.log(dateArrayInprogress);
                                    var lap = dateArrayInprogress.length;
                                    for (var i = 0; i < lap; i++) {
                                        var count = 1;
                                        for (var j = 0; j < lap; j++) {

                                            if (j == i) {
                                                continue;
                                            } else {
                                                var result = dateArrayInprogress[i].localeCompare(dateArrayInprogress[j]);
                                                if (result == 0) {
                                                    //console.log("date i: " + i + " " + dateArray[i] + " ,date j: " + j + " " + dateArray[j])
                                                    dateArrayInprogress.splice(j, 1);
                                                    count++;
                                                    --lap;
                                                    --j;
                                                }
                                            };

                                        };
                                        dateInprogress.push(dateArrayInprogress[i])
                                        countInprogress.push(count);
                                        var a = dateArrayInprogress;
                                        a.sort(function(a, b) {
                                            var dateA = new Date(a),
                                                dateB = new Date(b);
                                            return dateA - dateB;
                                        });
                                        setTimeout(function() {
                                            Highcharts.chart('inprogressChart', {
                                                title: {
                                                    text: 'Cumulative Flow Diagram'
                                                },

                                                xAxis: {
                                                    categories: dateInprogress
                                                },

                                                yAxis: {
                                                    title: {
                                                        text: 'Cards'
                                                    }
                                                },
                                                tooltip: {
                                                    split: true,
                                                    crosshairs: true,
                                                    valueSuffix: ' cards'
                                                },

                                                series: [{
                                                    color: color_inprogress,
                                                    name: list.name,
                                                    data: countInprogress
                                                }]
                                            });
                                        }, 1500);
                                    };
                                    //console.log(countInprogress)
                                    var count_inprogress = card_inprogress.length;
                                    //console.log("inprogress card: " + count_inprogress);
                                });
                            }

                            // // backlog chart
                            if (graph_backlog == list.id) {
                                $('#namebacklog').attr(
                                    'value', list.name
                                );
                                var dateArrayBacklog = [];
                                Trello.get('/lists/' + list.id + '/cards?fields=name,shortUrl', function(cards) {
                                    $.each(cards, function(index, card) {
                                        card_backlog.push(card.id)
                                        var id = card.id;
                                        var date = new Date(1000 * parseInt(id.substring(0, 8), 16)).toDateString();
                                        dateArrayBacklog.push(date)
                                            //console.log(date)
                                    });
                                    //console.log(dateArrayBacklog);
                                    /*var count = 0;
                                    $.each(dateArray, function(index, value) {
                                        count++;
                                    });
                                    console.log(count);*/
                                    var countduplicate = [];
                                    var lap = dateArrayBacklog.length;
                                    var dateArraytoGraph = [];
                                    for (var i = 0; i < lap; i++) {
                                        var count = 1;
                                        for (var j = 0; j < lap; j++) {

                                            if (j == i) {
                                                continue;
                                            } else {
                                                var result = dateArrayBacklog[i].localeCompare(dateArrayBacklog[j]);
                                                if (result == 0) {
                                                    //console.log("date i: " + i + " " + dateArray[i] + " ,date j: " + j + " " + dateArray[j])
                                                    dateArrayBacklog.splice(j, 1);
                                                    count++;
                                                    --lap;
                                                    --j;
                                                }
                                            };
                                        };
                                        dateBacklog.push(dateArrayBacklog[i])
                                        countBacklog.push(count);
                                        //console.log("DATE : " + dateBacklog[i] + " countCards > " + countBacklog[i]);
                                        // $('#backlogDate').append('<input value="' + dateArraytoGraph[i] + '" type="hidden">')
                                        var a = dateArrayBacklog;
                                        a.sort(function(a, b) {
                                            var dateA = new Date(a),
                                                dateB = new Date(b);
                                            return dateA - dateB;
                                        });
                                        setTimeout(function() {
                                            Highcharts.chart('backlogChart', {
                                                title: {
                                                    text: 'Cumulative Flow Diagram'
                                                },

                                                xAxis: {
                                                    categories: dateBacklog
                                                },

                                                yAxis: {
                                                    title: {
                                                        text: 'Cards'
                                                    }
                                                },
                                                tooltip: {
                                                    split: true,
                                                    crosshairs: true,
                                                    valueSuffix: ' cards'
                                                },

                                                series: [{
                                                    color: color_backlog,
                                                    name: list.name,
                                                    data: countBacklog
                                                }]
                                            });
                                        }, 1500);
                                    };
                                    var count_backlog = card_backlog.length;
                                    //console.log("backlog card: " + count_backlog);
                                });
                            }
                        });
                    });
                };
            });
        });
    });
};

var updateLoggedIn = function() {
    var isLoggedIn = Trello.authorized();
    $("#loggedout").toggle(!isLoggedIn);
    $("#loggedin").toggle(isLoggedIn);
};

var logout = function() {
    Trello.deauthorize();
    updateLoggedIn();
};

Trello.authorize({
    interactive: false,
    success: onAuthorize
});

$("#disconnect").click(logout);

setTimeout(function() {
    var chartDataComplete = [];
    var chartDataInprogress = [];
    var chartDataBacklog = [];
    var complete_name = ($('#namecomplete').attr('value'));
    var inprogress_name = ($('#nameinprogress').attr('value'));
    var backlog_name = ($('#namebacklog').attr('value'));

    generateChartData();

    function generateChartData() {
        var firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 240);

        for (var i = 0; i < 240; i++) {
            var newDate = new Date(firstDate);
            newDate.setDate(newDate.getDate() + i);
            newDate.setHours(0, 0, 0, 0)
            var newDatestring = newDate.toString();
            var newDatesplit = newDatestring.split(" ");

            var dataComplete = countComplete.length;
            var newdate_in_datecomplate = false;

            var dataInprogress = countInprogress.length;
            var newdate_in_dateinprogress = false;

            var dataBacklog = countBacklog.length;
            var newdate_in_datebacklog = false;

            // Complete Chart
            for (var dateCompleteIndex = 0; dateCompleteIndex < dateComplete.length; dateCompleteIndex++) {
                var date_complete = new Date(dateComplete[dateCompleteIndex]);
                date_complete.setHours(0, 0, 0, 0)
                var date_completestring = date_complete.toString();
                var date_completesplit = date_completestring.split(" ");
                if ((newDatesplit[0] == date_completesplit[0]) && (newDatesplit[1] == date_completesplit[1]) && (newDatesplit[2] == date_completesplit[2]) && (newDatesplit[3] == date_completesplit[3])) {
                    newdate_in_datecomplate = true
                    chartDataComplete.push({
                        "date": newDate,
                        "value": countComplete[dateCompleteIndex],

                    });
                }
                if (!newdate_in_datecomplate) {
                    chartDataComplete.push({
                        "date": newDate,
                        "value": 0,
                    });
                }
            }

            // Inprogress Chart
            for (var dateInprogressIndex = 0; dateInprogressIndex < dateInprogress.length; dateInprogressIndex++) {
                var date_inprogress = new Date(dateInprogress[dateInprogressIndex]);
                date_inprogress.setHours(0, 0, 0, 0)
                var date_inprogressstring = date_inprogress.toString();
                var date_inprogresssplit = date_inprogressstring.split(" ");
                if ((newDatesplit[0] == date_inprogresssplit[0]) && (newDatesplit[1] == date_inprogresssplit[1]) && (newDatesplit[2] == date_inprogresssplit[2]) && (newDatesplit[3] == date_inprogresssplit[3])) {
                    newdate_in_dateinprogress = true
                    chartDataInprogress.push({
                        "date": newDate,
                        "value": countInprogress[dateInprogressIndex],

                    });
                }
                if (!newdate_in_dateinprogress) {
                    chartDataInprogress.push({
                        "date": newDate,
                        "value": 0,
                    });
                }
            }

            // Backlog Chart
            for (var dateBacklogIndex = 0; dateBacklogIndex < dateBacklog.length; dateBacklogIndex++) {
                var date_backlog = new Date(dateBacklog[dateBacklogIndex]);
                date_backlog.setHours(0, 0, 0, 0)
                var date_backlogstring = date_backlog.toString();
                var date_backlogsplit = date_backlogstring.split(" ");
                if ((newDatesplit[0] == date_backlogsplit[0]) && (newDatesplit[1] == date_backlogsplit[1]) && (newDatesplit[2] == date_backlogsplit[2]) && (newDatesplit[3] == date_backlogsplit[3])) {
                    newdate_in_datebacklog = true
                    chartDataBacklog.push({
                        "date": newDate,
                        "value": countBacklog[dateBacklogIndex],

                    });
                }
                if (!newdate_in_datebacklog) {
                    chartDataBacklog.push({
                        "date": newDate,
                        "value": 0,
                    });
                }
            }
        }
    }

    var chart = AmCharts.makeChart("chartdiv", {
        "type": "stock",
        "theme": "light",
        "dataSets": [{
            "color": color_complete,
            "title": complete_name,
            "fieldMappings": [{
                "fromField": "value",
                "toField": "value"
            }],
            "dataProvider": chartDataComplete,
            "categoryField": "date"
        }, {
            "color": color_inprogress,
            "title": inprogress_name,
            "fieldMappings": [{
                "fromField": "value",
                "toField": "value"
            }],
            "dataProvider": chartDataInprogress,
            "categoryField": "date"
        }, {
            "color": color_backlog,
            "title": backlog_name,
            "fieldMappings": [{
                "fromField": "value",
                "toField": "value"
            }],
            "dataProvider": chartDataBacklog,
            "categoryField": "date"
        }],

        "panels": [{
            "showCategoryAxis": true,
            "title": "Value",
            "percentHeight": 70,
            "stockGraphs": [{
                "id": "g1",
                "valueField": "value",
                "comparable": true,
                "compareField": "value",
                "balloonText": "[[title]]:<b>[[value]] cards</b>",
                "compareGraphBalloonText": "[[title]]:<b>[[value]]</b>"
            }],
            "stockLegend": {
                "periodValueTextComparing": "[[percents.value.close]]%",
                "periodValueTextRegular": "[[value.close]]"
            }
        }],

        "chartScrollbarSettings": {
            "graph": "g1"
        },

        "chartCursorSettings": {
            "valueBalloonsEnabled": true,
            "fullWidth": true,
            "cursorAlpha": 0.1,
            // "valueLineBalloonEnabled": true,
            // "valueLineEnabled": true,
            "valueLineAlpha": 0.5
        },

        "periodSelector": {
            "position": "bottom",
            "periods": [{
                "period": "DD",
                "selected": true,
                "count": 8,
                "label": "1 week"
            }, {
                "period": "MM",
                "selected": true,
                "count": 1,
                "label": "1 month"
            }, {
                "period": "YYYY",
                "selected": true,
                "count": 1,
                "label": "1 year"
            }, {
                "period": "MAX",
                "label": "MAX"
            }]
        },

        "dataSetSelector": {
            "position": "top"
        },

        "export": {
            "enabled": true
        }
    });
}, 1500);

setTimeout(function() {
    var complete_name = ($('#namecomplete').attr('value'));
    var inprogress_name = ($('#nameinprogress').attr('value'));
    var backlog_name = ($('#namebacklog').attr('value'));
    Highcharts.chart('container', {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Cumulative Flow Diagram'
        },

        xAxis: {
            categories: dateComplete,
        },

        yAxis: {
            title: {
                text: 'Cards'
            }
        },
        tooltip: {
            split: true,
            crosshairs: true,
            valueSuffix: ' cards'
        },

        series: [{
            color: color_complete,
            name: complete_name,
            data: countComplete
        }, {
            color: color_backlog,
            name: backlog_name,
            data: countBacklog
        }, {
            color: color_inprogress,
            name: inprogress_name,
            data: countInprogress
        }]

    });
}, 1500);