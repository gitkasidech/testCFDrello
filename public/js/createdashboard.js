var countlist
var onAuthorize = function() {
    updateLoggedIn();
    $("#output").val();
    var token = Trello.token();
    Trello.members.get("me", function(member) {
        $("#fullName").text(member.fullName);

        $('#cfdrello').append('<a href="dashboardname?userid=' + member.id + '">CFDrello</a>')
        $('#cancel').append('<a class="button darkgray" href="dashboardname?userid=' + member.id + '" type="button" >CANCEL</a>')

        $('#tokenID').append($('<input>', {
            'type': 'hidden',
            'name': 'tokenKey',
            'value': token
        }));
        $('#userID').append($('<input>', {
            'type': 'hidden',
            'name': 'idUser',
            'value': member.id
        }));
        $('#name').append($('<input>', {
            'type': 'hidden',
            'name': 'userName',
            'value': member.username
        }));
        Trello.get('/members/me/boards/', function(boards) {
            $.each(boards, function(index, board) {
                $('#boards')
                    .append($('<option></option>')
                        .attr("value", board.id)
                        .text(board.name)
                    );

                $.post("http://localhost:5100/boards", {
                    id: board.id,
                    name: board.name,
                    id_member: member.id,
                    user: member.username,
                    token: token
                });
            });
        });

        $('#boards').change(function() {
            var boardId = $("option:selected", this).val();
            $('#lists').empty();
            $("label.option").empty();
            countlist = 0;
            Trello.get('/boards/' + boardId + '/lists', function(lists) {
                $.each(lists, function(index, list) {
                    //var list = $("<p>" + lists.idLists + " " + lists.name + "</p>");
                    // const checkbox = docu.addClass('check');
                    // const checkbox = $('<div></div>').addClass("check").append(
                    //   $('<label></label>').addClass("option").append
                    // )
                    // checkbox.append('<label class="option"><input type="checkbox" name="card"><div>' + list.name +'</div></label>');
                    // console.log($(".complete check title"))

                    // $('#lists')
                    //  .append($("<option></option>")
                    //    .attr("list",list.id)
                    //    .text(list.name)
                    //  )
                    var listname = "" + list.name
                    var replaceresult = listname.replace(/ /g, "_")
                    $(".complete .content .title").after('<label class="option"><input type="checkbox" id=complete' + countlist + ' value=' +
                        replaceresult + ' name=complete  customid=' + list.id + '><div>' + list.name + '</div></label>')

                    $(".inprogress .content .title").after('<label class="option"><input type="checkbox" id=inprogress' + countlist + ' value=' +
                        replaceresult + ' name=inprogress  customid=' + list.id + '><div>' + list.name + '</div></label>')

                    $(".backlog .content .title").after('<label class="option"><input type="checkbox" id=backlog' + countlist + ' value=' +
                        replaceresult + ' name=backlog customid=' + list.id + ' ><div>' + list.name + '</div></label>')

                    countlist++;

                    $.post("http://localhost:5100/lists", {
                        id: list.id,
                        name: list.name,
                        board: boardId,
                        id_member: member.id,
                        user: member.username,
                        token: token
                    });
                });
            });
        })
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

$("#savebacklog").click(function() {
    var l;
    //alert("sas");
    $('#listsbacklog').empty()
    for (l = 0; l < countlist; l++) {
        //alert("loop")
        var checker = document.getElementById('backlog' + l).checked;
        if (checker == true) {
            var checkvalue = document.getElementById('backlog' + l).value;
            var checklistid = ($('#backlog' + l).attr("customid"))
                // alert("id: " + checklistid)
            var checkvalue2 = "" + checkvalue
            var replaceresult = checkvalue2.replace(/ /g, "")
                // var replaceresult2 = checkvalue2.replace(/_/g, " ")
            $('#listsbacklog')
                //listscomplete
                .append($("<option value=" + checklistid + " listidbacklog=" + checklistid + " color='#000000'></option>")
                    //.attr("list", replaceresult)
                    .text(replaceresult)
                )
        }
    }
});

$("#saveinprogress").click(function() {
    var l;
    //alert("sas");
    $('#listsinprogress').empty()
    for (l = 0; l < countlist; l++) {
        //alert("loop")
        var checker = document.getElementById('inprogress' + l).checked;
        if (checker == true) {
            var checkvalue = document.getElementById('inprogress' + l).value;
            var checklistid = ($('#inprogress' + l).attr("customid"))
                // alert("id: " + checklistid)
            var checkvalue2 = "" + checkvalue
            var replaceresult = checkvalue2.replace(/ /g, "")
                // var replaceresult2 = checkvalue2.replace(/_/g, " ")
            $('#listsinprogress')
                //listscomplete
                .append($("<option value=" + checklistid + " listidinprogress=" + checklistid + " color='#000000'></option>")
                    //.attr("list", replaceresult)
                    .text(replaceresult)
                )
        }
    }
});

$("#savecomplete").click(function() {
    var l;
    //alert("sas");
    $('#listscomplete').empty()
    for (l = 0; l < countlist; l++) {
        //alert("loop")
        var checker = document.getElementById('complete' + l).checked;
        if (checker == true) {
            var checkvalue = document.getElementById('complete' + l).value;
            var checklistid = ($('#complete' + l).attr("customid"))
                // alert("id: " + checklistid)
            var checkvalue2 = "" + checkvalue
            var replaceresult = checkvalue2.replace(/ /g, "")
                // var replaceresult = checkvalue2.replace(/_/g, " ")
            $('#listscomplete')
                .append($("<option value=" + checklistid + " listidcomplete=" + checklistid + " color='#000000'></option>")
                    //.attr("list", replaceresult)
                    .text(replaceresult)
                )
        }
    }
});

function colorcompleteChange() {
    var listname2 = "" + listscomplete.value
    var replaceresult2 = listname2.replace(/ /g, "")
    console.log(replaceresult2)
    console.log(colorcomplete.value)
    listscomplete.color = colorcomplete.value
        // console.log(listscomplete.color)
        //listname2.style.backgroundColor=listscomplete.color;
    document.getElementById('listscomplete').style.backgroundColor = listscomplete.color;
}

function colorinprogressChange() {
    var listname2 = "" + listsinprogress.value
    var replaceresult2 = listname2.replace(/ /g, "")
    console.log(replaceresult2)
    console.log(colorinprogress.value)
    listsinprogress.color = colorinprogress.value
        // var color = $(this).attr("class");
        // $(this).css("background", colorcomplete.value);
    document.getElementById('listsinprogress').style.backgroundColor = listsinprogress.color;
}

function colorbacklogChange() {
    var listname2 = "" + listsbacklog.value
        // var listid2 = ""+listbacklog.listidbacklog
    var replaceresult2 = listname2.replace(/ /g, "")
    console.log(replaceresult2)
    console.log(colorbacklog.value)
    listsbacklog.color = colorbacklog.value
        // console.log(listid2)
        // var color = $(this).attr("class");
        // $(this).css("background", colorcomplete.value);
    document.getElementById('listsbacklog').style.backgroundColor = listsbacklog.color;
}