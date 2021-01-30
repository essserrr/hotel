import { IncreaseForm } from "./IncreaseForm/IncreaseForm";

$(function () {
    let increaseRooms = new IncreaseForm({
        updateOnChange: true,

        formStateReducer: function (state) {
            return state.reduce((sum, value, index) => {
                if (index !== 0) sum += ", ";
                sum += `${value.value} ${value.title}`;
                return sum;
            }, "");
        },
    });

    increaseRooms.setHandlers(".js-inc-rooms");

    let increaseGuests = new IncreaseForm({
        hasSubmit: true,

        formStateReducer: function (state) {
            const guests = state.reduce(
                (sum, value) => {
                    const trimmedTitle = value.title.trim();
                    if (
                        trimmedTitle === "взрослые" ||
                        trimmedTitle === "дети"
                    ) {
                        sum.guests.number += Number(value.value);
                    }

                    if (trimmedTitle === "младенцы") {
                        sum.newborn.number += Number(value.value);
                    }
                    return sum;
                },
                {
                    guests: { number: 0, title: "гостя" },
                    newborn: { number: 0, title: "младенец" },
                }
            );

            const guestStrings = Object.entries(guests).reduce((sum, value) => {
                if (value[1].number > 0) {
                    sum.push(`${value[1].number} ${value[1].title}`);
                }
                return sum;
            }, []);
            return guestStrings.join(", ");
        },
    });

    increaseGuests.setHandlers(".js-inc-guests");
});
