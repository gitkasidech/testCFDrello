$(document).ready(function() {
    $("tr.listdashboard td a.red").click(function() {
        $(".dialog.confirm").addClass("show-dialog");
    });

    $(".dialog").click(function() {
        $(".dialog").removeClass("show-dialog");
    });

    $(".dialog .content").click(function(e) {
        e.stopPropagation();
    });

    $(".dialog .content button").click(function(e) {
        $(".dialog").removeClass("show-dialog");
    });
});

// $('button.btnDelete').on('click', function(e) {
//     e.preventDefault();
//     var id = $(this).closest('tr').data('id');
//     $('#myModal').data('id', id).modal('show');
// });

// $('#btnDelteYes').click(function() {
//     var id = $('#myModal').data('id');
//     $('[data-id=' + id + ']').remove();
//     $('#myModal').modal('hide');
// });

// $('#myModal').on('show', function() {
//     var tit = $('.confirm-delete').data('title');

//     $('#myModal .modal-body p').html("Desea eliminar al usuario " + '<b>' + tit + '</b>' + ' ?');
//     var id = $(this).data('id'),
//         removeBtn = $(this).find('.danger');
// })

// $('.confirm-delete').on('click', function(e) {
//     e.preventDefault();

//     var id = $(this).data('id');
//     $('#myModal').data('id', id).modal('show');
// });

// $('#btnYes').click(function() {
//     // handle deletion here
//     var id = $('#myModal').data('id');
//     $('[data-id=' + id + ']').parents('tr').remove();
//     $('#myModal').modal('hide');


// });