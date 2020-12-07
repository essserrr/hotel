$(document).ready(function () {
    const leftNodes = $("[data-label-type=date]:not([data-opens=right])");
    const rightNodes = $("[data-label-type=date][data-opens=right]");

    const rangeNodes = $("[data-label-type=date-range]");

    const locale = {
        cancelLabel: "Clear",
        format: "dd/mm/yyyy",
        separator: " - ",
        applyLabel: "Применить",
        cancelLabel: "Очистить",
        fromLabel: "С",
        toLabel: "До",
        customRangeLabel: "Кастомный",
        weekLabel: "Н",
        daysOfWeek: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        monthNames: [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
        ],
        firstDay: 1,
    };

    const findActivePicker = function () {
        return $("div.daterangepicker").filter(function () {
            return this.style.cssText.includes("display: block");
        })[0];
    };

    const hideSecondCalendar = function (activePicker) {
        $(activePicker).find(".drp-calendar.right").css("display", "none");
    };

    const showHandler = function () {
        const activePicker = findActivePicker();
        if (!activePicker) return;
        hideSecondCalendar(activePicker);
    };

    const hideHandler = function () {
        $.uiDropdown.close();
    };

    const applyDateHanler = function (ev, picker) {
        $.uiDropdown.setValue(picker.startDate.format("DD.MM.YYYY"));
    };

    const applyRangeHanler = function (ev, picker) {
        $.uiDropdown.setValue(
            picker.startDate.format("DD.MM") +
                " - " +
                picker.endDate.format("DD.MM")
        );
    };

    const cancelHandler = function () {
        $.uiDropdown.setValue("");
    };

    const initDatepicker = function (nodes, opens) {
        nodes.daterangepicker({
            opens: opens,
            singleDatePicker: true,
            linkedCalendars: false,
            showCustomRangeLabel: false,
            locale,
        });

        nodes.on("apply.daterangepicker", applyDateHanler);
        nodes.on("cancel.daterangepicker", cancelHandler);

        nodes.on("show.daterangepicker", showHandler);
        nodes.on("hide.daterangepicker", hideHandler);
    };

    const initDatepickerRange = function (nodes, opens) {
        nodes.daterangepicker({
            opens: opens,
            linkedCalendars: false,
            showCustomRangeLabel: true,
            alwaysShowCalendars: true,
            locale,
        });

        nodes.on("apply.daterangepicker", applyRangeHanler);
        nodes.on("cancel.daterangepicker", cancelHandler);

        nodes.on("show.daterangepicker", showHandler);
        nodes.on("hide.daterangepicker", hideHandler);
    };

    initDatepicker(leftNodes, "left");
    initDatepicker(rightNodes, "right");
    initDatepickerRange(rangeNodes, "right");
});
