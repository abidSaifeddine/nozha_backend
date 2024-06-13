
const BaseController = require("../HUB/BaseController");
const ImageLoisir = require("../models/ImageLoisir");

module.exports = class ImageLoisirController extends BaseController {
  constructor() {
    super(new ImageLoisir());
  }
};
