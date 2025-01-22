(function() {
  // Define URLs as configurable variables
  var reactUrl = 'https://unpkg.com/react@17/umd/react.production.min.js';
  var reactDomUrl = 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js';
  var mainScriptUrl = 'https://your-domain.com/main.js'; // Update this to your actual main script URL
  function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.async = true;
    script.onload = callback;
    document.head.appendChild(script);
  }

  function initEmbed() {
    var urlParams = new URLSearchParams(window.location.search);
    var configParam = urlParams.get('config');
    var config = configParam ? JSON.parse(decodeURIComponent(configParam)) : {};

    if (typeof window.initFosterAllowanceEmbed === 'function') {
      window.initFosterAllowanceEmbed(config);
    } else {
      console.error("initFosterAllowanceEmbed function is not available.");
    }
  }

  // Create a container for the embed
  var container = document.createElement('div');
  container.id = 'foster-allowance-embed';
  document.body.appendChild(container);

  // Load React and ReactDOM
  loadScript(reactUrl, function() {
    loadScript(reactDomUrl, function() {
      // Load your main application script
      loadScript(mainScriptUrl, initEmbed);
    });
  });
})();