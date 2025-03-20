import express from "express";
import dotenv from "dotenv";
import connectDB from "./models/db.js";
import bodyParser from "body-parser";
import cors from "cors"
import authRouter from "./routes/AuthRouter.js";
import dashboardRouter from "./routes/dashboardRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(bodyParser.json()) //parse the json data into javascript object
app.use(cors())

// Routes
app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server has started at http://localhost:${PORT}`);
});
