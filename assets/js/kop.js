/* Offgrid energiesystemen – klein logo bij scrollen
   De header blijft bovenaan staan. Zodra je voorbij de eerste schermhelft komt, krimpt het
   logo tot alleen het raster met het ruitje en verdwijnt de tekst.

   De klasse wordt direct in de scroll-handler gezet, niet pas in requestAnimationFrame.
   rAF wordt uitgesteld zolang de tab niet zichtbaar is, en dan loopt de stand één scroll
   achter -- precies wat je niet wilt als iemand wegklikt en terugkomt. En classList.toggle
   met een waarde die al klopt doet niets, dus er valt hier niets te winnen. */
(function () {
  var hdr = document.querySelector('.hdr');
  if (!hdr) return;

  var drempel = 40;   // niet bij 1px: anders flitst het logo bij elk wissewasje

  function bepaal() {
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    hdr.classList.toggle('is-klein', y > drempel);
  }

  window.addEventListener('scroll', bepaal, { passive: true });
  window.addEventListener('resize', bepaal);
  bepaal();   // ook meteen, voor een pagina die al gescrold opent
})();
