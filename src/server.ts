import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";

const server = new McpServer({
  name: "mcp-coinflip",
  version: "1.0.0",
});

server.tool("coinflip", {}, async ({}) => {
  const result =
    crypto.getRandomValues(new Uint8Array(1))[0] % 2 === 0 ? "Heads" : "Tails";

  return {
    content: [
      {
        type: "text",
        text: `Coin flip result: ${result}`,
      },
    ],
  };
});

const app = express();

const transports = new Map<string, SSEServerTransport>();

app.get("/", (_, res) => {
  res.sendStatus(200);
});

app.get("/sse", async (_, res) => {
  const transport = new SSEServerTransport("/messages", res);
  transports.set(transport.sessionId, transport);

  // console.log("SSE connection established:", transport.sessionId);

  res.on("close", () => {
    transports.delete(transport.sessionId);
  });
  await server.connect(transport);
});

app.post("/messages", async (req, res) => {
  const sessionId = req.query.sessionId as string;
  const transport = transports.get(sessionId);

  // console.log("Received message:", req.query.sessionId);

  if (transport) {
    await transport.handlePostMessage(req, res);
  } else {
    res.status(400).send("No transport found for sessionId");
  }
});

export { app };
