import express from "express";

const app = express();
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js"

app.use(express.json());
app.use("/api/products",productRoutes)

const port = process.env.PORT || 4000;


app.listen(port, ()=>{
    connectDB();
    console.log("the server has been started");
})