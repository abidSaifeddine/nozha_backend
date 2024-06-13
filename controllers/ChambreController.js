
const BaseController = require("../HUB/BaseController");
const Chambre = require("../models/Chambre");

module.exports = class ChambreController extends BaseController {
  constructor() {
    super(new Chambre());
  }
};
