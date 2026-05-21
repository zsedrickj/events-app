import pool from "../db.js";

export default async function eventsRoutes(fastify) {
  // GET all events
  fastify.get("/api/events", async (request, reply) => {
    try {
      const result = await pool.query(
        "SELECT * FROM events_entries ORDER BY created_at DESC",
      );
      return reply.send({ success: true, data: result.rows });
    } catch (err) {
      return reply.status(500).send({ success: false, error: err.message });
    }
  });

  // POST create event
  fastify.post("/api/events", async (request, reply) => {
    const { title, description, lat, lng } = request.body;

    if (!title || lat === undefined || lng === undefined) {
      return reply.status(400).send({
        success: false,
        error: "title, lat, and lng are required.",
      });
    }

    // Ensure coords are stored in DD (decimal degrees) format
    const latDD = parseFloat(lat);
    const lngDD = parseFloat(lng);

    if (isNaN(latDD) || isNaN(lngDD)) {
      return reply.status(400).send({
        success: false,
        error: "lat and lng must be valid decimal numbers (DD format).",
      });
    }

    try {
      const result = await pool.query(
        `INSERT INTO events_entries (title, description, lat, lng)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [title, description, latDD, lngDD],
      );
      return reply.status(201).send({ success: true, data: result.rows[0] });
    } catch (err) {
      return reply.status(500).send({ success: false, error: err.message });
    }
  });

  // DELETE event
  fastify.delete("/api/events/:id", async (request, reply) => {
    const { id } = request.params;
    try {
      await pool.query("DELETE FROM events_entries WHERE id = $1", [id]);
      return reply.send({ success: true, message: "Event deleted." });
    } catch (err) {
      return reply.status(500).send({ success: false, error: err.message });
    }
  });
}
