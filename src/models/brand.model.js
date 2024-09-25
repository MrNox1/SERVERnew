const mssql = require("mssql");
const { connection } = require("../database.js");

async function addNewBrand(obj) {
  const { name } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("nombre", mssql.VarChar, name)
      .query("INSERT INTO marca (nombre) OUTPUT INSERTED.* VALUES (@nombre)");

    console.log(result);
  } catch (err) {
    console.error("Error al agregar el rol:", err.message);
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

async function deleteBrandById(obj) {
  const { id } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("id", mssql.Int, id)
      .query("DELETE FROM marca OUTPUT DELETED.* WHERE id = @id");

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

async function selectAllBrand() {
  let pool, result;

  try {
    pool = await connection();
    result = await pool.request().query("SELECT * FROM marca");

    console.log(result);
  } catch (err) {
    console.error("Error al agregar el rol:", err.message);
  } finally {
    if (pool) {
      pool.close();
    }

    return result.recordset;
  }
}

async function selectBrandById(obj) {
  const { id } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("id", mssql.Int, id)
      .query("SELECT * FROM marca WHERE id = @id");

    console.log(result);
  } catch (err) {
    console.error("Error al agregar el rol:", err.message);
  } finally {
    if (pool) {
      pool.close();
    }

    return result.recordset;
  }
}

async function updateBrand(obj) {
  const { name, id } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("nombre", mssql.VarChar, name)
      .input("id", mssql.Int, id)
      .query(
        "UPDATE marca SET nombre = @nombre OUTPUT INSERTED.* WHERE id = @id"
      );

    console.log(result);
  } catch (err) {
    console.error(err.message);
  } finally {
    if (pool) {
      pool.close();
    }

    return result;
  }
}

module.exports = {
  addNewBrand,
  deleteBrandById,
  selectAllBrand,
  selectBrandById,
  updateBrand,
};
