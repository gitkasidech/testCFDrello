var chartData1 = [];
var chartData2 = [];
var chartData3 = [];
var chartData4 = [];

generateChartData();

function generateChartData() {
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 500);
    firstDate.setHours(0, 0, 0, 0);

    for (var i = 0; i < 500; i++) {
        var newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);

        var a1 = Math.round(Math.random() * (40 + i)) + 100 + i;
        var b1 = Math.round(Math.random() * (1000 + i)) + 500 + i * 2;

        chartData1.push({
            "date": newDate,
            "value": a1,
            "volume": b1
        });
    }
}

var chart = AmCharts.makeChart("chartdiv", {
    "type": "stock",
    "theme": "light",
    "dataSets": [{
        "title": "first data set",
        "fieldMappings": [{
            "fromField": "value",
            "toField": "value"
        }, {
            "fromField": "volume",
            "toField": "volume"
        }],
        "dataProvider": chartData1,
        "categoryField": "date"
    }],

    "panels": [{
        "showCategoryAxis": false,
        "title": "Value",
        "percentHeight": 70,
        "stockGraphs": [{
            "id": "g1",
            "valueField": "value",
            "comparable": true,
            "compareField": "value",
            "balloonText": "[[title]]:<b>[[value]]</b>",
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
        "valueLineBalloonEnabled": true,
        "valueLineEnabled": true,
        "valueLineAlpha": 0.5
    },

    "periodSelector": {
        "position": "left",
        "periods": [{
            "period": "DD",
            "selected": true,
            "count": 7,
            "label": "1 week"
        }, {
            "period": "MM",
            "selected": true,
            "count": 1,
            "label": "1 month"
        }, {
            "period": "YTD",
            "label": "YTD"
        }, {
            "period": "MAX",
            "label": "MAX"
        }]
    },

    "dataSetSelector": {
        "position": "left"
    },

    "export": {
        "enabled": true
    }
});
// var color_complete = $("#colorcomplete").val()
// var color_inoprogress = $("#colorinprogress").val()
// var color_backlog = $("#colorbacklog").val()

// $(function() {
//     Highcharts.chart('container', {
//         title: {
//             text: 'Cumulative Flow Diagram'
//         },

//         xAxis: {
//             // valueFormatString: "DD-MMM",
//             categories: ["5 MAY", "6 MAY", "7 MAY", "8 MAY", "9 MAY", "10 MAY", "11 MAY"]
//         },

//         yAxis: {
//             title: {
//                 text: 'Cards'
//             }
//         },
//         tooltip: {
//             split: true,
//             valueSuffix: ' cards'
//         },

//         series: [{
//             color: color_complete,
//             name: name_complete,
//             data: [2, 3, 4, 4, 3, 3, 2]
//         }, {
//             color: color_inoprogress,
//             name: name_inoprogress,
//             data: [4, 5, 7, 5, 5, 5, 8]
//         }, {
//             color: color_backlog,
//             name: name_backlog,
//             data: [7, 3, 6, 5, 2, 8, 1]
//         }]

//     });
// });