import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectToMongoDB from "./db/connectTomongodb.js";
dotenv.config();

const app=express();
const PORT =process.env.PORT || 5000;

app.use(express.json());//to parse incoming requests form req.body
// app.get("/",(req,res) => {
//     res.send("hello");
// });

app.use("/api/auth", authRoutes);

app.listen(PORT,() => {

    connectToMongoDB();
    console.log(`server is running on port ${PORT}`);
});