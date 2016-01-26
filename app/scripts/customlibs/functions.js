$(document).ready(function () {
    $('.pageHeight').prepend('<div class="top_spacer"></div>');
    $('.pageHeight').append('<div class="top_spacer"></div>');


    unsetPopClicks();

    setPopClicks();



//    $('#shadow').click(function () {
//        closePopWin();
//    });


    //Pop Ups

    $('.tab_width').each(function () {
        var boxCount = $('.tab_item', this).length;
        var boxWidth = $('.tab_item', this).width();
        var extraWidth = (boxWidth + 60);
        $(this).width(boxCount * extraWidth);
    });
    
    function changeSize() {
        var width = parseInt($("#Width").val());
        var height = parseInt($("#Height").val());
        $("#scroll_bookings").width(width).height(height);
        $("#scroll_messages").width(width).height(height);
        // update scrollbars
//        $('#scroll_bookings').perfectScrollbar('update');
//        $('#scroll_messages').perfectScrollbar('update');

        // or even with vanilla JS!
//        Ps.update(document.getElementById('scroll_bookings'));
//        Ps.update(document.getElementById('scroll_messages'));

    }
});



//Close Pop Ups

function closePopWin() {
    $('#popWrap').fadeOut();
    $("#popcont").empty();
}


function unsetPopClicks() {
    $('.popBox').unbind();
}



//Set Pop Up click events

function setPopClicks() {
    $('.popBox').on("click", function () {        
        console.log("-----");
        var closeBtn = '<i class="fa fa-times close_pop"></i> <script>$(".close_pop").click(function(){closePopWin();});</script>';
        var vars = $(this).data('ajax').split("?");
        var url = vars[0];
        if (vars.length > 1) {
            var arr = vars[1].split("&");

            var obj = {};

            for (var i = 0; i < arr.length; i++) {

                var bits = arr[i].split('=');

                obj[bits[0]] = bits[1];

            }

            $.ajax({
                url: 'ajax/' + url,
                method: 'POST',
                data: obj,
                success: function (r) {

                    $('#popcont').html(r);

                    $('#popcont').append(closeBtn);

                    $('#popWrap').fadeIn();

                }

            });

        } else {

            $.ajax({
                url: 'ajax/' + url,
                success: function (r) {

                    $('#popcont').html(r);

                    $('#popcont .popWindow').prepend(closeBtn);

                    $('#popWrap').fadeIn();

                }

            });



        }

    });

}

function UpdateDate(Date) {
    //alert(Date);
    //alert(document.getElementById('txtEventDate').value);

    var frames = document.getElementsByTagName('iframe');
    frames[0].contentWindow.postMessage('sizing?', 'http://remote-domain.com');
    //alert('aa' + frames[0].contentWindow.document.getElementById('txtEventDate').value);
}

function Go(Title, Date) {
    var scope = angular.element($("#directives-calendar")).scope();
    scope.Title = Title;  
    scope.addEvent();
}