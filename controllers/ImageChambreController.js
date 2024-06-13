
const BaseController = require("../HUB/BaseController");
const ImageChambre = require("../models/ImageChambre");

module.exports = class ImageChambreController extends BaseController {
  constructor() {
    super(new ImageChambre());
  }
};
