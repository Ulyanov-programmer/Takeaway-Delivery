import { PermanentScrollPaddingItem } from "./modules/autoScrollPadding.src.js";
new PermanentScrollPaddingItem({
  selectedElement: "header",
  parent: "html",
  setInCssVariable: "--scroll-padding-top"
});
