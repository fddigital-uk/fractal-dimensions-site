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
    this.nextFrameButton = this.container.querySelector('.frames__next');
    this.currentFrame = 1;
    this.currentActionIndex = 0;
    this.actions = frameActions;
    this.inProgress = false;
    this.init();
  }

  init() {
    this.setUpListeners();
    this.inputController = new NavInputController(this.handleMove.bind(this));
    this.initializeFrames();
    if (location.hash) {
      this.handleHashChange();
    }
  }

  initializeFrames() {
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

  setUpListeners() {
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

    window.addEventListener('hashchange', (e) => {
      this.handleHashChange(e);
    });

    Array.from(document.querySelectorAll('a[href^="#"]'))
      .forEach(el => {
        el.addEventListener('click',
          function (e) {
            if (e.preventDefault) {
              e.preventDefault();
            } else {
              e.returnValue = false;
            }

            window.location.hash = el.href;
          });
      });

    this.nextFrameButton.addEventListener('click', () => this.next());
  }

  handleHashChange(e) {
    const number = parseInt(location.hash.split('-')
      .pop());
    if (isNaN(number)) {
      return;
    }
    const frame = this.actions.find(f => f.frame === number);
    if (!frame) {
      return;
    }
    this.currentActionIndex = this.actions.indexOf(frame);
    this.handleFrame(frame.frame, false);
    window.location.hash = '';
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

  setUpPreviousAndNextSlides(frame) {
    const prevFrame = this.actions.filter(f => f.frame === frame - 1)
      .pop();
    const nextFrame = this.actions.filter(f => f.frame === frame + 1)
      .shift();

    if (prevFrame && prevFrame.setStep) {
      prevFrame.setStep();
    }
    if (nextFrame && nextFrame.setStep) {
      nextFrame.setStep();
    }
  }

  handleFrame(frame, animate = true) {
    if (frame <= 0 || frame > this.frames.length || this.inProgress) {
      return;
    }

    this.setUpPreviousAndNextSlides(frame);

    if (frame === this.frames.length) {
      this.nextFrameButton.classList.add('hidden');
    } else {
      this.nextFrameButton.classList.remove('hidden');
    }

    console.log(this.actions[this.currentActionIndex]);
    if (this.actions[this.currentActionIndex].onStep) {
      console.log("Action Step");
      this.actions[this.currentActionIndex].onStep();
    }

    const tl = new TimelineLite({
      onComplete: () => {
        this.inProgress = false;
      },
    });

    this.frames.forEach((f, i) => {
      if (animate && i + 1 === this.currentFrame) {
        return;
      } else if (!animate && i + 1 === frame) {
        gsap.set(f, { top: '0' });
        return;
      }
      gsap.set(f, { top: (i + 1 < this.currentFrame ? '-100vh' : '100vh') });
    });

    if (animate) {
      this.inProgress = true;
      tl.addLabel('start');
      tl.to(this.frames[frame - 2], {
        top: '-100vh',
        duration: 1
      }, 'start');
      tl.to(this.frames[frame - 1], {
        top: '0',
        duration: 1
      }, 'start');
      tl.to(this.frames[frame], {
        top: '100vh',
        duration: 1
      }, 'start');
    }

    this.currentFrame = frame;
  }

  checkKey(e) {
    const event = window.event ? window.event : e;
    return event.key;
  }
}

export default FrameManager;
