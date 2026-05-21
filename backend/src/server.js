import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import eventsRoutes from "./routes/events.js";

dotenv.config();

const fastify = Fastify({ logger: true });

// Register CORS (allows frontend to call backend)
await fastify.register(cors, {
  origin: "*",
});

// Register routes
await fastify.register(eventsRoutes);

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" });
    console.log(
      `🚀 Server running on http://localhost:${process.env.PORT || 3000}`,
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
