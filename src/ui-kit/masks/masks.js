$(function () {
    if (!$().inputmask) {
        console.log('Input mask is not connected');
        return;
    }

    $('[data-masktype=date]').inputmask({
        alias: 'datetime',
        inputFormat: 'dd.mm.yyyy',
        clearMaskOnLostFocus: false,
        placeholder: 'ДД.ММ.ГГГГ',
    });
});
