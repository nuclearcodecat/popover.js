# popover.js
a noncomplex, customizable javascript library for managing popovers

# features
 - noncomplex :P
 - animation support
 - automatic focus
 - popover hides when clicked on something else
 - keyboard support

# demo
| top-down slide animation                                                                    | sideways curtain animation                                                                  | keyboard control                                                                            |
|---------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| ![topdown](https://github.com/user-attachments/assets/c5a4aeb2-87d4-4c1e-a7c8-60203ad33747) | ![open](https://github.com/user-attachments/assets/b9d02247-faee-4616-8413-e049933b4b15)    | ![kctr](https://github.com/user-attachments/assets/0bfb98e4-ce90-4d88-9439-fcd318d25a14) |


# constructor fields
fields with their names prefixed by `?` are not required
 - `activator`, the element which toggles the popover's visibility on a `click` event
 - `effector`, the actual popover element
 - `?hidden_class`, the class which gets applied to the `effector` after the animation finishes (see notes), defaults to `hidden` (tailwindcss `display: none`)
 - `?animation_open_class`, the class which gets applied to the `effector` after `show()` is triggered (`activator` clicked on, external trigger), defaults to `animate-popover-open`
 - `?animation_close_class`, the class which gets applied to the `effector` after `show()` is triggered (`.popover-close` clicked on, `mouseup` event outside the `effector`), defaults to `animate-popover-closed`

# methods
 - `show()`, shows the popover
 - `hide()`, hides the popover
 - `toggle()`, toggles popover visibility

# notes
 - `animation-duration` has to be present on `effector` during `new Popover` initialization
 - `.popover-focus` is the element that gets automatically focued when popover is shown
 - `.popover-close` is the element that hides the popover when clicked on
 - the script initalizing a popover must be loaded after the dom is loaded for correct operation
 - `popover.js` must be loaded before the script initializing a popover

# example initialization
**tailwindcss is used in the example, it is not essential. you can create a css file with keyframes and classes, and then pass the class names to the constructor**

tailwind config
```
module.exports = {
  [...]
  theme: {
    extend: {
      animation: {
        'popover-open': 'popover_open cubic-bezier(.19,.99,.63,1)',
        'popover-closed': 'popover_closed cubic-bezier(.19,.99,.63,1)',
      },
      keyframes: {
        popover_open: {
          '0%': { opacity: '0', marginTop: '-25px' },
          '100%': { opacity: '1', marginTop: '0' },
        },
        popover_closed: {
          '0%': { opacity: '1', marginTop: '0' },
          '100%': { opacity: '0', marginTop: '-25px' },
        }
      }
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'animate-duration': (value) => ({
            animationDuration: value,
          }),
        },
        { values: theme('transitionDuration') }
      )
    },
  ],
}
```

html
```
<button id="acc-btn">
    sign in
</button>
{# animate-duration requires tailwind plugin - https://www.hyperui.dev/blog/animation-duration-delay-with-tailwindcss #}
<div id="creds-menu" class="hidden absolute top-16 right-0 animate-duration-[0.125s] bg-red-200">
    <button class="popover-close">close</button>
    <form id="creds-form" method="post">
        <div>
            <span>e-mail</span>
            <input class="popover-focus" type="email" name="email" inputmode="email" required>
        </div>
        <div>
            <span>pass</span>
            <input class="text-black py-0.5 px-1 bg-neutral-300 rounded-sm" type="password" name="pass" required>
        </div>
        <button type="submit">login</button>
    </form>
</div>
```

js
```
const acc_btn = document.querySelector('#acc-btn');
const creds_menu = document.querySelector('#creds-menu');
const creds_popover = new Popover({ activator: acc_btn, effector: creds_menu });
```
