$(function () {
    const enterHandler = function () {
        $(this).find(".js-nav-dropdown__list").first().stop().slideDown(200);
        $(this).attr("data-navdropdown-hover", true);
    };
    const leaveHandler = function () {
        $(".js-nav-dropdown__list", this).stop().slideUp(200);
        $(this).attr("data-navdropdown-hover", false);
    };
    const targetNode = ".js-nav-dropdown";
    $(targetNode).on("mouseenter", enterHandler);
    $(targetNode).on("mouseleave", leaveHandler);
});
