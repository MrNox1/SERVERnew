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
      .query("INSERT INTO rol (nombre) OUTPUT INSERTED.* VALUES (@nombre)");

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

async function deleteRole(obj) {
  console.log(obj);
  const { id } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("id", mssql.Int, id)
      .query("DELETE FROM rol OUTPUT deleted.* WHERE id = @id");

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

async function getRoleById(obj) {
  const { id } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("id", mssql.Int, id)
      .query("SELECT * FROM rol WHERE id = @id");

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

async function getAllRole() {
  let pool, result;

  try {
    pool = await connection();
    result = await pool.request().query("SELECT * FROM rol ");

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

async function updateRoleById(obj) {
  const { id, name } = obj;
  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("id", mssql.Int, id)
      .input("nombre", mssql.VarChar, name)
      .query(
        `UPDATE rol
          SET nombre = @nombre
          OUTPUT inserted.*
          WHERE id = @id`
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

// getAllRole();
// addNewRole({ name: "amo" });
// updateRoleById({ id: 3, name: "amoo" });
// getRoleById({ id: 3 });
// deleteRole({ id: 3 });

module.exports = {
  addNewRole,
  deleteRole,
  getRoleById,
  getAllRole,
  updateRoleById,
};
