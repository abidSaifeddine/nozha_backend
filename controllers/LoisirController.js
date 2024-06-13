
const BaseController = require("../HUB/BaseController");
const Loisir = require("../models/Loisir");

module.exports = class LoisirController extends BaseController {
  constructor() {
    super(new Loisir());
  }
};
