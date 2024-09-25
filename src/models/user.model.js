const mssql = require("mssql");
const { connection } = require("../database.js");
const bcrypt = require("bcrypt");

async function addNewUser(obj) {
  const {
    name,
    lastName,
    userName,
    password,
    identification,
    adress,
    email,
    phone,
    state,
    role,
    image,
  } = obj;

  let pool, result;

  try {
    pool = await connection();

    const exists = await pool
      .request()
      .input("userName", mssql.VarChar(250), userName)
      .input("email", mssql.VarChar(250), email)
      .input("identificacion", mssql.VarChar(20), identification).query(`
       SELECT * FROM Usuarios 
        WHERE userName = @userName OR identificacion = @identificacion OR email = @email;
      `);

    if (exists.rowsAffected[0]) {
      return {
        error: true,
        message:
          "El nombre de usuario o la identificación o el corrreo ya existen",
      };
    }

    const passIncrpt = await bcrypt.hash(password, 10);

    result = await pool
      .request()
      .input("nombre", mssql.VarChar(50), name)
      .input("apellido", mssql.VarChar(50), lastName)
      .input("userName", mssql.VarChar(250), userName)
      .input("password", mssql.VarChar(250), passIncrpt)
      .input("identificacion", mssql.VarChar(20), identification)
      .input("direccion", mssql.VarChar(100), adress)
      .input("email", mssql.VarChar(100), email)
      .input("celular", mssql.VarChar(15), phone)
      .input("estado", mssql.Bit, state)
      .input("idRol", mssql.Int, role)
      .input("imagen", mssql.VarChar(mssql.MAX), image).query(`
        INSERT INTO Usuarios (nombre, apellido, userName, password, identificacion, direccion, email, celular, estado, idRol, imagen) 
        VALUES (@nombre, @apellido, @userName, @password, @identificacion, @direccion, @email, @celular, @estado, @idRol, @imagen)
      `);

    console.log("Usuario agregado:", result);
    return {
      error: false,
      message: "Usuario agregado exitosamente.",
      data: result,
    };
  } catch (err) {
    console.error("Error al agregar usuario:", err.message);
    return {
      error: true,
      message: "Error al agregar usuario. Inténtalo de nuevo.",
    };
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

async function deleteUser(obj) {
  const { id } = obj;

  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("id", mssql.Int, id)
      .query(`DELETE FROM Usuarios OUTPUT DELETED.* WHERE id  = @id;`);

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

async function getUserbyId(obj) {
  const { id } = obj;

  let pool, result;

  try {
    pool = await connection();
    result = await pool
      .request()
      .input("id", mssql.Int, id)
      .query("SELECT * FROM Usuarios WHERE id = @id");

    console.log(result.recordset);
  } catch (err) {
    console.error(err.message);
  } finally {
    if (pool) {
      pool.close();
    }

    return result;
  }
}

async function getAllUsers() {
  let pool, result;

  try {
    pool = await connection();
    result = await pool.request().query("SELECT * FROM Usuarios");

    console.log(result.recordset);
  } catch (err) {
    console.error(err.message);
  } finally {
    if (pool) {
      pool.close();
    }
    return result;
  }
}

async function userValidation(obj) {
  const { userName, password } = obj;
  let pool, result;
  console.log(userName);
  try {
    pool = await connection();

    let user = await pool
      .request()
      .input("userName", mssql.VarChar(250), userName).query(`
        SELECT * 
        FROM Usuarios 
        WHERE userName = @userName
      `);

    if (user.rowsAffected[0]) {
      const validatePASS = await bcrypt.compare(
        password,
        user.recordset[0].password
      );

      if (!validatePASS) {
        return { mess: "incorrect password" };
      }
      return { id: user.recordset[0].id };
    } else {
      return { mess: "incorret user" };
    }
  } catch (err) {
    console.error("Error al verificar usuario:", err.message);
    return { exists: false, message: "Error en la verificación." };
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

module.exports = {
  addNewUser,
  deleteUser,
  getUserbyId,
  getAllUsers,
  userValidation,
};
