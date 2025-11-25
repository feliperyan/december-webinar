import {
    env,
    createExecutionContext,
    waitOnExecutionContext,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";

// Import your worker so you can unit test it
import index from "../worker/index";

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe("Test API Endpoints", () => {

    it("Get /api/pets", async () => {
        const request = new IncomingRequest("http://example.com/api/pets");

        // Create an empty context to pass to `worker.fetch()`
        const ctx = createExecutionContext();
        const response = await index.fetch(request, env, ctx);

        // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
        await waitOnExecutionContext(ctx);

        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data).toHaveLength(2);

    });

    it("Get /api/pets/:id", async () => {
        const request = new IncomingRequest("http://example.com/api/pets/pet-002");

        // Create an empty context to pass to `worker.fetch()`
        const ctx = createExecutionContext();
        const response = await index.fetch(request, env, ctx);

        // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
        await waitOnExecutionContext(ctx);

        const data = await response.json();
        expect(response.status).toBe(200);        
        expect(data['name']).toBe("Copper");

    });
});