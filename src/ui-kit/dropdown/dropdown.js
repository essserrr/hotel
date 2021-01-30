import { Dropdown } from "./Dropdown/Dropdown";

$(function () {
    let dropdownOpened = new Dropdown({ canBeDefaultOpened: true });
    dropdownOpened.setHandlers();
});
