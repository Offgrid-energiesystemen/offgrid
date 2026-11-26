/* postcode.js — vult de woonplaats in op basis van de postcode.
   Gebruikt de Locatieserver van PDOK, de dienst van de Rijksoverheid op
   de Basisregistratie Adressen en Gebouwen (BAG). Geen sleutel nodig.
   Vult alleen in als het veld leeg is of nog door ons gevuld is, zodat
   nooit overschreven wordt wat de bezoeker zelf typte. */
(function () {
  'use strict';

  var pc = document.getElementById('postcode');
  var wp = document.getElementById('woonplaats');
  if (!pc || !wp) return;

  var WACHT = 350;
  var timer = null;
  var laatste = '';
  var auto = '';

  function schoon(v) {
    return (v || '').toUpperCase().replace(/[^0-9A-Z]/g, '');
  }

  function netjes(v) {
    var n = schoon(v);
    return n.length > 4 ? n.slice(0, 4) + ' ' + n.slice(4, 6) : n;
  }

  function geldig(n) {
    return /^[1-9][0-9]{3}[A-Z]{2}$/.test(n);
  }

  function meld(tekst) {
    var hint = document.getElementById('postcode-hint');
    if (hint) hint.textContent = tekst;
  }

  function zoek() {
    var code = schoon(pc.value);
    if (!geldig(code) || code === laatste) return;
    laatste = code;

    if (wp.value.trim() && wp.value.trim() !== auto) return;

    var url = 'https://api.pdok.nl/bzk/locatieserver/search/v3_1/free'
      + '?q=' + encodeURIComponent(code)
      + '&fq=' + encodeURIComponent('type:postcode')
      + '&rows=1&wt=json';

    meld('Woonplaats opzoeken…');

    fetch(url, { headers: { Accept: 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        var doc = j && j.response && j.response.docs && j.response.docs[0];

        // De zoekdienst geeft bij een niet-bestaande postcode het
        // dichtstbijzijnde adres terug. Alleen iets invullen als de
        // postcode die terugkomt precies de ingevulde is.
        if (!doc || doc.postcode !== code || !doc.woonplaatsnaam) {
          if (wp.value.trim() === auto) { wp.value = ''; auto = ''; }
          meld('Deze postcode kennen we niet. Vul de woonplaats zelf in.');
          return;
        }
        if (wp.value.trim() && wp.value.trim() !== auto) {
          meld('');
          return;
        }
        auto = doc.woonplaatsnaam;
        wp.value = auto;
        meld('');
      })
      .catch(function () {
        meld('Niet gevonden. Vul de woonplaats zelf in.');
      });
  }

  pc.addEventListener('input', function () {
    if (schoon(pc.value).length === 6) pc.value = netjes(pc.value);
    clearTimeout(timer);
    timer = setTimeout(zoek, WACHT);
  });

  pc.addEventListener('blur', zoek);

  wp.addEventListener('input', function () {
    if (wp.value.trim() !== auto) auto = '';
  });
})();
