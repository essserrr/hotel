$(function () {
    if (!$().collapsable) {
        console.log("Collapsible doesn't connected");
        return;
    }
    $(".js-collapse").collapsable({
        fx: "slide",
        fxDuration: 300,

        control: ".ui-collapse__label",
        box: ".ui-collapse__element",
    });
});
