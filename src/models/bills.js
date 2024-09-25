

async function addBills(obj) {
    const { idUser, idVehicle, idInitStation,idEndStation, paymentMethod, idDiscount, totalToPay } = obj;
    let pool, result;
  
    try {
      pool = await connection();
      result = await pool
        .request()
        .input("idUser", mssql.Int, idUser)
        .input("idVehiculo", mssql.Int, idVehicle)
        .input("idRecogida", mssql.Int, idInitStation)
        .input("idEntrega", mssql.Int, idEndStation)
        .input("formadepago", mssql.VarChar(50), paymentMethod)
        .input("idDescuento", mssql.Int, idDiscount)
        .input("totalPagar", mssql.Decimal(10, 2), totalToPay)
        .query(`
          INSERT INTO invoice (idUsuario, idVehiculo, idRecogida, idEntrega, formadepago, idDescuento, totalPagar)
          OUTPUT INSERTED.*
          VALUES (@idUsuario, @idVehiculo, @idRecogida, @idEntrega, @formadepago, @idDescuento, @totalPagar)
        `);
  
      console.log("New invoice added:", result.recordset[0]);
      return result.recordset[0];
    } catch (err) {
      console.error("Error adding invoice:", err.message);
    } finally {
      if (pool) {
        pool.close();
      }
    }
  }
  
  // Update an existing invoice
  async function updateInvoice(obj) {
    const { id, idUser, idVehicle, idPickup, idDelivery, paymentMethod, idDiscount, totalToPay } = obj;
    let pool, result;
  
    try {
      pool = await connection();
      result = await pool
        .request()
        .input("id", mssql.Int, id)
        .input("idUser", mssql.Int, idUser)
        .input("idVehicle", mssql.Int, idVehicle)
        .input("idPickup", mssql.Int, idPickup)
        .input("idDelivery", mssql.Int, idDelivery)
        .input("paymentMethod", mssql.VarChar(50), paymentMethod)
        .input("idDiscount", mssql.Int, idDiscount)
        .input("totalToPay", mssql.Decimal(10, 2), totalToPay)
        .query(`
          UPDATE invoice 
          SET idUsuario = @idUser, idVehiculo = @idVehicle, idRecogida = @idPickup, idEntrega = @idDelivery, formadepago = @paymentMethod, idDescuento = @idDiscount, totalPagar = @totalToPay 
          OUTPUT INSERTED.*
          WHERE id = @id
        `);
  
      console.log("Invoice updated:", result.recordset[0]);
      return result.recordset[0];
    } catch (err) {
      console.error("Error updating invoice:", err.message);
    } finally {
      if (pool) {
        pool.close();
      }
    }
  }
  
  // Delete an invoice
  async function deleteInvoice(id) {
    let pool, result;
  
    try {
      pool = await connection();
      result = await pool
        .request()
        .input("id", mssql.Int, id)
        .query(`
          DELETE FROM invoice
          OUTPUT DELETED.*
          WHERE id = @id
        `);
  
      console.log("Invoice deleted:", result.recordset[0]);
      return result.recordset[0];
    } catch (err) {
      console.error("Error deleting invoice:", err.message);
    } finally {
      if (pool) {
        pool.close();
      }
    }
  }
  
  // Get all invoices
  async function getAllInvoices() {
    let pool, result;
  
    try {
      pool = await connection();
      result = await pool
        .request()
        .query(`
          SELECT * FROM invoice
        `);
  
      console.log("All invoices:", result.recordset);
      return result.recordset;
    } catch (err) {
      console.error("Error fetching all invoices:", err.message);
    } finally {
      if (pool) {
        pool.close();
      }
    }
  }
  
  // Get an invoice by ID
  async function getInvoiceById(id) {
    let pool, result;
  
    try {
      pool = await connection();
      result = await pool
        .request()
        .input("id", mssql.Int, id)
        .query(`
          SELECT * FROM invoice
          WHERE id = @id
        `);
  
      console.log("Invoice by ID:", result.recordset[0]);
      return result.recordset[0];
    } catch (err) {
      console.error("Error fetching invoice by ID:", err.message);
    } finally {
      if (pool) {
        pool.close();
      }
    }
  }
  