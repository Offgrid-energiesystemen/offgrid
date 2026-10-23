(function () {
  var DATA = {"ems": {"title": "Slimme regeling", "role": "Het brein van het systeem. Bepaalt elke paar seconden waar de stroom heen gaat.", "icon": "ems", "params": [["Strategie", "Zoveel mogelijk eigen stroom"], ["Nu", "Overschot naar de batterij"], ["Volgende stap", "17:00 batterij ontladen"], ["Verbinding", "lokaal + internet"], ["Temperatuur meterkast", "27 °C"], ["Uptime", "182 dagen"]], "status": "Online"}, "zon": {"title": "Zonnepanelen", "role": "Wekt stroom op uit zonlicht.", "icon": "zon", "params": [["Vermogen nu", "{zon} kW"], ["Opgewekt tot nu", "5,3 kWh"], ["Verwacht vandaag", "13,8 kWh"], ["Piek vandaag", "3,1 kW"], ["Paneeltemperatuur", "34 °C"], ["Opgewekt dit jaar", "4.215 kWh"]], "status": "Online"}, "bat": {"title": "Thuisbatterij", "role": "Slaat zonnestroom op voor de avond en voor dure uren.", "icon": "bat", "params": [["Laadtoestand", "68 %"], ["Vermogen nu", "+{bat} kW laden"], ["Beschikbaar", "10,9 van 16 kWh"], ["Temperatuur", "21 °C"], ["Laadcycli", "214"], ["Conditie", "99 %"]], "status": "Online"}, "net": {"title": "Stroomnet", "role": "Vangnet voor als zon en batterij niet genoeg leveren.", "icon": "net", "params": [["Nu", "{net} kW teruglevering"], ["Afgenomen tot nu", "3,2 kWh"], ["Teruggeleverd tot nu", "0,0 kWh"], ["Tarief nu", "€ 0,07 per kWh"], ["Duurste uur", "18:00 · € 0,36"], ["Aansluiting", "3 fasen"]], "status": "Verbonden"}, "huis": {"title": "Huis", "role": "Verlichting, keuken en alle andere apparaten.", "icon": "huis", "params": [["Verbruik nu", "0,5 kW"], ["Verbruikt tot nu", "4,5 kWh"], ["Grootste verbruiker", "Koelkast en standby"], ["Groepen", "8, alle in orde"], ["Binnentemperatuur", "21,2 °C"], ["Uit eigen stroom", "50 %"]], "status": "Online"}, "wp": {"title": "Warmtepomp", "role": "Verwarmt het huis, bij voorkeur op eigen zonnestroom.", "icon": "wp", "params": [["Vermogen nu", "0,4 kW"], ["Modus", "Verwarmen op zonnestroom"], ["Aanvoertemperatuur", "32 °C"], ["Buitentemperatuur", "18 °C"], ["Rendement (COP)", "4,2"], ["Verbruikt tot nu", "1,9 kWh"]], "status": "Online"}, "auto": {"title": "Elektrische auto", "role": "Laadt wanneer stroom goedkoop of zelf opgewekt is.", "icon": "auto", "params": [["Accu auto", "34 %"], ["Laden nu", "0 kW"], ["Gepland laden", "01:00–05:00"], ["Doel", "80 % om 07:00"], ["Laadpaal", "Vrij"], ["Geladen deze maand", "186 kWh"]], "status": "Online · wacht op goedkoop uur"}};
  var ICONS = {"zon": "<svg class=\"og-i\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"square\" aria-hidden=\"true\"><rect x=\"8\" y=\"8\" width=\"8\" height=\"8\" transform=\"rotate(45 12 12)\"></rect><path d=\"M12 1v2M12 21v2M1 12h2M21 12h2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4\"></path></svg>", "net": "<svg class=\"og-i\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"square\" aria-hidden=\"true\"><path d=\"M8 22L12 2l4 20M9 15h6M10 9h4M4 6h16M4 6v3M20 6v3\"></path></svg>", "bat": "<svg class=\"og-i\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"square\" aria-hidden=\"true\"><rect x=\"7\" y=\"4\" width=\"10\" height=\"18\"></rect><path d=\"M10 2h4M10 16h4M10 12h4\"></path></svg>", "huis": "<svg class=\"og-i\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"square\" aria-hidden=\"true\"><path d=\"M3 11L12 3l9 8M5 9v12h14V9M10 21v-6h4v6\"></path></svg>", "wp": "<svg class=\"og-i\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"square\" aria-hidden=\"true\"><rect x=\"2\" y=\"4\" width=\"20\" height=\"16\"></rect><circle cx=\"10\" cy=\"12\" r=\"5\"></circle><path d=\"M10 7v10M5 12h10M18 8v8\"></path></svg>", "auto": "<svg class=\"og-i\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"square\" aria-hidden=\"true\"><path d=\"M3 17V12l2-5h14l2 5v5H3zM3 12h18\"></path><rect x=\"5\" y=\"17\" width=\"3\" height=\"3\"></rect><rect x=\"16\" y=\"17\" width=\"3\" height=\"3\"></rect></svg>", "ems": "<svg class=\"og-i\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><rect x=\"2\" y=\"2\" width=\"5\" height=\"5\" fill=\"currentColor\"></rect><rect x=\"10\" y=\"2\" width=\"5\" height=\"5\" fill=\"currentColor\"></rect><rect x=\"2\" y=\"10\" width=\"5\" height=\"5\" fill=\"currentColor\"></rect><rect x=\"10\" y=\"10\" width=\"5\" height=\"5\" fill=\"currentColor\"></rect><rect x=\"18\" y=\"10\" width=\"5\" height=\"5\" fill=\"currentColor\"></rect><rect x=\"2\" y=\"18\" width=\"5\" height=\"5\" fill=\"currentColor\"></rect><rect x=\"10\" y=\"18\" width=\"5\" height=\"5\" fill=\"currentColor\"></rect><rect x=\"18\" y=\"18\" width=\"5\" height=\"5\" fill=\"currentColor\"></rect><rect x=\"17\" y=\"1\" width=\"6\" height=\"6\" fill=\"#16BE7D\" transform=\"rotate(45 20 4)\"></rect></svg>"};
  var ICON_VERVERS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M20.5 12a8.5 8.5 0 1 1-2.5-6"></path><path d="M21 3v6h-6"></path></svg>';
  var live = { zon: 2.8, wp: 0.4, huis: 0.5, net: 0.3 };
  var pinned = 'ems';
  var box = document.querySelector('.og-box');
  var panel = document.getElementById('og-panel');
  var buttons = document.querySelectorAll('[data-node]');
  var keys = Object.keys(DATA);
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function nl(x) { return x.toFixed(1).replace('.', ','); }
  function bat() { return Math.max(0, live.zon - live.wp - live.huis - live.net); }
  function fill(s) { return s.replace('{zon}', nl(live.zon)).replace('{bat}', nl(bat())).replace('{net}', nl(live.net)); }
  function esc(s) { return String(s).replace(/[&<>]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]; }); }

  function renderValues() {
    var v = { zon: nl(live.zon) + ' kW', net: nl(live.net) + ' kW', bat: '68 %', wp: nl(live.wp) + ' kW', huis: nl(live.huis) + ' kW', auto: '0 kW' };
    var t = { zon: nl(live.zon) + ' kW', net: nl(live.net) + ' kW<span class="og-tx"> terug</span>', bat: nl(bat()) + ' kW<span class="og-tx"> laden</span>', wp: nl(live.wp) + ' kW', huis: nl(live.huis) + ' kW', auto: '0 kW' };
    Object.keys(v).forEach(function (k) {
      var a = document.querySelector('[data-val="' + k + '"]'); if (a) a.textContent = v[k];
      var b = document.querySelector('[data-tag="' + k + '"]'); if (b) b.innerHTML = t[k];
    });
  }

  var laatst = Date.now();

  function leeftijdTekst() {
    var s = Math.round((Date.now() - laatst) / 1000);
    if (s <= 1) return 'zojuist bijgewerkt';
    if (s < 60) return s + ' seconden geleden bijgewerkt';
    var m = Math.floor(s / 60);
    return (m === 1 ? '1 minuut' : m + ' minuten') + ' geleden bijgewerkt';
  }

  function renderLeeftijd() {
    var t = leeftijdTekst();
    keys.forEach(function (k) {
      var el = panel.querySelector('.og-pv[data-pv="' + k + '"] .og-leeftijd');
      if (el) el.textContent = t;
    });
  }

  // Verversen: meteen een nieuwe meting ophalen en de teller weer op nul zetten.
  function ververs() {
    tick();
    laatst = Date.now();
    renderLeeftijd();
  }

  function rowsVan(k) {
    return DATA[k].params.map(function (p) { return '<dt>' + esc(p[0]) + '</dt><dd>' + esc(fill(p[1])) + '</dd>'; }).join('');
  }

  // Elke variant staat van meet af aan in het paneel, in dezelfde gridcel (.og-pv). Het paneel is
  // daardoor altijd zo hoog als de hoogste variant en de pagina verspringt niet meer bij wisselen.
  keys.forEach(function (k) {
    var d = DATA[k];
    panel.insertAdjacentHTML('beforeend',
      '<div class="og-pv" data-pv="' + k + '" aria-hidden="true">' +
        '<div class="og-ph">' + ICONS[d.icon] + '<h2 class="og-pt">' + esc(d.title) + '</h2></div>' +
        '<span class="og-status">' + esc(d.status) + '</span>' +
        '<p class="og-role">' + esc(d.role) + '</p>' +
        '<dl class="og-dl">' + rowsVan(k) + '</dl>' +
        '<span class="og-voet"><button type="button" class="og-ververs" aria-label="Gegevens verversen">' + ICON_VERVERS + '</button><span class="og-leeftijd">' + esc(leeftijdTekst()) + '</span></span>' +
      '</div>');
  });

  function renderPanel(k) {
    keys.forEach(function (key) {
      var el = panel.querySelector('.og-pv[data-pv="' + key + '"]');
      if (!el) return;
      var on = key === k;
      el.classList.toggle('on', on);
      el.setAttribute('aria-hidden', on ? 'false' : 'true');
    });
    box.classList.toggle('has-sel', k !== 'ems');
    document.querySelectorAll('[data-line]').forEach(function (g) { g.classList.toggle('on', g.getAttribute('data-line') === k); });
  }

  // De meetwaarden lopen in elke variant mee, zodat wisselen nooit een oude waarde toont.
  function refreshLive() {
    keys.forEach(function (k) {
      var dl = panel.querySelector('.og-pv[data-pv="' + k + '"] .og-dl');
      if (dl) dl.innerHTML = rowsVan(k);
    });
  }

  function pin(k) {
    pinned = k;
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-node') === k ? 'true' : 'false'); });
    refreshLive();
    renderPanel(k);
    laatst = Date.now();
    renderLeeftijd();
  }

  // Alleen een klik wisselt het paneel; hoveren of focussen verandert er niets meer aan.
  buttons.forEach(function (b) {
    b.addEventListener('click', function () { pin(b.getAttribute('data-node')); });
  });

  panel.addEventListener('click', function (e) {
    var knop = e.target && e.target.closest ? e.target.closest('.og-ververs') : null;
    if (knop) ververs();
  });

  function tick() {
    live.zon = Math.min(3.1, Math.max(2.5, live.zon + (Math.random() - 0.5) * 0.2));
    live.huis = Math.min(0.7, Math.max(0.4, live.huis + (Math.random() - 0.5) * 0.1));
    renderValues(); refreshLive();
  }

  renderValues(); pin('ems');
  setInterval(tick, reduce ? 10000 : 3000);
  setInterval(renderLeeftijd, 1000);
})();

(function () {
  var grafieken = Array.prototype.slice.call(document.querySelectorAll('.og-grafiek'));
  if (!grafieken.length) return;

  function getal(t) {
    var s = String(t).replace(/[^0-9.,]/g, '').replace(/\./g, '').replace(',', '.');
    return parseFloat(s) || 0;
  }
  function nl(x) { return x.toFixed(1).replace('.', ','); }

  // De dagcijfers uit de kaart "Van waar naar waar" begrenzen het laden van de batterij en het
  // terugleveren. Ze worden uit de pagina zelf gelezen, zodat ze niet uit de pas kunnen lopen.
  var dag = {};
  Array.prototype.forEach.call(document.querySelectorAll('span[style*="font-weight: 600"]'), function (s) {
    var m = /^\s*(Zon|Batterij|Net)\s*\u2192\s*(huis|batterij|net)\s*$/i.exec(s.textContent || '');
    if (!m) return;
    var houder = s.parentElement;
    var buur = houder ? houder.querySelector('span[style*="font-weight: 800"]') : null;
    if (!buur) return;
    dag[m[1].toLowerCase() + '_' + m[2].toLowerCase()] = getal(buur.textContent);
  });

  // De uursgegevens komen uit de grafieken zelf: de titels bevatten de waarden, de kleur van de balk
  // zegt of het om een gemeten of een verwachte waarde gaat.
  var UUR = [];
  for (var i = 0; i < 24; i++) {
    UUR.push({ uur: ('0' + i).slice(-2) + ':00', zon: 0, vanZon: 0, vanBatterij: 0, vanNet: 0, gerealiseerd: true });
  }

  function lees(wrapper, soort) {
    Array.prototype.forEach.call(wrapper.querySelectorAll('.og-g24 > .og-c'), function (c, n) {
      if (n > 23) return;
      var drager = c.hasAttribute('title') ? c : c.querySelector('[title]');
      var titel = drager ? drager.getAttribute('title') : '';
      var donker = false;
      Array.prototype.forEach.call(c.querySelectorAll(':scope > span'), function (s) {
        var css = (s.getAttribute('style') || '').toUpperCase();
        if (css.indexOf('#16BE7D') >= 0 || css.indexOf('#1A6E9E') >= 0 || css.indexOf('#A7B4C2') >= 0) donker = true;
      });
      if (!donker) UUR[n].gerealiseerd = false;
      if (soort === 'opwek') {
        var m1 = /zon\s+([0-9.,]+)\s*kWh/i.exec(titel);
        if (m1) UUR[n].zon = getal(m1[1]);
      } else {
        var m2 = /zon\s+([0-9.,]+),\s*batterij\s+([0-9.,]+),\s*net\s+([0-9.,]+)/i.exec(titel);
        if (m2) { UUR[n].vanZon = getal(m2[1]); UUR[n].vanBatterij = getal(m2[2]); UUR[n].vanNet = getal(m2[3]); }
      }
      // De titel wordt hier overgenomen; zonder JavaScript blijft de gewone tooltip dus werken.
      if (titel) { c.setAttribute('aria-label', titel); drager.removeAttribute('title'); }
    });
  }
  lees(grafieken[0], 'opwek');
  if (grafieken[1]) lees(grafieken[1], 'verbruik');

  // Het overschot aan zonnestroom laadt eerst de batterij; wat daarna overblijft gaat naar het net.
  var capaciteit = Math.max(0, dag.zon_batterij || 0);
  var geladen = 0;
  UUR.forEach(function (u) {
    u.verbruik = u.vanZon + u.vanBatterij + u.vanNet;
    u.overschot = Math.max(0, u.zon - u.vanZon);
    u.naarBatterij = Math.min(u.overschot, Math.max(0, capaciteit - geladen));
    u.teruggeleverd = Math.max(0, u.overschot - u.naarBatterij);
    geladen += u.naarBatterij;
  });

  function rij(label, waarde, sub) {
    return '<span class="og-tip-rij' + (sub ? ' og-tip-sub' : '') + '"><span>' + label + '</span><span>' + waarde + '</span></span>';
  }
  // Boven de zwarte lijn staat wat er opgewekt wordt, daaronder wat het huis verbruikt en waar
  // dat vandaan komt. Elke helft krijgt daarom zijn eigen cijfers.
  function tipHtml(u, soort) {
    var kop = '<span class="og-tip-kop">' + (soort === 'opgewekt' ? 'Opgewekt' : 'Verbruikt') +
      ' \u00b7 ' + u.uur + ' \u00b7 ' + (u.gerealiseerd ? 'gemeten' : 'verwacht') + '</span>';
    if (soort === 'opgewekt') {
      return kop +
        rij('Zon opgewekt', nl(u.zon) + ' kWh') +
        rij('Naar het huis', nl(u.vanZon) + ' kWh') +
        rij('Naar de batterij', nl(u.naarBatterij) + ' kWh') +
        rij('Teruggeleverd', nl(u.teruggeleverd) + ' kWh');
    }
    return kop +
      rij('Verbruik huis', nl(u.verbruik) + ' kWh') +
      rij('van zon', nl(u.vanZon) + ' kWh', true) +
      rij('van batterij', nl(u.vanBatterij) + ' kWh', true) +
      rij('van net', nl(u.vanNet) + ' kWh', true);
  }

  // Aanwijzer weg van de grafiek verbergt de tip; een aanraking laat hem staan tot je ergens
  // anders tikt (op een aanraakscherm vuurt de browser anders meteen een mouseleave op 0,0).
  document.addEventListener('pointerdown', function (e) {
    if (e.target && e.target.closest && e.target.closest('.og-grafiek')) return;
    Array.prototype.forEach.call(document.querySelectorAll('.og-tip.on'), function (t) { t.classList.remove('on'); });
    Array.prototype.forEach.call(document.querySelectorAll('.og-c.bij'), function (c) { c.classList.remove('bij'); });
  });

  grafieken.forEach(function (w) {
    var grid = w.querySelector('.og-g24');
    var tip = w.querySelector('.og-tip');
    if (!grid || !tip) return;
    var kolommen = Array.prototype.slice.call(grid.children);
    var actief = null;

    function markeer(n) {
      kolommen.forEach(function (c, i) { c.classList.toggle('bij', i === n); });
    }
    function toon(n) {
      var u = UUR[n];
      if (!u) return;
      actief = n;
      tip.innerHTML = tipHtml(u, w.getAttribute('data-soort') || 'opgewekt');
      tip.classList.add('on');
      var k = kolommen[n].getBoundingClientRect();
      var wr = w.getBoundingClientRect();
      var breedte = tip.offsetWidth;
      var marge = 8;
      var x = k.left - wr.left + k.width / 2;
      var min = breedte / 2 + marge;
      var max = wr.width - breedte / 2 - marge;
      tip.style.left = Math.round(max < min ? wr.width / 2 : Math.max(min, Math.min(max, x))) + 'px';
      markeer(n);
    }
    function verberg() {
      actief = null;
      tip.classList.remove('on');
      markeer(-1);
    }

    kolommen.forEach(function (c, n) {
      c.addEventListener('mouseenter', function () { toon(n); });
      c.addEventListener('click', function () { toon(n); });
    });
    grid.addEventListener('pointerleave', function (e) {
      if (e.pointerType === 'mouse') verberg();
    });
    grid.addEventListener('blur', verberg);
    grid.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { verberg(); return; }
      var stap = e.key === 'ArrowRight' ? 1 : (e.key === 'ArrowLeft' ? -1 : 0);
      if (!stap) return;
      e.preventDefault();
      var n = actief === null ? (stap > 0 ? 0 : 23) : Math.max(0, Math.min(23, actief + stap));
      toon(n);
    });
  });
})();
