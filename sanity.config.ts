import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/lib/env";
import { schemaTypes } from "./sanity/schema";
import { structure } from "./sanity/deskStructure";

export default defineConfig({
  basePath: "/studio",
  projectId: projectId || "not-configured",
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
