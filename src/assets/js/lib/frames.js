import gsap, { TimelineLite } from 'gsap';
import NavInputController from './navInputController';

class FrameManager {
  NEXT_FRAME = 'NEXT';
  PREVIOUS_FRAME = 'PREVIOUS';

  FRAME_ACTIONS = {
    ' ': this.NEXT_FRAME,
    Enter: this.NEXT_FRAME,
    ArrowDown: this.NEXT_FRAME,
    ArrowRight: this.NEXT_FRAME,
    ArrowUp: this.PREVIOUS_FRAME,
    ArrowLeft: this.PREVIOUS_FRAME,
    PageUp: this.PREVIOUS_FRAME,
    PageDown: this.NEXT_FRAME,
  };

  constructor(frameContainer, frameActions) {
    this.container = typeof (frameContainer) === 'string' ? document.querySelector(frameContainer) : frameContainer;
    this.frames = Array.from(this.container.querySelectorAll('.frames__frame'));
    this.nextFrame = this.container.querySelector('.frames__next');
    this.currentFrame = 1;
    this.currentActionIndex = 0;
    this.actions = frameActions;
    this.inProgress = false;
    this.init();
  }

  init() {
    window.addEventListener('keydown', (e) => {
      switch (this.FRAME_ACTIONS[this.checkKey(e)]) {
        case this.PREVIOUS_FRAME:
          this.previous();
          break;
        case this.NEXT_FRAME:
          this.next();
          break;
        default:
      }
    });

    this.inputController = new NavInputController(this.handleMove.bind(this));

    this.nextFrame.addEventListener('click', () => this.next());

    this.frames
      .forEach((s, i) => {
        let top = 0;
        const frameNumber = i + 1;
        if (this.currentFrame < frameNumber) {
          top = '100vh';
        } else if (this.currentFrame > frameNumber) {
          top = '-100vh';
        }
        gsap.set(s, { top });
      });
  }

  handleMove(direction) {
    if (direction === 'UP') {
      this.next();
    } else if (direction === 'DOWN') {
      this.previous();
    }
  }

  adjustActionIndex(amount) {
    this.currentActionIndex += amount;
  }

  previous() {
    if (this.currentActionIndex - 1 < 0) {
      return;
    }

    this.runAction(this.actions[this.currentActionIndex].prev, -1);
  }

  next() {
    if (this.currentActionIndex + 1 >= this.actions.length) {
      return;
    }

    this.runAction(this.actions[this.currentActionIndex].next, 1);
  }

  runAction(action, adjust) {
    if (this.inProgress || (action !== undefined && !action())) {
      return;
    } else if (action === undefined) {
      this.handleFrame(this.currentFrame + adjust);
    }
    this.currentActionIndex += adjust;
  }

  handleFrame(frame) {
    if (frame <= 0 || frame > this.frames.length || this.inProgress) {
      return;
    }

    const tl = new TimelineLite({
      onComplete: () => {
        this.inProgress = false;
      },
    });

    this.inProgress = true;
    tl.addLabel("start");
    tl.to(this.frames[frame - 2], {
      top: '-100vh',
      duration: 1
    }, "start");
    tl.to(this.frames[frame - 1], {
      top: '0',
      duration: 1
    }, "start");
    tl.to(this.frames[frame], {
      top: '100vh',
      duration: 1
    }, "start");
    this.currentFrame = frame;
  }

  checkKey(e) {
    const event = window.event ? window.event : e;
    return event.key;
  }
}

export default FrameManager;
