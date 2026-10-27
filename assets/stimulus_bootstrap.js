import { startStimulusApp } from '@symfony/reprise/stimulus';
import PermanentVueController from './vue/PermanentVueController.js';

const app = startStimulusApp();
app.register('symfony--ux-vue--vue', PermanentVueController);
// register any custom, 3rd party controllers here
// app.register('some_controller_name', SomeImportedController);
