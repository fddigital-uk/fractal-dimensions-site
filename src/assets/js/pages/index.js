import '../../css/pages/index.scss';
import '../global';
import FractalSlider from '../macros/fractalSlider';
import FadeSlider from '../macros/fadeSlider';
import FrameManager from '../lib/frames';

const slider = new FractalSlider(document.querySelector('.fractal-slider'), 50, 0);
const fadeSlider = new FadeSlider(document.querySelector('.fade-slider'), 0);

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
    {
      next: () => fadeSlider.next(),
    },
    {
      prev: () => fadeSlider.previous(),
      next: () => fadeSlider.next(),
    },
    {
      prev: () => fadeSlider.previous(),
    },
  ];

  const frameManager = new FrameManager('.frames', FRAME_ACTIONS);
});
