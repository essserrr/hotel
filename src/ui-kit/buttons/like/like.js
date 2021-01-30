$(function () {
    const likeClickHandler = function (event) {
        const $target = $(event.target);
        const $likeRoot = $target.closest(".ui-like");

        let value = Number($target.val());
        const checked = $target.is(":checked");

        if (checked) {
            value++;
            $target.val(value);
            $likeRoot.find(".ui-like__label").text(value);
            $likeRoot.toggleClass("ui-like--checked");
        } else {
            value--;
            $target.val(value);
            $likeRoot.find(".ui-like__label").text(value);
            $likeRoot.toggleClass("ui-like--checked");
        }
    };

    $(".js-like").on("click.uikitLike", likeClickHandler);
});
