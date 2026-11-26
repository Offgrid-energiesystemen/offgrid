/* Offgrid energiesystemen — contactformulier
   Eén script voor elk formulier met class="contactform".
   Aanvragen gaan via FormSubmit naar het adres hieronder; de pagina
   herlaadt niet en de bezoeker krijgt meteen te zien of het gelukt is. */
(function () {
  var ONTVANGER = 'info@offgridenergiesystemen.nl';
  var EIND = 'https://formsubmit.co/ajax/' + ONTVANGER;

  var formulieren = document.querySelectorAll('form.contactform');
  if (!formulieren.length || !window.fetch) return;

  Array.prototype.forEach.call(formulieren, function (form) {
    var knop = form.querySelector('button[type="submit"]');
    var status = form.querySelector('.cstatus');
    var klaar = form.parentNode.querySelector('.cdone');
    var opnieuw = klaar ? klaar.querySelector('.cdone-opnieuw') : null;

    function melding(tekst, fout) {
      if (!status) return;
      status.hidden = false;
      status.textContent = tekst;
      if (fout) { status.setAttribute('data-fout', '1'); }
      else { status.removeAttribute('data-fout'); }
    }

    if (opnieuw && klaar) {
      opnieuw.addEventListener('click', function () {
        klaar.hidden = true;
        form.hidden = false;
        if (status) status.hidden = true;
        var eerste = form.querySelector('input:not([type="hidden"]), select, textarea');
        if (eerste) eerste.focus();
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) { form.reportValidity(); return; }

      var data = {};
      new FormData(form).forEach(function (waarde, sleutel) { data[sleutel] = waarde; });

      // honeypot: als dit veld gevuld is, is het vrijwel zeker een bot
      if (data['_honey']) { return; }

      var origineel = knop ? knop.textContent : '';
      if (knop) { knop.disabled = true; knop.textContent = 'Bezig met versturen…'; }
      if (status) status.hidden = true;

      fetch(EIND, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (r) {
          return r.json().then(function (j) { return { ok: r.ok, j: j }; });
        })
        .then(function (res) {
          if (!res.ok || String(res.j.success) !== 'true') {
            throw new Error(res.j.message || 'versturen mislukt');
          }
          var voornaam = String(data.naam || '').trim().split(/\s+/)[0];
          if (klaar) {
            var naamvak = klaar.querySelector('.cdone-naam');
            if (naamvak) naamvak.textContent = voornaam ? ' ' + voornaam : '';
            var mailvak = klaar.querySelector('.cdone-mail');
            if (mailvak && data.email) {
              mailvak.textContent = 'Je ontvangt ook een bevestiging per e-mail op ' + data.email +
                '. Zie je die niet? Kijk dan even in je spammap.';
            }
            form.reset();
            form.hidden = true;
            klaar.hidden = false;
            klaar.focus({ preventScroll: true });
            klaar.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            melding('Bedankt, je aanvraag is verstuurd.', false);
            form.reset();
          }
        })
        .catch(function () {
          melding('Het versturen is niet gelukt. Probeer het later opnieuw of mail ons via ' + ONTVANGER + '.', true);
        })
        .then(function () {
          if (knop) { knop.disabled = false; knop.textContent = origineel; }
        });
    });
  });
})();
