import { IncreaseForm } from "./IncreaseForm/IncreaseForm";

$(function () {
    const reduceRooms = function (state) {
        return state.reduce((sum, value, index) => {
            if (index !== 0) sum += ", ";
            sum += `${value.value} ${value.title}`;
            return sum;
        }, "");
    };
    let increaseRooms = new IncreaseForm({
        updateOnChange: true,
        formStateReducer: reduceRooms,
    });
    increaseRooms.setHandlers(".js-inc-rooms");

    const CONSTANTS = {
        guest: "взрослые",
        child: "дети",
        newborn: "младенцы",
    };

    const reduceGuests = function (state) {
        const guests = state.reduce(
            (sum, value) => {
                const trimmedTitle = value.title.trim();

                const isGuest = trimmedTitle === CONSTANTS.guest;
                const isChild = trimmedTitle === CONSTANTS.child;
                if (isGuest || isChild) {
                    sum.guests.number += Number(value.value);
                }

                if (trimmedTitle === CONSTANTS.newborn) {
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
            const visitorCategory = value[1];
            if (visitorCategory.number > 0) {
                sum.push(`${visitorCategory.number} ${visitorCategory.title}`);
            }
            return sum;
        }, []);
        return guestStrings.join(", ");
    };

    let increaseGuests = new IncreaseForm({
        hasSubmit: true,

        formStateReducer: reduceGuests,
    });

    increaseGuests.setHandlers(".js-inc-guests");
});
