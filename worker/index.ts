import { Hono } from "hono";

const app = new Hono();

app.get("/api/*", (c) => {
  return c.json({
    name: "Cloudflare",
  });
});

app.notFound((c) => {
  return c.body(null, 404);
});

export default app;
