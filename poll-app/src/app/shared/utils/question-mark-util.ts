/**
 * Checks if the input string ends with an ?
 * If the input ends with . = the helper function dose nothing
 * @param {string} name - These will be checked.
 * @returns {string} The input string with a trailing question mark ensured.
 */
export function ensureQuestionMark(name: string): string {
  const trimmed = name.trimEnd();
  return trimmed.endsWith('?') ? trimmed : `${trimmed} ?`;
}
