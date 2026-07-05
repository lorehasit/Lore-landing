import { describe, expect, it } from "vitest";
import { checkWaitlistRateLimit } from "@/lib/rate-limit";

// No UPSTASH_REDIS_REST_URL/TOKEN are set in the test environment, so this
// exercises the in-memory fallback path exclusively.
describe("checkWaitlistRateLimit (in-memory fallback)", () => {
  it("allows the first few requests from a fresh identifier", async () => {
    const id = `test-ip-${Math.random()}`;
    for (let i = 0; i < 5; i++) {
      const { success } = await checkWaitlistRateLimit(id);
      expect(success).toBe(true);
    }
  });

  it("blocks once the identifier exceeds the limit", async () => {
    const id = `test-ip-blocked-${Math.random()}`;
    for (let i = 0; i < 5; i++) {
      await checkWaitlistRateLimit(id);
    }
    const { success } = await checkWaitlistRateLimit(id);
    expect(success).toBe(false);
  });

  it("tracks separate identifiers independently", async () => {
    const idA = `test-ip-a-${Math.random()}`;
    const idB = `test-ip-b-${Math.random()}`;
    for (let i = 0; i < 5; i++) await checkWaitlistRateLimit(idA);
    const blockedA = await checkWaitlistRateLimit(idA);
    const freshB = await checkWaitlistRateLimit(idB);
    expect(blockedA.success).toBe(false);
    expect(freshB.success).toBe(true);
  });
});
