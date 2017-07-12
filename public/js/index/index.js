var onAuthorize = function() {
    var token = Trello.token();
    // window.location.replace("dashboardname");

    Trello.members.get("me", function(member) {
        window.location.replace("dashboardname?userid=" + member.id);
        $.post("http://localhost:5100/user", {
            tokenKey: token,
            idUser: member.id,
            name: member.username,
            fullname: member.fullName,
            email: member.email
        });
        // window.location.replace("dashboardname/" + member.id);
    });
};

// var updateLoggedIn = function() {
//     var isLoggedIn = Trello.authorized();
//     $("#loggedout").toggle(!isLoggedIn);
//     $("#loggedin").toggle(isLoggedIn);
// };

// var logout = function() {
//     Trello.deauthorize();
//     updateLoggedIn();
// };

$("#connectLink").click(function() {
    Trello.authorize({
        type: "redirect",
        name: "CFDrello Dashboard",
        success: onAuthorize
    })
});

// $("#disconnect").click(logout);