import VueController from '@symfony/ux-vue/dist/render_controller.js';

let rendering = false;
const deferred = new Set();
document.addEventListener('turbo:before-render', () => { rendering = true; });
document.addEventListener('turbo:render', () => {
    rendering = false;
    for (const controller of deferred) {
        if (!controller.element.isConnected) {
            controller.disconnect();
        }
    }
    deferred.clear();
});

// Turbo moves permanent elements during full-body/history renders. Stimulus
// reports a disconnect/connect even though the same element is back in the DOM.
export default class extends VueController {
    connect() {
        if (this.app && this.element.hasAttribute('data-turbo-permanent')) {
            return;
        }

        super.connect();
    }

    disconnect() {
        if (this.element.hasAttribute('data-turbo-permanent') && (rendering || this.element.isConnected)) {
            deferred.add(this);
            return;
        }

        super.disconnect();
        this.app = null;
    }
}
