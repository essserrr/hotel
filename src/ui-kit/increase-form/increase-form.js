$(function () {
    class IncreaseBlock {
        constructor() {
            this.nodes = {};
            this.values = {};

            this.findNodes = this.findNodes.bind(this);
            this.findValues = this.findValues.bind(this);
            this.changeValue = this.changeValue.bind(this);
            this.changeNodeStatus = this.changeNodeStatus.bind(this);

            this.onChange = this.onChange.bind(this);
        }

        findNodes(target) {
            this.nodes.nodeClicked = $(target);

            this.nodes.buttonBlock = this.nodes.nodeClicked
                .closest(".increase-form-element")
                .find(".increase-form-element__button-block");

            this.nodes.increaseButton = this.nodes.buttonBlock.find(
                ".increase-form-element__button[data-button-type=inc]"
            );
            this.nodes.decreaseButton = this.nodes.buttonBlock.find(
                ".increase-form-element__button[data-button-type=dec]"
            );
            this.nodes.valueLabel = this.nodes.buttonBlock.find(
                ".increase-form-element__value"
            );
        }

        findValues() {
            this.values.min = Number(
                this.nodes.buttonBlock.attr("data-min-value")
            );
            this.values.max = Number(
                this.nodes.buttonBlock.attr("data-max-value")
            );
            this.values.step = Number(this.nodes.buttonBlock.attr("data-step"));
            this.values.currentValue = Number(this.nodes.valueLabel.html());
            this.values.sign = this.nodes.nodeClicked.attr("data-button-type");
        }

        changeValue() {
            const sign = this.values.sign;
            if (this.values.min >= this.values.currentValue && sign === "dec")
                return;

            if (this.values.max <= this.values.currentValue && sign === "inc")
                return;

            this.values.currentValue =
                sign === "dec"
                    ? this.values.currentValue - this.values.step
                    : this.values.currentValue + this.values.step;
        }

        changeNodeStatus() {
            this.nodes.valueLabel.html(this.values.currentValue);

            this.nodes.increaseButton.prop(
                "disabled",
                !(this.values.currentValue < this.values.max)
            );
            this.nodes.decreaseButton.prop(
                "disabled",
                !(this.values.currentValue > this.values.min)
            );
        }

        onChange(target) {
            this.findNodes(target);
            this.findValues();
            this.changeValue();
            this.changeNodeStatus();
        }

        onReset(target) {
            this.findNodes(target);
            this.findValues();

            this.values.currentValue = 0;
            this.nodes.valueLabel.html(0);

            this.changeNodeStatus();
        }
    }

    class IncreaseForm {
        constructor({
            setValue,
            updateOnChange,
            formStateReducer,
            hasSubmit,
            closeDropdown,
        }) {
            this.setValue = setValue;
            this.updateOnChange = updateOnChange;
            this.formStateReducer = formStateReducer;
            this.hasSubmit = hasSubmit;
            this.closeDropdown = closeDropdown;

            this.nodes = {};
            this.values = {
                currentState: [],
            };

            this.onSubmit = this.onSubmit.bind(this);
            this.onClear = this.onClear.bind(this);
            this.onValueChange = this.onValueChange.bind(this);

            this.findState = this.findState.bind(this);
            this.findNodes = this.findNodes.bind(this);
            this.showClearButton = this.showClearButton.bind(this);

            this.setHandlers = this.setHandlers.bind(this);
        }

        findNodes(event) {
            this.nodes.nodeClicked = $(event.currentTarget);

            this.nodes.incForm = this.nodes.nodeClicked.closest(
                ".increase-form"
            );

            this.nodes.incFormElements = this.nodes.incForm.find(
                ".increase-form-element"
            );

            if (this.hasSubmit) {
                this.nodes.incFormClearButton = this.nodes.incForm.find(
                    "[data-button-type=clear]"
                );
                this.nodes.incFormApplyButton = this.nodes.incForm.find(
                    "[data-button-type=apply]"
                );
            }
        }

        findState() {
            let newState = [];
            this.nodes.incFormElements.map((...element) => {
                const title = $(element[1])
                    .find(".increase-form-element__title")
                    .html();
                const value = $(element[1])
                    .find(".increase-form-element__value")
                    .html();

                newState.push({
                    title,
                    value,
                });
            });

            this.values.currentState = newState;
        }

        clearState() {
            this.nodes.incFormElements.map((...element) => {
                let entryAffected = new IncreaseBlock();
                entryAffected.onReset(element[1]);
            });
        }

        onSubmit(event) {
            this.findNodes(event);
            this.findState();

            this.setValue(this.formStateReducer(this.values.currentState));

            if (
                $(event.currentTarget).is(this.nodes.incFormApplyButton) &&
                this.closeDropdown
            ) {
                this.closeDropdown();
            }
        }

        onClear(event) {
            this.findNodes(event);
            this.clearState();

            this.setValue("");
        }

        showClearButton(event) {
            this.findNodes(event);
            this.findState();

            const clearParent = this.nodes.incFormClearButton.closest(
                ".increase-form__column"
            );

            const valueSum = this.values.currentState.reduce(
                (sum, value) => (sum += Number(value.value)),
                0
            );

            if (
                valueSum > 0 &&
                clearParent.hasClass("increase-form--hide-button")
            ) {
                clearParent.removeClass("increase-form--hide-button");
            }

            if (valueSum === 0) {
                clearParent.addClass("increase-form--hide-button");
            }
        }

        onValueChange(event) {
            let entryAffected = new IncreaseBlock();
            entryAffected.onChange(event.currentTarget);

            if (this.hasSubmit) {
                this.showClearButton(event);
            }

            if (this.updateOnChange) {
                this.onSubmit(event);
            }
        }

        setHandlers(rootNode) {
            const incButtons =
                (!!rootNode ? `${rootNode} ` : "") + ".js-increase-form-button";
            $(incButtons).on("click", this.onValueChange);

            if (this.hasSubmit) {
                const applyButtons =
                    (!!rootNode ? `${rootNode} ` : "") +
                    "[data-button-type=apply]";
                const clearButtons =
                    (!!rootNode ? `${rootNode} ` : "") +
                    "[data-button-type=clear]";

                $(applyButtons).on("click", this.onSubmit);
                $(clearButtons).on("click", this.onClear);
            }
        }
    }

    let increaseRooms = new IncreaseForm({
        setValue: $.uiDropdown.setValue,
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
        setValue: $.uiDropdown.setValue,
        closeDropdown: $.uiDropdown.close,

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

            console.log(guestStrings);
            return guestStrings.join(", ");
        },
    });

    increaseGuests.setHandlers(".js-inc-guests");
});
