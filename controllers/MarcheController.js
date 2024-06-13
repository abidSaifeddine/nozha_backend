
const BaseController = require("../HUB/BaseController");
const Marche = require("../models/Marche");

module.exports = class MarcheController extends BaseController {
  constructor() {
    super(new Marche());
  }
};
