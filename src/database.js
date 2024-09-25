require("dotenv").config();
const mssql = require("mssql");

const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const myDatabase = "DB_BICICALI";

const dbConfig = {
  user: USER,
  password: PASSWORD,
  database: myDatabase,
  server: "localhost",

  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function connection() {
  try {
    const pool = await mssql.connect(dbConfig);
    console.log("Conexión exitosa a la base de datos");
    return pool;
  } catch (err) {
    console.error("Error en la conexión:", err);
    throw err;
  }
}
connection();
module.exports = { connection };
