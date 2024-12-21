const User = require("../Models/user");

const profileController = {
  // Update user's profile (full name or profile image) based on user ID
  async updateProfile(req, res) {
    try {
      const { id } = req.params; // User ID from the URL parameters
      const { fullName, ProfileImageUrl } = req.body; // Corrected to match the schema

      // Validate input
      if (!fullName && !ProfileImageUrl) {
        return res.status(400).json({ message: "No fields provided to update" });
      }

      // Create an update object dynamically
      const updateData = {};
      if (fullName) updateData.fullName = fullName;
      if (ProfileImageUrl) updateData.ProfileImageUrl = ProfileImageUrl; // Corrected to match the schema

      // Find and update the user
      const user = await User.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return success response
      res.status(200).json({
        message: "Profile updated successfully",
        user,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = profileController;
