
const BaseController = require("../HUB/BaseController");
const Arrangement = require("../models/Arrangement");

module.exports = class ArrangementController extends BaseController {
  constructor() {
    super(new Arrangement());
  }
};
