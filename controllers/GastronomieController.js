
const BaseController = require("../HUB/BaseController");
const Gastronomie = require("../models/Gastronomie");

module.exports = class GastronomieController extends BaseController {
  constructor() {
    super(new Gastronomie());
  }
};
