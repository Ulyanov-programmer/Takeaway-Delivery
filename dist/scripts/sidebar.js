import Sidebar from "./modules/sidebar.src.js";
import { ChangePlane } from "./modules/swipe.src.js";
new Sidebar({
  idOfSidebar: "cart-list",
  buttonActiveClass: "active",
  sidebarActiveClass: "active",
  swipeElementOptions: {
    changePlane: ChangePlane.ToLeft,
    swipeSensitivity: 0.5,
    maxWorkWidth: 9990
  }
});
