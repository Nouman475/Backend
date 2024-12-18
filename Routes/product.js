const router = require("express").Router();
const productController = require("../controller/CrudController");

// Create New Product
router.post("/addProduct", productController.createProduct);

// Update Product
router.put("/updateProduct/:id", productController.updateProduct);

// Delete Product
router.delete("/deleteProduct/:id", productController.deleteProduct);

// Get All Products
router.get("/getProducts", productController.getProducts);

//Get a single product
router.get("/getProduct/:id", productController.getOneProduct);

//Get 10 product
router.get("/getTenProducts", productController.getTenProducts);

//Add a review
router.post("/addReview/:id", productController.addReview);

module.exports = router;
  