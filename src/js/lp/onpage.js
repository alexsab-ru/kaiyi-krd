$(function () {
    $(".kompl .items .item").click(function () {
        let img = $(this).attr("data-img");
        $(".kompl .row1 img").attr("src", img + "?v=2");
        return;
    });
});

$(function () {
    $(".gallery .filter a").click(function () {
        $(".gallery .filter a").removeClass("active");
        $(this).addClass("active");

        let target = $(this).attr("data-target");
        $(".gallery .items1, .gallery .items2").removeClass("show");
        $(target).addClass("show");
        return false;
    });

    $(window).scroll(function () {
        var scrollPos = $(document).scrollTop();
        let windowHeight = $(window).height();

        let elements = $(".ga:visible");
        $(elements).each(function () {
            let element = $(this);
            let scrollPos2 = scrollPos - element.outerHeight();
            let gaTop = element.offset().top;
            if (scrollPos < gaTop && gaTop < (scrollPos + windowHeight)) {
                let top = gaTop - scrollPos;
                let percent = ((top * 100) / windowHeight);
                let percent10 = parseInt(percent / 10) * 10;

                if (percent10 != 0) {
                    element.removeClass('ga90 ga80 ga70 ga60 ga50 ga40 ga30 ga20 ga10');
                    element.addClass("ga" + percent10);
                }
            }
        });
        /*var scrollPos = $(document).scrollTop();
        console.log(scrollPos);*/
    });


});


$(function () {
    $('.disclamer_switch').click(function () {
        $('.disclamer').slideToggle({
            start: function () {
                $("html, body").animate({
                    scrollTop: $("html, body").height()
                }, "slow");
            }
        });
        return false;
    });
});
