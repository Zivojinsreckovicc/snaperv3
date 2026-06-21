import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./sanity/env";

/**
 * CLI config — used by `sanity schema extract` and `sanity typegen generate`
 * (see the `typegen` npm script). `autoUpdates` is off for the embedded Studio
 * since updates ship via the app's own dependencies.
 */
export default defineCliConfig({
  api: { projectId, dataset },
  autoUpdates: false,
});
