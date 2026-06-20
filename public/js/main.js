'use strict';

// Mobile nav toggle with accessible state + outside-click / Escape close.
(function () {
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');
  if (!toggle || !nav) return;

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  // Close the drawer when a link is tapped (mobile).
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a') && window.matchMedia('(max-width: 860px)').matches) {
      setOpen(false);
    }
  });

  // Reset state when resizing up to desktop.
  window.addEventListener('resize', function () {
    if (!window.matchMedia('(max-width: 860px)').matches) setOpen(false);
  });
})();
