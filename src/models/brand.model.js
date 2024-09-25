const mssql = require("mssql");
const { connection } = require("../database.js");

async function addNewBrand(obj) {
  const { name } = obj;
  let pool;

  try {
    pool = await connection();
    const result = await pool
      .request()
      .input("nombre", mssql.VarChar, name)
      .query("INSERT INTO marca (nombre) OUTPUT INSERTED.* VALUES (@nombre)");

    console.log(result);
    return result.recordset[0];
  } catch (err) {
    console.error("Error al agregar la marca:", err.message);
    throw err;
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

deleteBrandById({ id: 5 });

async function deleteBrandById(obj) {
  const { id } = obj;
  let pool;
  const val = Number(id);
  try {
    pool = await connection();
    const result = await pool
      .request()
      .input("id", mssql.Int, id)
      .query("DELETE FROM marca OUTPUT DELETED.* WHERE id = @id");

    return result;
  } catch (err) {
    console.error("Error al eliminar la marca:", err.message);
    throw err; // Lanza el error para manejo en el controlador
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

async function selectAllBrand() {
  let pool;

  try {
    pool = await connection();
    const result = await pool.request().query("SELECT * FROM marca");

    console.log(result);
    return result.recordset; // Retorna todos los registros
  } catch (err) {
    console.error("Error al obtener las marcas:", err.message);
    throw err; // Lanza el error para manejo en el controlador
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

async function selectBrandById(obj) {
  const { id } = obj;
  let pool;

  try {
    pool = await connection();
    const result = await pool
      .request()
      .input("id", mssql.Int, id)
      .query("SELECT * FROM marca WHERE id = @id");

    console.log(result);
    return result.recordset; // Retorna el resultado, puede ser un array vacío si no se encuentra
  } catch (err) {
    console.error("Error al obtener la marca:", err.message);
    throw err; // Lanza el error para manejo en el controlador
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

async function updateBrand(obj) {
  const { name, id } = obj;
  let pool;

  try {
    pool = await connection();
    const result = await pool
      .request()
      .input("nombre", mssql.VarChar, name)
      .input("id", mssql.Int, id)
      .query(
        "UPDATE marca SET nombre = @nombre OUTPUT INSERTED.* WHERE id = @id"
      );

    console.log(result);
    return result.recordset[0];
  } catch (err) {
    console.error("Error al actualizar la marca:", err.message);
    throw err;
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

module.exports = {
  addNewBrand,
  deleteBrandById,
  selectAllBrand,
  selectBrandById,
  updateBrand,
};
