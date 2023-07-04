import Sidebar from './modules/sidebar.src.js'
import { ChangePlane } from './modules/swipe.src.js'
/*
  The buttons that open a particular sidebar should contain [data-toggle-sidebar-id='sidebarId']
*/

new Sidebar({
  idOfSidebar: 'cart-list',
  buttonActiveClass: 'active',
  sidebarActiveClass: 'active',

  swipeElementOptions: {
    // swipe fields should contain [data-swipe-element='selectorOfSidebar']
    changePlane: ChangePlane.ToLeft,
    swipeSensitivity: 0.5,
    maxWorkWidth: 9990,
  }
})