test("GET to /api/v1/sttus should return 200", async () => {
  expect((await fetch("http:localhost:3000/api/v1/status")).status).toBe(200);
});
