/*
 * GA4 events for the HEART island.
 *
 * This page is served as a raw file outside Vite, so it cannot import
 * resources/js/analytics.js; this mirrors that module's contract. Events queue
 * on `dataLayer` whether or not gtag.js has loaded, and are consumed if and
 * when it arrives.
 */

/**
 * gtag.js consumes its queue as arguments objects, not plain arrays.
 */
function queueEvent() {
  window.dataLayer.push(arguments);
}

/**
 * Queue one analytics event.
 *
 * @param {string} name
 * @param {Record<string, string|number|boolean>} params
 */
export function track(name, params = {}) {
  window.dataLayer = window.dataLayer || [];

  queueEvent("event", name, params);
}
