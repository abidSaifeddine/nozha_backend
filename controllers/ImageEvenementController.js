
const BaseController = require("../HUB/BaseController");
const ImageEvenement = require("../models/ImageEvenement");

module.exports = class ImageEvenementController extends BaseController {
  constructor() {
    super(new ImageEvenement());
  }
};
