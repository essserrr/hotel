import { IncreaseBlock } from './IncreaseBlock/IncreaseBlock';

class IncreaseForm {
    constructor({
        formStateReducer,
        updateOnChange = false,
        hasSubmit = false,
    }) {
        this._updateOnChange = updateOnChange;
        this._formStateReducer = formStateReducer;
        this._hasSubmit = hasSubmit;

        this._view = {
            nodeClicked: null,
            incForm: null,
            incFormElements: null,
            incFormClearButton: null,
            incFormApplyButton: null,
        };
        this._model = {
            currentState: [],
        };

        this._onSubmit = this._onSubmit.bind(this);
        this._onClear = this._onClear.bind(this);
        this._onValueChange = this._onValueChange.bind(this);
        this.setHandlers = this.setHandlers.bind(this);
    }

    _createView(event) {
        this._view.nodeClicked = $(event.currentTarget);
        this._view.incForm = this._view.nodeClicked.closest('.increase-form');
        this._view.incFormElements = this._view.incForm.find(
            '.increase-form-element'
        );

        if (this._hasSubmit) {
            this._view.incFormClearButton = this._view.incForm.find(
                '[data-button-type=clear]'
            );
            this._view.incFormApplyButton = this._view.incForm.find(
                '[data-button-type=apply]'
            );
        }
    }

    _createModel(formElements) {
        let newState = [];
        formElements.map((...element) => {
            const title = $(element[1])
                .find('.increase-form-element__title')
                .html();
            const value = $(element[1])
                .find('.increase-form-element__value')
                .html();

            newState.push({
                title,
                value,
            });
        });

        this._model.currentState = newState;
    }

    _submit(event) {
        $.uiDropdown.setValue(this._formStateReducer(this._model.currentState));
        if ($(event.currentTarget).is(this._view.incFormApplyButton)) {
            $.uiDropdown.close(event, true);
        }
    }

    _onSubmit(event) {
        this._createView(event);
        this._createModel(this._view.incFormElements);
        this._submit(event);
    }

    _viewClearView() {
        let template = new IncreaseBlock();
        this._view.incFormElements.map((...element) => {
            template.onReset(element[1]);
        });
    }

    _onClear(event) {
        this._createView(event);
        this._viewClearView();
        $.uiDropdown.setValue('');
    }

    _viewShowClearButton(valueSum) {
        const $clearButtomParent = this._view.incFormClearButton.closest(
            '.increase-form__column'
        );
        const parentHidden = $clearButtomParent.hasClass(
            'increase-form--hide-button'
        );
        const notEmptyInput = valueSum > 0;

        if (notEmptyInput && parentHidden) {
            $clearButtomParent.removeClass('increase-form--hide-button');
        }

        if (valueSum === 0) {
            $clearButtomParent.addClass('increase-form--hide-button');
        }
    }

    _onValueChange(event) {
        let template = new IncreaseBlock();
        template.onChange(event.currentTarget);

        if (this._hasSubmit || this._updateOnChange) {
            this._createView(event);
            this._createModel(this._view.incFormElements);
        }

        if (this._hasSubmit) {
            const valueSum = this._model.currentState.reduce(
                (sum, value) => (sum += Number(value.value)),
                0
            );
            this._viewShowClearButton(valueSum);
        }

        if (this._updateOnChange) {
            this._submit(event);
        }
    }

    setHandlers(rootNode = '') {
        $(`${rootNode} .js-increase-form-button`).on(
            'click.uikitIncreaseForm',
            this._onValueChange
        );

        if (this._hasSubmit) {
            $(`${rootNode} [data-button-type=apply]`).on(
                'click.uikitIncreaseForm',
                this._onSubmit
            );
            $(`${rootNode} [data-button-type=clear]`).on(
                'click.uikitIncreaseForm',
                this._onClear
            );
        }
    }
}

export { IncreaseForm };
