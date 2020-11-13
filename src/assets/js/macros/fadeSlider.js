import gsap, { TimelineLite } from 'gsap';

class FadeSlider {
  constructor(element, currentPos) {
    this.element = element;
    this.currentPos = currentPos || 1;
    this.inProgress = false;
    this.titlesElement = null;
    this.init();
  }

  init() {
    this.slides = Array.from(this.element.querySelector('.fade-slider__slides').children);
    this.titlesElement = this.element.querySelector('.fade-slider__titles');
    this.slides.forEach((s, i) => {
      const el = document.createElement('h2');
      el.innerText = s.dataset.title;
      this.titlesElement.append(el);
    });
    this.slideTo(this.currentPos);
  }

  previous() {
    return this.move(-1);
  }

  next() {
    return this.move(1);
  }

  move(amount) {
    return this.slideTo(this.currentPos + amount);
  }

  slideTo(number) {
    this.titlesElement.children.forEach((s, i) => {
      if (i + 1 === number) {
        s.classList.remove('fade-slider__titles--inactive');
        s.classList.add('fade-slider__titles--active');
      } else {
        s.classList.add('fade-slider__titles--inactive');
        s.classList.remove('fade-slider__titles--active');
      }
    });

    this.slides.forEach((s, i) => {
      if (i + 1 === number) {
        s.classList.remove('fade-slider__slides--inactive');
        s.classList.add('fade-slider__slides--active');
      } else {
        s.classList.add('fade-slider__slides--inactive');
        s.classList.remove('fade-slider__slides--active');
      }
    });

    this.currentPos = number;

    return true;
  }
}

export default FadeSlider;
