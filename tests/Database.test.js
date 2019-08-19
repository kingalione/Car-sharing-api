const { Database } = require('../Database');
require('dotenv').config();

test('Test database connect successfull', async () => {
  expect.assertions(1);
  const database = new Database(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
      process.env.DB_HOST
    }`
  );
  const res = await database.connect();
  expect(res).toBeDefined();
  database.close();
});

test('Test fetch all data', async () => {
  expect.assertions(1);
  const database = new Database(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
      process.env.DB_HOST
    }`
  );
  const res1 = await database.connect();
  const res2 = await database.fetchAll('cars');
  expect(Array.isArray(res2)).toBe(true);
  database.close();
});
