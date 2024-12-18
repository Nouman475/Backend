require("dotenv").config();
const jwt = require("jsonwebtoken");
const RefreshToken = require("../Models/tokens");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

class JWTservices {
  //sign access token
  static signAccessToken(payload, expiryTime) {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: expiryTime });
  }
  //sign refresh token
  static signRefreshToken(payload, expiryTime) {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: expiryTime });
  }
  //verify access token
  static verifyAccessToken(token) {
    jwt.verify(token, ACCESS_TOKEN_SECRET);
  }
  //verify refresh token
  static verifyRefreshToken(token) {
    jwt.verify(token, REFRESH_TOKEN_SECRET);
  }
  //store refresh token
  static async storeRefreshToken(token, userId) {
    try {
      const newToken = new RefreshToken({ token, userId });
      await newToken.save();
    } catch (error) {
        console.log(error)
    }
  }
}

module.exports = JWTservices