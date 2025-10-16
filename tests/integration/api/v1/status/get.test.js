test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http:localhost:3000/api/v1/status");

  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.updated_at).toBeDefined();

  expect(responseBody.updated_at).toEqual(
    new Date(responseBody.updated_at).toISOString(),
  );

  expect(responseBody.postgres.version).toBeDefined();
  expect(responseBody.postgres.max_connections).toBeDefined();
  expect(responseBody.postgres.connections).toBeDefined();

  expect(typeof responseBody.postgres.version).toBe("number");
  expect(typeof responseBody.postgres.max_connections).toBe("number");
  expect(typeof responseBody.postgres.connections).toBe("number");

  expect(responseBody.postgres.max_connections).toBeGreaterThan(
    responseBody.postgres.connections,
  );
});
