// @ts-check
const enableLogging = false;

/**
 * Log the given values if logging is enabled.
 *
 * @param {*[]}  values  The values to log
 */
export function log(...values) {
  if (enableLogging) {
    console.log('[drag to download extension]', ...values);
  }
}
