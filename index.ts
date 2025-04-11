import { ENV } from "./src/env";
import { app } from "./src/server";

import * as Sentry from "@sentry/bun";

Sentry.init({
  environment: ENV.ENVIRONMENT,
  dsn: ENV.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

app.listen(8755, "0.0.0.0", () => {
  console.log("Server running on port:", 8755);
});

function exitHandler() {
  console.log("Exiting...");
  process.exit();
}

process.on("SIGINT", exitHandler);
process.on("SIGTERM", exitHandler);
