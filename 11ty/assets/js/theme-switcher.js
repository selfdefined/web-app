function initThemeSwitch() {
  let $switchContainer = document.querySelector('.js-theme-switch');

  if (!$switchContainer) return;

  let userOverwrite = ['light', 'dark'];

  let $buttons = $switchContainer.querySelectorAll('[type="radio"]');

  /**
   * @type String
   */
  let userThemeSetting = localStorage.getItem('sdUserTheme');

  function setInitialState() {
    if (userThemeSetting) {
      document.documentElement.setAttribute(
        'data-user-theme',
        userThemeSetting
      );
      $switchContainer.querySelector(
        `[value="${userThemeSetting}"]`
      ).checked = true;
    } else {
      $switchContainer.querySelector('[value="system"]').checked = true;
    }
  }

  function setUserPreference(value) {
    localStorage.setItem('sdUserTheme', value);
    document.documentElement.setAttribute('data-user-theme', value);
  }

  function unsetUserPreference() {
    localStorage.removeItem('sdUserTheme');
    document.documentElement.removeAttribute('data-user-theme');
  }

  Array.from($buttons).forEach(function($button) {
    $button.addEventListener('change', function() {
      // only run the switch functionality for the currently active radio button
      if (!$button.checked) return;

      if (userOverwrite.includes($button.value)) {
        setUserPreference($button.value);
      } else {
        unsetUserPreference();
      }
    });
  });

  setInitialState();
}

if (document.readyState === 'complete') {
  initThemeSwitch();
} else {
  window.addEventListener('load', function() {
    initThemeSwitch();
  });
}
