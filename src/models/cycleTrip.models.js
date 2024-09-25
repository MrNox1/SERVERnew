const mssql = require("mssql");
const { connection } = require("../database.js");

async function addNewCycleTrip(obj) {
  const { name, inicial, finish, price, descript } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("nombrePaseo", mssql.VarChar(50), name)
      .input("estacionInit", mssql.Int, inicial)
      .input("estacionFin", mssql.Int, finish)
      .input("precio", mssql.Decimal(10, 2), price)
      .input("descripcion", mssql.VarChar(mssql.MAX), descript).query(`
        INSERT INTO ciclopaseo (nombrePaseo, estacionInit, estacionFin, precio, descripcion) 
        OUTPUT INSERTED.* 
        VALUES (@nombrePaseo, @estacionInit, @estacionFin, @precio, @descripcion)
      `);

    console.log(result);
    return { data: result.recordset, rowsAffected: result.rowsAffected[0] };
  } catch (err) {
    console.error(err.message);
    throw err; // Puedes lanzar el error para manejarlo en el controlador
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

async function deleteCycleTripById(obj) {
  const { id } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("idPaseo", mssql.Int, id)
      .query(
        "DELETE FROM ciclopaseo OUTPUT DELETED.* WHERE idPaseo = @idPaseo"
      );

    if (result.rowsAffected[0] === 0) {
      return { error: true, message: "No se encontró el paseo con ese ID" };
    }

    console.log(result);
    return { data: result.recordset, rowsAffected: result.rowsAffected[0] };
  } catch (err) {
    console.error(err.message);
    throw err;
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

async function selectAllCycleTri() {
  let pool, result;

  try {
    pool = await connection();
    result = await pool.request().query("SELECT * FROM ciclopaseo");
    return { data: result.recordset, rowsAffected: result.rowsAffected[0] };
  } catch (err) {
    console.error(err.message);
    throw err;
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

async function selectCycleTripById(obj) {
  const { id } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("idPaseo", mssql.Int, id)
      .query("SELECT * FROM ciclopaseo WHERE idPaseo = @idPaseo");

    return { data: result.recordset, rowsAffected: result.rowsAffected[0] };
  } catch (err) {
    console.error(err.message);
    throw err;
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

async function updateCycleTripById(obj) {
  const { id, name, init, finish, price, descript } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("idPaseo", mssql.Int, id)
      .input("nombrePaseo", mssql.VarChar(50), name)
      .input("estacionInit", mssql.Int, init)
      .input("estacionFin", mssql.Int, finish)
      .input("precio", mssql.Decimal(10, 2), price)
      .input("descripcion", mssql.VarChar(mssql.MAX), descript).query(`
        UPDATE ciclopaseo 
        SET nombrePaseo = @nombrePaseo, estacionInit = @estacionInit, estacionFin = @estacionFin, precio = @precio, descripcion = @descripcion
        OUTPUT INSERTED.* 
        WHERE idPaseo = @idPaseo
      `);

    return { data: result.recordset, rowsAffected: result.rowsAffected[0] };
  } catch (err) {
    console.error(err.message);
    throw err;
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

module.exports = {
  addNewCycleTrip,
  deleteCycleTripById,
  selectAllCycleTri,
  selectCycleTripById,
  updateCycleTripById,
};
