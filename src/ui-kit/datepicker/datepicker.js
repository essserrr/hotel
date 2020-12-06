$(document).ready(function () {
    const dateNodes = $("[type=date]");

    dateNodes.daterangepicker(
        {
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
        },
        function (start, end, label) {
            console.log(
                "New date range selected: " +
                    start.format("YYYY-MM-DD") +
                    " to " +
                    end.format("YYYY-MM-DD") +
                    " (predefined range: " +
                    label +
                    ")"
            );
        }
    );

    const formatMonth = function () {
        const activePicker = $("div.daterangepicker").filter(function () {
            console.log(this.style.cssText.includes("display: block"));
            return this.style.cssText.includes("display: block");
        })[0];

        if (!activePicker) return;

        const month = $(activePicker).find("table thead th.month[colspan=5]");
        const monthAndYear = month.html().split(" ");
        month.html(monthAndYear[0] + "<br>" + monthAndYear[1]);
    };

    dateNodes.on("show.daterangepicker", formatMonth);
    dateNodes.on("showCalendar.daterangepicker", formatMonth);
});
