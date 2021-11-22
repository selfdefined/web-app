function initThemeSwitch() {
  let $switchContainer = document.querySelector('.js-theme-switch');

  if (!$switchContainer) return;

  $switchContainer.hidden = false;

  let userOverwrite = ['light', 'dark'];

  let $buttons = $switchContainer.querySelectorAll('[type="radio"]');

  function setInitialState() {
    /**
     * @type String
     */
    let userThemeSetting = document.documentElement.getAttribute(
      'data-user-theme'
    );

    if (userThemeSetting) {
      $switchContainer.querySelector(
        `[value="${userThemeSetting}"]`
      ).checked = true;
    } else {
      $switchContainer.querySelector('[value="system"]').checked = true;
    }
  }

  Array.from($buttons).forEach(function($button) {
    $button.addEventListener('change', function() {
      // only run the switch functionality for the currently active radio button
      if (!$button.checked) return;

      if (userOverwrite.includes($button.value)) {
        window.setUserPreference($button.value);
      } else {
        window.unsetUserPreference();
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
