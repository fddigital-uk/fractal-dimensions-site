import gsap from 'gsap';

class FractalSlider {
  constructor(element, zIndexStart, currentPos) {
    this.element = element;
    this.currentPos = currentPos ?? 0;
    this.zIndexStart = zIndexStart ?? 0;
    this.init();
  }

  init() {
    this.slides = Array.from(this.element.children);
    this.setZIndex();

    this.slides.forEach((s, i) => {
      const info = this.getSlideTransforms(i);
      s.style.transform = `translateX(${info.x}) translateY(${info.y}) scale(${info.scale})`;
      s.style.filter = `blur(${info.blur}) opacity(${info.opacity})`;
    });
  }

  previous() {
    this.move(-1);
  }

  next() {
    this.move(1);
  }

  move(amount) {
    this.currentPos += amount;
    this.setZIndex();
    this.slides.forEach((s, i) => {
      const info = this.getSlideTransforms(i, amount);
      gsap.to(s, {
        x: info.x,
        y: info.y,
        scale: info.scale,
        duration: info.duration,
        filter: `blur(${info.blur}) opacity(${info.opacity})`,
        delay: info.delay,
      });
    });
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
      duration = ((change > 0 && slideNumber < this.currentPos) || (change < 0 && slideNumber > this.currentPos)) ? 1 : 2;
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
      delay = ((change < 0 && slideNumber < this.currentPos) || (change > 0 && slideNumber > this.currentPos)) ? 1 : 0;
      duration = ((change < 0 && slideNumber < this.currentPos) || (change > 0 && slideNumber > this.currentPos)) ? 2 : 2;
    }

    return {
      x,
      y,
      scale,
      blur,
      opacity,
      delay,
      duration,
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
}

export default FractalSlider;
