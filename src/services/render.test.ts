import { describe, expect, it } from "vitest";
import {
  renderDocs,
  renderExecutionBlockers,
  renderOverview,
  renderSavingsOwners,
  renderTakeoutQueue,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderOverview()).toContain("Board Cost Takeout Command Center");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });

  it("renders product-depth and shared-pattern markers on primary story routes", () => {
    for (const html of [renderOverview(), renderDocs()]) {
      expect(html).toContain("Product depth");
      expect(html).toContain("What these repos have in common");
    }
  });

  it("renders the repo, portfolio, LinkedIn, and Kinetic Gain footer links on every route", () => {
    const routes = [
      renderOverview(),
      renderTakeoutQueue(),
      renderSavingsOwners(),
      renderExecutionBlockers(),
      renderVerification(),
      renderDocs()
    ];

    for (const html of routes) {
      expect(html).toContain("https://github.com/mizcausevic-dev/board-cost-takeout-command-center");
      expect(html).toContain("https://portfolio.kineticgain.com/");
      expect(html).toContain("https://www.linkedin.com/in/mirzacausevic/");
      expect(html).toContain("https://kineticgain.com/");
    }
  });
});
