import gsap, { TimelineLite } from 'gsap';

class FractalSlider {
  constructor(element, zIndexStart, currentPos) {
    this.element = element;
    this.currentPos = currentPos ?? 0;
    this.zIndexStart = zIndexStart ?? 0;
    this.inProgress = false;
    this.init();
  }

  init() {
    this.slides = Array.from(this.element.children);
    this.setZIndex();
    this.slideTo(this.currentPos + 1);
  }

  previous() {
    return this.move(-1);
  }

  next() {
    return this.move(1);
  }

  move(amount) {
    if (this.inProgress) {
      return false;
    }
    this.inProgress = true;
    this.currentPos += amount;
    this.setZIndex();

    const tl = new TimelineLite({
      onComplete: () => {
        this.inProgress = false;
      },
    });

    tl.addLabel('start');

    this.slides.forEach((s, i) => {
      const transforms = this.getSlideTransforms(i, amount);
      tl.to(s, transforms, 'start');
    });

    tl.duration(1);
    return true;
  }

  getSlideTransforms(slideNumber, change = 0) {
    let x = 0;
    let y = 0;
    let scale = 1;
    let blur = '0px';
    let opacity = 1;
    let delay = 0;
    let duration = 2;

    if (slideNumber !== this.currentPos) {
      scale = 0.8;
      blur = '4px';
      opacity = 0;
      duration = ((change > 0 && slideNumber < this.currentPos)
        || (change < 0 && slideNumber > this.currentPos)) ? 1 : 2;
      delay = 0;
    }

    /* This slide is left of main slide */
    if (slideNumber < this.currentPos) {
      x = '-100%';
      y = '-25%';
    }

    /* This slide is right of main slide */
    if (slideNumber > this.currentPos) {
      x = '100%';
      y = '-25%';
    }

    if (Math.abs(this.currentPos - slideNumber) === 1) {
      opacity = 0.7;
      delay = ((change < 0 && slideNumber < this.currentPos)
        || (change > 0 && slideNumber > this.currentPos)) ? 1 : 0;
      duration = ((change < 0 && slideNumber < this.currentPos)
        || (change > 0 && slideNumber > this.currentPos)) ? 1 : 2;
    }

    return {
      x,
      y,
      scale,
      duration,
      filter: `blur(${blur}) opacity(${opacity})`,
      delay,
    };
  }

  setZIndex() {
    this.zIndexMiddle = Math.ceil(this.slides.length / 2);
    this.slides.slice(0, this.zIndexMiddle)
      .forEach((el, i) => {
        el.style.zIndex = this.zIndexStart + i;
      });

    this.slides.slice(this.currentPos, this.slides.length)
      .forEach((el, i) => {
        const value = this.zIndexStart + this.currentPos - i;
        el.style.zIndex = value.toString();
      });
  }

  slideTo(number) {
    this.currentPos = number - 1;
    this.slides.forEach((s, i) => {
      const transforms = this.getSlideTransforms(i);
      gsap.set(s, transforms);
    });
  }
}

export default FractalSlider;
