$(function () {
    if (!$().bxSlider) {
        console.log("Bx slider is not connected");
        return;
    }
    $(".js-image-slider").bxSlider();
});
