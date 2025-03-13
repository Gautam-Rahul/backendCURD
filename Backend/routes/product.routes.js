
import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controller/product.controller.js";

const router = express.Router();

// Display all products
router.get("/", getProducts);

// Create a product
router.post("/", createProduct);

// Delete a product
router.delete("/:id", deleteProduct);

// Update a product
router.put("/:id", updateProduct);

export default router;
