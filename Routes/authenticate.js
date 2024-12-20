const router = require("express").Router();
const authController = require("../controller/AuthController");
const profileController = require('../controller/ProfileController');


// User registration 
router.post("/register", authController.register);

// User login 
router.post("/login", authController.login);

//Add address
router.post("/addAddress/:id", authController.addAddress)

// Update Profile
router.put("/update-profile/:id", profileController.updateProfile);



module.exports = router;
