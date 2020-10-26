const NAV_DIRECTIONS = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
}

class NavInputController {
  startPos = null;
  endPos = null;

  constructor(callback) {
    this.callback = callback;
    this.init();
  }

  init() {
    window.addEventListener('touchstart', (e) => this.touchStart(e));
    window.addEventListener('touchend', (e) => this.touchEnd(e));
  }

  touchStart(e) {
    this.startPos = e.changedTouches[0];
  }

  touchEnd(e) {
    this.endPos = e.changedTouches[0];
    if (this.endPos.screenY - this.startPos.screenY < 0) {
      this.callback(NAV_DIRECTIONS.UP);
    } else if (this.endPos.screenY - this.startPos.screenY > 0) {
      this.callback(NAV_DIRECTIONS.DOWN);
    }
  }
}

export default NavInputController;
