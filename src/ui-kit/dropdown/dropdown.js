$(document).ready(function () {
    class Dropdown {
        constructor() {
            this.getDropdownNodes = this.getDropdownNodes.bind(this);
            this.getCoordinates = this.getCoordinates.bind(this);
            this.setElementPosition = this.setElementPosition.bind(this);

            this.show = this.show.bind(this);
            this.close = this.close.bind(this);

            this.showDropHandler = this.showDropHandler.bind(this);
            this.closeDropHandler = this.closeDropHandler.bind(this);

            this.setValue = this.setValue.bind(this);
        }

        getDropdownNodes() {
            this.parent = $(this.nodeClicked).parent(".ui-dropdown");
            this.label = this.parent.find(".js-dropdown__label");
            this.container = this.parent.find(".js-dropdown__container");
            this.element = this.parent.find(".ui-dropdown__element");
        }

        getCoordinates() {
            const width = $(this.label).outerWidth();
            const height = $(this.label).outerHeight();
            const borderBottom = parseInt(
                $(this.label).css("border-left-width"),
                10
            );
            let { left, top } = $(this.label).offset();
            top = top - $(window).scrollTop() + height - borderBottom;
            left = left - $(window).scrollLeft();
            return { width, height, left, top, borderBottom };
        }

        setElementPosition() {
            //find label parameters
            const coordinates = this.getCoordinates();
            //set current element style
            this.element.css({
                width: coordinates.width,
                top: coordinates.top,
                left: coordinates.left,
            });
        }

        show() {
            this.getDropdownNodes();
            this.parent.attr("data-drop-opened", true);
            this.setElementPosition();
            window.addEventListener("scroll", this.setElementPosition);
            window.addEventListener("resize", this.setElementPosition);
            this.container.show();
        }

        close() {
            this.container.hide();
            this.parent.removeAttr("data-drop-opened");
            $(window).off("scroll", this.setElementPosition);
            $(window).off("resize", this.setElementPosition);
        }

        showDropHandler(event) {
            this.nodeClicked = event.target;
            this.show();
        }
        closeDropHandler(event) {
            if (!this.container.is(event.target)) return;
            this.close();
        }

        setHandlers() {
            $(".js-dropdown__label, .js-dropdown__icon").on(
                "click",
                this.showDropHandler
            );
            $(".js-dropdown__container").on("click", this.closeDropHandler);
        }

        setValue(value) {
            this.label.val(value);
        }
    }

    let dropdownOpened = new Dropdown();
    dropdownOpened.setHandlers();
});
