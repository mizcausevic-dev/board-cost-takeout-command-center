import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("board-cost-takeout-command-center app", () => {
  it("serves all HTML routes", async () => {
    const htmlRoutes = ["/", "/takeout-queue", "/savings-owners", "/execution-blockers", "/verification", "/docs"];
    for (const route of htmlRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("text/html");
    }
  });

  it("serves all JSON routes", async () => {
    const jsonRoutes = [
      "/api/dashboard/summary",
      "/api/takeout-queue",
      "/api/savings-owners",
      "/api/execution-blockers",
      "/api/risk-map",
      "/api/verification",
      "/api/sample",
      "/api/payload"
    ];
    for (const route of jsonRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("application/json");
    }
  });
});
