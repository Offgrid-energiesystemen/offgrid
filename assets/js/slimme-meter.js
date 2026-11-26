// Bestelformulier: stuurt de gegevens naar de betaaldienst en gaat daarna
// door naar de Mollie-checkout. De dienst maakt de betaling aan en geeft de
// checkout-URL terug; wij sturen de bezoeker daarheen.
//
// De dienst verwacht deze velden: naam, email, telefoon, adres, postcode,
// plaats en akkoord. Wijkt een naam af, dan weigert hij de bestelling met
// een 422 en blijft de bezoeker op deze pagina staan.
(function () {
  'use strict';

  // Lokaal testen praat met de lokale dienst; online met de Funnel-URL.
  var lokaal = location.hostname === '127.0.0.1' || location.hostname === 'localhost';
  var EIND = lokaal
    ? 'http://127.0.0.1:8446/api/bestelling'
    : 'https://offgrid-vm.tailba5fd4.ts.net/betaal/api/bestelling';

  var form = document.getElementById('bestelform');
  var knop = document.getElementById('bestelknop');
  var fout = document.getElementById('bestelfout');
  if (!form || !knop || !fout) return;

  var OPSCHRIFT = knop.textContent;

  function meld(tekst) {
    fout.textContent = tekst;
    fout.hidden = false;
  }

  function herstel() {
    knop.disabled = false;
    knop.textContent = OPSCHRIFT;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    fout.hidden = true;

    // Laat de browser eerst zijn eigen controle doen (verplichte velden).
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var gegevens = {
      naam: form.naam.value.trim(),
      email: form.email.value.trim(),
      telefoon: form.telefoon.value.trim(),
      adres: form.adres.value.trim(),
      postcode: form.postcode.value.trim(),
      plaats: form.plaats.value.trim(),
      akkoord: form.akkoord.checked
    };

    knop.disabled = true;
    knop.textContent = 'Even geduld…';

    fetch(EIND, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gegevens)
    })
      .then(function (r) {
        return r.json().then(function (d) { return { ok: r.ok, status: r.status, data: d }; });
      })
      .then(function (uit) {
        if (!uit.ok || !uit.data.checkout) {
          if (uit.status === 429) {
            meld('Er zijn net al meerdere bestellingen gedaan met dit e-mailadres. Probeer het later opnieuw of mail ons.');
          } else if (uit.status === 422) {
            meld('Controleer je gegevens: er ontbreekt iets of een veld klopt niet.');
          } else {
            meld('De betaling kon niet worden gestart. Probeer het opnieuw of mail ons.');
          }
          herstel();
          return;
        }
        window.location.href = uit.data.checkout;
      })
      .catch(function () {
        meld('Geen verbinding met de betaaldienst. Probeer het opnieuw.');
        herstel();
      });
  });
})();
