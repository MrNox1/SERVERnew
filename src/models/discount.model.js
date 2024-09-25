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
        "INSERT INTO Descuento  (estrato , valor) OUTPUT INSERTED.* VALUES (@estrato, @valor)"
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



async function deleteStratumDiscountById(obj) {
  const { id } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("id", mssql.Int, id)
      .query("DELETE FROM descuento OUTPUT DELETED.* WHERE id = @id");

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

async function getAllStratumDiscount() {

    let pool, result;
  
    try {
      pool = await connection();
      result = await pool
        .request()
        .query("SELECT * FROM descuento");
  
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
 


  async function selectStratumDiscount(obj) {
    const { id } = obj;
    let pool, result;
  
    try {
      pool = await connection();
      result = await pool
        .request()
        .input("id", mssql.Int, id)
        .query("SELECT * FROM descuento WHERE id = @id");
  
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



  async function updateStratumDiscount(obj) {
    const { id, value, porcent } = obj;
    let pool, result;
  
    try {
      pool = await connection();
      result = await pool
        .request()
        .input("estrato", mssql.VarChar, value) 
        .input("valor", mssql.Decimal(10, 2), porcent)
        .input("id", mssql.Int, id)
        .query("UPDATE descuento SET estrato = @estrato," +
           "valor = @valor OUTPUT INSERTED.* WHERE id = @id"); 
  
      console.log(result.recordset[0]);
    } catch (err) {
      console.error('Error al actualizar el descuento:', err.message);
      throw new Error(err.message); 
    } finally {
      if (pool) {
        await pool.close(); 
      }
      return result; 
    }
  }
  




module.exports ={addNewStratumDiscount,
  deleteStratumDiscountById,
  getAllStratumDiscount,
  selectStratumDiscount,
  updateStratumDiscount,}
// addNewStratumDiscount({ stratum: "1", value: 10 });
// addNewStratumDiscount({ stratum: "2", value: 10 });
// addNewStratumDiscount({ stratum: "3", value: 5 });
// addNewStratumDiscount({ stratum: "4", value: 5 });
// addNewStratumDiscount({ stratum: "5", value: 0 });
// addNewStratumDiscount({ stratum: "6", value: 0 });
