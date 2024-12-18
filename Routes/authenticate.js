const router = require("express").Router();
const authController = require("../controller/AuthController");

// User registration 
router.post("/register", authController.register);

// User login 
router.post("/login", authController.login);

//Add address
router.post("/addAddress/:id", authController.addAddress)

module.exports = router;
