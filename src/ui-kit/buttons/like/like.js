$(function () {
    const likeClickHandler = function () {
        const target = $(this);
        let value = target.val();
        const checked = target.is(":checked");
        const likeRoot = target.closest(".ui-like");

        if (checked) {
            value++;
            target.val(value);
            likeRoot.find(".ui-like__label").text(value);
            likeRoot.toggleClass("ui-like--checked");
        } else {
            value--;
            target.val(value);
            likeRoot.find(".ui-like__label").text(value);
            likeRoot.toggleClass("ui-like--checked");
        }
    };

    $(".js-like").on("click", likeClickHandler);
});
