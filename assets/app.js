import { registerVueControllerComponents } from '@symfony/ux-vue';
import './stimulus_bootstrap.js';
import './styles/app.css';
import './transitions.js';

registerVueControllerComponents(import.meta.glob('./vue/controllers/**/*.vue', { eager: true }));
