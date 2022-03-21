/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-05-17 09:32:35
 * @version $Id$
 */
/* eslint-disable */
export const set_Storage = function (key, val) {
  sessionStorage.setItem(key, val)
}
export const get_Storage = function (key) {
  return sessionStorage.getItem(key)
}
