
const BaseController = require("../HUB/BaseController");
const Evenement = require("../models/Evenement");

module.exports = class EvenementController extends BaseController {
  constructor() {
    super(new Evenement());
  }
};
