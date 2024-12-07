class Popover {
    constructor({
        activator,
        effector,
        hidden_class = 'hidden',
        animation_open_class = 'animate-popover-open',
        animation_close_class = 'animate-popover-closed',
    }) {
        if (!effector) {
            throw Error('no effector provided');
        }
        if (!activator) {
            throw Error('no activator provided')
        }
        this.effector = effector;
        this.activator = activator;
        this.hidden_class = hidden_class;
        this.animation_open_class = animation_open_class;
        this.animation_close_class = animation_close_class;
        this.focus_element = this.effector.querySelector('.popover-focus');
        this.close_element = this.effector.querySelector('.popover-close');

        this.hidden = true;
        this.is_mouseover_activator = false;
        this.animation_duration = 0.0;

        this.init();
    }

    show() {
        this.effector.classList.add(this.animation_open_class);
        this.effector.classList.remove(this.animation_close_class);
        this.effector.classList.remove(this.hidden_class);
        this.hidden = false;

        if (this.focus_element) this.focus_element.focus();

        document.addEventListener('keydown', this.handle_keydown.bind(this));
    }
    
    hide() {
        this.effector.classList.remove(this.animation_open_class);
        this.effector.classList.add(this.animation_close_class);
        setTimeout(() => {
            this.effector.classList.add(this.hidden_class);
            this.hidden = true;

            this.activator.focus();

            document.removeEventListener('keydown', this.handle_keydown.bind(this));
        }, this.animation_duration * 1000);
    }

    toggle() {
        if (this.hidden) {
            this.show();
        } else {
            this.hide();
        }
    }

    handle_keydown(event) {
        if (event.key === 'Escape') {
            this.hide();
        }
    }

    init() {
        this.effector.classList.add(this.hidden_class);

        this.animation_duration = parseFloat(getComputedStyle(this.effector).getPropertyValue('animation-duration'));

        this.activator.addEventListener('click', () => {
            this.toggle();
        });

        this.activator.addEventListener('mouseover', () => {
            this.is_mouseover_activator = true;
        });

        this.activator.addEventListener('mouseleave', () => {
            this.is_mouseover_activator = false;
        });

        document.addEventListener('mouseup', (event) => {
            if (!this.effector.contains(event.target) && !this.is_mouseover_activator) {
                this.hide();
            }
        });

        if (this.close_element) {
            this.close_element.addEventListener('click', () => {
                this.hide();
            });
        }
    }
}