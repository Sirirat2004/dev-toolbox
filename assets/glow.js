(function () {
  var glow = document.getElementById('cursor-glow');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!glow || !finePointer.matches || reducedMotion.matches) return;

  function placeAndShow(event) {
    var size = glow.getBoundingClientRect().width;
    var x = event.clientX - size / 2;
    var y = event.clientY - size / 2;
    glow.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
    glow.classList.add('is-visible');
  }

  window.addEventListener('pointerenter', placeAndShow, { passive: true });
  window.addEventListener('pointermove', placeAndShow, { passive: true });
  window.addEventListener('pointerout', function (event) {
    if (!event.relatedTarget) glow.classList.remove('is-visible');
  }, { passive: true });
  window.addEventListener('blur', function () { glow.classList.remove('is-visible'); });

  function updateMotionAvailability() {
    if (reducedMotion.matches || !finePointer.matches) glow.classList.remove('is-visible');
  }
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', updateMotionAvailability);
  if (finePointer.addEventListener) finePointer.addEventListener('change', updateMotionAvailability);
})();
