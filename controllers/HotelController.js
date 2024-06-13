
const BaseController = require("../HUB/BaseController");
const Hotel = require("../models/Hotel");

module.exports = class HotelController extends BaseController {
  constructor() {
    super(new Hotel());
  }
};
