const bcrypt = require("bcryptjs");
const User = require("../Models/user");
const userDTO = require("../DTO/AuthDTO");
const JWTservices = require("../services/JWTservices");
const RefreshToken = require("../Models/tokens");
const authController = {
  // User registration
  async register(req, res) {
    try {
      const { fullName, email, password } = req.body;

      // Validate input fields
      if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password before saving the user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
      });

      // Save user to database
      const user = await newUser.save();

      // Generate tokens
      const AccessToken = JWTservices.signAccessToken(
        { _id: user._id, username: user.email },
        "30m"
      );

      const RefreshToken = JWTservices.signRefreshToken(
        { _id: user._id },
        "60m"
      );

      // Store refresh token in database
      await JWTservices.storeRefreshToken(RefreshToken, user._id);

      // Set cookies
      res.cookie("AccessToken", AccessToken, {
        maxAge: 1000 * 60 * 30, // 30 minutes
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure in production
        sameSite: "strict",
      });

      res.cookie("RefreshToken", RefreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      // Prepare user response
      const userResponse = new userDTO(user);

      res.status(201).json(
        {
          user: userResponse,
          message: "User registered successfully",
          accessToken:AccessToken
        }
      );
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // User login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found, please sign up" });
      }

      // Check if the password is correct
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate tokens
      const AccessToken = JWTservices.signAccessToken(
        { _id: user._id, username: user.email },
        "30m"
      );

      const RefreshToken = JWTservices.signRefreshToken(
        { _id: user._id },
        "60m"
      );

      // Set cookies
      res.cookie("AccessToken", AccessToken, {
        maxAge: 1000 * 60 * 30, // 30 minutes
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.cookie("RefreshToken", RefreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      // Prepare user response
      const userDto = new userDTO(user);

      res.status(200).json(
        {
          message: "Login successful",
          user: userDto,
          accessToken: AccessToken,
        }
      );
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Add address method
  async addAddress(req, res) {
    try {
      const { newAddress } = req.body;
      const userId = req.user._id; // Assuming you have middleware to extract user from token

      // Validate input
      if (!newAddress) {
        return res.status(400).json({ error: "New address is required" });
      }

      // Find and update the user
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { addresses: newAddress } },
        { new: true, runValidators: true }
      );

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Return success response
      res.status(200).json({
        message: "Address added successfully",
        addresses: user.addresses,
      });
    } catch (error) {
      console.error("Error adding address:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Logout method
  async logout(req, res) {
    try {
      // Clear tokens from cookies
      res.clearCookie("AccessToken");
      res.clearCookie("RefreshToken");

      // Optional: Remove refresh token from database
      if (req.user && req.user._id) {
        await JWTservices.removeRefreshToken(req.user._id);
      }

      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = authController;
