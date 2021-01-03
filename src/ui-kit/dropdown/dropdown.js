$(function () {
    class Dropdown {
        constructor({ canBeDefaultOpened }) {
            this.defaultOpened = canBeDefaultOpened;

            this.getDropdownNodes = this.getDropdownNodes.bind(this);
            this.getCoordinates = this.getCoordinates.bind(this);
            this.setElementPosition = this.setElementPosition.bind(this);

            this.show = this.show.bind(this);
            this.close = this.close.bind(this);

            this.showDropHandler = this.showDropHandler.bind(this);
            this.closeDropHandler = this.closeDropHandler.bind(this);

            this.setValue = this.setValue.bind(this);
        }

        showDropHandler(event) {
            this.show(event.target);
        }

        show(nodeClicked) {
            let nodes = this.getDropdownNodes(nodeClicked);
            nodes.parent.attr("data-drop-opened", true);

            this.setElementPosition(nodes);
            nodes.container.show();

            const resizeCallback = () => {
                this.setElementPosition(nodes);
            };

            window.addEventListener("scroll", resizeCallback);
            window.addEventListener("resize", resizeCallback);

            const closeCallback = (event) => {
                this.closeDropHandler(event, nodes, resizeCallback);
            };
            $(nodes.container).on("click", closeCallback);

            const setCallback = (value) => {
                this.setValue(value, nodes);
            };

            $.uiDropdown = {
                close: closeCallback,
                setValue: setCallback,
            };
        }

        getDropdownNodes(nodeClicked) {
            let parent = $(nodeClicked).closest(".ui-dropdown");

            return {
                parent,
                label: parent.find(".js-dropdown__label"),
                input: parent.find(".js-dropdown__input"),
                container: parent.find(".js-dropdown__container"),
                element: parent.find(".ui-dropdown__element"),
            };
        }

        setElementPosition(nodes) {
            //find label parameters
            const coordinates = this.getCoordinates(nodes);
            //set current element style
            nodes.element.css({
                width: coordinates.width,
                top: coordinates.top,
                left: coordinates.left,
            });
        }

        getCoordinates(nodes) {
            const width = $(nodes.label).outerWidth();
            const height = $(nodes.label).outerHeight();
            const borderBottom = parseInt(
                $(nodes.label).css("border-left-width"),
                10
            );
            let { left, top } = $(nodes.label).offset();
            top = top - $(window).scrollTop() + height - borderBottom;
            left = left - $(window).scrollLeft();
            return { width, height, left, top, borderBottom };
        }

        closeDropHandler(event, nodes, resizeCallback) {
            if (!nodes.container.is(event.target) && event.type !== "hide")
                return;
            this.close(nodes, resizeCallback);
        }

        close(nodes, resizeCallback) {
            nodes.container.hide();
            nodes.parent.removeAttr("data-drop-opened");
            $(window).off("scroll", resizeCallback);
            $(window).off("resize", resizeCallback);
        }

        setHandlers() {
            $(
                ".js-dropdown__label, .js-dropdown__icon, .js-dropdown__input"
            ).on("click", this.showDropHandler);

            $.uiDropdown = {
                close: this.close,
                setValue: this.setValue,
            };

            if (this.defaultOpened) {
                $(".js-dropdown__input[data-drop-default-opened]").trigger(
                    "click"
                );
            }
        }

        setValue(value, nodes) {
            nodes.input.val(value);
        }
    }

    let dropdownOpened = new Dropdown({ canBeDefaultOpened: true });
    dropdownOpened.setHandlers();
});
