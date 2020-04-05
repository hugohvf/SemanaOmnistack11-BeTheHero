const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback(); //Desfazer todas as migrations antes de executar
    await connection.migrate.latest();
  })

  afterAll(async () => {
    await connection.destroy();
  })

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs') // Se quiser passar header usar por exemplo .set('Authorization','asd')
      .send({
        name: "SOCOPAM",
        email: "contato@socopam.com.br",
        zap: "44991330759",
        city: "Maringá",
        uf: "PR"
      });

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
  });
});