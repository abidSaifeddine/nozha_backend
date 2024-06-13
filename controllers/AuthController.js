const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const { ACCESS_TOKEN_EXPIRES_IN, APP_SECRET } = process.env; // 15 minutes

class AuthController {
  constructor() {
    this.user = new User();
  }

  // Generate JWT access token
  generateAccessToken(user) {
    return jwt.sign({ id: user.id, email: user.email, nom: user.nom, prenom: user.prenom }, APP_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  // Signup functionality
  signup = async (req, res) => {
    const { email, mot_de_passe } = req.body;

    try {
      const existingUser = await this.user.getBy({
        key: "email",
        value: email,
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already exists!",
        });
      }

      const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

      const newUser = {
        email,
        mot_de_passe: hashedPassword,
      };

      const createdUser = await this.user.create(newUser);

      const accessToken = this.generateAccessToken(createdUser);

      res.status(201).json({
        success: true,
        message: "User created successfully!",
        accessToken,
      });
    } catch (error) {
      console.error("Signup error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  // Login functionality
  login = async (req, res) => {
    const { email, mot_de_passe } = req.body;

    try {
      const user = await this.user.getBy({ key: "email", value: email });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Email or password incorrect",
        });
      }

      const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Email or password incorrect",
        });
      }

      const accessToken = this.generateAccessToken(user);

      res.json({
        success: true,
        message: "Logged in successfully",
        accessToken,
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  // get logged in user
  checkUser = async (req, res) => {
    res.json(req.user)
  }
}

module.exports = AuthController;
