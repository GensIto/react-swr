// src/index.ts

import { Hono } from "hono";
import { cors } from "hono/cors";
import { PrismaClient } from "@prisma/client";

const app = new Hono().basePath("/api");
const prisma = new PrismaClient();

app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/posts", async (c) => {
  const posts = await prisma.post.findMany();
  return c.json(posts);
});

app.get("/posts/:id", async (c) => {
  const id = parseInt(c.req.param("id"), 10);
  const post = await prisma.post.findUnique({
    where: { id },
  });
  if (post) {
    return c.json(post);
  } else {
    return c.json({ error: "Post not found" }, 404);
  }
});

app.post("/posts", async (c) => {
  const { userId, title, body } = await c.req.json();
  const newPost = await prisma.post.create({
    data: { userId, title, body },
  });
  return c.json(newPost, 201);
});

app.put("/posts/:id", async (c) => {
  const id = parseInt(c.req.param("id"), 10);
  const { userId, title, body } = await c.req.json();
  const updatedPost = await prisma.post.update({
    where: { id },
    data: { userId, title, body },
  });
  return c.json(updatedPost);
});

app.delete("/posts/:id", async (c) => {
  const id = parseInt(c.req.param("id"), 10);
  await prisma.post.delete({
    where: { id },
  });
  return c.json({ message: "Post deleted" });
});

export default app;
