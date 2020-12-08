$(function () {
    if (!$().inputmask) return;
    $("[data-masktype=date]").inputmask({
        alias: "datetime",
        inputFormat: "dd.mm.yyyy",
        clearMaskOnLostFocus: false,
        placeholder: "ДД.ММ.ГГГГ",
        onBeforeWrite: function (event, buffer, caretPos, opts) {
            if (!event.target) return [event, buffer, caretPos, opts];

            const defaultBuffer = opts.placeholder.split("");

            let isDefaltValue = buffer.reduce(
                (sum, value, key) => sum && defaultBuffer[key] === value,
                true
            );

            if (
                isDefaltValue &&
                $(event.target).hasClass("ui-text-input--default-color")
            ) {
                $(event.target).removeClass("ui-text-input--default-color");
            } else if (
                !isDefaltValue &&
                !$(event.target).hasClass("ui-text-input--default-color")
            ) {
                $(event.target).addClass("ui-text-input--default-color");
            }
            return [event, buffer, caretPos, opts];
        },
    });
});
