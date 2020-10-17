// require('dotenv/config');

module.exports = {
  // .env for development-------------------------------------------------------
  dialect: 'postgres',
  host: process.env.DEV_DB_HOST,
  username: process.env.DEV_DB_USER,
  password: process.env.DEV_DB_PASS,
  database: process.env.DEV_DB_NAME,
  port: process.env.DEV_DB_PORT, // adicionar a porta se não estiver rodando a padrão 5432

  // .env for production--------------------------------------------------------
  // dialect: 'postgres',
  // host: process.env.DB_HOST,
  // username: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // database: process.env.DB_NAME,
  // port: process.env.DB_PORT, // adicionar a porta se não estiver rodando a padrão 5432

  define: {
    timestamps: true, // saber quando registro foi criado/editado
    underscored: true,
    underscoredAll: true,
  },
};
