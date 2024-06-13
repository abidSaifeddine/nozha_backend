const { executeQuery } = require("../config/database");
module.exports = class BaseModel {
  constructor(tableName, foreignData = []) {
    this.tableName = tableName;
    this.foreignData = foreignData
  }
  create = async (data) => {
    const res = await executeQuery(`INSERT INTO ${this.tableName} SET ? `, [
      data,
    ]);
    return await this.getBy({ key: "id", value: res.insertId });
  };
  getAll = async () => {
    return await executeQuery(`SELECT * FROM ${this.tableName} `);
  };
  getBy = async (params) => {
    const { key, value } = params;
    const entity = await executeQuery(
      `SELECT * FROM ${this.tableName} WHERE ${key} like "${value}" `
    ).then((rows) => rows[0]);
    return entity;
  };
  getAllBy = async (params) => {
    const { key, value } = params;
    const entity = await executeQuery(
      `SELECT * FROM ${this.tableName} WHERE ${key} like "${value}" `
    );
    return entity;
  };
  update = async (data) => {
    const resUpdate = await executeQuery(
      `UPDATE ${this.tableName} SET ? WHERE id = ?`,
      [data, data.id]
    );
    if (resUpdate.affectedRows === 1)
      return await this.getBy({ key: "id", value: data.id });
    else throw new Error("Erreur de mise à jour de l'entité: " + data.id);
  };

  delete = async (id) => {
    const resDelete = await executeQuery(
      `DELETE FROM ${this.tableName} WHERE id = ?`,
      [id]
    );
    if (resDelete.affectedRows > 0) return id;
    else throw new Error("Erreur de suppression!");
  };

  getForeignData = async () => {
    let foreignData = {};
    for (let index = 0; index < this.foreignData.length; index++) {
      const fd = this.foreignData[index];
      foreignData[`${fd}s`] = await executeQuery(`SELECT * FROM ${fd}`);
    }
    return foreignData;
  };
};
