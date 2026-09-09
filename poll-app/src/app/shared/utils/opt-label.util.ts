const ALPHABET_START_CHAR_CODE = 65;
/**
 * Returns the uppercase letter for the given option index.
 *
 * @param index The zero-based option index.
 * @returns The corresponding uppercase letter A, B ...
 */
export function getLetterFromIndex(index: number): string {
  return String.fromCharCode(ALPHABET_START_CHAR_CODE + index);
}
