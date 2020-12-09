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

        findNodes(event) {
            this.nodes.nodeClicked = $(event.currentTarget);

            this.nodes.buttonBlock = this.nodes.nodeClicked.closest(
                ".increase-form-element__button-block"
            );

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

        onChange(event) {
            this.findNodes(event);
            this.findValues();
            this.changeValue();
            this.changeNodeStatus();
        }
    }

    class IncreaseForm {
        constructor() {
            this.nodes = {};
            this.values = {
                currentState: [],
            };

            this.submitChanges = this.submitChanges.bind(this);

            this.onValueChange = this.onValueChange.bind(this);
            this.findState = this.findState.bind(this);
            this.findNodes = this.findNodes.bind(this);

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
        }

        findState() {
            let currentState = [];
            this.nodes.incFormElements.map((...element) => {
                const title = $(element[1])
                    .find(".increase-form-element__title")
                    .html();
                const value = $(element[1])
                    .find(".increase-form-element__value")
                    .html();

                currentState.push({
                    title,
                    value,
                });
            });

            this.values.currentState = currentState;
        }

        submitChanges(event) {
            this.findNodes(event);
            this.findState();

            $.uiDropdown.setValue(
                this.values.currentState.reduce((sum, value, index) => {
                    if (index !== 0) sum += ", ";
                    sum += `${value.value} ${value.title}`;
                    return sum;
                }, "")
            );
        }

        onValueChange(event) {
            let entryAffected = new IncreaseBlock();
            entryAffected.onChange(event);

            this.submitChanges(event);
        }

        setHandlers() {
            $(".js-increase-form-button").on("click", this.onValueChange);

            /*$.uiDropdown = {
                close: this.close,
                setValue: this.setValue,
            };*/
        }
    }

    let increaseForm = new IncreaseForm();
    increaseForm.setHandlers();
});
