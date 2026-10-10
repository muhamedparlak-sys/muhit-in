/* Visitor counting for muhit.in with GoatCounter (https://www.goatcounter.com): no cookies, no personal data.
   CODE is the site code chosen when the GoatCounter account was opened: the part before ".goatcounter.com".
   While CODE is empty nothing is loaded and nothing is counted. */
(function(){
  var CODE = '';
  if (!CODE) return;
  if (location.hostname !== 'muhit.in' && location.hostname !== 'www.muhit.in') return;      /* previews and copies are not counted */
  var q = window.guideQ || [], ready = false;
  function send(a){ try { window.goatcounter.count({path:a[0], title:a[1] || document.title, event:!!a[2]}); } catch(e){} }
  window.guideStats = function(path, title, event){ var a = [path, title, event]; if (ready) send(a); else if (q.length < 60) q.push(a); };
  window.goatcounter = {no_onload:true};
  var s = document.createElement('script'); s.async = true; s.src = 'https://gc.zgo.at/count.js';
  s.setAttribute('data-goatcounter', 'https://' + CODE + '.goatcounter.com/count');
  s.onload = function(){ ready = true; q.splice(0).forEach(send); };
  document.head.appendChild(s);
  document.documentElement.classList.add('stats');      /* shows the "this information is wrong" button of the guide */
  if (!window.GUIDE_APP) window.guideStats(location.pathname, document.title);      /* a fixed page counts itself; the guide counts every screen it shows */
})();
