const NAV_DIRECTIONS = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

class NavInputController {
  startPos = null;
  endPos = null;

  constructor(callback) {
    this.callback = callback;
    this.init();
    this.ticking = false;
  }

  init() {
    window.addEventListener('touchstart', (e) => this.touchStart(e));
    window.addEventListener('touchend', (e) => this.touchEnd(e));
    let last_known_scroll_position = window.scrollY;
    document.onwheel = (e) => {
      if (e.srcElement === document) return;
      this.scrollMove(e.deltaY);
    };
    let ticking = false;
    window.addEventListener('scroll', (e) => {
      if (e.srcElement === document) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.scrollMove(window.scrollY - last_known_scroll_position);
          last_known_scroll_position = window.scrollY;
          ticking = false;
        });

        ticking = true;
      }
    });
  }

  scrollMove(amount) {
    if (!this.ticking) {
      if (amount > 1) {
        this.ticking = true;
        this.callback(NAV_DIRECTIONS.UP);
      } else if (amount < -1) {
        this.ticking = true;
        this.callback(NAV_DIRECTIONS.DOWN);
      }
      if (this.ticking) {
        setTimeout(() => {
          this.ticking = false;
        }, 2000);
      }
    }
  }

  touchStart(e) {
    this.startPos = e.changedTouches[0];
  }

  touchEnd(e) {
    if (e.target.tagName.toUpperCase() === 'TEXTAREA') return;
    this.endPos = e.changedTouches[0];
    if (this.endPos.screenY - this.startPos.screenY < 0) {
      this.callback(NAV_DIRECTIONS.UP);
    } else if (this.endPos.screenY - this.startPos.screenY > 0) {
      this.callback(NAV_DIRECTIONS.DOWN);
    }
  }
}

export default NavInputController;
