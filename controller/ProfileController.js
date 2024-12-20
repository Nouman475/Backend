const User = require("../Models/user");

const profileController = {
  // Update user's full name
  async updateFullName(req, res) {
    try {
      const { fullName } = req.body;
      const userId = req.user._id; // Assuming you have middleware to extract user from token

      // Validate input
      if (!fullName) {
        return res.status(400).json({ message: "Full name is required" });
      }

      // Find and update the user
      const user = await User.findByIdAndUpdate(
        userId,
        { fullName },
        { new: true, runValidators: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return success response
      res.status(200).json({
        message: "Full name updated successfully",
        user,
      });
    } catch (error) {
      console.error("Error updating full name:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Update user's profile image
  async updateProfileImage(req, res) {
    try {
      const { profileImageUrl } = req.body;
      const userId = req.user._id; // Assuming you have middleware to extract user from token

      // Validate input
      if (!profileImageUrl) {
        return res.status(400).json({ message: "Profile image URL is required" });
      }

      // Find and update the user
      const user = await User.findByIdAndUpdate(
        userId,
        { ProfileImageUrl: profileImageUrl },
        { new: true, runValidators: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return success response
      res.status(200).json({
        message: "Profile image updated successfully",
        user,
      });
    } catch (error) {
      console.error("Error updating profile image:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = profileController;