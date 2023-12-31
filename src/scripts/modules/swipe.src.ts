import { isNullOrWhiteSpaces } from './general.js'

enum SwipeSide {
  Top,
  Left,
  Bottom,
  Right,
}
export enum ChangePlane {
  ToLeft,
  ToRight,
  ToTop,
  ToBottom,
}
enum ChangeOrientation {
  Vertical,
  Horizontal,
}

interface SwipeElementArgs {
  /** The element by which the swipe activates the opening of the menu. */
  touchStartAreaSelector: string
  /** 
    The element that will appear when swiping.
  */
  swipeableElementSelector: string
  /** Which way you need to swipe to make the menu appear. */
  changePlane: ChangePlane
  /** 
    The higher or lower the value, the more or less you need to swipe in order 
    for the menu to appear. Usually the values range from 0.5 to 0.7.
  */
  swipeSensitivity: number
  /** The maximum width of the window when the swipe will work. */
  maxWorkWidth: number
}

export default class SwipeElement {
  private touchAreaElement: HTMLElement
  private swipeableElement: HTMLElement

  private startX: number = 0
  private startY: number = 0
  private deltaX: number = 0
  private deltaY: number = 0
  private changePlane: ChangePlane
  private changeOrientation: ChangeOrientation
  private currentSide: SwipeSide

  private minSwipeWidth: number
  private minSwipeHeight: number
  private elementStartX: number
  private elementStartY: number
  private swipeSensitivity: number
  private maxWorkWidth: number


  constructor(arg: SwipeElementArgs) {
    if (isNullOrWhiteSpaces(arg.touchStartAreaSelector, arg.swipeableElementSelector))
      throw new Error('[SWIPE-ELEMENT Some selector is null or white spaces!]')

    window.addEventListener(`resize`, () => {
      this.checkMaxWorkWidth()
    })

    this.touchAreaElement = document.querySelector(arg.touchStartAreaSelector)
    this.touchAreaElement.style.touchAction = 'none'
    this.touchAreaElement.style.cursor = 'grab'

    this.swipeableElement = document.querySelector(arg.swipeableElementSelector)
    this.elementStartX = this.getTranslateState('x')
    this.elementStartY = this.getTranslateState('y')
    this.swipeSensitivity = arg.swipeSensitivity
    this.maxWorkWidth = arg.maxWorkWidth

    this.minSwipeWidth = Math.trunc(this.swipeableElement.clientWidth * this.swipeSensitivity)
    this.minSwipeHeight = Math.trunc(this.swipeableElement.clientHeight * this.swipeSensitivity)

    this.changePlane = arg.changePlane
    if (this.changePlane == ChangePlane.ToLeft || this.changePlane == ChangePlane.ToRight) {
      this.changeOrientation = ChangeOrientation.Horizontal
    } else {
      this.changeOrientation = ChangeOrientation.Vertical
    }

    this.checkMaxWorkWidth()
    this.touchAreaElement.addEventListener('pointerdown', (e) => {
      if (e.button != 0) return

      this.swipeStart(e)

      window.addEventListener('pointermove', this.pointerMoveHandler, false)

      window.addEventListener('pointerup', this.pointerUpHandler, false)
    }, false)
  }
  private pointerMoveHandler = (function (e: PointerEvent) {
    this.swipeableElement.style.userSelect = 'none'
    this.touchAreaElement.style.cursor = 'grabbing'

    this.swipeMove(e)
  }).bind(this)

  private pointerUpHandler = (function () {
    this.swipeableElement.style.userSelect = ''
    this.touchAreaElement.style.cursor = 'grab'

    this.swipeEnd(0, false, true)
  }).bind(this)


  private swipeStart(e: PointerEvent) {
    this.startX = e.clientX
    this.startY = e.clientY
  }
  private swipeMove(e: PointerEvent) {
    if (this.changeOrientation == ChangeOrientation.Horizontal) {
      this.deltaX = this.startX - e.clientX
      this.currentSide = this.deltaX >= 0 ? SwipeSide.Left : SwipeSide.Right

      this.deltaX = Math.abs(this.deltaX)

      this.moveX()
    }
    else if (this.changeOrientation == ChangeOrientation.Vertical) {
      this.deltaY = this.startY - e.clientY
      this.currentSide = this.deltaY >= 0 ? SwipeSide.Top : SwipeSide.Bottom

      this.deltaY = Math.abs(this.deltaY)

      this.moveY()
    }
  }
  private swipeEnd(delta: number, changeTo: boolean, isSwipeEnd?: boolean) {
    if (this.changeOrientation == ChangeOrientation.Horizontal && delta > this.minSwipeWidth
      || this.changeOrientation == ChangeOrientation.Vertical && delta > this.minSwipeHeight) {

      changeTo ? this.swipeableElement.classList.add('active') : this.swipeableElement.classList.remove('active')

      this.touchAreaElement.classList.toggle('active')

      this.swipeableElement.style.transform = ``
      window.removeEventListener('pointermove', this.pointerMoveHandler, false)
    }
    if (isSwipeEnd) {
      this.swipeableElement.style.transform = ``
      window.removeEventListener('pointermove', this.pointerMoveHandler, false)
    }
  }

  private moveX(delta: number = this.deltaX) {
    if (!this.checkSwipableElementContainActive()) {
      if (this.changePlane == ChangePlane.ToLeft && this.currentSide == SwipeSide.Right)
        return
      if (this.changePlane == ChangePlane.ToRight && this.currentSide == SwipeSide.Left)
        return

      let result: number

      if (this.changePlane == ChangePlane.ToRight) {
        result = this.elementStartX + delta
      } else {
        result = this.elementStartX - delta
      }


      this.swipeableElement.style.transform = `translate3d(
				${result}px, 
				${this.getTranslateState('Y')}px, 
				0)`

      this.swipeEnd(delta, true)
    }
    else {
      if (this.changePlane == ChangePlane.ToLeft && this.currentSide == SwipeSide.Left)
        return
      if (this.changePlane == ChangePlane.ToRight && this.currentSide == SwipeSide.Right)
        return

      let operator = this.changePlane == ChangePlane.ToLeft ? '+' : '-'
      let result = `${operator}${delta}`

      this.swipeableElement.style.transform = `translate3d(
				${result}px,
				${this.getTranslateState('Y')}px, 
				0)`

      this.swipeEnd(delta, false)
    }
  }
  private moveY(delta: number = this.deltaY) {
    if (!this.checkSwipableElementContainActive()) {
      if (this.changePlane == ChangePlane.ToBottom && this.currentSide == SwipeSide.Top)
        return
      if (this.changePlane == ChangePlane.ToTop && this.currentSide == SwipeSide.Bottom)
        return

      let result: number

      if (this.changePlane == ChangePlane.ToBottom) {
        result = this.elementStartY + delta
      } else {
        result = this.elementStartY - delta
      }

      this.swipeableElement.style.transform = `translate3d(
				${this.getTranslateState('x')}px, 
				${result}px, 
				0)`

      this.swipeEnd(delta, true)
    }
    else {
      if (this.changePlane == ChangePlane.ToTop && this.currentSide == SwipeSide.Top) return
      if (this.changePlane == ChangePlane.ToBottom && this.currentSide == SwipeSide.Bottom) return

      let operator = this.changePlane == ChangePlane.ToBottom ? '-' : '+'
      let result = `${operator}${delta}`

      this.swipeableElement.style.transform = `translate3d(
				${this.getTranslateState('x')}px, 
				${result}px, 
				0)`

      this.swipeEnd(delta, false)
    }
  }


  private getTranslateState(xOrY: string = 'x') {
    let valueIndex = xOrY == 'x' ? 4 : 5
    let state

    // get a value of transformX or transformY of swipeableElement
    try {
      state = parseInt(window.getComputedStyle(this.swipeableElement)
        .getPropertyValue("transform")
        .match(/(-?[0-9\.]+)/g)[valueIndex])
    } catch (error) {
      state = 0
    }

    return state
  }
  private checkBaseStateIsNegative(xOrY: string = 'x') {
    let translateX = this.getTranslateState(xOrY)

    let xStateIsNegative = translateX >= 0 ? false : true

    return xStateIsNegative
  }
  private checkSwipableElementContainActive() {
    return this.swipeableElement.classList.contains('active')
  }
  private checkMaxWorkWidth() {
    if (window.innerWidth <= this.maxWorkWidth) {
      this.touchAreaElement.style.pointerEvents = 'auto'
    } else {
      this.touchAreaElement.style.pointerEvents = 'none'
    }
  }
}