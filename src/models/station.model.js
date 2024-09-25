const mssql = require("mssql");
const { connection } = require("../database.js");

async function addNewStation(obj) {
  const { name, address, state, coordinates } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("nombre", mssql.VarChar(50), name)
      .input("direccion", mssql.VarChar(250), address)
      .input("estado", mssql.Bit, state)
      .input("coordenadas", mssql.VarChar, coordinates).query(`
          INSERT INTO estacion ( nombre, direccion, estado, coordenadas) 
          OUTPUT INSERTED.* 
          VALUES ( @nombre, @direccion, @estado, @coordenadas)
        `);

    console.log("New station added:", result.recordset[0]);
  } catch (err) {
    console.error(err.message);
  } finally {
    if (pool) {
      pool.close();
    }
    return { data: result.recordset, rowsAffected: result.rowsAffected[0] };
  }
}

async function deleteStationById(obj) {
  const { id } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("id", mssql.Int, id)
      .query("DELETE FROM estacion OUTPUT DELETED.* WHERE id = @id");

    console.log(result);
  } catch (err) {
    console.error(err.message);
  } finally {
    if (pool) {
      pool.close();
    }
    return { data: result.recordset, rowsAffected: result.rowsAffected[0] };
  }
}

async function selectAllStation() {
  let pool, result;

  try {
    pool = await connection();
    result = await pool.request().query("SELECT * FROM estacion");

    console.log(result);
  } catch (err) {
    console.error(err.message);
  } finally {
    if (pool) {
      pool.close();
    }

    return { data: result.recordset, rowsAffected: result.rowsAffected[0] };
  }
}

async function selectStationById(obj) {
  const { id } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("id", mssql.Int, id)
      .query("SELECT * FROM estacion WHERE id = @id");

    console.log(result);
  } catch (err) {
    console.error("Error al agregar el rol:", err.message);
  } finally {
    if (pool) {
      pool.close();
    }

    return { data: result.recordset, rowsAffected: result.rowsAffected[0] };
  }
}

async function updateStation(obj) {
  const { id, name, address, state, coordinates } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("id", mssql.Int, id) // Station ID to identify the station to update
      .input("nombre", mssql.VarChar(50), name)
      .input("direccion", mssql.VarChar(250), address)
      .input("estado", mssql.Bit, state)
      .input("coordenadas", mssql.VarChar(250), coordinates).query(`
        UPDATE estacion 
        SET nombre = @nombre, direccion = @direccion, estado = @estado, coordenadas = @coordenadas
        OUTPUT INSERTED.*
        WHERE id = @id
      `);

    console.log(result.recordset[0]);
  } catch (err) {
    console.error(err.message);
  } finally {
    if (pool) {
      pool.close();
    }
    return { data: result.recordset, rowsAffected: result.rowsAffected[0] };
  }
}

module.exports = {
  addNewStation,
  deleteStationById,
  selectAllStation,
  selectStationById,
  updateStation,
};
