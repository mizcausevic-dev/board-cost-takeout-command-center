import express from "express";
import { pathToFileURL } from "node:url";
import {
  renderDocs,
  renderExecutionBlockers,
  renderOverview,
  renderSavingsOwners,
  renderTakeoutQueue,
  renderVerification
} from "./services/render.js";
import {
  executionBlockers,
  payload,
  riskMap,
  savingsOwners,
  summary,
  takeoutQueue,
  verification
} from "./services/verticalBriefService.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOverview()));
  app.get("/takeout-queue", (_req, res) => res.type("html").send(renderTakeoutQueue()));
  app.get("/savings-owners", (_req, res) => res.type("html").send(renderSavingsOwners()));
  app.get("/execution-blockers", (_req, res) => res.type("html").send(renderExecutionBlockers()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/takeout-queue", (_req, res) => res.json(takeoutQueue()));
  app.get("/api/savings-owners", (_req, res) => res.json(savingsOwners()));
  app.get("/api/execution-blockers", (_req, res) => res.json(executionBlockers()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

const isEntrypoint = process.argv[1] ? import.meta.url === pathToFileURL(process.argv[1]).href : false;

/* v8 ignore start -- process entrypoint is exercised by deployment smoke checks, not unit coverage. */
if (isEntrypoint) {
  const port = Number(process.env.PORT || 4010);
  createApp().listen(port, () => {
    console.log(`board-cost-takeout-command-center listening on http://127.0.0.1:${port}`);
  });
}
/* v8 ignore stop */
