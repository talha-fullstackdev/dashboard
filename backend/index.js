import express from "express";
import dotenv from "dotenv";
import connectDB from "./models/db.js";
import bodyParser from "body-parser";
import cors from "cors"
import router from "./routes/AuthRouter.js";
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(bodyParser.json()) //parse the json data into javascript object
app.use(cors({
    origin:{"https://deploy-mern-1whq.vercel.app"},
    methods:{"POST","GET"},
    credentials:true
}))
app.use("/auth",router)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server has started at http://localhost:${PORT}`);
});
