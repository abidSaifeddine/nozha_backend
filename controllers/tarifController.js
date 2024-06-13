
const BaseController = require("../HUB/BaseController");
const tarif = require("../models/tarif");

module.exports = class tarifController extends BaseController {
  constructor() {
    super(new tarif());
  }
};
