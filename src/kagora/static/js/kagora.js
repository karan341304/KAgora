// KAgora: theme toggle (remembered) and today's date. No dependencies.
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme');
  var icon = document.getElementById('themeIc');

  function apply(t) {
    root.setAttribute('data-theme', t);
    if (icon) icon.setAttribute('href', t === 'dark' ? '#sun' : '#moon');
    if (btn) btn.setAttribute('aria-label', 'Switch to ' + (t === 'dark' ? 'light' : 'dark') + ' theme');
  }
  function saved() {
    try {
      return localStorage.getItem('kagora-theme');
    } catch (e) {
      return null;
    }
  }

  function save(t) {
    try {
      localStorage.setItem('kagora-theme', t);
    } catch (e) {
      // Local storage may be unavailable in private browsing contexts.
    }
  }

  apply(saved() || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  if (btn) {
    btn.addEventListener('click', function () {
      var t = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(t);
      save(t);
    });
  }

  var d = document.getElementById('today');
  if (d) {
    var now = new Date();
    d.setAttribute('datetime', now.toISOString().slice(0, 10));
    d.textContent = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
})();
