$(function () {
    $(".js-range-slider").ionRangeSlider({
        skin: "round",
        type: "double",

        grid: false,
        hide_min_max: true,
        hide_from_to: true,

        min: 0,
        max: 17000,
        from: 5000,
        to: 10000,
        step: 100,
        onChange: function (event) {
            $(event.slider)
                .closest(".ui-with-label__row")
                .find(".ui-with-label__label--right")
                .html(
                    `${event.from_pretty}&#x20bd - ${event.to_pretty}&#x20bd`
                );
        },
    });
});