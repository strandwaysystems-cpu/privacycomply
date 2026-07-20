// ===========================================================================
// Affiliate / outbound click tracking (GA4) — Strandway universal tracker
// Fires `affiliate_click` (rel="sponsored") or `outbound_click` (other external),
// auto-attributing partner from hostname + URL. No per-link changes required.
// Sends via `transport: 'beacon'` so the event lands even on cross-tab nav.
// ===========================================================================
(function () {
  function partnerFromUrl(href) {
    try {
      var u = new URL(href, location.href);
      var h = u.hostname.toLowerCase();
      // Travelpayouts wrappers (final destination is the partner)
      if (h.indexOf('tpx.gr') !== -1 || h.indexOf('tp.media') !== -1 || h.indexOf('emrld.ltd') !== -1) {
        if (h.indexOf('localrent') !== -1) return 'localrent';
        var c = (u.searchParams.get('campaign') || u.searchParams.get('marker') || '').toLowerCase();
        if (c.indexOf('booking') !== -1) return 'booking';
        if (c.indexOf('viator') !== -1) return 'viator';
        return 'travelpayouts';
      }
      // Travel partners
      if (h.indexOf('stay22') !== -1) return 'stay22';
      if (h.indexOf('booking.com') !== -1) return 'booking';
      if (h.indexOf('viator.com') !== -1) return 'viator';
      if (h.indexOf('getyourguide') !== -1) return 'getyourguide';
      if (h.indexOf('rentalcars') !== -1) return 'rentalcars';
      if (h.indexOf('skyscanner') !== -1) return 'skyscanner';
      if (h.indexOf('localrent') !== -1) return 'localrent';
      if (h.indexOf('gettransfer') !== -1) return 'gettransfer';
      if (h.indexOf('searadar') !== -1) return 'searadar';
      if (h.indexOf('boatbookings') !== -1) return 'boatbookings';
      if (h.indexOf('samboat') !== -1) return 'samboat';
      if (h.indexOf('clickandboat') !== -1) return 'clickandboat';
      if (h.indexOf('safetywing') !== -1) return 'safetywing';
      if (h.indexOf('heymondo') !== -1) return 'heymondo';
      if (h.indexOf('airalo') !== -1 || h.indexOf('holafly') !== -1) return 'esim';
      // Privacy / compliance partners
      if (h.indexOf('enzuzo') !== -1) return 'enzuzo';
      if (h.indexOf('iubenda') !== -1) return 'iubenda';
      if (h.indexOf('termly') !== -1) return 'termly';
      if (h.indexOf('cookieyes') !== -1) return 'cookieyes';
      if (h.indexOf('osano') !== -1) return 'osano';
      if (h.indexOf('usercentrics') !== -1) return 'usercentrics';
      if (h.indexOf('securiti') !== -1) return 'securiti';
      if (h.indexOf('transcend') !== -1) return 'transcend';
      if (h.indexOf('complianz') !== -1) return 'complianz';
      if (h.indexOf('nordlayer') !== -1) return 'nordlayer';
      if (h.indexOf('checkthat') !== -1) return 'checkthat';
      // Monetization infra
      if (h.indexOf('lemonsqueezy') !== -1 || h.indexOf('lemon.shop') !== -1) return 'lemonsqueezy';
      if (h.indexOf('mailerlite') !== -1) return 'mailerlite';
      return null;
    } catch (e) { return null; }
  }

  function pageType() {
    var p = location.pathname.replace(/\/$/, '') || '/';
    if (p === '/' || p === '' || /\/index(\.html)?$/.test(p)) return 'home';
    if (p.indexOf('/blog') === 0 || /blog/.test(p)) return 'blog';
    if (/review/.test(p)) return 'review';
    if (/beach/.test(p)) return 'beach';
    if (/charter|yacht|boat/.test(p)) return 'charter';
    return 'page';
  }

  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (!href || href.charAt(0) === '#') return;
    var isExternal;
    try {
      var u = new URL(href, location.href);
      isExternal = u.hostname && u.hostname !== location.hostname;
    } catch (err) { return; }
    if (!isExternal) return;

    var rel = (a.getAttribute('rel') || '').toLowerCase();
    var isSponsored = rel.indexOf('sponsored') !== -1;
    var partner = partnerFromUrl(href);
    var eventName = isSponsored ? 'affiliate_click' : 'outbound_click';
    var label = a.textContent ? a.textContent.trim().slice(0, 80) : '';

    var payload = {
      event_category: isSponsored ? 'affiliate' : 'outbound',
      event_label: label,
      partner: partner || 'other',
      link_url: href,
      link_domain: (function () { try { return new URL(href, location.href).hostname; } catch (e2) { return ''; } })(),
      page_path: location.pathname,
      page_type: pageType(),
      transport_type: 'beacon'
    };

    if (typeof window.gtag === 'function') {
      try { window.gtag('event', eventName, payload); } catch (e3) {}
    }
  }, { capture: true, passive: true });
})();

// PrivacyComply.io — mobile nav + dropdown behaviour
document.addEventListener('DOMContentLoaded', function () {
  // Hamburger toggle
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open') ? 'true' : 'false');
    });
  }

  // Desktop/mobile dropdown triggers
  var triggers = document.querySelectorAll('.nav-trigger');

  function closeAll() {
    triggers.forEach(function (t) {
      t.setAttribute('aria-expanded', 'false');
      if (t.parentElement) t.parentElement.classList.remove('is-open');
    });
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var parent = trigger.parentElement;
      var isOpen = parent && parent.classList.contains('is-open');
      closeAll();
      if (!isOpen && parent) {
        parent.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function () { closeAll(); });

  // Close dropdowns and mobile nav on ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAll();
      if (links) links.classList.remove('open');
    }
  });
});
