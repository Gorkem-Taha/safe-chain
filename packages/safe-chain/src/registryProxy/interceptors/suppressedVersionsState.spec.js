import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getHasSuppressedVersions,
  getSuppressedVersions,
  recordSuppressedVersion,
} from "./suppressedVersionsState.js";

describe("suppressed versions state", () => {
  it("reports the exact package versions removed from metadata", () => {
    assert.deepEqual(getSuppressedVersions(), []);
    assert.equal(getHasSuppressedVersions(), false);

    recordSuppressedVersion("safe-package", "1.2.3");

    assert.equal(getHasSuppressedVersions(), true);
    assert.deepEqual(getSuppressedVersions(), ["safe-package@1.2.3"]);

    // A separate package that failed to resolve is not attributed to this check.
    assert.ok(!getSuppressedVersions().includes("pydantic-core@2.50.4"));
  });
});
