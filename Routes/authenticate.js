const router = require("express").Router();
const authController = require("../controller/AuthController");
const profileController = require('../controller/ProfileController');
const authMiddleware = require('../middleware/authMiddleware');

// User registration 
router.post("/register", authController.register);

// User login 
router.post("/login", authController.login);

//Add address
router.post("/addAddress/:id", authController.addAddress)
// Update full name
router.put('/profile/fullname', authMiddleware, profileController.updateFullName);

// Update profile image
router.put('/profile/image', authMiddleware, profileController.updateProfileImage);

module.exports = router;
