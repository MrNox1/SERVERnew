const mssql = require("mssql");
const { connection } = require("../database.js");

async function addNewStratumDiscount(obj) {
  const { stratum, value } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("estrato", mssql.VarChar, stratum)
      .input("valor", mssql.Decimal(10, 2), value)
      .query(
        "INSERT INTO Descuento  INSERTED.estrato , INSERTED.estrato  (estrato , valor) VALUES (@estrato, @valor)"
      );

    console.log(result);
  } catch (err) {
    console.error("Error al agregar el descuento:", err.message);
  } finally {
    if (pool) {
      pool.close();
    }
    return result;
  }
}

addNewStratumDiscount({ stratum: "1", value: 10 });
