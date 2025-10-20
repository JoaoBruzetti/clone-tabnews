import database from "infra/database.js";

async function status(request, response) {
  response.status(200).json({
    updated_at: new Date().toISOString(),
    dependencies: {
      database: {
        version: (await database.query("SHOW server_version;")).rows[0]
          .server_version,
        max_connections: parseInt(
          (await database.query("SHOW max_connections;")).rows[0]
            .max_connections,
        ),
        opened_connenction: (
          await database.query({
            text: "SELECT COUNT(*)::int AS total_connections FROM pg_stat_activity where datname = $1;",
            values: [process.env.POSTGRES_DB],
          })
        ).rows[0].total_connections,
      },
    },
  });
}

export default status;
