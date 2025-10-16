import database from "infra/database.js";

async function status(request, response) {
  response.status(200).json({
    updated_at: new Date().toISOString(),
    postgres: {
      version: Number(
        (await database.query("SHOW server_version;")).rows[0].server_version,
      ),
      max_connections: Number(
        (await database.query("SHOW max_connections;")).rows[0].max_connections,
      ),
      connections: Number(
        (
          await database.query(
            "SELECT COUNT(*) AS total_connections FROM pg_stat_activity;",
          )
        ).rows[0].total_connections,
      ),
    },
  });
}

export default status;
