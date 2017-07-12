var onAuthorize = function() {
    updateLoggedIn();
    $("#output").val();

    Trello.members.get("me", function(member) {
        $("#fullName").text(member.fullName);

        var $boards = $("<select>")
            .text("Loading Cards...")
            .appendTo("#outputBoards");

        Trello.get("members/me/boards", function(boards) {
            $boards.empty();
            $.each(boards, function(ix, board) {
                $("<option>")
                    .addClass("board")
                    .text(board.name)
                    .appendTo($boards);
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