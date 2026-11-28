// Hoveren over de verbruiksgrafieken: per tijdvak van drie uur zie je wat er
// gebeurde. De getallen zijn afgeleid uit de balkhoogtes, met het totaal van
// 10,0 kWh dat op de pagina staat als schaal (221 px = 10,0 kWh).
(function () {
  var DATA = {
    zonder: [
      { t: "0u",  v: 0.50, r: [["uit het net", 0.50]] },
      { t: "3u",  v: 0.45, r: [["uit het net", 0.45]] },
      { t: "6u",  v: 0.72, r: [["uit het net", 0.41], ["van de panelen", 0.32]] },
      { t: "9u",  v: 0.86, r: [["van de panelen", 0.86], ["teruggeleverd", 1.13]] },
      { t: "12u", v: 1.00, r: [["van de panelen", 1.00], ["teruggeleverd", 2.58]] },
      { t: "15u", v: 1.40, r: [["van de panelen", 1.40], ["teruggeleverd", 1.00]] },
      { t: "18u", v: 2.58, r: [["uit het net", 1.90], ["van de panelen", 0.68]] },
      { t: "21u", v: 2.49, r: [["uit het net", 2.49]] }
    ],
    met: [
      { t: "0u",  v: 0.50, r: [["uit het net", 0.50]] },
      { t: "3u",  v: 0.45, r: [["uit het net", 0.45]] },
      { t: "6u",  v: 0.72, r: [["uit het net", 0.41], ["van de panelen", 0.32]] },
      { t: "9u",  v: 0.86, r: [["van de panelen", 0.86], ["naar de batterij", 1.13]] },
      { t: "12u", v: 1.00, r: [["van de panelen", 1.00], ["naar de batterij", 2.58]] },
      { t: "15u", v: 1.40, r: [["van de panelen", 1.40], ["naar de batterij", 1.00]] },
      { t: "18u", v: 2.58, r: [["van de panelen", 0.68], ["uit de batterij", 1.90]] },
      { t: "21u", v: 2.49, r: [["uit het net", 0.14], ["uit de batterij", 2.35]] }
    ]
  };

  function nl(n) {
    return n.toFixed(2).replace(".", ",") + " kWh";
  }

  function bouw(u) {
    var html = '<span class="gtip-kop">' + u.t + " \u00b7 " + nl(u.v) + "</span>";
    u.r.forEach(function (rij) {
      html += '<span class="gtip-rij"><span>' + rij[0] + "</span><b>" + nl(rij[1]) + "</b></span>";
    });
    return html;
  }

  Array.prototype.slice.call(document.querySelectorAll(".grafiekvak")).forEach(function (vak) {
    var soort = vak.getAttribute("data-grafiek");
    var rijen = DATA[soort];
    var tip = vak.querySelector(".gtip");
    var zones = Array.prototype.slice.call(vak.querySelectorAll(".zone"));
    if (!rijen || !tip || !zones.length) return;

    function toon(n) {
      var u = rijen[n];
      if (!u) return;
      tip.innerHTML = bouw(u);
      tip.hidden = false;
      zones.forEach(function (z, i) { z.classList.toggle("bij", i === n); });

      var k = zones[n].getBoundingClientRect();
      var w = vak.getBoundingClientRect();
      var breedte = tip.offsetWidth;
      var marge = 6;
      var x = k.left - w.left + k.width / 2;
      var min = breedte / 2 + marge;
      var max = w.width - breedte / 2 - marge;
      tip.style.left = Math.round(max < min ? w.width / 2 : Math.max(min, Math.min(max, x))) + "px";
      // Het vak hoort boven de balken te hangen, niet erover. Sinds de grafiek minder leegte
      // boven de balken heeft, is daar binnen het tekenvlak geen ruimte meer voor: het vak
      // hing op de balken. Daarom zakt het naar de ruimte boven de grafiek, met de onderkant
      // net boven de bovenrand van het tekenvlak. Komt hij daarbij op de kop van de kaart
      // terecht, dan houdt de percentageregel hem tegen: dat is het hoogste punt dat hij mag
      // gebruiken, zodat de titel van de kaart altijd leesbaar blijft.
      var pct = vak.parentElement && vak.parentElement.querySelector(".pct");
      var grens = pct ? pct.getBoundingClientRect().top - w.top : 0;
      var wenst = k.top - w.top - 6 - tip.offsetHeight;
      tip.style.top = Math.round(Math.max(wenst, grens)) + "px";
    }

    function verberg() {
      tip.hidden = true;
      zones.forEach(function (z) { z.classList.remove("bij"); });
    }

    zones.forEach(function (z, n) {
      z.addEventListener("mouseenter", function () { toon(n); });
      z.addEventListener("click", function () { toon(n); });
      z.addEventListener("focus", function () { toon(n); });
    });
    vak.addEventListener("pointerleave", function (e) {
      if (e.pointerType === "mouse") verberg();
    });
    vak.addEventListener("blur", verberg);
  });
})();
