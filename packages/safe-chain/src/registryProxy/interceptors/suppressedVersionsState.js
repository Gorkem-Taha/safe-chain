const state = {
  suppressedVersions: new Set(),
};

/**
 * Tracks whether any rewritten metadata response suppressed versions during the
 * current process lifetime. This is intentional shared state used only for the
 * end-of-run summary message exposed through the proxy API.
 *
 * @returns {void}
 */
export function recordSuppressedVersion(packageName, version) {
  state.suppressedVersions.add(`${packageName}@${version}`);
}

/**
 * @returns {boolean}
 */
export function getHasSuppressedVersions() {
  return state.suppressedVersions.size > 0;
}

/**
 * @returns {string[]}
 */
export function getSuppressedVersions() {
  return [...state.suppressedVersions];
}
