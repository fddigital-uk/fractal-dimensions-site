import '../../css/pages/index.scss';
import '../global';
import FractalSlider from '../macros/fractalSlider';

const slider = new FractalSlider(document.querySelector('.fractal-slider'), 50, 0);

setTimeout(() => slider.next(), 1000);
setTimeout(() => slider.next(), 4000);
setTimeout(() => slider.previous(), 7000);
setTimeout(() => slider.previous(), 10000);
