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
        this.values.min = Number(this.nodes.buttonBlock.attr("data-min-value"));
        this.values.max = Number(this.nodes.buttonBlock.attr("data-max-value"));
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

export { IncreaseBlock };
