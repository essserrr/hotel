$(function () {
    const rateClickHandler = function (event) {
        const $target = $(event.target);
        const $parent = $target.closest(".ui-rating");
        const $input = $parent.find(".ui-rating__input");

        const targetValue = Number($target.attr("data-star-value"));
        const inputValue = Number($input.val());

        const startPoint = targetValue > inputValue ? inputValue : targetValue;
        const endPoint = targetValue > inputValue ? targetValue : inputValue;

        for (let i = startPoint; i < endPoint; i++) {
            $parent
                .find(`.ui-rating__star[data-star-value=${i + 1}]`)
                .toggleClass("ui-rating__star--checked");
        }
        $input.val(targetValue);
    };

    $(".js-rating").on("click.uikitRate", rateClickHandler);
});
