import '../../css/pages/index.scss';
import '../global';
import FractalSlider from '../macros/fractalSlider';
import FadeSlider from '../macros/fadeSlider';
import FrameManager from '../lib/frames';

window.addEventListener('DOMContentLoaded', () => {
  const slider = new FractalSlider(document.querySelector('.fractal-slider'), 50, 0);
  const fadeSlider = new FadeSlider(document.querySelector('.fade-slider'));

  const FRAME_ACTIONS = [
    { frame: 1 },
    {
      frame: 2,
      next: () => slider.next(),
      setStep: () => slider.slideTo(1),
    },
    {
      frame: 2,
      prev: () => slider.previous(),
      next: () => slider.next(),
      setStep: () => slider.slideTo(2),
    },
    {
      frame: 2,
      prev: () => slider.previous(),
      setStep: () => slider.slideTo(3),
    },
    {
      frame: 3,
      next: () => fadeSlider.next(),
      setStep: () => fadeSlider.slideTo(1),
    },
    {
      frame: 3,
      prev: () => fadeSlider.previous(),
      next: () => fadeSlider.next(),
      setStep: () => fadeSlider.slideTo(2),
    },
    {
      frame: 3,
      prev: () => fadeSlider.previous(),
      setStep: () => fadeSlider.slideTo(3),
    },
    {
      frame: 4,
    },
  ];

  const frameManager = new FrameManager('.frames', FRAME_ACTIONS);

  const inputs = document.querySelector('input, textarea');

  Array.from(inputs)
    .forEach(i => {
      i.addEventListener('focus', e => e.preventDefault());
      i.addEventListener('focusin', e => e.preventDefault());
    });
});
