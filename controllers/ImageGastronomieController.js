
const BaseController = require("../HUB/BaseController");
const ImageGastronomie = require("../models/ImageGastronomie");

module.exports = class ImageGastronomieController extends BaseController {
  constructor() {
    super(new ImageGastronomie());
  }
};
