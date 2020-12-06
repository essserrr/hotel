$(document).ready(function () {
    const dateNodes = $("[data-label-type=date]");

    dateNodes.daterangepicker({
        locale: {
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
        },

        singleDatePicker: true,
        linkedCalendars: false,
        showCustomRangeLabel: false,
    });

    const formatMonth = function () {
        const activePicker = $("div.daterangepicker").filter(function () {
            return this.style.cssText.includes("display: block");
        })[0];

        if (!activePicker) return;

        const month = $(activePicker).find("table thead th.month[colspan=5]");
        const monthAndYear = month.html().split(" ");
        month.html(monthAndYear[0] + "<br>" + monthAndYear[1]);
    };

    const closeDropdown = function () {
        $.uiDropdown.close();
    };

    const applyDate = function (ev, picker) {
        $.uiDropdown.setValue(picker.startDate.format("DD.MM.YYYY"));
    };

    const removeDate = function () {
        $.uiDropdown.setValue("");
    };

    dateNodes.on("apply.daterangepicker", applyDate);
    dateNodes.on("cancel.daterangepicker", removeDate);

    dateNodes.on("show.daterangepicker", formatMonth);
    dateNodes.on("hide.daterangepicker", closeDropdown);

    dateNodes.on("showCalendar.daterangepicker", formatMonth);
});
