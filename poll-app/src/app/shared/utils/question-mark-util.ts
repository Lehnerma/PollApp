/**
 * Checks if the input string ends with an ?
 * If the input ends with . = the helper function dose nothing
 * @param name these will be checked
 */
export function ensureQuestionMark(name: string): string {
  const trimmed = name.trimEnd();
  return trimmed.endsWith('?') ? trimmed : `${trimmed} ?`;
}
