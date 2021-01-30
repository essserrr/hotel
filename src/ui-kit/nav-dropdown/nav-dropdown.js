$(function () {
    const enterHandler = function (event) {
        const $target = $(event.currentTarget);

        $target.find(".js-nav-dropdown__list").first().stop().slideDown(200);
        $target.attr("data-navdropdown-hover", true);
    };
    const leaveHandler = function (event) {
        const $target = $(event.currentTarget);

        $(".js-nav-dropdown__list", $target).stop().slideUp(200);
        $target.attr("data-navdropdown-hover", false);
    };

    const $targetNode = $(".js-nav-dropdown");
    $targetNode.on("mouseenter.uikitNavDropdown", enterHandler);
    $targetNode.on("mouseleave.uikitNavDropdown", leaveHandler);
});
