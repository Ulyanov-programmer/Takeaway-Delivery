import Tab, { ToggleTabsEvent } from "./modules/tab.src.js";
new Tab({
  btnsSelector: ".tabs-menu__button",
  contentBlocksSelector: ".tabs-menu__item",
  fadeEffect: true,
  buttonsActiveClass: "active",
  contentActiveClass: "active",
  autoHeight: true,
  animationDuration: 500,
  toggleTabsBy: ToggleTabsEvent.Hover
});
