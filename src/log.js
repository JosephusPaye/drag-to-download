// @ts-check
const enableLogging = true;

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
