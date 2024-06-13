const BaseModel = require("../HUB/BaseModel");
const bcrypt = require('bcryptjs');
const { executeQuery } = require("../config/database");
module.exports = class User extends BaseModel {
  constructor() {
    super("utilisateur");
  }

  
  create = async (data) => {
    const { email, mot_de_passe } = data;
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10); // Hash the password with a salt round of 10
    const query = "INSERT INTO utilisateur (email, mot_de_passe) VALUES (?, ?)";
    const result = await executeQuery(query, [email, hashedPassword]);
    return await this.getBy({ key: "id", value: result.insertId });
  };
};
