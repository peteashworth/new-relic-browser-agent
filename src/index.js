class NewRelicBrowserAgent {
  constructor(userOptions = {}) {
    const options = Object.assign({}, {
      beacon: 'bam.nr-data.net',
      errorBeacon: 'bam.nr-data.net',
      sa: 1,
    },
    userOptions);
    const enabled = !!(options.licenseKey && options.applicationID);

    if (enabled) {
      return new Promise((resolve) => {
        NewRelicBrowser.init(options);
        NewRelicBrowser.insertScript(() => {
          resolve();
        });
      });
    }
  }

  static init({
    licenseKey,
    accountID,
    applicationID,
    trustKey,
    agentID,
    beacon,
    errorBeacon,
    sa,
  }) {
    const config = window.NREUM ? window.NREUM : window.NREUM = {};
    config.init = {
      privacy: {
        cookies_enabled: true,
      },
    };
    config.loader_config = {
      accountID,
      trustKey,
      agentID,
      licenseKey,
      applicationID,
    };
    config.info = {
      beacon,
      errorBeacon,
      licenseKey: 'NRJS-8aa680ce1cba77b57d7',
      applicationID: '664790510',
      sa,
    };
  }

  static insertScript(cb) {
    const doc = document;
    const scriptElement = doc.createElement('script');
    const scripts = doc.getElementsByTagName('script')[0];

    scriptElement.type = 'text/javascript';
    scriptElement.defer = false;
    scriptElement.async = false;
    scriptElement.src = 'https://js-agent.newrelic.com/nr-loader-spa-current.min.js';
    scriptElement.addEventListener('load', cb);

    if (scripts && scripts.parentNode) {
      scripts.parentNode.insertBefore(scriptElement, scripts);
    }
  }
}

export default NewRelicBrowser;
