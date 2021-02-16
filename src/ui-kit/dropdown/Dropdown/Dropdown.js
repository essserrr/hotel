const CONSTANTS = {
    HIDE: 'hide',
};

class Dropdown {
    constructor({ canBeDefaultOpened }) {
        this.defaultOpened = canBeDefaultOpened;

        this.getDropdownNodes = this.getDropdownNodes.bind(this);
        this.getLabelParameters = this.getLabelParameters.bind(this);
        this.setElementPosition = this.setElementPosition.bind(this);
        this.show = this.show.bind(this);
        this.closeDropHandler = this.closeDropHandler.bind(this);
        this.onShow = this.onShow.bind(this);
        this.close = this.close.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    getDropdownNodes(nodeClicked) {
        let $parent = $(nodeClicked).closest('.ui-dropdown');

        return {
            parent: $parent,
            label: $parent.find('.js-dropdown__label'),
            input: $parent.find('.js-dropdown__input'),
            container: $parent.find('.js-dropdown__container'),
            element: $parent.find('.ui-dropdown__element'),
        };
    }

    getLabelParameters(label) {
        const width = label.outerWidth();
        const height = label.outerHeight();
        const borderBottom = parseInt(label.css('border-left-width'), 10);
        let { left, top } = label.offset();

        const $window = $(window);
        top = top - $window.scrollTop() + height - borderBottom;
        left = left - $window.scrollLeft();

        return { width, height, left, top, borderBottom };
    }

    setElementPosition(nodes) {
        //find label parameters
        const parameters = this.getLabelParameters(nodes.label);
        //set current element style
        nodes.element.css({
            width: parameters.width,
            top: parameters.top,
            left: parameters.left,
        });
    }

    closeDropHandler(event, nodes, resizeCallback, forceClose) {
        const isHideEvent = event.type === CONSTANTS.HIDE;
        const containerIsTarget = nodes.container.is(event.target);

        if (!containerIsTarget && !isHideEvent && !forceClose) return;

        this.close(nodes, resizeCallback);

        const $window = $(window);
        $window.off('scroll', resizeCallback);
        $window.off('resize', resizeCallback);
    }

    close(nodes) {
        nodes.container.hide();
        nodes.parent.removeAttr('data-drop-opened');
    }

    setValue(value, target) {
        target.val(value);
    }

    show(nodes) {
        nodes.parent.attr('data-drop-opened', true);
        this.setElementPosition(nodes);
        nodes.container.show();
    }

    bindCallbacks(nodes) {
        const resizeCallback = () => {
            this.setElementPosition(nodes);
        };
        const closeCallback = (event, forceClose) => {
            this.closeDropHandler(event, nodes, resizeCallback, forceClose);
        };
        const setCallback = (value) => {
            this.setValue(value, nodes.input);
        };

        const $window = $(window);
        $window.on('scroll', resizeCallback);
        $window.on('resize', resizeCallback);
        nodes.container.on('click', closeCallback);

        $.uiDropdown = {
            close: closeCallback,
            setValue: setCallback,
        };
    }

    onShow(event) {
        const nodes = this.getDropdownNodes(event.target);
        this.show(nodes);
        this.bindCallbacks(nodes);
    }

    setHandlers() {
        $('.js-dropdown__label, .js-dropdown__icon, .js-dropdown__input').on(
            'click',
            this.onShow
        );
        /*
        $.uiDropdown = {
            close: this.close,
            setValue: this.setValue,
        };
*/
        if (this.defaultOpened) {
            $('.js-dropdown__input[data-drop-default-opened]').trigger('click');
        }
    }
}

export { Dropdown };
