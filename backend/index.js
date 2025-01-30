import express from "express";
import dotenv from "dotenv";
import connectDB from "./models/db.js";
import bodyParser from "body-parser";
import cors from "cors"
import router from "./routes/AuthRouter.js";
// Load environment variables
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(bodyParser.json())
app.use(cors())
app.use("/auth",router)

app.get("/", (req, res) => {
    res.send("Server has started");
});
app.get("/user", (req, res) => {
    res.send("User is Talha Nawaz and admin is also Talha Nawaz");
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server has started at http://localhost:${PORT}`);
});
