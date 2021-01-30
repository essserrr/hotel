import { IncreaseBlock } from "./IncreaseBlock/IncreaseBlock";

class IncreaseForm {
    constructor({ updateOnChange, formStateReducer, hasSubmit }) {
        this.updateOnChange = updateOnChange;
        this.formStateReducer = formStateReducer;
        this.hasSubmit = hasSubmit;

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

        this.nodes.incForm = this.nodes.nodeClicked.closest(".increase-form");

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

        $.uiDropdown.setValue(this.formStateReducer(this.values.currentState));

        if ($(event.currentTarget).is(this.nodes.incFormApplyButton)) {
            $.uiDropdown.close(event);
        }
    }

    onClear(event) {
        this.findNodes(event);
        this.clearState();

        $.uiDropdown.setValue("");
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
                (!!rootNode ? `${rootNode} ` : "") + "[data-button-type=apply]";
            const clearButtons =
                (!!rootNode ? `${rootNode} ` : "") + "[data-button-type=clear]";

            $(applyButtons).on("click", this.onSubmit);
            $(clearButtons).on("click", this.onClear);
        }
    }
}

export { IncreaseForm };
