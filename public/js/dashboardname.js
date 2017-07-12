var onAuthorize = function() {
    updateLoggedIn();
    $("#output").val();
    var token = Trello.token();
    Trello.members.get("me", function(member) {
        $("#fullName").text(member.fullName);
        $("#create").attr("href", "createdashboard");
        $("#users").attr("href", "dashboardname?userid=" + member.id);
        $('#nodelete').append('<a class="button darkgrays" href="dashboardname?userid=' + member.id + '" type="button" >NO</a>');
        $.post("http://localhost:5100/user", {
            tokenKey: token,
            idUser: member.id,
            name: member.username,
            fullname: member.fullName,
            email: member.email,
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

// $("#tokenKey").click(function() {
//     var token = Trello.token();
//     window.location.replace("createdashboard");
// });

$("#disconnect").click(logout);