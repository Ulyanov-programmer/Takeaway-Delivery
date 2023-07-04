let elementsWithHorizontalScroll = document.querySelectorAll(".navmenu__body");
function scrollHorizontally(e) {
  let delta = Math.max(-1, Math.min(1, -e.deltaY || -e.detail));
  e.currentTarget.scrollLeft -= delta * 15;
  e.preventDefault();
}
for (let element of elementsWithHorizontalScroll) {
  element.addEventListener("mousewheel", scrollHorizontally);
  element.addEventListener("DOMMouseScroll", scrollHorizontally);
}
