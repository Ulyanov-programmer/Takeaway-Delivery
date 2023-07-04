import { AutoScrollPadding, PermanentScrollPaddingItem } from './modules/autoScrollPadding.src.js'
/**
  Need to install scroll-padding and scroll-behavior, but too lazy to bother, or is the element constantly changing? Initialize AutoScrollPadding and pass the parameters, he will do everything himself.
*/
new PermanentScrollPaddingItem({
  selectedElement: 'header',
  parent: 'html',
  setInCssVariable: '--scroll-padding-top'
})