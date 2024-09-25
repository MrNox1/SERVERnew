const mssql = require("mssql");
const { connection } = require("../database.js");



async function addNewStateVehicle(obj) {
  const { name } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("nombre", mssql.VarChar, name)
      .query("INSERT INTO estadoVehiculo (nombre) OUTPUT INSERTED.* VALUES (@nombre)");

    
  } catch (err) {
    console.error("Error al agregar el rol:", err.message);
  } finally {
    if (pool) {
      pool.close();
    }
    return result
  }
}


async function deleteStateVehicleById(obj) {
  const { id } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("id", mssql.Int, id)
      .query("DELETE FROM estadoVehiculo OUTPUT DELETED.* WHERE id = @id");

    console.log(result);

    

  } catch (err) {
    console.error( err.message);
  } finally {
    if (pool) {
      pool.close();
    }

    return result;
  }
}


async function selectAllStateVehicle() {

    let pool, result;
  
    try {
      pool = await connection();
      result = await pool
        .request()
        .query("SELECT * FROM estadoVehiculo");
  
      console.log(result);
    } catch (err) {
      console.error( err.message);
    } finally {
      if (pool) {
        pool.close();
      }
  
      return result;
    }
  }
 


  async function selectStateVehicleById(obj) {
    const { id } = obj;
    let pool, result;
  
    try {
      pool = await connection();
      result = await pool
        .request()
        .input("id", mssql.Int, id)
        .query("SELECT * FROM estadoVehiculo WHERE id = @id");
  
      console.log(result);
    } catch (err) {
      console.error( err.message);
    } finally {
      if (pool) {
        pool.close();
      }
  
      return result;
    }
  }

 
  async function updateStateVehicle(obj) {
    const {name , id} = obj
    let pool, result;
  
    try {
      pool = await connection();
      result = await pool
        .request()
        .input("nombre" , mssql.VarChar ,name)
        .input("id",mssql.Int,id)
        .query("UPDATE estadoVehiculo SET nombre = @nombre OUTPUT INSERTED.* WHERE id = @id");
  
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


