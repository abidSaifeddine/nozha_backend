
const BaseController = require("../HUB/BaseController");
const Test = require("../models/Test");

module.exports = class TestController extends BaseController {
  constructor() {
    super(new Test());
  }
};
