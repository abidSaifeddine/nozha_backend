
const BaseController = require("../HUB/BaseController");
const ImageConference = require("../models/ImageConference");

module.exports = class ImageConferenceController extends BaseController {
  constructor() {
    super(new ImageConference());
  }
};
