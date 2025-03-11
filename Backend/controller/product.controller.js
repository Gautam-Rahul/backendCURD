import mongoose from "mongoose";
import Product from "../models/product.model.js";

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Could not list all products", error.message);
        res.status(500).json({ success: false, message: "Could not list all products" });
    }
};

// Create a product
export const createProduct = async (req, res) => {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    try {
        const newProduct = new Product({ name, price, image });
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(204).send(); // 204 means no content (better than 201 for deletion)
    } catch (error) {
        console.error("Error deleting product:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
