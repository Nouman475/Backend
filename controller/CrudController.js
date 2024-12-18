const User = require("../Models/user");
const Product = require("../Models/product");

// Create New Product
const createProduct = async (req, res) => {
  try {
    const { itemName, description, email, category, price, isInStock, mainImageUrl, secondaryImageUrls } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const newProduct = new Product({
        itemName,
        description,
        category,
        price,
        isInStock,
        mainImageUrl,
        secondaryImageUrls,
        user: existingUser._id,
      });

      await newProduct.save();
      res.status(200).json({ product: newProduct });
    } else {
      res.status(404).json({ message: "User does not exist" });
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { itemName, description, category, price, isInStock, mainImageUrl, secondaryImageUrls } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { itemName, description, category, price, isInStock, mainImageUrl, secondaryImageUrls },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error });
  }
}; 

// Add Review to Product
const addReview = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newReview = {
      rating,
      review,
      timestamp: new Date(),
    };

    product.reviews.push(newReview);
    await product.save();

    res.status(200).json({ message: "Review added", product });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Optionally remove product reference from the user's 'products' array
    await User.updateMany(
      { products: req.params.id },
      { $pull: { products: req.params.id } }
    );

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    if (products.length === 0) {
      res.status(404).json({ message: "No products found" });
    } else {
      res.status(200).json({ products });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};


// Get 10 products with limit and skip for pagination
const getTenProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Default to 10 products
    const skip = parseInt(req.query.skip) || 0;    // Default to 0 (start from the beginning)

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
   
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};


// Get a specific product

const getOneProduct = async (req, res) => {
  try {
    const product_id = req.params.id;
    const product = await Product.findById(product_id); // Use findById for a single product

    if (!product) { // Check if the product exists
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json({ product }); // Return the single product
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};



module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getOneProduct,
  getTenProducts,
  addReview,
};
 