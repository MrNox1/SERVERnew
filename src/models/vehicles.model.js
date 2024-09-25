const mssql = require("mssql");
const { connection } = require("../database.js");




async function addNewVehicles(obj) {
  const { name,idBrand, characteristic, color , status, vehicleValue, idRegisteringUser , vehicleStatusId, image } = obj
  
  let pool, result;

  try {
    pool = await connection();
    result = await pool
    .request()
    .input("nombre", mssql.VarChar, name)
    .input("idMarca", mssql.Int, idBrand)
    .input("caracteristica", mssql.VarChar, characteristic)
    .input("color", mssql.VarChar, color)
    .input("estado", mssql.Bit, status)
    .input("valorVehiculo", mssql.Decimal(10, 2), vehicleValue)
    .input("idUsuarioRegistro", mssql.Int, idRegisteringUser)
    .input("idEstadoVehiculo", mssql.Int, vehicleStatusId)
    .input("imagen", mssql.VarChar, image)
    .query(`
      INSERT INTO vehiculos (nombre, idMarca, caracteristica, color, estado, valorVehiculo, idUsuarioRegistro, idEstadoVehiculo, imagen) 
      OUTPUT INSERTED.* 
      VALUES (@nombre, @idMarca, @caracteristica, @color, @estado, @valorVehiculo, @idUsuarioRegistro, @idEstadoVehiculo, @imagen)
    `);
  

    console.log(result);
  } catch (err) {
    console.error( err.message);
  } finally {
    if (pool) {
      pool.close();
    }
    return result
  }
}





async function deleteVehiclesById(obj) {
  const { id } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("id", mssql.Int, id)
      .query("DELETE FROM vehiculos OUTPUT DELETED.* WHERE id = @id");

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



async function selectAllVehicles() {
  let pool, result;

  try {
      pool = await connection();
      result = await pool
          .request()
          .query(`
              SELECT 
                  v.id AS vehicleId,  
                  v.nombre AS vehicleName,
                  v.caracteristica AS characteristic,
                  v.color AS color,
                  v.estado AS status,
                  v.valorVehiculo AS vehicleValue,
                  v.imagen AS image,
                  m.nombre AS brandName,
                  u.nombre AS registeringUser,
                  ev.nombre AS vehicleStatus
              FROM vehiculos v
              INNER JOIN marca m ON v.idMarca = m.id
              INNER JOIN usuarios u ON v.idUsuarioRegistro = u.id
              INNER JOIN estadoVehiculo ev ON v.idEstadoVehiculo = ev.id
          `);

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


 
  selectVehiclesById({id:1})
 
  async function selectVehiclesById(obj) {
    const { id } = obj;

    

   

    let pool, result;
  
    try {
      pool = await connection();
      result = await pool
        .request()
        .input("myid", mssql.Int, id)
        .query(`
          SELECT 
          v.id AS id,
          v.nombre AS vehicleName,
          v.caracteristica AS characteristic,
          v.color AS color,
          v.estado AS status,
          v.valorVehiculo AS vehicleValue,
          v.imagen AS image,
          m.nombre AS brandName,           
          u.nombre AS registeringUser,     
          ev.nombre AS vehicleStatus       
        FROM vehiculos v
        INNER JOIN marca m ON v.idMarca = m.id
        INNER JOIN usuarios u ON v.idUsuarioRegistro = u.id
        INNER JOIN estadoVehiculo ev ON v.idEstadoVehiculo = ev.id
        WHERE id = @myid
        `);
  
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

  async function updateVehicles(obj) {
    const {name , id} = obj
    let pool, result;
  
    try {
      pool = await connection();
      result = await pool
        .request()
        .input("nombre" , mssql.VarChar ,name)
        .input("id",mssql.Int,id)
        .query("UPDATE vehiculos SET nombre = @nombre OUTPUT INSERTED.* WHERE id = @id");
  
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

  async function updateVehicles(obj) {
    const { 
        id, 
        name, 
        idBrand, 
        characteristic, 
        color, 
        status, 
        vehicleValue, 
        idRegisteringUser, 
        vehicleStatusId, 
        image 
    } = obj;
    
    let pool, result;

    try {
        pool = await connection();
        result = await pool
            .request()
            .input("id", mssql.Int, id) 
            .input("nombre", mssql.VarChar, name)
            .input("idMarca", mssql.Int, idBrand)
            .input("caracteristica", mssql.VarChar, characteristic)
            .input("color", mssql.VarChar, color)
            .input("estado", mssql.Bit, status)
            .input("valorVehiculo", mssql.Decimal(10, 2), vehicleValue)
            .input("idUsuarioRegistro", mssql.Int, idRegisteringUser)
            .input("idEstadoVehiculo", mssql.Int, vehicleStatusId)
            .input("imagen", mssql.VarChar, image)
            .query(`
                UPDATE vehiculos 
                SET 
                    nombre = @nombre, 
                    idMarca = @idMarca, 
                    caracteristica = @caracteristica, 
                    color = @color, 
                    estado = @estado, 
                    valorVehiculo = @valorVehiculo, 
                    idUsuarioRegistro = @idUsuarioRegistro, 
                    idEstadoVehiculo = @idEstadoVehiculo, 
                    imagen = @imagen 
                OUTPUT INSERTED.* 
                WHERE id = @id
            `);

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

  



module.exports = {addNewVehicles,
  deleteVehiclesById,
  selectAllVehicles,
  selectVehiclesById,
  updateVehicles,
  updateVehicles,}