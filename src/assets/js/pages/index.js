import '../../css/pages/index.scss';
import '../global';
import FractalSlider from '../macros/fractalSlider';
import FrameManager from '../lib/frames';

const slider = new FractalSlider(document.querySelector('.fractal-slider'), 50, 0);

/*
setTimeout(() => slider.next(), 3000);
setTimeout(() => slider.next(), 5500);
setTimeout(() => slider.previous(), 8000);
setTimeout(() => slider.previous(), 10500);
*/

window.addEventListener('DOMContentLoaded', () => {

  const FRAME_ACTIONS = [
    {},
    {
      next: () => slider.next(),
      setStep: () => slider.slideTo(1),
    },
    {
      prev: () => slider.previous(),
      next: () => slider.next(),
      setStep: () => slider.slideTo(2),
    },
    {
      prev: () => slider.previous(),
      setStep: () => slider.slideTo(3),
    },
  ];

  const frameManager = new FrameManager('.frames', FRAME_ACTIONS);
});
