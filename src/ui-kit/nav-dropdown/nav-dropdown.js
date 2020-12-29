$(".js-nav-dropdown").hover(
    function () {
        $(".js-nav-dropdown__list", this).stop().slideDown(200);
    },
    function () {
        $(".js-nav-dropdown__list", this).stop().slideUp(200);
    }
);
