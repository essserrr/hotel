const CONSTANTS = {
    DEC: "dec",
    INC: "inc",
};

class IncreaseBlock {
    constructor() {
        this._view = {
            nodeClicked: null,
            buttonBlock: null,
            increaseButton: null,
            decreaseButton: null,
            valueLabel: null,
        };
        this._model = {
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
        this._view.nodeClicked = $(target);

        this._view.buttonBlock = this._view.nodeClicked
            .closest(".increase-form-element")
            .find(".increase-form-element__button-block");

        this._view.increaseButton = this._view.buttonBlock.find(
            ".increase-form-element__button[data-button-type=inc]"
        );
        this._view.decreaseButton = this._view.buttonBlock.find(
            ".increase-form-element__button[data-button-type=dec]"
        );
        this._view.valueLabel = this._view.buttonBlock.find(
            ".increase-form-element__value"
        );
    }

    _createModel(view) {
        this._model.min = Number(view.buttonBlock.attr("data-min-value"));
        this._model.max = Number(view.buttonBlock.attr("data-max-value"));
        this._model.step = Number(view.buttonBlock.attr("data-step"));
        this._model.currentValue = Number(view.valueLabel.html());
        this._model.sign = view.nodeClicked.attr("data-button-type");
    }

    _modelChangeValue() {
        const isDec = this._model.sign === CONSTANTS.DEC;
        const lessOrEqualMin = this._model.min >= this._model.currentValue;
        if (lessOrEqualMin && isDec) return;

        const isInc = this._model.sign === CONSTANTS.INC;
        const moreOrEqualMax = this._model.max <= this._model.currentValue;
        if (moreOrEqualMax && isInc) return;

        this._model.currentValue = isDec
            ? this._model.currentValue - this._model.step
            : this._model.currentValue + this._model.step;
    }

    _viewUpdate(current, min, max) {
        this._view.valueLabel.html(current);

        const currentLessMax = current < max;
        this._view.increaseButton.prop("disabled", !currentLessMax);

        const currentMoreMin = current > min;
        this._view.decreaseButton.prop("disabled", !currentMoreMin);
    }

    _nullifyModel() {
        this._view.valueLabel.html(0);
    }
    _nullifyView() {
        this._view.valueLabel.html(0);
    }

    onChange(target) {
        this._createView(target);
        this._createModel(this._view);
        this._modelChangeValue();
        this._viewUpdate(
            this._model.currentValue,
            this._model.min,
            this._model.max
        );
    }

    onReset(target) {
        this._createView(target);
        this._createModel(this._view);
        this._nullifyModel();
        this._nullifyView();
        this._viewUpdate(
            this._model.currentValue,
            this._model.min,
            this._model.max
        );
    }
}

export { IncreaseBlock };
