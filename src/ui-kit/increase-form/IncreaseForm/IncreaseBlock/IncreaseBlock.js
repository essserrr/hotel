const CONSTANTS = {
    DEC: "dec",
    INC: "inc",
};

class IncreaseBlock {
    constructor() {
        this.view = {
            nodeClicked: null,
            buttonBlock: null,
            increaseButton: null,
            decreaseButton: null,
            valueLabel: null,
        };
        this.model = {
            min: null,
            max: null,
            step: null,
            currentValue: null,
            sign: null,
        };

        this.onChange = this.onChange.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    _createView(target) {
        this.view.nodeClicked = $(target);

        this.view.buttonBlock = this.view.nodeClicked
            .closest(".increase-form-element")
            .find(".increase-form-element__button-block");

        this.view.increaseButton = this.view.buttonBlock.find(
            ".increase-form-element__button[data-button-type=inc]"
        );
        this.view.decreaseButton = this.view.buttonBlock.find(
            ".increase-form-element__button[data-button-type=dec]"
        );
        this.view.valueLabel = this.view.buttonBlock.find(
            ".increase-form-element__value"
        );
    }

    _createModel(view) {
        this.model.min = Number(view.buttonBlock.attr("data-min-value"));
        this.model.max = Number(view.buttonBlock.attr("data-max-value"));
        this.model.step = Number(view.buttonBlock.attr("data-step"));
        this.model.currentValue = Number(view.valueLabel.html());
        this.model.sign = view.nodeClicked.attr("data-button-type");
    }

    _modelChangeValue() {
        const isDec = this.model.sign === CONSTANTS.DEC;
        const lessOrEqualMin = this.model.min >= this.model.currentValue;
        if (lessOrEqualMin && isDec) return;

        const isInc = this.model.sign === CONSTANTS.INC;
        const moreOrEqualMax = this.model.max <= this.model.currentValue;
        if (moreOrEqualMax && isInc) return;

        this.model.currentValue = isDec
            ? this.model.currentValue - this.model.step
            : this.model.currentValue + this.model.step;
    }

    _viewUpdate(current, min, max) {
        this.view.valueLabel.html(current);

        const currentLessMax = current < max;
        this.view.increaseButton.prop("disabled", !currentLessMax);

        const currentMoreMin = current > min;
        this.view.decreaseButton.prop("disabled", !currentMoreMin);
    }

    _nullifyModel() {
        this.view.valueLabel.html(0);
    }
    _nullifyView() {
        this.view.valueLabel.html(0);
    }

    onChange(target) {
        this._createView(target);
        this._createModel(this.view);
        this._modelChangeValue();
        this._viewUpdate(
            this.model.currentValue,
            this.model.min,
            this.model.max
        );
    }

    onReset(target) {
        this._createView(target);
        this._createModel(this.view);
        this._nullifyModel();
        this._nullifyView();
        this._viewUpdate(
            this.model.currentValue,
            this.model.min,
            this.model.max
        );
    }
}

export { IncreaseBlock };
