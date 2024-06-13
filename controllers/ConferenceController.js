
const BaseController = require("../HUB/BaseController");
const Conference = require("../models/Conference");

module.exports = class ConferenceController extends BaseController {
  constructor() {
    super(new Conference());
  }
};
