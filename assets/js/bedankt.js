// Toont het ordernummer op de bedankpagina. Het nummer komt uit de URL die
// Mollie teruggeeft; alleen een geldig patroon wordt overgenomen.
(function () {
  var veld = document.getElementById('og-order');
  if (!veld) return;
  var nummer = new URLSearchParams(window.location.search).get('order') || '';
  if (!/^OG-[A-Za-z0-9-]{4,40}$/.test(nummer)) return;
  veld.textContent = 'Order ' + nummer;
  veld.hidden = false;
})();
