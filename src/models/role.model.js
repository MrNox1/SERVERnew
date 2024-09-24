const mssql = require("mssql");
const { connection } = require("../database.js");

async function addNewRole(obj) {
  const { name } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("nombre", mssql.VarChar, name)
      .query("INSERT INTO rol (nombre) VALUES (@nombre)");

    console.log(result);
  } catch (err) {
    console.error("Error al agregar el rol:", err.message);
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

async function addNewRole(obj) {
  const { id } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("id", mssql.VarChar, id)
      .query("DELETE FROM rol WHERE id = @id");

    console.log(result);
  } catch (err) {
    console.error("Error al agregar el rol:", err.message);
  } finally {
    if (pool) {
      pool.close();
    }

    return result;
  }
}
