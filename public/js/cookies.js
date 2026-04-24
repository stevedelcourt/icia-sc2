// Load custom CSS
var tacStyle = document.createElement('link');
tacStyle.rel = 'stylesheet';
tacStyle.href = '/css/tarteaucitron.css';
document.head.appendChild(tacStyle);

// Init TarteAuCitron
tarteaucitron.init({
  "privacyUrl": "/politique-confidentialite",
  "hashtag": "#tarteaucitron",
  "cookieName": "tarteaucitron",
  "orientation": "bottom",
  "groupServices": false,
  "showDetailsOnClick": false,
  "serviceDefaultState": "wait",
  "showAlertSmall": false,
  "cookieslist": false,
  "handleOutsideRTI": false,
  "cookie": {
    "secure": true,
    "expires": 365,
    "samesite": "strict"
  },
  "adblocker": false,
  "showLegalNotice": true,
  "multiline": true,
  "showPersonalize": false,

  // French
  "title": "Gestion des cookies",
  "alertInfo": "En naviguant sur ce site, vous acceptez l'utilisation des cookies.",
  "optional": "Optionnel",
  "required": "Nécessaire",
  "accept": "Tout accepter",
  "refuse": "Tout refuser",
  "close": "Fermer",
  "manage": "Gérer",
  "info": "保护您的隐私",
  "disclaimer": "En cliquant, vous acceptez les cookies.",
  "allow": "Autoriser",
  "deny": "Refuser",
  "link": "En savoir plus",
  "privacy": "Politique de confidentialité",
  "readmoreLink": "/politique-confidentialite"
});

// Google Analytics
tarteaucitron.services.gtag = {
  "key": "gtag",
  "type": "analytic",
  "name": "Google Analytics",
  "uri": "https://policies.google.com/privacy",
  "needConsent": true,
  "cookies": ['_ga', '_gid', '_gat'],
  "js": function () {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-NJWMZE9B0P');
  }
};

tarteaucitron.user.gtagUa = 'G-NJWMZE9B0P';
(tarteaucitron.job = tarteaucitron.job || []).push('gtag');

// Add logo and styling after TarteAuCitron loads
document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
    var main = document.getElementById("tarteaucitronMain");
    if (main) {
      // Add logo to banner
      if (!main.querySelector('#tarteaucitronLogo')) {
        var logoDiv = document.createElement('div');
        logoDiv.id = 'tarteaucitronLogo';
        logoDiv.innerHTML = '<img src="/MariusIA-logo-monogram.png" alt="Marius IA" />';
        main.insertBefore(logoDiv, main.firstChild);
      }
    }

    // Hide personalize button by forcing display none
    var personalize = document.getElementById('tarteaucitronPersonalize');
    if (personalize) {
      personalize.style.cssText = 'display: none !important; visibility: hidden !important;';
      personalize.removeAttribute('href');
      personalize.removeAttribute('onclick');
    }

    // Also try to remove any onclick handlers
    var allElements = document.querySelectorAll('#tarteaucitronPersonalize, [id*="Personalize"], a[href*="personalise"]');
    allElements.forEach(function(el) {
      el.style.cssText = 'display: none !important; visibility: hidden !important; height: 0 !important; width: 0 !important; overflow: hidden !important;';
    });
  }, 500);
});

// Intercept clicks on personalize-related elements
document.addEventListener('click', function(e) {
  var target = e.target;
  if (target.id && (target.id.includes('Personalize') || target.id.includes('personalise'))) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  if (target.textContent && target.textContent.toLowerCase().includes('personnaliser')) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
}, true);