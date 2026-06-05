// PrivacyComply.io — mobile nav + small UX behaviours
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  // Affiliate click tracking placeholder — wire up GA4 events later
  document.querySelectorAll('a[rel*="sponsored"]').forEach(link => {
    link.addEventListener('click', () => {
      // window.dataLayer = window.dataLayer || [];
      // window.dataLayer.push({event: 'affiliate_click', partner: link.dataset.partner || 'unknown'});
    });
  });
});
